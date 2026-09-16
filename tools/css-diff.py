#!/usr/bin/env python3
"""Rule-level diff of the CSS this plugin injects into the dsh client.

The enhancer ships its stylesheet as one long JS string in lib/client.js, so an
edit that removes one selector out of a comma list is invisible in a normal
`git diff` of that line. Two real regressions came from exactly that:

  * `[data-slot=x] [class$=_meta],[data-slot=x] [class$=_time]` — dropping the
    first half by text left `[data-slot=x] [data-slot=x] [class$=_time]`, a
    selector that can never match, so the rule silently stopped applying.
  * `[class$=_brand] svg` → `[class*=_brand] svg` — broadening a suffix match
    hit sibling elements (`_brandIdentity`/`_brandMark`/`_brandName`) and
    squashed the product's brand wordmark.

Usage:
    python3 tools/css-diff.py                      # HEAD vs working tree
    python3 tools/css-diff.py HEAD~1 HEAD          # two revisions
    python3 tools/css-diff.py 0f8acdb --check      # exit 1 on suspicious rules

Run it before committing any change to the injected stylesheet, then confirm the
affected elements in a browser (toggling the plugin's <style> sheet on and off and
comparing computed styles) — the rule diff says *what* changed, the browser says
whether it was intended.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

PLUGIN_FILE = "lib/client.js"


def read_source(rev: str | None) -> str:
    if rev is None:
        return Path(PLUGIN_FILE).read_text(encoding="utf-8")
    return subprocess.check_output(["git", "show", f"{rev}:{PLUGIN_FILE}"], text=True)


def extract_css(source: str) -> str:
    """Decode the `const css = "..."` string literal from the bundled client file."""
    marker = 'const css = "'
    start = source.index(marker) + len(marker)
    out: list[str] = []
    i = start
    while True:
        ch = source[i]
        if ch == "\\":
            out.append(source[i : i + 2])
            i += 2
            continue
        if ch == '"':
            break
        out.append(ch)
        i += 1
    # JS string escapes: \\. -> \. , \" -> " , \n -> newline
    text = "".join(out)
    text = re.sub(r"\\\\(.)", r"\\\1", text)
    text = text.replace('\\"', '"').replace("\\n", "\n")
    return text


def split_rules(css: str) -> list[str]:
    """Split a stylesheet into top-level rules, keeping @media blocks whole."""
    rules: list[str] = []
    depth = 0
    cur = ""
    for ch in css:
        cur += ch
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                rules.append(cur.strip())
                cur = ""
    if cur.strip():
        rules.append(cur.strip())
    return rules


def flatten(rule: str) -> list[str]:
    """Expand one rule into `@media…|selector{decls}` entries so nested rules diff too."""
    m = re.match(r"@media([^{]*)\{(.*)\}\s*$", rule, re.S)
    if not m:
        return [rule]
    media, body = m.group(1).strip(), m.group(2)
    return [f"{media}|{inner}" for inner in split_rules(body)]


def rules_of(rev: str | None) -> list[str]:
    return [f for rule in split_rules(extract_css(read_source(rev))) for f in flatten(rule)]


def suspicious(rules: list[str]) -> list[str]:
    """Flag the failure modes this tool exists to catch."""
    findings: list[str] = []
    for rule in rules:
        selector = rule.split("{", 1)[0]
        duplicate = re.search(r"\[([^\]]+)\][^,{]*\[\1\]", selector)
        if duplicate:
            findings.append(f"repeated attribute selector [{duplicate.group(1)}] in: {selector[:120]}")
        for part in selector.split(","):
            tokens = [t for t in re.split(r"\s+", part.strip()) if t.startswith("[")]
            for idx, token in enumerate(tokens):
                if token in tokens[idx + 1 :]:
                    findings.append(f"duplicated step {token} in: {part.strip()[:120]}")
    return findings


def main() -> int:
    parser = argparse.ArgumentParser(description="Rule-level diff of the injected plugin CSS.")
    parser.add_argument("base", nargs="?", default="HEAD", help="revision to compare from (default HEAD)")
    parser.add_argument("target", nargs="?", help="revision to compare to (default: working tree)")
    parser.add_argument("--check", action="store_true", help="exit 1 when a suspicious rule is found")
    parser.add_argument("--lint", action="store_true", help="only scan the working tree for suspicious rules (CI)")
    args = parser.parse_args()

    if args.lint:
        args.base = args.target = None
    base_rules = rules_of(args.base)
    target_rules = rules_of(args.target)
    removed = [r for r in base_rules if r not in target_rules]
    added = [r for r in target_rules if r not in base_rules]

    label = args.target or "working tree"
    if args.lint:
        print("lint mode: scanning %d working-tree rules" % len(target_rules))
    print(f"rules: {args.base}={len(base_rules)}  {label}={len(target_rules)}")
    if args.lint:
        removed = added = []
    print(f"\n--- removed ({len(removed)}) ---")
    for rule in removed:
        print("  - " + rule[:180])
    print(f"\n--- added ({len(added)}) ---")
    for rule in added:
        print("  + " + rule[:180])

    findings = suspicious(target_rules)
    print(f"\n--- suspicious patterns in {label} ({len(findings)}) ---")
    for finding in findings:
        print("  ! " + finding)

    if args.check and findings:
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
