#!/usr/bin/env bash
# =============================================================================
# dsh-enhance-tool — one-command installer for DeepSeek Harness (dsh) web
#
#   Standard install: adds the plugin via the official `dsh plugin` (pnpm) path,
#   then links the @deepseek-ai/dsh-session-title-llm dependency (which pnpm
#   cannot resolve on its own — it lives inside the global dsh package).
#
#   Usage:  bash install.sh            (install; uses ~/.dsh, auto-detects global dsh)
#           bash install.sh --copy     (self-contained copy install; no pnpm, no symlink
#                                       into this checkout — survives the clone moving)
#           bash install.sh --check    (read-only prerequisite check; installs nothing)
#           bash install.sh --uninstall(remove the plugin AND its dsh.profile.bundles
#                                       entry, so no "skipping profile bundle" warning)
#           bash install.sh --help
#           DSH_HOME=... bash install.sh
#
#   Requires: node on PATH (dsh itself is a node program). The install path also
#   needs the dsh CLI for the official pnpm route; --copy works without it.
#   No dsh version range is written here on purpose — a literal drifts from the
#   manifest. This script reads peerDependencies["@deepseek-ai/dsh"] from this
#   package's package.json and compares it against the detected runtime with dsh's
#   own gate BEFORE writing anything. dsh skips a profile bundle whose
#   `@deepseek-ai/dsh*` peers do not match the runtime (dsh-app-boot's
#   `evaluatePluginCompatibility`, called while loading each profile bundle), so
#   installing on an unsupported runtime would otherwise succeed and then leave
#   the UI silently without this plugin. Profile-local exact-version exemptions
#   (<profile>/compatibility.json, granted by `dsh plugin --profile <name>
#   allow-version … --accept-risk`) are honored, so the remedy printed on a
#   mismatch actually works on a re-run.
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_DIR="$SCRIPT_DIR"
WARN_COUNT=0
MODE="install"
for arg in "$@"; do
  case "$arg" in
    --check|--dry-run) MODE="check" ;;
    --copy) MODE="copy" ;;
    --uninstall|--remove) MODE="uninstall" ;;
    -h|--help) MODE="help" ;;
    *)
      echo "error: unknown argument: $arg" >&2
      echo "usage: bash install.sh [--check|--copy|--uninstall|--help]" >&2
      exit 2
      ;;
  esac
done
if [[ "$MODE" == "help" ]]; then
  cat <<'USAGE'
usage: bash install.sh [--check|--copy|--uninstall|--help]

  (no argument)   install the plugin into the dsh web profile via `dsh plugin add`
                  (pnpm). pnpm records a local directory as a `link:` symlink, so
                  this checkout must stay where it is; the script says so and
                  `--copy` is the alternative.
  --copy          install without pnpm: copy the plugin into the profile's
                  node_modules and enable it in dsh.profile.bundles. Self-contained:
                  moving or deleting this checkout afterwards changes nothing.
  --check         run every read-only prerequisite check (profile, global dsh,
                  peerDependencies version gate, session-title dependency, plugin
                  sources) and exit without installing anything
  --uninstall     remove the plugin the correct way: `dsh plugin --profile web remove
                  dsh-enhance-tool` when the CLI exists, then delete the copied
                  directory and drop a leftover dsh.profile.bundles entry. Deleting the
                  directory by hand leaves that entry behind and every later start logs
                  `dsh: skipping profile bundle "dsh-enhance-tool"`.
  --help          this text

exit codes:
  0  install/--copy: the plugin is enabled in dsh.profile.bundles and every copied
     file parses; --check: every hard prerequisite passed (non-fatal findings are
     counted in the summary as "OK (N warning(s))"); --uninstall: the bundle entry
     and the directory are gone
  1  a hard prerequisite failed (missing node, missing web profile, missing global
     dsh, a dsh runtime that fails the plugin's peerDependencies gate with no
     exemption) or the install could not be made effective
  2  bad command line

environment:
  DSH_HOME        harness home to use (default: ~/.dsh)
  NVM_DIR         nvm root used when probing for the global dsh (default: ~/.nvm)
USAGE
  exit 0
fi

# ---- 0. node is required (dsh itself is a node program) ---------------------
# Without this check the script used to die at step [3/7] with bash's own
# `install.sh: line 325: node: command not found`, after step [2/7] had swallowed
# the same failure with `2>/dev/null || true`.
if ! command -v node >/dev/null 2>&1; then
  cat >&2 <<'EOF'
error: node was not found on PATH.
  This installer needs node for two things: evaluating dsh's own plugin version gate
  (peerDependencies) and syntax-checking the plugin files. `dsh` itself is a node
  program, so the node that runs your dsh must be on PATH.
  fix: put that node's bin directory on PATH, or install Node.js >= 18 (nvm: `nvm install 22`),
       then re-run:  bash install.sh --check
EOF
  exit 1
fi

# ---- 1. Locate the dsh web profile -----------------------------------------
echo "[1/7] locating the dsh web profile..."
if [[ -n "${DSH_HOME:-}" ]]; then
  DSH_ROOT="$DSH_HOME"
else
  DSH_ROOT="${HOME}/.dsh"
fi
PROFILE="$DSH_ROOT/profiles/web"
NM="$PROFILE/node_modules"
PLUGIN_NAME="dsh-enhance-tool"
if [[ ! -d "$PROFILE" ]]; then
  echo "error: dsh web profile not found at $PROFILE" >&2
  echo "  start 'dsh web' once to create it, or set DSH_HOME" >&2
  exit 1
fi
echo "  ok: $PROFILE"

# ---- 1b. --uninstall (needs only the profile) -------------------------------
# The correct uninstall is a package-manager removal: it drops the dependency AND the
# `dsh.profile.bundles` entry. Deleting node_modules/<pkg> by hand leaves the entry
# behind, and dsh then logs `skipping profile bundle "<pkg>"` on every start.
bundles_lists_plugin() {
  node -e 'const fs = require("node:fs");
try {
  const manifest = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
  const bundles = manifest && manifest.dsh && manifest.dsh.profile && manifest.dsh.profile.bundles;
  process.exit(Array.isArray(bundles) && bundles.includes(process.argv[2]) ? 0 : 1);
} catch { process.exit(1); }' "$1" "$PLUGIN_NAME"
}
drop_bundle_entry() {
  node - "$1" "$PLUGIN_NAME" <<'NODE'
const fs = require("node:fs");
const [manifestPath, name] = process.argv.slice(2);
if (!fs.existsSync(manifestPath)) {
  process.stdout.write(`  ok: ${manifestPath} does not exist — nothing to clean\n`);
  process.exit(0);
}
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (error) {
  process.stderr.write(`error: cannot parse ${manifestPath}: ${error.message}\n`);
  process.exit(1);
}
const bundles = manifest && manifest.dsh && manifest.dsh.profile && manifest.dsh.profile.bundles;
if (!Array.isArray(bundles) || !bundles.includes(name)) {
  process.stdout.write(`  ok: ${manifestPath} lists neither the bundle nor a leftover entry\n`);
  process.exit(0);
}
manifest.dsh.profile.bundles = bundles.filter((entry) => entry !== name);
const tmp = `${manifestPath}.dsh-enhance-tool.tmp`;
fs.writeFileSync(tmp, JSON.stringify(manifest, undefined, 2) + "\n", { mode: 0o600 });
fs.renameSync(tmp, manifestPath);
process.stdout.write(`  ok: removed "${name}" from dsh.profile.bundles in ${manifestPath}\n`);
NODE
}
if [[ "$MODE" == "uninstall" ]]; then
  echo "[uninstall] removing $PLUGIN_NAME from $PROFILE..."
  if command -v dsh >/dev/null 2>&1; then
    if dsh plugin --profile web remove "$PLUGIN_NAME"; then
      echo "  ok: 'dsh plugin --profile web remove $PLUGIN_NAME' removed the dependency and its bundle entry"
    else
      echo "  warn: 'dsh plugin --profile web remove $PLUGIN_NAME' failed — removing the directory and any leftover bundle entry instead" >&2
    fi
  else
    echo "  dsh CLI not found — removing the directory and the bundle entry directly"
  fi
  rm -rf "$NM/$PLUGIN_NAME"
  drop_bundle_entry "$PROFILE/package.json"
  if [[ -e "$NM/$PLUGIN_NAME" ]]; then
    echo "error: $NM/$PLUGIN_NAME still exists — it was not removed" >&2
    exit 1
  fi
  if bundles_lists_plugin "$PROFILE/package.json"; then
    echo "error: $PROFILE/package.json still lists $PLUGIN_NAME in dsh.profile.bundles" >&2
    echo "  fix: edit that file and remove \"$PLUGIN_NAME\" from dsh.profile.bundles" >&2
    exit 1
  fi
  if command -v dsh >/dev/null 2>&1; then
    if dsh --profile web --dump-config 2>&1 >/dev/null | grep -q "skipping profile bundle \"$PLUGIN_NAME\""; then
      echo "error: dsh still reports a stale bundle entry for $PLUGIN_NAME" >&2
      exit 1
    fi
    echo "  ok: 'dsh --profile web --dump-config' reports no skipping profile bundle for $PLUGIN_NAME"
  fi
  echo "[done] uninstalled: the bundle entry is gone, so no startup warning is left behind."
  exit 0
fi

# ---- 2. Locate the global dsh package (runtime + session-title dep) --------
# Resolution order matters (round-2 review F7): the FIRST candidate is the dsh the
# user actually runs — `command -v dsh` resolved through its symlinks to its own
# package root. The old lookup could only ever fall back to a glob over
# `$NVM_DIR/versions/node/*` in lexicographic order and therefore picked the OLDEST
# nvm node version, i.e. a different dsh than the one on PATH: the script then
# rejected a perfectly matching runtime ("upgrade dsh" on a 0.2.0-rc.2 install).
echo "[2/7] locating the global dsh runtime..."
resolve_symlinks() {
  local target="$1" link hops=0
  while [[ -L "$target" && "$hops" -lt 10 ]]; do
    link="$(readlink "$target")"
    case "$link" in
      /*) target="$link" ;;
      *) target="$(dirname "$target")/$link" ;;
    esac
    hops=$((hops + 1))
  done
  printf '%s' "$target"
}
# `.../lib/node_modules/@deepseek-ai/dsh/lib/bin.js` → its `.../@deepseek-ai/dsh/package.json`
dsh_package_from_bin() {
  local resolved prefix
  resolved="$(resolve_symlinks "$1")"
  prefix="$(dirname "$resolved")"
  while [[ -n "$prefix" && "$prefix" != "/" && "$prefix" != "." ]]; do
    if [[ "$(basename "$prefix")" == "dsh" ]] \
      && [[ "$(basename "$(dirname "$prefix")")" == "@deepseek-ai" ]] \
      && [[ -f "$prefix/package.json" ]]; then
      printf '%s' "$prefix/package.json"
      return 0
    fi
    prefix="$(dirname "$prefix")"
  done
  return 1
}
GLOBAL_DSH=""
DSH_SOURCE=""
DSH_BIN="$(command -v dsh 2>/dev/null || true)"
if [[ -n "$DSH_BIN" ]]; then
  candidate="$(dsh_package_from_bin "$DSH_BIN" || true)"
  if [[ -n "${candidate:-}" && -f "$candidate" ]]; then
    GLOBAL_DSH="$candidate"
    DSH_SOURCE="the dsh on PATH ($DSH_BIN)"
  fi
fi
if [[ -z "$GLOBAL_DSH" ]]; then
  NODE_REAL="$(resolve_symlinks "$(command -v node)")"
  NODE_PREFIX="$(dirname "$(dirname "$NODE_REAL")")"
  if [[ -f "$NODE_PREFIX/lib/node_modules/@deepseek-ai/dsh/package.json" ]]; then
    GLOBAL_DSH="$NODE_PREFIX/lib/node_modules/@deepseek-ai/dsh/package.json"
    DSH_SOURCE="the node on PATH ($NODE_REAL)"
  fi
fi
if [[ -z "$GLOBAL_DSH" ]]; then
  NPM_GLOBAL_ROOT="$(npm root -g 2>/dev/null || true)"
  if [[ -n "$NPM_GLOBAL_ROOT" && -f "$NPM_GLOBAL_ROOT/@deepseek-ai/dsh/package.json" ]]; then
    GLOBAL_DSH="$NPM_GLOBAL_ROOT/@deepseek-ai/dsh/package.json"
    DSH_SOURCE="npm root -g ($NPM_GLOBAL_ROOT)"
  fi
fi
if [[ -z "$GLOBAL_DSH" ]]; then
  NVM_NODE_ROOT="${NVM_DIR:-$HOME/.nvm}/versions/node"
  NVM_BASES="$(ls -d "$NVM_NODE_ROOT"/*/lib/node_modules 2>/dev/null | sort -Vr 2>/dev/null || true)"
  [[ -n "$NVM_BASES" ]] || NVM_BASES="$(ls -d "$NVM_NODE_ROOT"/*/lib/node_modules 2>/dev/null | sort -r || true)"
  while IFS= read -r base; do
    [[ -n "$base" ]] || continue
    if [[ -f "$base/@deepseek-ai/dsh/package.json" ]]; then
      GLOBAL_DSH="$base/@deepseek-ai/dsh/package.json"
      DSH_SOURCE="newest nvm node first ($base)"
      break
    fi
  done <<< "$NVM_BASES"
fi
if [[ -z "$GLOBAL_DSH" && -f /usr/local/lib/node_modules/@deepseek-ai/dsh/package.json ]]; then
  GLOBAL_DSH=/usr/local/lib/node_modules/@deepseek-ai/dsh/package.json
  DSH_SOURCE="/usr/local/lib/node_modules"
fi
if [[ -z "$GLOBAL_DSH" || ! -f "$GLOBAL_DSH" ]]; then
  echo "error: global @deepseek-ai/dsh package not found" >&2
  echo "  install it first:  npm install -g @deepseek-ai/dsh" >&2
  echo "  looked for the dsh on PATH, next to the node on PATH, 'npm root -g'," >&2
  echo "  ${NVM_DIR:-$HOME/.nvm}/versions/node/*/lib/node_modules and /usr/local/lib/node_modules" >&2
  exit 1
fi
DSH_GLOBAL="$(dirname "$GLOBAL_DSH")"
# The session-title packages live inside the dsh package's own node_modules.
DSH_DEPS="$DSH_GLOBAL/node_modules/@deepseek-ai"
DSH_VERSION="$(node -e 'try{process.stdout.write(JSON.parse(require("node:fs").readFileSync(process.argv[1],"utf8")).version||"")}catch{}' "$GLOBAL_DSH")"
echo "  ok: $DSH_GLOBAL  (@deepseek-ai/dsh ${DSH_VERSION:-unknown}, via $DSH_SOURCE)"
DSH_PATH_VERSION="$(dsh --version 2>/dev/null || true)"
if [[ -n "$DSH_PATH_VERSION" && -n "$DSH_VERSION" && "$DSH_PATH_VERSION" != "$DSH_VERSION" ]]; then
  echo "  warn: 'dsh --version' reports $DSH_PATH_VERSION but the resolved runtime package is $DSH_VERSION;" >&2
  echo "        the version gate below is evaluated against $DSH_VERSION" >&2
fi

# ---- 3. Version gate: the runtime must satisfy the plugin's dsh peers ------
# dsh skips a profile bundle whose `@deepseek-ai/dsh*` peerDependencies do not
# match the running runtime, so this must fail here rather than at boot. The peer
# range is read from package.json (single source of truth) and evaluated with the
# same function the loader uses, including the profile's own exact-version
# exemptions; a semver fallback covers layouts where dsh-app-boot is not
# importable. The last stdout line is a machine marker (GATE_STATE=…) that the
# caller strips before printing.
echo "[3/7] checking the dsh version gate (peerDependencies)..."
gate_rc=0
gate_out="$(node --input-type=commonjs - "$GLOBAL_DSH" "$PLUGIN_DIR/package.json" "$PROFILE" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const [dshManifestPath, pluginManifestPath, profileDir] = process.argv.slice(2);
const dshRoot = path.dirname(dshManifestPath);
const appBootDir = path.join(dshRoot, "node_modules", "@deepseek-ai", "dsh-app-boot");
const appBootManifest = path.join(appBootDir, "package.json");
const compatibilityPath = path.join(profileDir, "compatibility.json");
let runtimeVersion;

const die = (lines) => {
  process.stderr.write(lines.join("\n") + "\n");
  process.exit(1);
};
// A damaged runtime or manifest must end in an actionable error, never a bare
// Node stack: the user cannot act on "Invalid dsh runtime version".
const corrupt = (detail) => [
  `error: cannot evaluate the dsh version gate (${detail})`,
  `  dsh root : ${dshRoot}`,
  `  plugin   : ${pluginManifestPath}`,
  ...(runtimeVersion === undefined ? [] : [`  runtime  : @deepseek-ai/dsh ${runtimeVersion}`]),
  "  the gate needs a valid semantic dsh version and a well-formed manifest;",
  "  dsh would refuse to evaluate or load in this state.",
  "  fix: reinstall the global dsh (npm install -g @deepseek-ai/dsh@latest), then retry;",
  `       if the manifest is at fault, repair ${pluginManifestPath}`,
];
// semver ships inside the dsh package; load it once here so the exemption validator
// below uses the same rule as dsh. A missing module is not fatal at this point: only
// the fallback branch needs it, and that branch reports the missing module instead of
// guessing (the real gate branch never touches this value).
let semver = null;
try {
  semver = require(path.join(dshRoot, "node_modules", "semver"));
} catch {
  semver = null;
}
// Mirrors dsh-app-boot's isExactPluginVersion (lib/index.js:339-342): a canonical exact
// SemVer, build metadata allowed — no ranges, prefixes, whitespace, or malformed versions.
const isExactVersion = (value) => {
  if (semver === null || typeof value !== "string") return false;
  const parsed = semver.parse(value);
  return parsed !== null && value === `${parsed.version}${parsed.build.length === 0 ? "" : `+${parsed.build.join(".")}`}`;
};
// Mirrors dsh-app-boot's readProfileCompatibility: a missing file means "no
// exemptions", and a damaged file degrades the same way instead of throwing. An
// exemption record whose version list is not a list of exact versions is dropped whole
// (dsh-app-boot's isVersionList, lib/index.js:332-334), never thrown.
const readExemptionsFromJson = () => {
  if (!fs.existsSync(compatibilityPath)) return {};
  const value = JSON.parse(fs.readFileSync(compatibilityPath, "utf8"));
  if (value === null || typeof value !== "object" || Array.isArray(value)) return {};
  const exemptions = {};
  for (const [key, versions] of Object.entries(value)) {
    if (Array.isArray(versions) && versions.every(isExactVersion)) exemptions[key] = versions;
  }
  return exemptions;
};

(async () => {
  let plugin;
  try {
    plugin = JSON.parse(fs.readFileSync(pluginManifestPath, "utf8"));
  } catch (error) {
    die([`error: cannot read the plugin manifest ${pluginManifestPath}: ${error.message}`]);
  }
  if (plugin.peerDependencies !== undefined && (plugin.peerDependencies === null || typeof plugin.peerDependencies !== "object" || Array.isArray(plugin.peerDependencies))) {
    die([`error: ${pluginManifestPath} peerDependencies must be an object`]);
  }
  const peers = plugin.peerDependencies ?? {};
  const dshPeers = Object.entries(peers).filter(
    ([name]) => name === "@deepseek-ai/dsh" || name.startsWith("@deepseek-ai/dsh-"),
  );

  if (dshPeers.length === 0) {
    process.stdout.write("GATE_STATE=none\n");
    process.stdout.write("  note: no @deepseek-ai/dsh* peerDependencies declared — dsh applies no version gate\n");
    return;
  }

  // The gate compares against dsh-app-boot's own version (its getDshRuntimeVersion
  // reads app-boot's package.json); fall back to the dsh package version.
  try {
    runtimeVersion = fs.existsSync(appBootManifest)
      ? JSON.parse(fs.readFileSync(appBootManifest, "utf8")).version
      : JSON.parse(fs.readFileSync(dshManifestPath, "utf8")).version;
  } catch (error) {
    die(corrupt(`cannot read the installed dsh version: ${error.message}`));
  }

  let evaluate = null;
  let evaluator = "";
  let exemptions = {};
  const readExemptions = (warningSink) => {
    try {
      return readExemptionsFromJson();
    } catch (error) {
      warningSink(`  warn: ${compatibilityPath} could not be read (${error.message}) — treating the profile as having no exemptions\n`);
      return {};
    }
  };

  // Preferred: the real gate, with the profile's exemptions exactly as the loader
  // passes them (dsh-app-boot's readProfileVersionExemptions never throws).
  try {
    const url = require("node:url").pathToFileURL(path.join(appBootDir, "lib", "index.js")).href;
    const boot = await import(url);
    if (typeof boot.evaluatePluginCompatibility === "function") {
      evaluator = "dsh gate: dsh-app-boot evaluatePluginCompatibility";
      try {
        exemptions = (typeof boot.readProfileVersionExemptions === "function" ? boot.readProfileVersionExemptions(profileDir) : {}) ?? {};
      } catch (error) {
        process.stdout.write(`  warn: ${compatibilityPath} could not be read (${error.message}) — treating the profile as having no exemptions\n`);
        exemptions = {};
      }
      evaluate = (manifest) => boot.evaluatePluginCompatibility(manifest, exemptions, runtimeVersion);
    }
  } catch {
    evaluate = null;
  }

  if (evaluate === null) {
    // Fallback: re-implement the gate's rules (dsh-app-boot/lib/index.js:286-312)
    // closely — same runtime-version validation, same name filter, same
    // workspace-means-current-runtime rule, same semver options, same exemption
    // lookup. Known remaining differences are documented in the delivery notes.
    evaluator = "semver fallback (dsh-app-boot not importable)";
    let reason = "";
    if (semver === null) reason = ": the dsh package's semver module could not be loaded";
    if (semver !== null) {
      if (semver.valid(runtimeVersion) === null) {
        die(corrupt(`invalid dsh runtime version ${JSON.stringify(runtimeVersion)}; expected a semantic version`));
      }
      exemptions = readExemptions((line) => process.stdout.write(line));
      evaluate = (manifest) => {
        const bad = {};
        for (const [name, range] of Object.entries(manifest.peerDependencies ?? {})) {
          if (name !== "@deepseek-ai/dsh" && !name.startsWith("@deepseek-ai/dsh-")) continue;
          if (typeof range !== "string") throw new Error(`Plugin manifest peerDependencies[${JSON.stringify(name)}] must be a string`);
          const requirement = ["workspace:^", "workspace:~", "workspace:*"].includes(range) ? runtimeVersion : range;
          if (requirement.trim() === "" || !semver.satisfies(runtimeVersion, requirement, { includePrerelease: true })) bad[name] = range;
        }
        if (Object.keys(bad).length === 0) return undefined;
        const key = `${manifest.name}@${manifest.version}`;
        return {
          name: manifest.name,
          version: manifest.version,
          runtimeVersion,
          peers: bad,
          exempted: (exemptions[key] ?? []).includes(runtimeVersion) === true,
        };
      };
    }
  }

  if (evaluate === null) {
    process.stdout.write("GATE_STATE=unevaluable\n");
    process.stdout.write(`  warn: could not evaluate the version gate for dsh ${runtimeVersion} (unexpected layout under ${dshRoot}) — continuing without the check\n`);
    return;
  }

  let issue;
  try {
    issue = evaluate(plugin);
  } catch (error) {
    die(corrupt(`the gate rejected the runtime version or the manifest: ${error.message}`));
  }

  const declared = dshPeers.map(([name, range]) => `${name} ${range}`).join(", ");
  if (issue === undefined) {
    process.stdout.write("GATE_STATE=ok\n");
    process.stdout.write(`  ok: dsh ${runtimeVersion} satisfies ${declared}  [${evaluator}]\n`);
    return;
  }
  if (issue.exempted === true) {
    process.stdout.write("GATE_STATE=exempted\n");
    process.stdout.write(`  ok (exempted): dsh ${runtimeVersion} does not satisfy ${declared}, but an exact-version\n`);
    process.stdout.write(`      exemption for ${issue.name}@${issue.version} on ${runtimeVersion} is active in ${compatibilityPath}.\n`);
    process.stdout.write("      dsh's own gate accepts it (exempted === true), so the bundle will be mounted.\n");
    return;
  }

  const required = Object.entries(issue.peers).map(([name, range]) => `${name} ${range}`).join(", ");
  const identity = `${issue.name ?? plugin.name ?? "dsh-enhance-tool"}@${issue.version ?? plugin.version ?? "unknown"}`;
  process.stderr.write([
    "",
    "error: this dsh runtime does not satisfy this plugin's peerDependencies",
    `  runtime : @deepseek-ai/dsh ${runtimeVersion}`,
    `  required: ${required}`,
    "  dsh skips a profile bundle whose dsh peers do not match (evaluatePluginCompatibility),",
    "  so booting would silently leave the UI without dsh-enhance-tool. Nothing was installed.",
    `  evaluated: ${evaluator}`,
    `  profile  : ${profileDir}`,
    `  exemption: none in ${compatibilityPath} covers ${identity} on ${runtimeVersion}`,
    `  本插件需要 dsh ${Object.values(issue.peers)[0]}（当前 ${runtimeVersion}）：请升级 dsh 或使用与本运行时匹配的插件版本。`,
    "  fix: npm install -g @deepseek-ai/dsh@latest",
    "       or install a dsh-enhance-tool version that matches this runtime",
    "       or accept the risk for this exact pair, then re-run this installer:",
    `         dsh plugin --profile web allow-version ${identity} --dsh-version ${runtimeVersion} --accept-risk`,
    "",
  ].join("\n") + "\n");
  process.exit(1);
})();
NODE
)" || gate_rc=$?
if [[ -n "$gate_out" ]]; then
  printf '%s\n' "$gate_out" | grep -v '^GATE_STATE=' || true
fi
GATE_STATE="$(printf '%s\n' "$gate_out" | sed -n 's/^GATE_STATE=//p' | tail -n 1)"
if [[ "$gate_rc" -ne 0 ]]; then
  exit 1
fi
case "$GATE_STATE" in
  exempted|unevaluable) WARN_COUNT=$((WARN_COUNT + 1)) ;;
esac

# ---- 4. Read-only checks (--check stops here) ------------------------------
SESSION_TITLE_WARNINGS=0
check_session_title() {
  SESSION_TITLE_WARNINGS=0
  for pkg in dsh-session-title dsh-session-title-llm; do
    if [[ -d "$DSH_DEPS/$pkg" ]]; then
      echo "  ok: $pkg present in the global dsh"
    else
      echo "  warn: $pkg not found in the global dsh — the session-title provider will be unavailable" >&2
      SESSION_TITLE_WARNINGS=$((SESSION_TITLE_WARNINGS + 1))
    fi
  done
}
check_plugin_sources() {
  local files=("$PLUGIN_DIR/lib/index.js" "$PLUGIN_DIR/lib/polish-routes.js" "$PLUGIN_DIR/lib/client.js")
  for f in "${files[@]}"; do
    if [[ ! -f "$f" ]]; then
      echo "error: missing plugin file: $f" >&2
      exit 1
    fi
    node --check "$f"
  done
  echo "  ok: all plugin sources parse (${#files[@]} files)"
}
if [[ "$MODE" == "check" ]]; then
  echo "[4/7] checking the session-title dependency..."
  check_session_title
  WARN_COUNT=$((WARN_COUNT + SESSION_TITLE_WARNINGS))
  echo "[5/7] checking plugin sources..."
  check_plugin_sources
  if [[ "$WARN_COUNT" -gt 0 ]]; then
    if [[ "$WARN_COUNT" -eq 1 ]]; then WARN_LABEL="warning"; else WARN_LABEL="warnings"; fi
    echo "[6/7] check complete: profile, global dsh, version gate, dependency and sources OK (${WARN_COUNT} ${WARN_LABEL})"
    echo "      non-fatal: see the warn lines above. The install path tolerates the same conditions, so --check"
    echo "      still exits 0; a hard prerequisite failure (missing profile, missing global dsh, failing version"
    echo "      gate without an exemption) exits 1."
  else
    echo "[6/7] check complete: profile, global dsh, version gate, dependency and sources OK"
  fi
  echo "[7/7] nothing was installed (--check)"
  exit 0
fi

# ---- 5. Install the plugin --------------------------------------------------
# Default: the official pnpm path. On a failure it is retried against the published
# github target and, if that fails too, it degrades to the copy install instead of
# exiting silently with pnpm's raw output (round-2 review F9).
enable_bundle() {
  node - "$1" "$PLUGIN_NAME" <<'NODE'
const fs = require("node:fs");
const [manifestPath, name] = process.argv.slice(2);
if (!fs.existsSync(manifestPath)) {
  process.stderr.write(`error: ${manifestPath} does not exist — this profile was never initialized.\n`);
  process.stderr.write("  start 'dsh web' once (or install the dsh CLI and run 'dsh plugin --profile web add <pkg>'),\n");
  process.stderr.write("  then re-run this installer.\n");
  process.exit(1);
}
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
} catch (error) {
  process.stderr.write(`error: cannot parse ${manifestPath}: ${error.message}\n`);
  process.exit(1);
}
if (manifest === null || typeof manifest !== "object" || Array.isArray(manifest)) {
  process.stderr.write(`error: ${manifestPath} is not a JSON object\n`);
  process.exit(1);
}
manifest.dsh = manifest.dsh ?? {};
manifest.dsh.profile = manifest.dsh.profile ?? {};
const bundles = Array.isArray(manifest.dsh.profile.bundles) ? manifest.dsh.profile.bundles.slice() : [];
if (bundles.includes(name)) {
  process.stdout.write(`  ok: ${manifestPath} already lists "${name}" in dsh.profile.bundles\n`);
  process.exit(0);
}
bundles.push(name);
manifest.dsh.profile.bundles = bundles;
const tmp = `${manifestPath}.dsh-enhance-tool.tmp`;
fs.writeFileSync(tmp, JSON.stringify(manifest, undefined, 2) + "\n", { mode: 0o600 });
fs.renameSync(tmp, manifestPath);
process.stdout.write(`  ok: enabled the bundle in ${manifestPath} (dsh.profile.bundles += "${name}")\n`);
NODE
}
copy_install() {
  # A pnpm install of this checkout leaves `node_modules/<pkg>` as a SYMLINK to the
  # directory install.sh was run from, and a half-removed install can leave a dangling
  # one. Copying into either would fail (live: `cp: are the same file`, because the copy
  # target IS the source file; dangling: `mkdir: File exists`) — i.e. the one remedy the
  # link: warning suggests would itself break. Clear the placeholder first.
  if [[ -e "$NM/$PLUGIN_NAME" || -L "$NM/$PLUGIN_NAME" ]]; then
    echo "  removing the existing $NM/$PLUGIN_NAME (pnpm link or stale directory) before copying"
    rm -rf "$NM/$PLUGIN_NAME"
  fi
  echo "  copying the plugin into $NM/$PLUGIN_NAME (self-contained — no symlink into $PLUGIN_DIR)"
  mkdir -p "$NM/$PLUGIN_NAME/lib"
  cp -f "$PLUGIN_DIR/package.json"     "$NM/$PLUGIN_NAME/package.json"
  cp -f "$PLUGIN_DIR/cordis.patch.yml" "$NM/$PLUGIN_NAME/cordis.patch.yml"
  for f in index.js client.js polish-routes.js; do
    cp -f "$PLUGIN_DIR/lib/$f" "$NM/$PLUGIN_NAME/lib/$f"
  done
  if [[ -L "$NM/$PLUGIN_NAME" ]]; then
    echo "error: $NM/$PLUGIN_NAME is still a symlink after the copy — refusing to report success" >&2
    return 1
  fi
  if ! enable_bundle "$PROFILE/package.json"; then
    rm -rf "$NM/$PLUGIN_NAME"
    echo "  removed the copied directory again — nothing was left half-installed" >&2
    return 1
  fi
}
echo "[4/7] installing the plugin..."
INSTALL_KIND=""
if [[ "$MODE" == "copy" ]]; then
  copy_install
  INSTALL_KIND="copy"
elif command -v dsh >/dev/null 2>&1; then
  set +e
  cli_out="$(dsh plugin --profile web add "$PLUGIN_DIR" 2>&1)"
  cli_rc=$?
  set -e
  printf '%s\n' "$cli_out"
  if [[ "$cli_rc" -eq 0 ]]; then
    INSTALL_KIND="pnpm"
  else
    echo "  warn: 'dsh plugin --profile web add $PLUGIN_DIR' failed (exit $cli_rc); the lines above are pnpm's own diagnostics" >&2
    echo "        common causes: no network / unreachable registry / build scripts blocked by pnpm (allowBuilds)" >&2
    echo "  retrying with the published github target..."
    set +e
    cli_out="$(dsh plugin --profile web add "github:dcrzsy/dsh-enhance-tool" 2>&1)"
    cli_rc=$?
    set -e
    printf '%s\n' "$cli_out"
    if [[ "$cli_rc" -eq 0 ]]; then
      INSTALL_KIND="pnpm-remote"
    else
      echo "  warn: the github fallback failed too (exit $cli_rc) — falling back to a self-contained copy install" >&2
    fi
  fi
else
  echo "  dsh CLI not found on PATH — using the self-contained copy install"
fi
if [[ -z "$INSTALL_KIND" ]]; then
  copy_install
  INSTALL_KIND="copy"
fi

# ---- 5b. The install must be effective before this script claims success ---
if [[ ! -f "$NM/$PLUGIN_NAME/package.json" ]]; then
  echo "error: $NM/$PLUGIN_NAME/package.json is missing — nothing was installed" >&2
  echo "  fix: bash install.sh --copy     (works without pnpm/dsh CLI)" >&2
  exit 1
fi
if ! bundles_lists_plugin "$PROFILE/package.json"; then
  echo "  warn: the profile does not list $PLUGIN_NAME in dsh.profile.bundles — enabling it now" >&2
  enable_bundle "$PROFILE/package.json"
fi
if ! bundles_lists_plugin "$PROFILE/package.json"; then
  echo "error: $PLUGIN_NAME is copied into the profile but NOT enabled: dsh only mounts the bundles" >&2
  echo "       listed in $PROFILE/package.json dsh.profile.bundles, so the plugin would not load." >&2
  echo "  fix: add \"$PLUGIN_NAME\" to that list, or run: dsh plugin --profile web add \"$PLUGIN_DIR\"" >&2
  exit 1
fi
echo "  ok: enabled — $PROFILE/package.json lists $PLUGIN_NAME in dsh.profile.bundles"
# Honest note about the pnpm link: install (round-2 review F2): a `link:` dependency
# points at this checkout, so moving/deleting it silently disables the plugin later.
if [[ "$INSTALL_KIND" == "pnpm" || "$INSTALL_KIND" == "pnpm-remote" ]]; then
  if [[ -L "$NM/$PLUGIN_NAME" ]]; then
    link_target="$(readlink "$NM/$PLUGIN_NAME")"
    case "$link_target" in
      *".pnpm"*) ;; # a link into the profile's own pnpm store: self-contained
      *)
        echo "  note: pnpm recorded this plugin as a SYMLINK to the directory you installed from:" >&2
        echo "          $NM/$PLUGIN_NAME -> $link_target" >&2
        echo "        dsh resolves the bundle through it, so moving or deleting that directory makes the" >&2
        echo "        plugin vanish — the next start then logs only 'skipping profile bundle \"$PLUGIN_NAME\"'." >&2
        echo "        Keep it in place, or re-run 'bash install.sh --copy' for a self-contained copy." >&2
        ;;
    esac
  fi
fi

# ---- 6. Link the session-title dependency -----------------------------------
echo "[5/7] linking @deepseek-ai/dsh-session-title-llm..."
mkdir -p "$NM/@deepseek-ai"
for pkg in dsh-session-title dsh-session-title-llm; do
  if [[ -d "$DSH_DEPS/$pkg" ]]; then
    ln -sfn "$DSH_DEPS/$pkg" "$NM/@deepseek-ai/$pkg"
    echo "  linked $pkg"
  else
    echo "  warn: $pkg not found in global dsh — skipping" >&2
  fi
done

# ---- 7. Syntax check --------------------------------------------------------
echo "[6/7] verifying plugin files..."
for f in "$NM/$PLUGIN_NAME/lib/index.js" "$NM/$PLUGIN_NAME/lib/polish-routes.js" "$NM/$PLUGIN_NAME/lib/client.js"; do
  node --check "$f"
done
echo "  all files parse OK"

# ---- 8. Done ---------------------------------------------------------------
echo "[7/7] done — $PLUGIN_NAME is installed ($INSTALL_KIND) and enabled in dsh.profile.bundles."
echo ""
echo "Next steps:"
echo "  1. restart dsh web gracefully (SIGINT — no hardcoded port, no SIGKILL):"
echo "       foreground: Ctrl+C in the terminal that runs 'dsh web', then run 'dsh web' again"
echo "       detached:   pgrep -af 'dsh web'   # confirm the pid first, then: kill -INT <pid>"
echo "  2. hard-refresh the browser (Ctrl+Shift+R)"
echo ""
echo "Notes:"
echo "  - Plugin patches mount automatically via its own cordis.patch.yml (bundle.patch)."
echo "  - The version gate above is the same one dsh applies while loading profile bundles,"
echo "    and it honors this profile's exact-version exemptions (compatibility.json)."
echo "  - Uninstall the correct way (this also drops the dsh.profile.bundles entry; deleting"
echo "    $NM/$PLUGIN_NAME by hand leaves that entry behind and every later start logs"
echo "    'skipping profile bundle \"$PLUGIN_NAME\"'):"
echo "      dsh plugin --profile web remove $PLUGIN_NAME"
echo "    without the dsh CLI, or after installing with --copy:"
echo "      bash install.sh --uninstall"
