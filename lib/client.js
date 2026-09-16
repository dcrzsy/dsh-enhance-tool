window.__ModuleLoader__.load({
	id: "dsh-enhance-tool",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		//#region \0dsh-css:D:\dsh-home\plugins\dsh-enhance-tool\src\client\enhancer.module.css.mjs
		const css = ":root{--enhancer-content-width:748px;--enhancer-font-size:14px;--enhancer-font-line:21px;--enhancer-sidebar-scale:1;--enhancer-chat-scale:1}div[data-phase]{--dsh-chat-content-width:var(--enhancer-content-width)!important}[data-input-scroll],[data-slot=conversation\\.session] [class$=_bubble]{font-size:var(--enhancer-font-size);line-height:var(--enhancer-font-line)}[data-slot=\"conversation.composer.bar\"] [class$=_trigger]{font-size:calc(13px * var(--enhancer-chat-scale,1));line-height:calc(20px * var(--enhancer-chat-scale,1));height:calc(28px * var(--enhancer-chat-scale,1))}[data-slot=\"conversation.composer.bar\"] [class$=_trigger] svg,[data-slot=\"conversation.composer.bar\"] [class$=_add] svg{width:calc(14px * var(--enhancer-chat-scale,1));height:calc(14px * var(--enhancer-chat-scale,1))}[data-slot=\"conversation.composer.bar\"] [class$=_primary] svg{width:calc(16px * var(--enhancer-chat-scale,1));height:calc(16px * var(--enhancer-chat-scale,1))}[role=menu] [class^=_list_]{padding:calc(4px * var(--enhancer-chat-scale,1));border-radius:calc(12px * var(--enhancer-chat-scale,1));min-width:calc(218px * var(--enhancer-chat-scale,1));max-width:calc(360px * var(--enhancer-chat-scale,1))}[role=menu] [class^=_item_]{font-size:calc(14px * var(--enhancer-chat-scale,1));line-height:calc(22px * var(--enhancer-chat-scale,1));min-height:calc(40px * var(--enhancer-chat-scale,1));padding:calc(8px * var(--enhancer-chat-scale,1)) calc(10px * var(--enhancer-chat-scale,1));border-radius:calc(10px * var(--enhancer-chat-scale,1));gap:calc(8px * var(--enhancer-chat-scale,1))}[role=menu] [class^=_itemIcon_],[role=menu] [class^=_check_]{width:calc(16px * var(--enhancer-chat-scale,1));height:calc(16px * var(--enhancer-chat-scale,1))}[role=menu] [class^=_label_]{font-size:calc(12px * var(--enhancer-chat-scale,1));line-height:calc(16px * var(--enhancer-chat-scale,1));padding:calc(8px * var(--enhancer-chat-scale,1)) calc(10px * var(--enhancer-chat-scale,1))}[data-slot=sidebar] [class$=_newSession]{font-size:calc(14px * var(--enhancer-sidebar-scale));height:calc(38px * var(--enhancer-sidebar-scale))}[data-slot=sidebar] [class*=_newSessionLabel]{max-width:calc(200px * var(--enhancer-sidebar-scale))}/* 0.1.5 renders the brand lockup as TWO svgs (mark 24x18 + wordmark 156x24) inside [class*=_brandIdentity]; forcing 182x24 on every svg squashed the wordmark, and enlarging the lockup only got clipped by the rail width, so the product keeps ownership of that lockup. The legacy single-lockup build (suffix-matched) still sizes its own svg. */[data-slot=sidebar] [class$=_brand] svg{width:calc(182px * var(--enhancer-sidebar-scale));height:calc(24px * var(--enhancer-sidebar-scale))}[data-slot=sidebar] [class$=_logoRow] [class$=_iconButton]{width:calc(28px * var(--enhancer-sidebar-scale));height:calc(28px * var(--enhancer-sidebar-scale))}[data-slot=sidebar] [class$=_logoRow] [class$=_iconButton] svg{width:calc(16px * var(--enhancer-sidebar-scale));height:calc(16px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.settings] [class$=_trigger]{font-size:calc(14px * var(--enhancer-sidebar-scale));height:calc(34px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces]{font-size:calc(14px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_title]{font-size:calc(14px * var(--enhancer-sidebar-scale));line-height:calc(20px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_time]{font-size:calc(12px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_sectionHeader]{font-size:calc(13px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_iconButton]{width:calc(28px * var(--enhancer-sidebar-scale));height:calc(28px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_iconButton] svg{width:calc(16px * var(--enhancer-sidebar-scale));height:calc(16px * var(--enhancer-sidebar-scale))}[data-slot=settings\\.section] h2[class$=_title],[data-slot=settings\\.section] h2[class$=_heading]{margin:0 0 -8px;font-size:18px;font-weight:600;line-height:26px}[data-slot=settings\\.section] p[class$=_intro]{border-bottom:1px solid var(--dsw-alias-border-l2);margin:0 0 12px;padding-bottom:12px;font-size:13px;line-height:20px}[data-slot=settings\\.section] [class$=_head]>[class$=_sub]{border-bottom:1px solid var(--dsw-alias-border-l2);padding-bottom:12px}[data-slot=settings\\.section] [class$=_titleRow]>svg{display:none}[data-slot=settings\\.section] h2.enhc-settings-title{color:var(--dsw-alias-label-primary);margin:0 0 -8px;font-size:18px;font-weight:600;line-height:26px}button[class*=_crumb]{max-width:560px}input[type=range][class*=uitw-slider]{-webkit-appearance:none;appearance:none;background:var(--dsw-alias-border-l2);cursor:pointer;border-radius:2px;outline:none;height:4px}input[type=range][class*=uitw-slider]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;background:var(--dsw-alias-bg-layer-2);border:2px solid var(--dsw-alias-brand-primary);cursor:pointer;border-radius:50%;width:14px;height:14px}input[type=range][class*=uitw-slider]::-moz-range-thumb{background:var(--dsw-alias-bg-layer-2);border:2px solid var(--dsw-alias-brand-primary);cursor:pointer;border-radius:50%;width:14px;height:14px}input[type=range][class*=uitw-slider]::-moz-range-track{background:var(--dsw-alias-border-l2);border-radius:2px;height:4px}[data-slot=\"conversation.session.header\"]>header{border-bottom:none!important;padding:12px 90px 12px 20px!important}[data-slot=\"conversation.session.header\"]>header:after{content:none}[class$=_tabs]{align-items:center;gap:8px;margin:0 0 0 8px;display:flex}[class$=_tabs] [class*=_tab]{border:1px solid var(--dsw-alias-border-l2,transparent);background:var(--dsw-alias-bg-layer-1);height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:14px;flex:none;justify-content:center;align-items:center;padding:0 14px;font-size:13px;line-height:20px;display:inline-flex}[class$=_tabs] [class*=_tab]:hover:not(:disabled):not([class*=_tabActive]){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}[class$=_tabs] [class*=_tabActive],[class$=_tabs] [class*=_tab][aria-selected=true]{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);border-color:#0000}[class$=_tabs] [class*=_tab]:after{content:none}@media (prefers-reduced-motion:reduce){.PmptLb_manageDialog,.PmptLb_panel,.PmptLb_polishPanel,.Sggst_root,[class*=_userStack] [class*=_bubble] div{animation:none!important;transition:none!important}}/* 17-userfullwidth: user message stack fills the column */[class*=_userStack]{flex-direction:column;align-items:flex-end;gap:8px;min-width:0;width:100%!important;max-width:100%!important;display:flex}/* 17-herolayout: hero composer pinned to bottom, headline on top */.wSkVaW_root[data-phase=hero] .wSkVaW_scrollBody{justify-content:flex-start;overflow-y:auto}.wSkVaW_root[data-phase=hero] .wSkVaW_composerSeat{margin-top:auto;flex:1;min-height:0}.wSkVaW_root[data-phase=hero] .wSkVaW_composerHero{height:100%;flex:none;padding-bottom:0;overflow:hidden}.wSkVaW_root[data-phase=hero] .wSkVaW_composerHero .pXSMma_root{flex:1;min-height:0}.wSkVaW_root[data-phase=hero] .wSkVaW_composerHero [data-slot=conversation\\.composer\\.bar]{margin-top:auto}/* 27-userfullrow: user bubbles size to content, cap at full column width */[class*=_userStack] [class*=_bubble]{width:fit-content;max-width:100%;box-sizing:border-box}[class*=_userStack] [class*=_userRow]{width:fit-content;max-width:100%;box-sizing:border-box}/* 28-user-collapse: long user messages collapse to 5 lines, click to expand */.enhc-collapsed{overflow:hidden}.enhc-expand-btn{background:0 0;border:none;color:var(--dsw-alias-state-business-primary);cursor:pointer;font-size:13px;line-height:18px;padding:4px 2px 0;margin:0;display:inline-block}[class*=_userStack] [class*=_bubble] div{transition:max-height .22s ease,min-height .22s ease}@keyframes enhc-fade{from{opacity:0}to{opacity:1}}@keyframes enhc-pop{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes enhc-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.PmptLb_manageDialog{animation:enhc-pop .22s cubic-bezier(.2,.8,.25,1)}.PmptLb_panel,.PmptLb_polishPanel{animation:enhc-rise .2s ease}.Sggst_root{animation:enhc-rise .25s ease}/* 29-msgmeta: keep the product's per-message actions row (clock + copy/branch/usage/duration) visible instead of hover-revealed */body.enhc-msgmeta [class*=_actions]:has(>[class*=_timeStart]),body.enhc-msgmeta [class*=_actions]:has(>[class*=_timeEnd]){opacity:1!important}/* 30-calldur: per-tool-call (and sub-call) duration chip; live while the call runs */body.enhc-calldur .enhc-call-dur{margin-left:auto;padding-left:8px;flex:none;white-space:nowrap;font-size:var(--dsh-content-font-size-secondary,13px);line-height:calc(24px + var(--dsh-content-font-delta,0px));color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary));font-variant-numeric:tabular-nums}body.enhc-calldur .enhc-call-dur[data-live]{color:var(--dsw-alias-state-business-primary);animation:enhc-call-dur-pulse 1.6s ease-in-out infinite}@keyframes enhc-call-dur-pulse{0%,to{opacity:1}50%{opacity:.55}}@media (prefers-reduced-motion:reduce){body.enhc-calldur .enhc-call-dur[data-live]{animation:none}}";
		const tagId = "dsh-enhance-tool/enhancer.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-enhance-tool";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		

//#region dsh-enhance-tool: prompt tools (slot-based, self-contained)
const PromptToolsCss = ".PmptLb_btn{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:999px;flex:none;place-items:center;display:grid}.PmptLb_btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.PmptLb_btn:disabled{opacity:.5;cursor:default}.PmptLb_panel{box-sizing:border-box;width:480px;max-height:min(600px,calc(100vh - 24px));color:var(--dsw-alias-label-primary);background:var(--dsw-specific-menu);border:1px solid var(--dsw-alias-border-l2);border-radius:14px;box-shadow:var(--ds-shadow-lv3,var(--dsw-shadow-lv3));flex-direction:column;gap:8px;padding:10px;z-index:9999;display:flex;position:fixed}.PmptLb_search{box-sizing:border-box;width:100%;height:32px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2,var(--dsw-alias-interactive-bg-hover));border:1px solid var(--dsw-alias-border-l2);border-radius:9px;outline:none;padding:0 11px;font-size:13px;line-height:20px;transition:border-color .15s ease,background-color .15s ease}.PmptLb_search:focus{border-color:var(--dsw-alias-state-business-primary)}.PmptLb_list{flex-direction:column;gap:2px;max-height:320px;display:flex;overflow-y:auto}.PmptLb_groupHead{color:var(--dsw-alias-label-tertiary);letter-spacing:.04em;font-size:12px;font-weight:600;line-height:18px;margin:8px 0 2px}.PmptLb_item{width:100%;color:var(--dsw-alias-label-primary);cursor:pointer;background:transparent;border:1px solid transparent;border-radius:9px;flex-direction:column;gap:3px;align-items:stretch;padding:7px 9px;text-align:left;display:flex;transition:background-color .15s ease,border-color .15s ease}.PmptLb_item:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l2)}.PmptLb_itemTitle{font-size:13px;font-weight:600;line-height:20px}.PmptLb_itemPreview{color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:18px;overflow:hidden}.PmptLb_empty{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;padding:8px 0}.PmptLb_manageBtn{width:100%;height:32px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:transparent;border:1px solid var(--dsw-alias-border-l2);border-radius:9px;font-size:13px;line-height:20px;transition:color .15s ease,background-color .15s ease,border-color .15s ease}.PmptLb_manageBtn:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l3)}.PmptLb_manageBody{flex-direction:column;gap:10px;display:flex}.PmptLb_row{border-bottom:1px solid var(--dsw-alias-border-l2);align-items:center;gap:8px;padding:8px 0;display:flex}.PmptLb_row:last-child{border-bottom:none}.PmptLb_rowText{flex-direction:column;min-width:0;flex:1;display:flex}.PmptLb_rowTitle{font-size:13px;font-weight:500;line-height:20px}.PmptLb_rowPreview{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.PmptLb_rowAction{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:8px;flex:none;place-items:center;display:grid}.PmptLb_rowAction:hover{background:var(--dsw-alias-interactive-bg-hover)}.PmptLb_form{flex-direction:column;gap:10px;display:flex}.PmptLb_input{box-sizing:border-box;width:100%;height:34px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;outline:none;padding:0 10px;font-size:13px;line-height:20px}.PmptLb_input:focus{border-color:var(--dsw-alias-state-business-primary)}.PmptLb_textarea{box-sizing:border-box;width:100%;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;outline:none;padding:8px 10px;font-size:13px;line-height:20px;font-family:inherit;resize:vertical}.PmptLb_textarea:focus{border-color:var(--dsw-alias-state-business-primary)}.PmptLb_overlay{position:fixed;inset:0;z-index:9998;background:transparent}.PmptLb_manageOverlay{position:fixed;inset:0;z-index:10000;background:transparent;display:flex;align-items:center;justify-content:center}.PmptLb_manageDialog{width:720px;max-width:90vw;max-height:80vh;background:var(--dsw-specific-menu);border:1px solid var(--dsw-alias-border-l2);border-radius:16px;box-shadow:var(--ds-shadow-lv3,var(--dsw-shadow-lv3));display:flex;flex-direction:column;overflow:hidden}.PmptLb_manageHeader{display:flex;align-items:center;justify-content:space-between;padding:16px 20px 12px;border-bottom:1px solid var(--dsw-alias-border-l2);font-size:15px;font-weight:600;color:var(--dsw-alias-label-primary)}.PmptLb_manageClose{width:28px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:8px;display:grid;place-items:center}.PmptLb_manageClose:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.PmptLb_manageCols{display:flex;flex:1;min-height:0;overflow:hidden}.PmptLb_manageLeft{width:280px;flex:none;display:flex;flex-direction:column;gap:6px;padding:12px 14px;border-right:1px solid var(--dsw-alias-border-l2);overflow-y:auto}.PmptLb_manageRight{flex:1;display:flex;flex-direction:column;gap:10px;padding:16px 20px;overflow-y:auto}.PmptLb_manageSearch{width:100%;box-sizing:border-box;padding:7px 12px;border-radius:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-interactive-bg);color:var(--dsw-alias-label-primary);font-size:13px;line-height:20px;outline:none}.PmptLb_manageSearch:focus{border-color:var(--dsw-alias-state-business-primary)}.PmptLb_manageList{display:flex;flex-direction:column;gap:2px;flex:1;overflow-y:auto}.PmptLb_manageRow{border:1px solid transparent;border-radius:10px;padding:8px 10px;display:flex;align-items:center;gap:8px;cursor:pointer;transition:background .15s,border-color .15s}.PmptLb_manageRow:hover{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-border-l2)}.PmptLb_manageRowActive{background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-state-business-primary)!important}.PmptLb_formHeader{font-size:14px;font-weight:600;line-height:22px;color:var(--dsw-alias-label-primary)}.PmptLb_formActions{display:flex;gap:8px;justify-content:flex-end;margin-top:4px}.PmptLb_rowGroup{font-size:11px;font-weight:400;color:var(--dsw-alias-label-tertiary);margin-left:8px;padding:1px 6px;background:var(--dsw-alias-interactive-bg-hover);border-radius:4px}.PmptLb_rowActionDanger:hover{color:var(--dsw-alias-state-danger,#e53935)}.PmptLb_emptyManage{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;padding:24px 0;text-align:center}.PmptLb_polishPanel{box-sizing:border-box;width:260px;color:var(--dsw-alias-label-primary);background:var(--dsw-specific-menu);border:1px solid var(--dsw-alias-border-l2);border-radius:14px;box-shadow:var(--ds-shadow-lv3,var(--dsw-shadow-lv3));flex-direction:column;gap:8px;padding:12px;z-index:9999;display:flex;position:fixed}.PmptLb_polishHint{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}.PmptLb_polishDivider{height:1px;background:var(--dsw-alias-border-l2);margin:2px 0}@keyframes PmptLb_spinAnim{to{transform:rotate(360deg)}}.PmptLb_spin{animation:PmptLb_spinAnim .8s linear infinite}.PmptLb_undoBar{display:flex;align-items:center;gap:10px;padding:8px 20px;border-top:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform)}\n.PmptLb_searchRow{display:flex;gap:6px;align-items:center}.PmptLb_searchRow .PmptLb_select{width:auto;min-width:96px;flex:none}.PmptLb_select{box-sizing:border-box;height:32px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2,var(--dsw-alias-interactive-bg-hover));border:1px solid var(--dsw-alias-border-l2);border-radius:9px;outline:none;padding:0 8px;font-size:13px;line-height:20px;cursor:pointer}.PmptLb_select:focus{border-color:var(--dsw-alias-state-business-primary)}\n.PmptLb_rowActionConfirm{width:auto!important;padding:0 10px!important;background:var(--dsw-alias-interactive-bg-hover)!important}.PmptLb_btnPrimary{height:32px;color:var(--dsw-alias-label-primary-inverted,#fff);background:var(--dsw-alias-state-business-primary);cursor:pointer;white-space:nowrap;border:none;border-radius:16px;justify-content:center;align-items:center;gap:6px;padding:0 14px;display:inline-flex;font-size:13px;line-height:20px;transition:opacity .15s}.PmptLb_btnPrimary:hover:not(:disabled){opacity:.9}.PmptLb_btnPrimary:disabled{opacity:.5;cursor:not-allowed}.PmptLb_btnSecondary{height:32px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-module-platform);cursor:pointer;white-space:nowrap;border:1px solid var(--dsw-alias-border-l2);border-radius:16px;justify-content:center;align-items:center;gap:6px;padding:0 14px;display:inline-flex;font-size:13px;line-height:20px;transition:background .15s}.PmptLb_btnSecondary:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.PmptLb_btnSecondary:disabled{opacity:.5;cursor:not-allowed}";
var PromptTools_module_css_default = {
	"btn": "PmptLb_btn",
	"btnPrimary": "PmptLb_btnPrimary",
	"btnSecondary": "PmptLb_btnSecondary",
	"panel": "PmptLb_panel",
	"search": "PmptLb_search",
	"searchRow": "PmptLb_searchRow",
	"select": "PmptLb_select",
	"list": "PmptLb_list",
	"groupHead": "PmptLb_groupHead",
	"item": "PmptLb_item",
	"itemTitle": "PmptLb_itemTitle",
	"itemPreview": "PmptLb_itemPreview",
	"empty": "PmptLb_empty",
	"manageBtn": "PmptLb_manageBtn",
	"manageBody": "PmptLb_manageBody",
	"row": "PmptLb_row",
	"rowText": "PmptLb_rowText",
	"rowTitle": "PmptLb_rowTitle",
	"rowPreview": "PmptLb_rowPreview",
	"rowAction": "PmptLb_rowAction",
	"form": "PmptLb_form",
	"input": "PmptLb_input",
	"textarea": "PmptLb_textarea",
	"overlay": "PmptLb_overlay",
	"manageOverlay": "PmptLb_manageOverlay",
	"manageDialog": "PmptLb_manageDialog",
	"manageHeader": "PmptLb_manageHeader",
	"manageClose": "PmptLb_manageClose",
	"manageCols": "PmptLb_manageCols",
	"manageLeft": "PmptLb_manageLeft",
	"manageRight": "PmptLb_manageRight",
	"manageSearch": "PmptLb_manageSearch",
	"manageList": "PmptLb_manageList",
	"manageRow": "PmptLb_manageRow",
	"manageRowActive": "PmptLb_manageRowActive",
	"formHeader": "PmptLb_formHeader",
	"formActions": "PmptLb_formActions",
	"rowGroup": "PmptLb_rowGroup",
	"rowActionDanger": "PmptLb_rowActionDanger",
	"rowActionConfirm": "PmptLb_rowActionConfirm",
	"emptyManage": "PmptLb_emptyManage",
	"undoBar": "PmptLb_undoBar",
	"polishPanel": "PmptLb_polishPanel",
	"polishHint": "PmptLb_polishHint",
	"polishDivider": "PmptLb_polishDivider"
};
/** Localized string helper: English UI when the browser locale is English, Chinese otherwise. */
function ptL(zh, en) {
	return typeof navigator !== "undefined" && String(navigator.language || "").toLowerCase().startsWith("en") ? en : zh;
}
const PTT = {
	title: ptL("提示词库", "Prompt Library"),
	search: ptL("搜索提示词…", "Search prompts…"),
	empty: ptL("暂无提示词", "No prompts"),
	manage: ptL("管理", "Manage"),
	manageTitle: ptL("提示词管理", "Manage Prompts"),
	del: ptL("删除", "Delete"),
	editing: ptL("编辑提示词", "Edit Prompt"),
	addNew: ptL("新增提示词", "New Prompt"),
	titlePh: ptL("标题", "Title"),
	groupPh: ptL("分组（可选）", "Group (optional)"),
	textPh: ptL("提示词内容", "Prompt text"),
	cancel: ptL("取消", "Cancel"),
	save: ptL("保存", "Save"),
	add: ptL("添加", "Add"),
	close: ptL("关闭", "Close"),
	polishTitle: ptL("润色", "Polish"),
	polishHint: ptL("将润色输入框中的内容", "Polish the text in the input box"),
	runDefault: ptL("默认润色", "Polish"),
	customPh: ptL("输入润色要求，如：精简 / 专业 / 口语化", "e.g. concise, professional, casual"),
	runCustom: ptL("按要求润色", "Polish as requested"),
	running: ptL("润色中…", "Polishing…"),
	runManage: ptL("润色提示词", "Polish prompt"),
	delConfirm: ptL("确认删除", "Confirm"),
	saveFail: ptL("保存失败，请重试", "Save failed, try again"),
	saved: ptL("已保存", "Saved"),
	allGroups: ptL("全部分组", "All groups")
};
/** React element shims (the bundle uses react_jsx_runtime; slots context has plain react). */
function jsx(type, props, key) {
	return react.createElement(type, key === void 0 ? props : Object.assign({}, props, { key }));
}
const jsxs = jsx;
const Fragment = react.Fragment;
/** Locate the composer textarea via the stable data-slot, with legacy class fallback. */
function composerTextarea() {
	return document.querySelector('[data-slot="conversation.composer.bar"] textarea') || document.querySelector("textarea.uV2eYG_input");
}
/**
* Current composer draft. Newer builds bind the composer to a Lexical
* `contenteditable` (no textarea exists), so the caller passes the live value
* read from the slot's `useInput` hook; the DOM path only serves older builds.
* @param liveDraft - draft string from the input state, or null when unavailable.
* @returns the draft text (never null).
*/
function composerDraft(liveDraft) {
	if (typeof liveDraft === "string") return liveDraft;
	const el = composerTextarea();
	return el === null ? "" : el.value;
}
/**
* Replace the composer draft: the product's `inputActions.setDraft` is the only
* write path that reaches the Lexical editor's own state.
* @param inputActions - slot input actions, when the slot provides them.
* @param text - replacement draft.
* @returns whether a write path existed.
*/
function setComposerDraft(inputActions, text) {
	if (inputActions !== void 0 && typeof inputActions.setDraft === "function") {
		inputActions.setDraft(text);
		return true;
	}
	const el = composerTextarea();
	if (el === null) return false;
	el.value = text;
	el.dispatchEvent(new Event("input", { bubbles: true }));
	return true;
}
/** Focus the composer, whichever editor element the build renders. */
function focusComposer() {
	const el = composerTextarea() ?? document.querySelector("[data-composer-input]");
	if (el !== null && typeof el.focus === "function") el.focus();
}
function promptToolsCss() {
	if (typeof document !== "undefined" && !document.getElementById("prompt-tools-css")) {
		const el = document.createElement("style");
		el.id = "prompt-tools-css";
		el.textContent = PromptToolsCss;
		document.head.appendChild(el);
	}
}
async function fetchPrompts() {
	try {
		const response = await fetch("/prompt-library");
		const payload = await response.json();
		return payload.ok && Array.isArray(payload.items) ? payload.items : [];
	} catch {
		return [];
	}
}
async function savePrompts(items) {
	try {
		const response = await fetch("/prompt-library", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ items })
		});
		return response.ok;
	} catch {
		return false;
	}
}
function PromptLibraryButton({ inputActions, session, sessionId, useInput }) {
	promptToolsCss();
	// Hooks run unconditionally; the guard only keeps this working on builds whose
	// slots predate the input-state hook.
	const liveDraft = typeof useInput === "function" ? useInput((inputState) => inputState?.draft ?? "") : null;
	const [open, setOpen] = (0, react.useState)(false);
	const [manageOpen, setManageOpen] = (0, react.useState)(false);
	const manageOpenRef = (0, react.useRef)(false);
	manageOpenRef.current = manageOpen;
	const [query, setQuery] = (0, react.useState)("");
	const [groupFilter, setGroupFilter] = (0, react.useState)("");
	const [items, setItems] = (0, react.useState)(null);
	const [draftTitle, setDraftTitle] = (0, react.useState)("");
	const [draftGroup, setDraftGroup] = (0, react.useState)("");
	const [draftText, setDraftText] = (0, react.useState)("");
	const [editId, setEditId] = (0, react.useState)(null);
	const [manageFilter, setManageFilter] = (0, react.useState)("");
	const [manageGroupFilter, setManageGroupFilter] = (0, react.useState)("");
	const [polishing, setPolishing] = (0, react.useState)(false);
	const [polishErr, setPolishErr] = (0, react.useState)("");
	const [confirmId, setConfirmId] = (0, react.useState)(null);
	const [saveErr, setSaveErr] = (0, react.useState)("");
	const [saveOk, setSaveOk] = (0, react.useState)(false);
	const [removedItem, setRemovedItem] = (0, react.useState)(null);
	const undoRef = (0, react.useRef)(null);
	const saveOkTimerRef = (0, react.useRef)(null);
	const anchorRef = (0, react.useRef)(null);
	const listRef = (0, react.useRef)(null);
	const [pos, setPos] = (0, react.useState)(null);
	const load = (0, react.useCallback)(async () => {
		const list = await fetchPrompts();
		setItems(list);
	}, []);
	(0, react.useEffect)(() => {
		if (open && !manageOpen) {
			load();
			const rect = anchorRef.current?.getBoundingClientRect();
			if (rect) setPos({ left: Math.max(8, rect.left), bottom: window.innerHeight - rect.top + 8 });
		}
		return () => {
			if (!manageOpenRef.current) {
				setItems(null);
				setQuery("");
			}
		};
	}, [open, manageOpen, load]);
	const scoped = items === null ? [] : items;
	const allGroups = [...new Set(scoped.map((i) => i.group || ""))].filter((g) => g !== "");
	const filtered = scoped.filter((item) => {
		if (groupFilter !== "" && (item.group || "") !== groupFilter) return false;
		const qq = query.trim().toLowerCase();
		if (qq === "") return true;
		return (item.title ?? "").toLowerCase().includes(qq) || (item.text ?? "").toLowerCase().includes(qq);
	});
	const groups = {};
	for (const item of filtered) {
		const g = item.group || "";
		if (!groups[g]) groups[g] = [];
		groups[g].push(item);
	}
	const insert = (text) => {
		const current = composerDraft(liveDraft);
		const sep = current === "" || current.endsWith("\n") ? "" : "\n";
		setComposerDraft(inputActions, current + sep + text);
		setOpen(false);
		window.setTimeout(focusComposer, 60);
	};
	const removeItem = async (id) => {
		if (items === null) return;
		const target = items.find((it) => it.id === id);
		const next = items.filter((item) => item.id !== id);
		setItems(next);
		if (editId === id) cancelEdit();
		const ok = await savePrompts(next);
		setConfirmId(null);
		if (!ok) { setItems(items); setSaveErr(PTT.saveFail); return; }
		setSaveErr("");
		if (target) {
			setRemovedItem(target);
			if (undoRef.current) window.clearTimeout(undoRef.current);
			undoRef.current = window.setTimeout(() => setRemovedItem(null), 8000);
		}
	};
	const undoRemove = async () => {
		if (removedItem === null || items === null) return;
		const next = [...items, removedItem];
		setItems(next);
		setRemovedItem(null);
		if (undoRef.current) { window.clearTimeout(undoRef.current); undoRef.current = null; }
		const ok = await savePrompts(next);
		if (!ok) { setItems(items); setSaveErr(PTT.saveFail); }
	};
	const closeManage = () => { setManageOpen(false); cancelEdit(); setManageFilter(""); setManageGroupFilter(""); setConfirmId(null); setSaveErr(""); setSaveOk(false); if (saveOkTimerRef.current) { window.clearTimeout(saveOkTimerRef.current); saveOkTimerRef.current = null; } setRemovedItem(null); if (undoRef.current) { window.clearTimeout(undoRef.current); undoRef.current = null; } };
	const addItem = async () => {
		if (draftTitle.trim() === "" || draftText.trim() === "") return;
		const current = items ?? [];
		const isEdit = !!editId;
		let next;
		if (isEdit) {
			next = current.map((it) => it.id === editId ? { ...it, title: draftTitle.trim(), text: draftText, group: draftGroup.trim() } : it);
		} else {
			next = [...current, { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), title: draftTitle.trim(), text: draftText, group: draftGroup.trim() }];
		}
		setItems(next);
		const ok = await savePrompts(next);
		if (!ok) { setItems(current); setSaveErr(PTT.saveFail); return; }
		setSaveErr("");
		setSaveOk(true);
		if (saveOkTimerRef.current) window.clearTimeout(saveOkTimerRef.current);
		saveOkTimerRef.current = window.setTimeout(() => setSaveOk(false), 2000);
		if (!isEdit) {
			setDraftTitle(""); setDraftGroup(""); setDraftText(""); setEditId(null);
			requestAnimationFrame(() => { const el = listRef.current; if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" }); });
		}
	};
	const startEdit = (item) => { setEditId(item.id); setDraftTitle(item.title || ""); setDraftGroup(item.group || ""); setDraftText(item.text || ""); };
	const cancelEdit = () => { setEditId(null); setDraftTitle(""); setDraftGroup(""); setDraftText(""); };
	const polishDraft = async () => {
		if (draftText.trim() === "" || polishing) return;
		setPolishing(true);
		setPolishErr("");
		try {
			const resp = await fetch("/polish", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: draftText, requirement: "", sessionId: sessionId ?? session?.sessionId }) });
			const data = await resp.json();
			if (data.ok && typeof data.text === "string") {
				setDraftText(data.text);
			} else {
				setPolishErr(String(data.error ?? "润色失败"));
			}
		} catch (e) {
			setPolishErr(e instanceof Error ? e.message : String(e));
		} finally { setPolishing(false); }
	};
	return jsxs(Fragment, {
		children: [
			jsx("button", {
				ref: anchorRef,
				type: "button",
				className: PromptTools_module_css_default.btn,
				"aria-label": PTT.title,
				"aria-expanded": open,
				onClick: () => setOpen((v) => !v),
				children: jsx("svg", {
					viewBox: "0 0 16 16",
					width: 15,
					height: 15,
					"aria-hidden": true,
					children: jsx("path", { d: "M2 4h12v1.5H2zM2 7.25h12v1.5H2zM2 10.5h8v1.5H2z", fill: "currentColor" })
				})
			}),
			open && jsxs(Fragment, {
				children: [
					jsx("div", { className: PromptTools_module_css_default.overlay, onClick: () => setOpen(false) }),
					jsxs("div", {
						className: PromptTools_module_css_default.panel,
						style: pos ?? void 0,
						children: [
							jsxs("div", { className: PromptTools_module_css_default.searchRow, children: [
								jsx("input", {
									className: PromptTools_module_css_default.search,
									placeholder: PTT.search,
									value: query,
									onChange: (event) => setQuery(event.currentTarget.value)
								}),
								allGroups.length > 0 && jsx("select", {
									className: PromptTools_module_css_default.select,
									value: groupFilter,
									onChange: (e) => setGroupFilter(e.currentTarget.value),
									"aria-label": PTT.allGroups,
									children: [
										jsx("option", { value: "", children: PTT.allGroups }),
										allGroups.map((g) => jsx("option", { value: g, children: g }, g))
									]
								})
							]}),
							filtered.length === 0 ? jsx("div", { className: PromptTools_module_css_default.empty, children: PTT.empty }) : jsx("div", {
								className: PromptTools_module_css_default.list,
								children: Object.keys(groups).map((g) => jsxs(Fragment, {
									children: [
										g !== "" && jsx("div", { className: PromptTools_module_css_default.groupHead, children: g }),
										groups[g].map((item) => jsx("button", {
											type: "button",
											className: PromptTools_module_css_default.item,
											onClick: () => insert(item.text),
											children: [
												jsx("div", { className: PromptTools_module_css_default.itemTitle, children: item.title }),
												jsx("div", { className: PromptTools_module_css_default.itemPreview, children: item.text.replace(/\s+/g, " ").slice(0, 60) })
											]
										}, item.id))
									]
								}))
							}),
								jsx("button", {
									type: "button",
									className: PromptTools_module_css_default.manageBtn,
									onClick: () => {
										setOpen(false);
										setManageOpen(true);
										setConfirmId(null); setSaveErr("");
										load();
									},
								children: PTT.manage
							})
						]
					})
				]
			}),
			manageOpen && jsx("div", {
				className: PromptTools_module_css_default.manageOverlay,
				onClick: (e) => { if (e.target === e.currentTarget) { closeManage(); } },
				children: jsxs("div", {
					className: PromptTools_module_css_default.manageDialog,
					children: [
						jsxs("div", { className: PromptTools_module_css_default.manageHeader, children: [
							jsx("span", { children: PTT.manageTitle }),
									jsx("button", { type: "button", className: PromptTools_module_css_default.manageClose, onClick: closeManage, "aria-label": PTT.close, children: jsx("svg", { viewBox: "0 0 16 16", width: 16, height: 16, children: jsx("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }) }) })
						] }),
						jsxs("div", { className: PromptTools_module_css_default.manageCols, children: [							jsxs("div", { className: PromptTools_module_css_default.manageLeft, children: [
								jsxs("div", { className: PromptTools_module_css_default.searchRow, children: [
								jsx("input", { className: PromptTools_module_css_default.manageSearch, placeholder: PTT.search, value: manageFilter, onChange: (e) => setManageFilter(e.currentTarget.value) }),
								allGroups.length > 0 && jsx("select", { className: PromptTools_module_css_default.select, value: manageGroupFilter, onChange: (e) => setManageGroupFilter(e.currentTarget.value), "aria-label": PTT.allGroups, children: [
									jsx("option", { value: "", children: PTT.allGroups }),
									allGroups.map((g) => jsx("option", { value: g, children: g }, g))
								] })
							]}),
								((f) => f.length === 0 ? jsx("div", { className: PromptTools_module_css_default.emptyManage, children: PTT.empty }) : jsx("div", {
									ref: listRef,
									className: PromptTools_module_css_default.manageList,
									children: f.map((item) => jsxs("div", {
										className: editId === item.id ? PromptTools_module_css_default.manageRow + " " + PromptTools_module_css_default.manageRowActive : PromptTools_module_css_default.manageRow,
										onClick: () => startEdit(item),
										children: [
											jsxs("div", { className: PromptTools_module_css_default.rowText, children: [
												jsxs("div", { className: PromptTools_module_css_default.rowTitle, children: [item.title, item.group ? jsx("span", { className: PromptTools_module_css_default.rowGroup, children: item.group }) : null] }),
												jsx("div", { className: PromptTools_module_css_default.rowPreview, children: item.text.replace(/\s+/g, " ").slice(0, 60) })
											] }),
											jsx("button", { type: "button", className: PromptTools_module_css_default.rowAction + " " + PromptTools_module_css_default.rowActionDanger + (confirmId === item.id ? " " + PromptTools_module_css_default.rowActionConfirm : ""), "aria-label": PTT.del, onClick: (e) => { e.stopPropagation(); if (confirmId === item.id) { removeItem(item.id); } else { setConfirmId(item.id); window.setTimeout(() => setConfirmId((c) => c === item.id ? null : c), 2000); } }, children: confirmId === item.id ? jsx("span", { style: { fontSize: 12, color: "var(--dsw-alias-state-danger,#e53935)", whiteSpace: "nowrap" }, children: PTT.delConfirm }) : jsx("svg", { viewBox: "0 0 16 16", width: 14, height: 14, "aria-hidden": true, children: jsx("path", { d: "M5 3V2h6v1h3v1.5H2V3h3zm1 4v5h1V7H6zm3 0v5h1V7H9zM3.5 5l.5 9h8l.5-9h-9z", fill: "currentColor" }) }) })
										]
									}, item.id))
								}))((items ?? []).filter((item) => { if (manageGroupFilter !== "" && (item.group || "") !== manageGroupFilter) return false; const q = manageFilter.trim().toLowerCase(); if (!q) return true; return (item.title || "").toLowerCase().includes(q) || (item.group || "").toLowerCase().includes(q) || (item.text || "").toLowerCase().includes(q); }))
							] }),
							jsxs("div", { className: PromptTools_module_css_default.manageRight, children: [
								jsx("div", { className: PromptTools_module_css_default.formHeader, children: editId ? PTT.editing : PTT.addNew }),
								jsx("input", { className: PromptTools_module_css_default.input, placeholder: PTT.titlePh, value: draftTitle, onChange: (e) => setDraftTitle(e.currentTarget.value) }),
								jsx("input", { className: PromptTools_module_css_default.input, placeholder: PTT.groupPh, value: draftGroup, onChange: (e) => setDraftGroup(e.currentTarget.value) }),
								jsx("textarea", { className: PromptTools_module_css_default.textarea, rows: 10, placeholder: PTT.textPh, value: draftText, onChange: (e) => setDraftText(e.currentTarget.value) }),
								polishErr !== "" && jsx("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-state-error-primary)" }, children: polishErr }),
								saveErr !== "" && jsx("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-state-error-primary)" }, children: saveErr }),
								saveOk && jsx("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-state-success-primary,#2e7d32)" }, children: PTT.saved }),
								jsx("button", { type: "button", className: PromptTools_module_css_default.btnSecondary, disabled: polishing || !draftText.trim(), onClick: polishDraft, children: polishing ? PTT.running : PTT.runManage }),
								jsxs("div", { className: PromptTools_module_css_default.formActions, children: [
									editId && jsx("button", { type: "button", className: PromptTools_module_css_default.btnSecondary, onClick: cancelEdit, children: PTT.cancel }),
									jsx("button", { type: "button", className: PromptTools_module_css_default.btnPrimary, onClick: addItem, children: editId ? PTT.save : PTT.add })
								] })
							] })
						] }),
						removedItem !== null && jsx("div", { className: PromptTools_module_css_default.undoBar, children: [
							jsx("span", { style: { fontSize: 13, lineHeight: "20px", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: (removedItem.title || "") + ptL(" 已删除", " deleted") }),
							jsx("button", { type: "button", className: PromptTools_module_css_default.btnSecondary, onClick: undoRemove, children: ptL("撤销", "Undo") })
						] })
					]
				})
			})
		]
	});
}
function PolishButton({ inputActions, session, sessionId, useInput }) {
	promptToolsCss();
	const liveDraft = typeof useInput === "function" ? useInput((inputState) => inputState?.draft ?? "") : null;
	const [open, setOpen] = (0, react.useState)(false);
	const [req, setReq] = (0, react.useState)("");
	const [busy, setBusy] = (0, react.useState)(false);
	const [polishErr, setPolishErr] = (0, react.useState)("");
	const polishRef = (0, react.useRef)(null);
	const [polishPos, setPolishPos] = (0, react.useState)(null);
	(0, react.useEffect)(() => {
		if (open) {
			const rect = polishRef.current?.getBoundingClientRect();
			if (rect) setPolishPos({ left: Math.max(8, rect.left - 80), bottom: window.innerHeight - rect.top + 8 });
		}
	}, [open]);
	const run = async (customReq) => {
		const text = composerDraft(liveDraft);
		if (text.trim() === "" || busy) return;
		setBusy(true);
		setPolishErr("");
		try {
			const response = await fetch("/polish", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ text, requirement: customReq || "", sessionId: sessionId ?? session?.sessionId })
			});
			const payload = await response.json();
			if (payload.ok && typeof payload.text === "string") {
				setComposerDraft(inputActions, payload.text);
				setOpen(false);
				setReq("");
			} else {
				setPolishErr(String(payload.error ?? "润色失败"));
			}
		} catch (e) {
			setPolishErr(e instanceof Error ? e.message : String(e));
		} finally {
			setBusy(false);
		}
	};
	return jsxs(Fragment, {
		children: [
			jsx("button", {
				ref: polishRef,
				type: "button",
				className: PromptTools_module_css_default.btn,
				"aria-label": PTT.polishTitle,
				onClick: () => setOpen((v) => !v),
				children: busy
					? jsx("svg", { viewBox: "0 0 16 16", width: 15, height: 15, "aria-hidden": true, className: "PmptLb_spin", children: jsx("path", { d: "M8 1a7 7 0 1 0 7 7", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" }) })
					: jsx("svg", { viewBox: "0 0 16 16", width: 15, height: 15, "aria-hidden": true, children: jsx("path", { d: "M12.5 2.5l1 1-7 7-2.5.5.5-2.5 7-7zM3 13h10", fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinejoin: "round" }) })
			}),
			open && jsxs(Fragment, {
				children: [
					jsx("div", { className: PromptTools_module_css_default.overlay, onClick: () => setOpen(false) }),
					jsxs("div", {
						className: PromptTools_module_css_default.polishPanel,
						style: polishPos ?? void 0,
						children: [
							jsx("div", { className: PromptTools_module_css_default.polishHint, children: PTT.polishHint }),
							jsx("button", { type: "button", className: PromptTools_module_css_default.btnPrimary, disabled: busy, onClick: () => run(""), children: PTT.runDefault }),
							jsx("div", { className: PromptTools_module_css_default.polishDivider }),
							jsx("input", { className: PromptTools_module_css_default.input, placeholder: PTT.customPh, value: req, onChange: (e) => setReq(e.currentTarget.value), onKeyDown: (e) => { if (e.key === "Enter" && req.trim()) run(req.trim()); } }),
							jsx("button", { type: "button", className: PromptTools_module_css_default.btnSecondary, disabled: busy || !req.trim(), onClick: () => run(req.trim()), children: PTT.runCustom }),
							polishErr !== "" && jsx("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-state-error-primary)", wordBreak: "break-all" }, children: polishErr })
						]
					})
				]
			})
		]
	});
}
//#endregion

//#region dsh-enhance-tool: suggestion dock (conversation.input.dock)
const SuggestionDockCss = ".Sggst_root{box-sizing:border-box;flex-direction:row;flex-wrap:wrap;align-items:center;gap:7px;width:calc(100% - 32px);max-width:calc(var(--dsh-composer-card-max-width,780px));margin:0 auto;padding:3px 0 6px 1px;display:flex}.Sggst_item{box-sizing:border-box;min-height:30px;border:1px solid var(--dsw-alias-border-l2);background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:999px;padding:4px 12px;font-size:13px;line-height:20px;transition:color .15s ease,background-color .15s ease,border-color .15s ease}.Sggst_item:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover);border-color:var(--dsw-alias-state-business-primary)}.Sggst_generate{height:26px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:1px dashed var(--dsw-alias-border-l2);border-radius:999px;padding:0 12px;font-size:12px;line-height:24px}.Sggst_generate:hover{color:var(--dsw-alias-label-secondary);border-color:var(--dsw-alias-state-business-primary)}.Sggst_hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}";
var SuggestStrip_module_css_default = {
	"root": "Sggst_root",
	"item": "Sggst_item",
	"generate": "Sggst_generate",
	"hint": "Sggst_hint"
};
function suggestionDockCss() {
	if (typeof document !== "undefined" && !document.getElementById("suggestion-dock-css")) {
		const el = document.createElement("style");
		el.id = "suggestion-dock-css";
		el.textContent = SuggestionDockCss;
		document.head.appendChild(el);
	}
}
/**
 * Latest assistant reply text of the current Session, published by the Session
 * event-window feed inside apply(). The dock's `session` prop is lifecycle state
 * only — a SessionSnapshot carries no conversation nodes — so this shared feed,
 * not `session.nodes`, is what the suggestion strip reads.
 */
const suggestTextFeed = {
	sessionId: null,
	text: "",
	listeners: /* @__PURE__ */ new Set()
};
/** Publish one session's latest assistant reply text (no-op when unchanged). */
function publishSuggestText(sessionId, text) {
	if (suggestTextFeed.sessionId === sessionId && suggestTextFeed.text === text) return;
	suggestTextFeed.sessionId = sessionId;
	suggestTextFeed.text = text;
	for (const listener of suggestTextFeed.listeners) listener();
}
/** Subscribe to feed updates; returns the unsubscribe callback. */
function subscribeSuggestText(listener) {
	suggestTextFeed.listeners.add(listener);
	return () => {
		suggestTextFeed.listeners.delete(listener);
	};
}
/**
 * Predicted-reply strip mounted in `conversation.input.dock` (the official
 * strip immediately above the composer). After each completed assistant turn
 * it asks the /suggest route for 3 candidate next user messages; clicking one
 * fills the draft via inputActions.setDraft, then submits it directly by
 * default (suggestSend setting in 设置→通用→界面定制; off = fill draft only).
 */
function SuggestionDock(props) {
	suggestionDockCss();
	const session = props.session;
	const inputActions = props.inputActions;
	const [suggestions, setSuggestions] = (0, react.useState)(null);
	const [busy, setBusy] = (0, react.useState)(false);
	const [sent, setSent] = (0, react.useState)(false);
	// Re-render when the shared assistant-text feed publishes a new reply.
	const [, bumpSuggestText] = (0, react.useReducer)((count) => count + 1, 0);
	(0, react.useEffect)(() => subscribeSuggestText(bumpSuggestText), []);
	// Fallback for builds whose dock props do carry assembled conversation nodes.
	const nodeText = (0, react.useMemo)(() => {
		const nodes = session?.nodes ?? [];
		for (let i = nodes.length - 1; i >= 0; i--) {
			const n = nodes[i];
			if (n && n.kind === "assistant") {
				const joined = (n.blocks ?? []).filter((b) => b.kind === "text").map((b) => b.text).join("\n").trim();
				if (joined !== "") return joined;
			}
		}
		return "";
	}, [session]);
	const feedText = session?.sessionId !== void 0 && suggestTextFeed.sessionId === session.sessionId ? suggestTextFeed.text : "";
	const lastText = feedText !== "" ? feedText : nodeText;
	const running = !!session?.running;
	const generate = (0, react.useCallback)(() => {
		let cancelled = false;
		if (lastText === "") return () => {};
		setBusy(true);
		fetch("/suggest", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ text: lastText, sessionId: session?.sessionId })
		}).then((response) => response.json().catch(() => ({ ok: false }))).then((payload) => {
			if (!cancelled && payload.ok && Array.isArray(payload.suggestions)) setSuggestions(payload.suggestions.slice(0, 3));
		}).catch(() => {}).finally(() => {
			if (!cancelled) setBusy(false);
		});
		return () => {
			cancelled = true;
		};
	}, [lastText]);
	(0, react.useEffect)(() => {
		if (lastText === "" || running) return;
		setSent(false);
		setSuggestions(null);
		return generate();
	}, [lastText, running, generate]);
	if (running || lastText === "") return null;
	if (sent) return null;
	const useDraft = (item) => {
		setSent(true);
		inputActions?.setDraft(item);
		// Direct-send mode (default on). Setting 预测回复点击直接发送 off keeps the
		// previous fill-draft-only behaviour.
		try {
			const raw = localStorage.getItem("dsh-enhance-tool.state") ?? localStorage.getItem("harness-ui-enhancer.state");
			const st = raw === null ? {} : JSON.parse(raw);
			if (st.suggestSend !== false) inputActions?.submit();
		} catch {}
	};
	if (busy && suggestions === null) {
		return jsx("div", { className: SuggestStrip_module_css_default.root, children: jsx("span", { className: SuggestStrip_module_css_default.hint, children: ptL("生成建议中…", "Generating…") }) });
	}
	if (suggestions === null) {
		return jsx("div", { className: SuggestStrip_module_css_default.root, children: jsx("button", { type: "button", className: SuggestStrip_module_css_default.generate, onClick: generate, children: ptL("生成建议", "Suggest") }) });
	}
	return jsx("div", {
		className: SuggestStrip_module_css_default.root,
		children: suggestions.map((item) => jsx("button", {
			type: "button",
			className: SuggestStrip_module_css_default.item,
			onClick: () => useDraft(item),
			children: item
		}, item))
	});
}
//#endregion

//#region src/client/components.tsx
		/**
		* Harness UI Enhancer — React components.
		*
		* One surface: SettingsGeneralRow, the "界面定制" block inside Settings →
		* General. It reads and writes one shared EnhancerState through the props
		* passed by apply(). Everything is plain React.createElement — no JSX — and
		* styles are inline so the component file carries no CSS module of its own
		* (the plugin-wide rules live in enhancer.module.css).
		*/
		/** Icon path constants copied from @deepseek-ai/dsh-client-ui-primitives. */
		const CHEVRON_PATH = "M11.8486 5.5L11.4238 5.92383L8.69727 8.65137C8.44157 8.90706 8.21562 9.13382 8.01172 9.29785C7.79912 9.46883 7.55595 9.61756 7.25 9.66602C7.08435 9.69222 6.91565 9.69222 6.75 9.66602C6.44405 9.61756 6.20088 9.46883 5.98828 9.29785C5.78438 9.13382 5.55843 8.90706 5.30273 8.65137L2.57617 5.92383L2.15137 5.5L3 4.65137L3.42383 5.07617L6.15137 7.80273C6.42595 8.07732 6.59876 8.24849 6.74023 8.3623C6.87291 8.46904 6.92272 8.47813 6.9375 8.48047C6.97895 8.48703 7.02105 8.48703 7.0625 8.48047C7.07728 8.47813 7.12709 8.46904 7.25977 8.3623C7.40124 8.24849 7.57405 8.07732 7.84863 7.80273L10.5762 5.07617L11 4.65137L11.8486 5.5Z";
		const CHECK_PATH = "M15.0498 3.92579L8.49512 12.3818C8.25774 12.6881 8.04517 12.9645 7.84668 13.1689C7.63957 13.3823 7.38732 13.5841 7.04492 13.6719C6.86373 13.7183 6.6757 13.7346 6.48926 13.7197C6.13666 13.6915 5.8528 13.5355 5.6123 13.3604C5.38201 13.1926 5.12573 12.9567 4.83984 12.6953L1.03125 9.21289L1.96875 8.1875L5.77734 11.6699C6.08684 11.9529 6.27773 12.1249 6.43066 12.2363C6.50183 12.2882 6.54699 12.3135 6.57324 12.3252C6.58525 12.3305 6.59269 12.3322 6.5957 12.333C6.59802 12.3336 6.59961 12.334 6.59961 12.334C6.63317 12.3367 6.66758 12.3335 6.7002 12.3252C6.7002 12.3252 6.70211 12.3251 6.7041 12.3242C6.70698 12.3229 6.71348 12.319 6.72461 12.3115C6.74849 12.2956 6.78843 12.2642 6.84961 12.2012C6.98138 12.0654 7.13957 11.8628 7.39648 11.5313L13.9502 3.07422L15.0498 3.92579Z";
		/** Custom font selector: product selector-pill button + fixed menu.
		* Holds a local mirror of the selected id so the pill label updates
		* immediately on pick; external changes are adopted via the effect. */
		function FontSelector({ value, onChange, presets }) {
			const [local, setLocal] = react.useState(value);
			react.useEffect(() => {
				setLocal(value);
			}, [value]);
			const [open, setOpen] = react.useState(false);
			const [pos, setPos] = react.useState(null);
			const wrapRef = react.useRef(null);
			react.useEffect(() => {
				if (!open) return;
				const onDown = (e) => {
					if (wrapRef.current !== null && !wrapRef.current.contains(e.target)) setOpen(false);
				};
				const onKey = (e) => {
					if (e.key === "Escape") setOpen(false);
				};
				document.addEventListener("pointerdown", onDown);
				document.addEventListener("keydown", onKey);
				return () => {
					document.removeEventListener("pointerdown", onDown);
					document.removeEventListener("keydown", onKey);
				};
			}, [open]);
			const selected = presets.find((p) => p.id === local) ?? presets[0];
			const toggle = (e) => {
				if (!open) {
					const rect = e.currentTarget.getBoundingClientRect();
					const vw = window.innerWidth;
					const vh = window.innerHeight;
					const MARGIN = 12;
					const estHeight = 8 + presets.length * 40 + 2;
					const openDown = rect.bottom + 4 + estHeight <= vh - MARGIN;
					setPos({
						left: Math.min(Math.max(rect.right - 218, MARGIN), vw - 218 - MARGIN),
						top: openDown ? rect.bottom + 4 : rect.top - estHeight - 4,
						maxHeight: vh - 24
					});
				}
				setOpen((v) => !v);
			};
			const pillStyle = {
				display: "inline-flex",
				alignItems: "center",
				gap: 12,
				height: 36,
				padding: "0 14px",
				border: "none",
				borderRadius: 18,
				background: "var(--dsw-alias-bg-module-platform)",
				font: "inherit",
				fontSize: 14,
				lineHeight: "22px",
				color: "var(--dsw-alias-label-primary)",
				cursor: "pointer",
				whiteSpace: "nowrap",
				maxWidth: "100%"
			};
			const menuStyle = {
				position: "fixed",
				zIndex: 1100,
				boxSizing: "border-box",
				minWidth: 218,
				maxWidth: 360,
				padding: 4,
				display: "flex",
				flexDirection: "column",
				border: "1px solid var(--dsw-alias-border-inverted)",
				borderRadius: 12,
				background: "var(--dsw-specific-menu)",
				boxShadow: "var(--dsw-shadow-lv3)",
				...pos
			};
			const itemStyle = {
				display: "flex",
				alignItems: "center",
				gap: 8,
				width: "100%",
				minHeight: 40,
				padding: "8px 10px",
				border: "none",
				borderRadius: 10,
				background: "transparent",
				cursor: "pointer",
				fontSize: 14,
				lineHeight: "22px",
				color: "var(--dsw-alias-label-primary)",
				textAlign: "left"
			};
			const checkIcon = react.createElement("svg", {
				width: 16,
				height: 16,
				viewBox: "0 0 16 16",
				fill: "none",
				style: { flex: "none" }
			}, react.createElement("path", {
				d: CHECK_PATH,
				fill: "currentColor"
			}));
			return react.createElement("div", {
				ref: wrapRef,
				style: {
					position: "relative",
					display: "inline-flex",
					maxWidth: "100%"
				}
			}, [react.createElement("button", {
				type: "button",
				style: open ? {
					...pillStyle,
					background: "var(--dsw-alias-interactive-bg-hover)"
				} : pillStyle,
				"aria-haspopup": "menu",
				"aria-expanded": open,
				onClick: toggle,
				key: "trigger"
			}, [react.createElement("span", {
				key: "label",
				style: {
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap",
					minWidth: 0
				}
			}, selected.label), react.createElement("svg", {
				key: "chevron",
				width: 14,
				height: 14,
				viewBox: "0 0 14 14",
				fill: "none",
				style: {
					flex: "none",
					color: "var(--dsw-alias-label-tertiary)"
				}
			}, react.createElement("path", {
				d: CHEVRON_PATH,
				fill: "currentColor"
			}))]), open && pos !== null ? react.createElement("div", {
				key: "menu",
				role: "menu",
				style: {
					...menuStyle,
					maxHeight: pos.maxHeight,
					overflowY: "auto"
				}
			}, presets.map((p) => react.createElement("button", {
				key: p.id,
				type: "button",
				role: "menuitem",
				style: itemStyle,
				onMouseEnter: (e) => {
					e.currentTarget.style.background = "var(--dsw-alias-interactive-bg-hover)";
				},
				onMouseLeave: (e) => {
					e.currentTarget.style.background = "transparent";
				},
				onClick: () => {
					setLocal(p.id);
					setOpen(false);
					onChange(p.id);
				}
			}, [react.createElement("span", {
				key: "label",
				style: {
					flex: 1,
					minWidth: 0,
					overflow: "hidden",
					textOverflow: "ellipsis",
					whiteSpace: "nowrap"
				}
			}, p.label), p.id === local ? react.createElement("span", {
				key: "check",
				style: { flex: "none" }
			}, checkIcon) : null]))) : null]);
		}
		/** Slider row: title + description left, range + value right. */
		function SettingsRow({ title, desc, control }) {
			return react.createElement("div", { style: {
				display: "flex",
				alignItems: "center",
				gap: 8,
				padding: "16px 0",
				borderBottom: "1px solid var(--dsw-alias-border-l2)"
			} }, [react.createElement("div", {
				key: "text",
				style: {
					flex: 1,
					minWidth: 0,
					display: "flex",
					flexDirection: "column",
					gap: 4,
					paddingRight: 48
				}
			}, [react.createElement("div", {
				key: "title",
				style: {
					fontSize: 14,
					lineHeight: "22px",
					color: "var(--dsw-alias-label-primary)"
				}
			}, title), react.createElement("div", {
				key: "desc",
				style: {
					fontSize: 12,
					lineHeight: "18px",
					color: "var(--dsw-alias-label-tertiary)"
				}
			}, desc)]), react.createElement("div", {
				key: "control",
				style: {
					flex: "none",
					maxWidth: "60%",
					minWidth: 0
				}
			}, control)]);
		}
		/** Range control with product styling (class uitw-slider from enhancer.module.css).
		* Holds a local mirror of the value so the thumb tracks the pointer
		* immediately; external value changes (another surface editing the same knob)
		* are adopted via the effect. */
		function SliderControl({ min, max, step, value, onChange, unit }) {
			const [local, setLocal] = react.useState(value);
			react.useEffect(() => {
				setLocal(value);
			}, [value]);
			return react.createElement("div", { style: {
				display: "flex",
				alignItems: "center",
				gap: 10,
				flex: "none"
			} }, [react.createElement("input", {
				key: "range",
				type: "range",
				min,
				max,
				step,
				value: local,
				className: "uitw-slider",
				style: {
					width: 160,
					accentColor: "var(--dsw-alias-brand-primary)"
				},
				onChange: (e) => {
					const next = Number(e.target.value);
					setLocal(next);
					onChange(next);
				}
			}), react.createElement("span", {
				key: "value",
				style: {
					width: 48,
					fontSize: 13,
					lineHeight: "20px",
					color: "var(--dsw-alias-label-secondary)",
					textAlign: "right",
					fontVariantNumeric: "tabular-nums"
				}
			}, `${local}${unit}`)]);
		}
		function ChooseControl({ value, options, onChange }) {
			const [local, setLocal] = react.useState(value);
			react.useEffect(() => {
				setLocal(value);
			}, [value]);
			return react.createElement("div", {
				style: {
					display: "flex",
					gap: 6,
					flex: "none"
				}
			}, options.map((opt) => react.createElement("button", {
				key: opt.value,
				type: "button",
				"aria-pressed": local === opt.value,
				className: "uitw-choose",
				onClick: () => {
					setLocal(opt.value);
					onChange(opt.value);
				},
				style: {
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					minWidth: 56,
					height: 28,
					padding: "0 12px",
					borderRadius: 999,
					fontSize: 12,
					lineHeight: "18px",
					border: "1px solid " + (local === opt.value ? "var(--dsw-alias-state-business-primary)" : "var(--dsw-alias-border-l2)"),
					background: local === opt.value ? "var(--dsw-alias-state-business-primary)" : "transparent",
					color: local === opt.value ? "#fff" : "var(--dsw-alias-label-secondary)",
					cursor: "pointer",
					transition: "all .15s ease"
				}
			}, opt.label)));
		}
		/** The "界面定制" block registered in Settings → General. */
		/** The "界面定制" block registered in Settings → General. */
		function SettingsGeneralRow({ state, onApply, presets }) {
			return react.createElement("div", { style: {
				display: "flex",
				flexDirection: "column"
			} }, [
				react.createElement(SettingsRow, {
					key: "width",
					title: "对话内容宽度",
					desc: "对话内容区域宽度（百分比，100% 为默认）",
					control: react.createElement(SliderControl, {
						min: 60,
						max: 200,
						step: 5,
						value: state.widthPct,
						unit: "%",
						onChange: (v) => {
							onApply({ widthPct: v });
						}
					})
				}),
				react.createElement(SettingsRow, {
					key: "font",
					title: "对话字号",
					desc: "markdown 正文与输入框文字大小",
					control: react.createElement(SliderControl, {
						min: 12,
						max: 20,
						step: 1,
						value: state.fontSize,
						unit: "px",
						onChange: (v) => {
							onApply({ fontSize: v });
						}
					})
				}),
				react.createElement(SettingsRow, {
					key: "sidebar",
					title: "工作区字号",
					desc: "左侧工作区列表、按钮与图标的整体大小",
					control: react.createElement(SliderControl, {
						min: 12,
						max: 20,
						step: 1,
						value: state.sidebarSize,
						unit: "px",
						onChange: (v) => {
							onApply({ sidebarSize: v });
						}
					})
				}),
				react.createElement(SettingsRow, {
					key: "font-family",
					title: "UI 字体",
					desc: "界面与对话使用的字体栈",
					control: react.createElement(FontSelector, {
						value: state.fontId,
						presets,
						onChange: (v) => {
							onApply({ fontId: v });
						}
					})
				}),
				react.createElement(SettingsRow, {
					key: "suggest-send",
					title: "预测回复点击行为",
					desc: "点击预测建议选项后：直接发送，或仅填入输入框",
					control: react.createElement(ChooseControl, {
						value: state.suggestSend ? "send" : "draft",
						options: [
							{ value: "send", label: "直接发送" },
							{ value: "draft", label: "仅填入" }
						],
						onChange: (v) => {
							onApply({ suggestSend: v === "send" });
						}
					})
				}),
				react.createElement(SettingsRow, {
					key: "call-dur",
					title: "工具调用耗时",
					desc: "每条工具 / 子工具调用右侧显示耗时；进行中的调用实时计时",
					control: react.createElement(ChooseControl, {
						value: state.showCallDur ? "show" : "hide",
						options: [
							{ value: "show", label: "显示" },
							{ value: "hide", label: "隐藏" }
						],
						onChange: (v) => {
							onApply({ showCallDur: v === "show" });
						}
					})
				}),
				react.createElement(SettingsRow, {
					key: "msg-meta",
					title: "消息工具条常显",
					desc: "每条消息常显发送时间与复制 / 分叉 / 调用量 / 耗时按钮（产品默认需悬浮）",
					control: react.createElement(ChooseControl, {
						value: state.showMsgMeta ? "show" : "hide",
						options: [
							{ value: "show", label: "显示" },
							{ value: "hide", label: "隐藏" }
						],
						onChange: (v) => {
							onApply({ showMsgMeta: v === "show" });
						}
					})
				})
			]);
		}
		/** The "通用设置" page header block (title + description), registered first in General. */
		function GeneralHeader() {
			return react.createElement("div", { style: {
				display: "flex",
				flexDirection: "column",
				gap: 4,
				padding: "4px 0 12px",
				borderBottom: "1px solid var(--dsw-alias-border-l2)"
			} }, [react.createElement("div", {
				key: "title",
				style: {
					fontSize: 18,
					fontWeight: 600,
					lineHeight: "26px",
					color: "var(--dsw-alias-label-primary)"
				}
			}, "通用设置"), react.createElement("div", {
				key: "desc",
				style: {
					fontSize: 13,
					lineHeight: "20px",
					color: "var(--dsw-alias-label-tertiary)"
				}
			}, "管理语言、外观、界面与对话行为等基础偏好。")]);
		}
		//#endregion
		//#region src/client/state.ts
		/**
		* State and CSS application for Harness UI Enhancer.
		*
		* Two channels push values into the page:
		* - Static override rules in enhancer.module.css read CSS custom properties
		*   (--enhancer-*) which applyState() updates on <html>.
		* - Markdown font shorthand (font: <weight> <size>/<line> <family>) cannot be
		*   expressed through a custom property, so applyState() also rewrites one
		*   dynamic <style data-plugin="dsh-enhance-tool"> tag holding the body
		*   --dsw-font-markdown-* overrides. The tag carries the plugin id so the
		*   loader's unload sweep removes it together with the bundled stylesheet.
		*/
		/** Font presets: id → label + CSS font stack (null keeps the product default). */
		const FONT_PRESETS = [
			{
				id: "default",
				label: "系统默认（HarmonyOS Sans SC）",
				stack: null
			},
			{
				id: "harmony",
				label: "HarmonyOS Sans SC",
				stack: "'HarmonyOS Sans SC', 'HarmonyOS Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif"
			},
			{
				id: "yahei",
				label: "微软雅黑优先",
				stack: "'Microsoft YaHei', 'PingFang SC', 'Segoe UI', sans-serif"
			},
			{
				id: "noto",
				label: "Noto Sans SC",
				stack: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
			},
			{
				id: "serif",
				label: "衬线（宋体风）",
				stack: "Georgia, 'Times New Roman', 'Songti SC', 'SimSun', serif"
			},
			{
				id: "lxgw",
				label: "霞鹜文楷",
				stack: "'LXGW WenKai', '霞鹜文楷', 'KaiTi', 'STKaiti', 'Kaiti SC', serif"
			},
			{
				id: "mono",
				label: "等宽",
				stack: "'JetBrains Mono', 'SF Mono', Consolas, 'Courier New', monospace"
			}
		];
		/** Product defaults; the plugin applies these on boot and treats them as the neutral baseline. */
		const DEFAULT_STATE = {
			widthPct: 100,
			fontSize: 14,
			sidebarSize: 14,
			fontId: "default",
			suggestSend: true,
			showMsgMeta: true,
			showCallDur: true
		};
		/** localStorage key holding the persisted enhancer state. */
		const STORAGE_KEY = "dsh-enhance-tool.state";
		/**
		* Read the persisted state, falling back to defaults on any parse or shape
		* error (the key may be absent, corrupted, or from an older schema).
		* @returns the merged persisted state.
		*/
		function loadState() {
			try {
				// Migrate settings persisted under the old plugin name so renaming
				// the plugin does not reset the user's preferences.
				const LEGACY_STORAGE_KEY = "harness-ui-enhancer.state";
				let raw = localStorage.getItem(STORAGE_KEY);
				if (raw === null) {
					const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
					if (legacy !== null) {
						raw = legacy;
						localStorage.setItem(STORAGE_KEY, legacy);
						localStorage.removeItem(LEGACY_STORAGE_KEY);
					}
				}
				if (raw === null) return { ...DEFAULT_STATE };
				const parsed = JSON.parse(raw);
				const state = {
					...DEFAULT_STATE,
					...parsed
				};
				if (typeof parsed.width === "number" && Number.isFinite(parsed.width) && !Number.isFinite(parsed.widthPct)) state.widthPct = Math.round(parsed.width / 748 * 100);
				if (!Number.isFinite(state.widthPct) || state.widthPct < 60 || state.widthPct > 200) state.widthPct = DEFAULT_STATE.widthPct;
				if (!Number.isFinite(state.fontSize) || state.fontSize < 12 || state.fontSize > 24) state.fontSize = DEFAULT_STATE.fontSize;
				if (!Number.isFinite(state.sidebarSize) || state.sidebarSize < 12 || state.sidebarSize > 20) state.sidebarSize = DEFAULT_STATE.sidebarSize;
				if (typeof state.fontId !== "string" || !FONT_PRESETS.some((p) => p.id === state.fontId)) state.fontId = DEFAULT_STATE.fontId;
				if (typeof state.suggestSend !== "boolean") state.suggestSend = DEFAULT_STATE.suggestSend;
				// Renamed from showMsgTime (time-only switch) without dropping the user's choice.
				if (typeof parsed.showMsgMeta !== "boolean" && typeof parsed.showMsgTime === "boolean") state.showMsgMeta = parsed.showMsgTime;
				if (typeof state.showMsgMeta !== "boolean") state.showMsgMeta = DEFAULT_STATE.showMsgMeta;
				delete state.showMsgTime;
				if (typeof state.showCallDur !== "boolean") state.showCallDur = DEFAULT_STATE.showCallDur;
				return state;
			} catch {
				return { ...DEFAULT_STATE };
			}
		}
		/** Persist the current state to localStorage. */
		function saveState(state) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
			} catch {}
		}
		/** CSS custom properties consumed by enhancer.module.css. */
		const ROOT_PROPERTIES = [
			"--enhancer-content-width",
			"--enhancer-font-size",
			"--enhancer-font-line",
			"--enhancer-sidebar-scale",
			"--enhancer-chat-scale"
		];
		/** One <style data-plugin> tag lazily created and reused for the dynamic markdown rules. */
		let dynamicStyle = null;
		/**
		* Render the markdown font overrides for the current state.
		* @param state - current enhancer state.
		* @returns the CSS text for the dynamic style tag.
		*/
		function markdownCss(state) {
			const fam = FONT_PRESETS.find((p) => p.id === state.fontId)?.stack ?? "var(--dsw-font-family)";
			const fs = state.fontSize;
			const lh = Math.round(fs * 28 / 16);
			const fmt = (weight, size, line, family) => `${weight} ${size}px/${line}px ${family}`;
			const lines = [
				"body {",
				`  --dsw-font-markdown-base: ${fmt(400, fs, lh, fam)};`,
				`  --dsw-font-markdown-base-strong: ${fmt(600, fs, lh, fam)};`,
				`  --dsw-font-markdown-base-italic: ${fmt(400, fs, lh, fam)};`,
				`  --dsw-font-markdown-base-strong-italic: ${fmt(600, fs, lh, fam)};`,
				`  --dsw-font-markdown-h1: ${fmt(700, Math.round(fs * 1.5), Math.round(fs * 2.125), fam)};`,
				`  --dsw-font-markdown-h2: ${fmt(700, Math.round(fs * 1.375), Math.round(fs * 2), fam)};`,
				`  --dsw-font-markdown-h3: ${fmt(700, Math.round(fs * 1.25), Math.round(fs * 1.875), fam)};`,
				`  --dsw-font-markdown-h4: ${fmt(600, fs, Math.round(fs * 1.75), fam)};`,
				`  --dsw-font-markdown-code: ${fmt(400, Math.round(fs * .875), Math.round(fs * 1.375), fam)};`,
				`  --dsw-font-markdown-code-block: ${fmt(400, Math.round(fs * .8125), Math.round(fs * 1.375), fam)};`,
				`  --dsw-font-markdown-small: ${fmt(400, Math.round(fs * .875), Math.round(fs * 1.5), fam)};`,
				`  --dsw-font-markdown-table: ${fmt(400, Math.round(fs * .9375), Math.round(fs * 1.5625), fam)};`
			];
			const stack = FONT_PRESETS.find((p) => p.id === state.fontId)?.stack;
			if (stack !== void 0 && stack !== null) lines.push(`  --dsw-font-family: ${stack};`);
			lines.push("}");
			return lines.join("\n");
		}
		/**
		* Push the current state into the page: root custom properties plus the
		* dynamic markdown style tag, and persist to localStorage. Idempotent; safe
		* to call on every slider move.
		* @param state - current enhancer state.
		*/
		function applyState(state) {
			saveState(state);
			// 29-msgtime: body-scoped switch consumed by the injected stylesheet.
			document.body.classList.toggle("enhc-msgmeta", state.showMsgMeta !== false);
			document.body.classList.toggle("enhc-calldur", state.showCallDur !== false);
			const root = document.documentElement;
			const sbEl = document.querySelector("[data-slot=sidebar]");
			const sbW = sbEl ? Math.round(sbEl.getBoundingClientRect().width) : 280;
			const maxUsable = Math.max(480, window.innerWidth - sbW - 56);
			const pct = state.widthPct;
			const widthPx = Math.min(Math.round(pct <= 100 ? Math.max(480, 748 * pct / 100) : 748 + (maxUsable - 748) * (pct - 100) / 100), maxUsable);
			root.style.setProperty("--enhancer-content-width", `${widthPx}px`);
			root.style.setProperty("--dsh-user-chat-width", `${widthPx}px`);
			root.style.setProperty("--enhancer-font-size", `${state.fontSize}px`);
			root.style.setProperty("--enhancer-font-line", `${Math.round(state.fontSize * 1.5)}px`);
			root.style.setProperty("--enhancer-sidebar-scale", String(state.sidebarSize / 14));
			root.style.setProperty("--enhancer-chat-scale", String(state.fontSize / 14));
			if (dynamicStyle === null) {
				dynamicStyle = document.createElement("style");
				dynamicStyle.dataset.plugin = "dsh-enhance-tool";
				dynamicStyle.dataset.enhancerDynamic = "markdown";
				document.head.appendChild(dynamicStyle);
			}
			dynamicStyle.textContent = markdownCss(state);
		}
		/**
		* Dispose the dynamic style tag. Called from the plugin fiber's effect
		* disposer so stopping/updating the plugin removes it.
		*/
		function disposeDynamicStyle() {
			if (dynamicStyle !== null) {
				dynamicStyle.remove();
				dynamicStyle = null;
			}
			document.body.classList.remove("enhc-msgmeta");
			document.body.classList.remove("enhc-calldur");
			const root = document.documentElement;
			for (const property of ROOT_PROPERTIES) root.style.removeProperty(property);
		}
		//#endregion
		//#region src/client/index.ts
		/**
		* Harness UI Enhancer — browser half entry.
		*
		* Registers two surfaces in Settings → General:
		* - GeneralHeader (order -100), the unified page header
		* - SettingsGeneralRow (order 30), the "界面定制" sizing block
		*
		* One shared EnhancerState lives in the apply closure; both surfaces receive
		* it plus an onApply callback that mutates it and pushes CSS. The fiber's
		* effect disposer removes the dynamic markdown style tag and root properties.
		*/
		/** Plugin id stamped on the dynamic style tag (loader unload sweep key). */
		const PLUGIN_ID = "dsh-enhance-tool";
		/** Required services: the slot registry (React is a platform module). */
		const inject = ["slots"];
		/**
		* Client plugin body: restore persisted state, apply CSS, register surfaces.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			const state = loadState();
			applyState(state);
			ctx.effect(() => {
				applyState(state);
				return disposeDynamicStyle;
			}, `${PLUGIN_ID}: css lifecycle`);
			ctx.effect(() => {
				const relocateTabs = () => {
					const titleCluster = document.querySelector("[class$=\"_titleCluster\"]");
					const actions = titleCluster?.querySelector("[class$=\"_headerActions\"]");
					const tabs = document.querySelector("[data-slot=\"conversation.session.header\"] [class$=\"_tabs\"]");
					if (!titleCluster || !tabs) return;
					if (tabs.parentElement === titleCluster) return;
					const ref = actions !== void 0 && actions !== null ? actions.nextSibling : null;
					titleCluster.insertBefore(tabs, ref);
				};
				relocateTabs();
				const observer = new MutationObserver(relocateTabs);
				observer.observe(document.body, {
					childList: true,
					subtree: true
				});
				return () => observer.disconnect();
			}, `${PLUGIN_ID}: session tabs relocation`);
			ctx.effect(() => {
				const FILL_CLASS = "enhc-settings-title";
				/** Deterministic fallback: known intro → page title, so a missing heading is
				*  filled even if the active-nav label cannot be resolved in time. */
				const KNOWN_TITLES = [["管理侧边卡片", "侧边卡片"]];
				const fillSectionTitle = () => {
					const section = document.querySelector("[data-slot=\"settings.section\"]");
					if (section === null || section === void 0) return;
					const intro = section.querySelector("p[class$=\"_intro\"]");
					if (intro === null || intro === void 0) return;
					if (section.querySelector("h1, h2, h3") !== null) return;
					if (section.querySelector(`h2.${FILL_CLASS}`) !== null) return;
					let text = "";
					for (const el of document.querySelectorAll("[class$=\"_navCell\"]")) if (el.getAttribute("aria-current") === "true" || /(^|\s)\S*_active(\s|$)/.test(el.className)) {
						text = el.textContent?.trim() ?? "";
						break;
					}
					if (text === "") {
						const it = intro.textContent?.trim() ?? "";
						text = KNOWN_TITLES.find(([prefix]) => it.startsWith(prefix))?.[1] ?? "";
					}
					if (text === "") return;
					const title = document.createElement("h2");
					title.className = FILL_CLASS;
					title.textContent = text;
					intro.parentElement?.insertBefore(title, intro);
					console.info(`[dsh-enhance-tool] injected settings section title: ${JSON.stringify(text)}`);
				};
				fillSectionTitle();
				const observer = new MutationObserver(fillSectionTitle);
				observer.observe(document.body, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: [
						"class",
						"aria-current",
						"aria-expanded"
					]
				});
				const tick = window.setInterval(fillSectionTitle, 700);
				window.setTimeout(() => window.clearInterval(tick), 12e3);
				return () => {
					observer.disconnect();
					window.clearInterval(tick);
				};
			}, `${PLUGIN_ID}: settings section title fill`);
			const patch = (next) => {
				Object.assign(state, next);
				applyState(state);
			};
			ctx.effect(() => {
				let raf = 0;
				let ro = null;
				let observedEl = null;
				const schedule = () => {
					cancelAnimationFrame(raf);
					raf = requestAnimationFrame(() => applyState(state));
				};
				const attach = () => {
					const target = document.querySelector(".wSkVaW_scrollBody") || document.querySelector(".wSkVaW_composerSeat");
					if (!target || target === observedEl) return;
					if (ro) ro.disconnect();
					ro = new ResizeObserver(schedule);
					ro.observe(target);
					observedEl = target;
					// Apply on (re)attach only; steady-state size changes flow through
					// the ResizeObserver and the window resize listener, so the poll
					// interval no longer forces layout every tick.
					schedule();
				};
				attach();
				// Poll only for the scroll container appearing/changing (e.g. hero→
				// session navigation replaces the composer seat); one querySelector
				// per second instead of a full applyState on every tick.
				const tick = window.setInterval(attach, 1e3);
				window.addEventListener("resize", schedule);
				return () => {
					if (ro) ro.disconnect();
					window.removeEventListener("resize", schedule);
					window.clearInterval(tick);
					cancelAnimationFrame(raf);
				};
			}, `${PLUGIN_ID}: width resize`);
			// 28-user-collapse: long user messages collapse to 5 lines, click to expand
			ctx.effect(() => {
				const LINE_LIMIT = 5;
				// 0.1.2 renders user text as inline spans, so there is no inner block
				// element to clamp — the bubble itself is limited instead. Padding is
				// added to the calc so exactly LINE_LIMIT lines stay visible, and the
				// enhancer font-size var keeps the collapsed height responsive.
				const collapseHeight = (bubble) => {
					const cs = getComputedStyle(bubble);
					const pad = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
					return "calc(var(--enhancer-font-line, 21px) * " + LINE_LIMIT + " + " + pad + "px)";
				};
				const setupCollapse = () => {
					let foundNew = false;
					document.querySelectorAll("[class*=_userStack] > [class*=_bubble]").forEach((bubble) => {
						const stack = bubble.parentElement;
						if (stack === null) return;
						// Per-bubble done marker: a bubble is measured once when it first
						// appears (React keeps user nodes stable, so this avoids a forced
						// reflow per observer tick on long sessions).
						if (bubble.dataset.enhcDone === "1") {
							if (bubble.classList.contains("enhc-collapsed") && bubble.style.maxHeight && bubble.style.maxHeight.indexOf("calc(") === -1) {
								bubble.style.maxHeight = collapseHeight(bubble);
							}
							return;
						}
						foundNew = true;
						// The button lives in the stack (outside the clamped bubble) so
						// overflow:hidden cannot clip it; drop any stale button first in
						// case React replaced the bubble node.
						stack.querySelectorAll(":scope > .enhc-expand-btn").forEach((old) => old.remove());
						const cs = getComputedStyle(bubble);
						const pad = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
						const lh = parseFloat(cs.lineHeight) || 22;
						const maxH = Math.round(lh * LINE_LIMIT + pad);
						if (bubble.scrollHeight <= maxH + 4) {
							bubble.dataset.enhcDone = "1";
							return;
						}
						bubble.classList.add("enhc-collapsed");
						bubble.style.maxHeight = collapseHeight(bubble);
						const btn = document.createElement("button");
						btn.type = "button";
						btn.className = "enhc-expand-btn";
						btn.textContent = ptL("展开", "Expand");
						btn.addEventListener("click", () => {
							if (bubble.classList.contains("enhc-collapsed")) {
								bubble.style.maxHeight = bubble.scrollHeight + "px";
								bubble.classList.remove("enhc-collapsed");
								const onEnd = () => {
									bubble.style.maxHeight = "";
									bubble.removeEventListener("transitionend", onEnd);
								};
								bubble.addEventListener("transitionend", onEnd);
								window.setTimeout(onEnd, 400);
								btn.textContent = ptL("收起", "Collapse");
							} else {
								bubble.style.maxHeight = bubble.scrollHeight + "px";
								void bubble.offsetHeight;
								bubble.classList.add("enhc-collapsed");
								bubble.style.maxHeight = collapseHeight(bubble);
								btn.textContent = ptL("展开", "Expand");
							}
						});
						stack.appendChild(btn);
						bubble.dataset.enhcDone = "1";
					});
					return foundNew;
				};
				setupCollapse();
				const retry = window.setTimeout(setupCollapse, 800);
				// Debounce the observer through requestAnimationFrame: during streaming
				// output the body mutates on every token, and a full user-stack scan per
				// mutation is wasteful — coalesce to at most once per frame. When a brand
				// new bubble is found, re-scan shortly after: right after insertion the
				// message text may not be laid out yet (scrollHeight reads low), so a
				// first-send long message could otherwise never collapse.
				let raf = 0;
				const mo = new MutationObserver(() => {
					if (raf) return;
					raf = requestAnimationFrame(() => {
						raf = 0;
						if (setupCollapse()) {
							window.setTimeout(setupCollapse, 150);
							window.setTimeout(setupCollapse, 600);
						}
					});
				});
				mo.observe(document.body, { childList: true, subtree: true });
				return () => {
					mo.disconnect();
					window.clearTimeout(retry);
					if (raf) cancelAnimationFrame(raf);
				};
			}, `${PLUGIN_ID}: user collapse`);
			// 29-msgmeta: belt-and-braces for the always-visible message actions row.
			// The stylesheet already forces that row visible, but that depends on the
			// product's own hover-reveal rules and on `:has()` support; a row-level
			// inline `opacity: 1 !important` wins over any stylesheet rule, so neither
			// the timestamp nor copy/branch/usage/duration can hide behind a hover.
			// The row is the only thing touched — every button inside it inherits.
			ctx.effect(() => {
				const sync = () => {
					const on = state.showMsgMeta !== false;
					const scope = document.querySelector("[data-conversation-scroll]") ?? document.body;
					for (const clock of scope.querySelectorAll("[class*=_timeStart],[class*=_timeEnd]")) {
						const row = clock.parentElement;
						if (row === null) continue;
						if (on) {
							if (row.style.getPropertyPriority("opacity") !== "important") row.style.setProperty("opacity", "1", "important");
						} else if (row.style.getPropertyPriority("opacity") === "important") row.style.removeProperty("opacity");
					}
				};
				sync();
				let raf = 0;
				// Same rAF coalescing as the collapse observer: streaming output mutates
				// the transcript on every token, so at most one scan per frame.
				const mo = new MutationObserver(() => {
					if (raf) return;
					raf = requestAnimationFrame(() => {
						raf = 0;
						sync();
					});
				});
				mo.observe(document.body, { childList: true, subtree: true });
				return () => {
					mo.disconnect();
					if (raf) cancelAnimationFrame(raf);
					const scope = document.querySelector("[data-conversation-scroll]") ?? document.body;
					for (const clock of scope.querySelectorAll("[class*=_timeStart],[class*=_timeEnd]")) clock.parentElement?.style.removeProperty("opacity");
				};
			}, `${PLUGIN_ID}: message meta visible`);
			// 30-calldur: per-tool-call duration, live while the call is still running.
			//
			// Data comes from the Session event window (ctx.inject keeps the
			// dependency optional, so a build without the client `sessions` service
			// still loads this plugin and simply has no tool timings):
			//   tool/call                { callId }          → root call start
			//   tool/result              { message.source.callId } → root call end
			//   tool/ptc-dispatch-start  { subCallId }        → sub-tool call start
			//   tool/ptc-dispatch        { subCallId }        → sub-tool call end
			// Row identity in the transcript is `[data-chat-call-id]`, which uses those
			// exact ids (a sub-call id reads `<rootCallId>:ptc:<n>`), so no DOM
			// heuristics are needed. A call with a start and no end is running: its
			// chip ticks on a 500ms timer and switches to the frozen duration once the
			// matching result event lands.
			ctx.inject(["sessions"], (sessionCtx) => {
				sessionCtx.effect(() => {
					const starts = new Map();
					const ends = new Map();
					let source = null;
					let sourceUnsub = null;
					let currentId = null;
					let ticker = 0;
					let raf = 0;
					/** Compact duration: sub-second in ms, then 1 decimal, then m/s. */
					const fmtDur = (ms) => {
						const value = Math.max(0, ms);
						if (value < 950) return `${Math.max(1, Math.round(value))}ms`;
						const seconds = value / 1000;
						if (seconds < 10) return `${seconds.toFixed(1)}s`;
						if (seconds < 60) return `${Math.round(seconds)}s`;
						const minutes = Math.floor(seconds / 60);
						const rest = Math.floor(seconds % 60);
						return `${minutes}${ptL("分", "m")}${String(rest).padStart(2, "0")}${ptL("秒", "s")}`;
					};
					const clock = (ms) => {
						const d = new Date(ms);
						const p2 = (n) => String(n).padStart(2, "0");
						return `${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`;
					};
					/** Fold the whole event window into start/end maps. */
					const rebuild = () => {
						starts.clear();
						ends.clear();
						const entries = source?.getSnapshot?.()?.entries ?? [];
						for (const entry of entries) {
							if (entry?.type !== "event") continue;
							const event = entry.event;
							const data = event?.data ?? {};
							if (event.type === "tool/call") {
								const id = String(data.callId ?? "");
								if (id !== "" && !starts.has(id)) starts.set(id, event.time);
							} else if (event.type === "tool/ptc-dispatch-start") {
								const id = String(data.subCallId ?? "");
								if (id !== "" && !starts.has(id)) starts.set(id, event.time);
							} else if (event.type === "tool/result") {
								const id = String(data.message?.source?.callId ?? data.message?.content?.[0]?.toolCallId ?? "");
								if (id !== "") ends.set(id, event.time);
							} else if (event.type === "tool/ptc-dispatch") {
								const id = String(data.subCallId ?? "");
								if (id !== "") ends.set(id, event.time);
							}
						}
						// Feed the suggestion dock: its slot prop carries lifecycle state only,
						// so the latest assistant reply text comes from the event window.
						let reply = "";
						for (let i = entries.length - 1; i >= 0 && reply === ""; i -= 1) {
							const entry = entries[i];
							if (entry?.type !== "event" || entry.event?.type !== "assistant/message") continue;
							reply = (entry.event.data?.message?.content ?? [])
								.filter((block) => block?.type === "text" && typeof block.text === "string")
								.map((block) => block.text)
								.join("\n")
								.trim();
						}
						publishSuggestText(currentId, reply);
					};
					/** Paint every visible call row; returns how many are still running. */
					const paint = () => {
						const on = state.showCallDur !== false;
						const scope = document.querySelector("[data-conversation-scroll]") ?? document.body;
						const now = Date.now();
						let live = 0;
						for (const row of scope.querySelectorAll("[data-chat-call-id]")) {
							// Tool-card renderers differ: the generic disclosure row
							// (`[data-disclosure-row]`), the bash/terminal header that carries
							// `role=button[aria-expanded]`, and output-less bash rows whose header
							// is a bare `*_root[data-state]` with no button role. The last resort
							// derives the header from the title/summary span's parent, which is
							// that row in every renderer. Document order keeps a parent card's
							// own header ahead of its nested sub-call headers.
							const anchor = row.querySelector("[class*=_summary],[class*=_errorSummary],[class*=_title]");
							const host = row.querySelector("[data-disclosure-row]")
								?? row.querySelector('[role="button"][aria-expanded]')
								?? anchor?.parentElement
								?? null;
							if (host === null) continue;
							const start = starts.get(row.dataset.chatCallId ?? "");
							if (!on || start === undefined) {
								const stale = host.querySelector(":scope > .enhc-call-dur");
								if (stale !== null) stale.remove();
								continue;
							}
							const end = ends.get(row.dataset.chatCallId ?? "");
							const running = end === undefined;
							if (running) live += 1;
							let chip = host.querySelector(":scope > .enhc-call-dur");
							if (chip === null) {
								chip = document.createElement("span");
								chip.className = "enhc-call-dur";
								host.appendChild(chip);
							}
							const text = fmtDur(running ? now - start : end - start);
							const label = running ? `${text}${ptL("…", "…")}` : text;
							if (chip.textContent !== label) chip.textContent = label;
							if (running) chip.dataset.live = "1";
							else delete chip.dataset.live;
							chip.title = running
								? ptL(`开始 ${clock(start)} · 进行中`, `started ${clock(start)} · running`)
								: ptL(`开始 ${clock(start)} · 结束 ${clock(end)}`, `started ${clock(start)} · ended ${clock(end)}`);
						}
						if (on && live > 0 && ticker === 0) ticker = window.setInterval(paint, 500);
						else if ((!on || live === 0) && ticker !== 0) {
							window.clearInterval(ticker);
							ticker = 0;
						}
					};
					/** Re-resolve the current Session binding and its event window. */
					const bind = () => {
						const id = sessionCtx.sessions.list.getSnapshot?.()?.current ?? null;
						if (id === currentId && source !== null) return;
						currentId = id;
						if (sourceUnsub !== null) {
							sourceUnsub();
							sourceUnsub = null;
						}
						source = id === null ? null : sessionCtx.sessions.binding?.(id)?.eventSource ?? null;
						if (source !== null) sourceUnsub = source.subscribe(() => {
							rebuild();
							paint();
						});
						rebuild();
						paint();
					};
					bind();
					const listUnsub = sessionCtx.sessions.list.subscribe?.(() => bind()) ?? null;
					// rAF-coalesced: streaming output and tool progress mutate the
					// transcript continuously, so at most one scan per frame.
					const mo = new MutationObserver(() => {
						if (raf !== 0) return;
						raf = requestAnimationFrame(() => {
							raf = 0;
							paint();
						});
					});
					mo.observe(document.body, { childList: true, subtree: true });
					return () => {
						mo.disconnect();
						if (raf !== 0) cancelAnimationFrame(raf);
						if (ticker !== 0) window.clearInterval(ticker);
						if (sourceUnsub !== null) sourceUnsub();
						if (typeof listUnsub === "function") listUnsub();
						for (const chip of document.querySelectorAll(".enhc-call-dur")) chip.remove();
					};
				}, `${PLUGIN_ID}: tool call durations`);
			});
			const surfaceProps = {
				state,
				onApply: patch,
				presets: FONT_PRESETS
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "ui-enhancer-header",
				order: -100
			}, GeneralHeader));
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "ui-enhancer",
				order: 30
			}, () => react.createElement(SettingsGeneralRow, surfaceProps)));
									//#region dsh-enhance-tool: prompt-tools register
			ctx.slots.inject("conversation.input.left", () => ctx.slots.register({
				name: "conversation.input.left",
				id: "harness-prompt-tools",
				order: 5
			}, PromptLibraryButton));
			ctx.slots.inject("conversation.input.left", () => ctx.slots.register({
				name: "conversation.input.left",
				id: "harness-polish-tools",
				order: 6
			}, PolishButton));
//#endregion
//#region dsh-enhance-tool: suggestion register
			ctx.slots.inject("conversation.input.dock", () => ctx.slots.register({
				name: "conversation.input.dock",
				id: "harness-suggestion-dock",
				order: 15
			}, SuggestionDock));
//#endregion
//#region harness-ui-enhancer: hero menu top
ctx.effect(() => {
				const fixHeroMenu = () => {
					const menu = document.querySelector('[role="menu"]');
					if (menu === null || menu.dataset.harnessMenuTop === "1") return;
					const textarea = document.querySelector('[data-slot="conversation.composer.bar"] textarea')
						?? document.querySelector("[data-composer-input]")
						?? document.querySelector("[data-composer-card]");
					if (textarea === null) return;
					const mr = menu.getBoundingClientRect();
					const tr = textarea.getBoundingClientRect();
					if (mr.bottom > tr.top + 4) {
						// Menu renders below its anchor and would cover the composer:
						// cap its height so it scrolls instead of hiding the input.
						const maxHeight = Math.max(80, Math.round(tr.top - mr.top - 8));
						// Only cap when the menu actually has more content than fits in the
						// available space; short menus (e.g. the model picker with a single
						// row) must keep their natural height instead of being squeezed
						// to the 80px floor.
						if (maxHeight >= menu.scrollHeight) return;
						// Respect an existing native max-height (model/theme picker
						// scroll lists): our overlay cap must not fight it. On 0.1.5 every
						// list menu carries a ~viewport cap, so this backs off by design —
						// the product positions those popups itself; forcing a smaller cap
						// only shortened them while they still overlapped the composer.
						const nativeMax = parseFloat(getComputedStyle(menu).maxHeight);
						if (Number.isFinite(nativeMax) && nativeMax > 0 && nativeMax >= maxHeight) return;
						menu.style.maxHeight = maxHeight + "px";
						menu.style.overflowY = "auto";
						menu.dataset.harnessMenuTop = "1";
					}
				};
				const mo = new MutationObserver(fixHeroMenu);
				mo.observe(document.body, { childList: true, subtree: true });
				const tick = window.setInterval(fixHeroMenu, 400);
				window.setTimeout(() => window.clearInterval(tick), 15e3);
				return () => { mo.disconnect(); window.clearInterval(tick); };
			}, "harness-ui-enhancer: hero menu top");
//#endregion
//#region dsh-enhance-tool: hero menu top
ctx.effect(() => {
				const fixHeroMenu = () => {
					const menu = document.querySelector('[role="menu"]');
					if (menu === null || menu.dataset.harnessMenuTop === "1") return;
					const textarea = document.querySelector('[data-slot="conversation.composer.bar"] textarea')
						?? document.querySelector("[data-composer-input]")
						?? document.querySelector("[data-composer-card]");
					if (textarea === null) return;
					const mr = menu.getBoundingClientRect();
					const tr = textarea.getBoundingClientRect();
					if (mr.bottom > tr.top + 4) {
						// Menu renders below its anchor and would cover the composer:
						// cap its height so it scrolls instead of hiding the input.
						const maxHeight = Math.max(80, Math.round(tr.top - mr.top - 8));
						// Only cap when the menu actually has more content than fits in the
						// available space; short menus (e.g. the model picker with a single
						// row) must keep their natural height instead of being squeezed
						// to the 80px floor.
						if (maxHeight >= menu.scrollHeight) return;
						// Respect an existing native max-height (model/theme picker
						// scroll lists): our overlay cap must not fight it. On 0.1.5 every
						// list menu carries a ~viewport cap, so this backs off by design —
						// the product positions those popups itself; forcing a smaller cap
						// only shortened them while they still overlapped the composer.
						const nativeMax = parseFloat(getComputedStyle(menu).maxHeight);
						if (Number.isFinite(nativeMax) && nativeMax > 0 && nativeMax >= maxHeight) return;
						menu.style.maxHeight = maxHeight + "px";
						menu.style.overflowY = "auto";
						menu.dataset.harnessMenuTop = "1";
					}
				};
				const mo = new MutationObserver(fixHeroMenu);
				mo.observe(document.body, { childList: true, subtree: true });
				const tick = window.setInterval(fixHeroMenu, 400);
				window.setTimeout(() => window.clearInterval(tick), 15e3);
				return () => { mo.disconnect(); window.clearInterval(tick); };
			}, "dsh-enhance-tool: hero menu top");
//#endregion

		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map