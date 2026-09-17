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
const PromptToolsCss = ":where(.PmptLb_panel),:where(.PmptLb_polishPanel){box-sizing:border-box;background:var(--dsw-specific-menu);box-shadow:var(--dsw-elevation-prominent);color:var(--dsw-alias-label-primary);border:0;border-radius:20px;padding:8px;flex-direction:column;gap:6px;display:flex;position:fixed;z-index:1100;--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);overflow:hidden}:where(.PmptLb_panel){width:min(420px,100vw - 32px);max-height:min(360px,100vh - 96px)}:where(.PmptLb_polishPanel){width:min(320px,100vw - 32px)}.PmptLb_polishPanel.PmptLb_polishPanel{padding:10px;gap:8px}:where(.PmptLb_overlay){position:fixed;inset:0;z-index:1099;background:0 0}:where(.PmptLb_manageOverlay){position:fixed;inset:0;z-index:1200;background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur);display:flex;align-items:center;justify-content:center}:where(.PmptLb_manageDialog){box-sizing:border-box;background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-elevation-prominent);border-radius:32px;width:800px;max-width:calc(100vw - 48px);max-height:min(800px,100vh - 48px);display:flex;flex-direction:column;overflow:hidden}:where(.PmptLb_manageHeader){box-sizing:border-box;flex:none;justify-content:space-between;align-items:flex-start;gap:8px;height:54px;padding:18px 16px 6px 20px;display:flex;color:var(--dsw-alias-label-primary);font-size:16px;font-weight:500;line-height:24px}:where(.PmptLb_manageClose){cursor:pointer;width:28px;height:28px;color:var(--dsw-alias-label-primary);background:0 0;border:none;border-radius:28px;justify-content:center;align-items:center;padding:0;display:inline-flex}:where(.PmptLb_manageClose:hover){background:var(--dsw-alias-interactive-bg-hover)}:where(.PmptLb_manageCols){display:flex;flex:1;min-height:0;overflow:hidden}:where(.PmptLb_manageLeft){box-sizing:border-box;flex-direction:column;flex:none;gap:4px;width:236px;padding:0 14px 16px 16px;display:flex;overflow-y:auto;border-right:.5px solid var(--dsw-alias-border-l2)}:where(.PmptLb_rowTitleRow){display:flex;align-items:center;gap:6px;min-width:0;overflow:hidden}:where(.PmptLb_rowTitleRow) :where(.PmptLb_rowTitle){flex:1 1 auto;min-width:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:where(.PmptLb_rowTitleRow) :where(.PmptLb_rowGroup){flex:0 1 auto;max-width:45%;min-width:0;margin-left:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}:where(.PmptLb_rowText){min-width:0;overflow:hidden}:where(.PmptLb_rowAction){flex:none}:where(.PmptLb_manageRight){flex:1;display:flex;flex-direction:column;gap:16px;padding:2px 24px 20px;overflow-y:auto}:where(.PmptLb_manageBtn){box-sizing:border-box;width:auto;min-width:100%;height:40px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:10px;gap:8px;padding:0 10px;font-size:14px;line-height:22px;display:flex;flex-direction:column;justify-content:center}:where(.PmptLb_item:hover),:where(.PmptLb_manageBtn:hover){background:var(--dsw-alias-interactive-bg-hover)}:where(.PmptLb_item){box-sizing:border-box;width:auto;min-width:100%;min-height:40px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:10px;flex-direction:column;gap:2px;justify-content:center;padding:8px 10px;font-size:14px;line-height:22px;display:flex}:where(.PmptLb_item:hover){background:var(--dsw-alias-interactive-bg-hover)}.PmptLb_item.PmptLb_item{flex:0 0 auto;height:auto;min-height:40px;align-items:stretch;justify-content:center;padding:8px 10px}.PmptLb_manageRow.PmptLb_manageRow{flex:0 0 auto;height:auto;min-height:40px;align-items:flex-start;padding:8px 8px 8px 10px}:where(.PmptLb_manageRow){box-sizing:border-box;cursor:pointer;height:40px;color:var(--dsw-alias-label-primary);background:0 0;border:none;border-radius:12px;align-items:center;gap:8px;padding:9px 16px 9px 12px;font-size:14px;font-weight:400;line-height:22px;display:flex}:where(.PmptLb_manageRow:hover){background:var(--dsw-specific-sidebar-nav-item-hover)}.PmptLb_manageRowActive.PmptLb_manageRowActive{background:var(--dsw-specific-sidebar-nav-item-active)}.PmptLb_manageRowActive.PmptLb_manageRowActive:hover{background:var(--dsw-specific-sidebar-nav-item-active)}:where(.PmptLb_groupHead){color:var(--dsw-alias-label-tertiary);font-size:12px;font-weight:600;line-height:18px;margin:8px 0 2px}:where(.PmptLb_itemTitle){font-size:14px;font-weight:500;line-height:22px}:where(.PmptLb_itemPreview),:where(.PmptLb_rowPreview){color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:20px;overflow:hidden}:where(.PmptLb_rowTitle){font-size:14px;font-weight:500;line-height:22px}:where(.PmptLb_formHeader){color:var(--dsw-alias-label-primary);font-size:16px;font-weight:500;line-height:24px}:where(.PmptLb_empty),:where(.PmptLb_emptyManage){color:var(--dsw-alias-label-tertiary);font-size:14px;line-height:22px;padding:12px 10px}:where(.PmptLb_row){border-bottom:.5px solid var(--dsw-alias-border-l2);align-items:center;gap:8px;padding:16px 0;display:flex}:where(.PmptLb_row:last-child){border-bottom:none}:where(.PmptLb_rowText){flex-direction:column;flex:1;gap:0;min-width:0;display:flex}:where(.PmptLb_pillBtn),:where(.PmptLb_btnPrimary),:where(.PmptLb_btnSecondary){align-self:flex-start;background:var(--dsw-alias-bg-module-platform);height:36px;font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;border:none;border-radius:18px;align-items:center;gap:8px;padding:0 14px;font-size:14px;line-height:22px;display:inline-flex;justify-content:center}:where(.PmptLb_pillBtn:hover:not(:disabled)),:where(.PmptLb_btnPrimary:hover:not(:disabled)),:where(.PmptLb_btnSecondary:hover:not(:disabled)){background:var(--dsw-alias-interactive-bg-hover)}:where(.PmptLb_btnPrimary),:where(.PmptLb_btnPrimary:hover:not(:disabled)){background:var(--dsw-alias-button-info-fill);color:#fff}:where(.PmptLb_btnPrimary:disabled),:where(.PmptLb_btnSecondary:disabled),:where(.PmptLb_pillBtn:disabled){opacity:.5;cursor:not-allowed}:where(.PmptLb_formField){display:flex;flex-direction:column;gap:6px;min-width:0;max-width:520px;width:100%}:where(.PmptLb_fieldLabel){color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px;font-weight:500}:where(.PmptLb_formActions){display:flex;align-items:center;justify-content:flex-end;gap:8px;border-top:.5px solid var(--dsw-alias-border-l2);margin-top:4px;padding-top:16px;max-width:520px;width:100%}:where(.PmptLb_formActionsLead){margin-right:auto}:where(.PmptLb_rowAction){width:28px;height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:none;border-radius:28px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}:where(.PmptLb_rowAction:hover){background:var(--dsw-alias-interactive-bg-hover)}:where(.PmptLb_rowActionDanger){color:var(--dsw-alias-state-error-primary)}:where(.PmptLb_rowGroup){color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover);white-space:nowrap;font-size:11px;line-height:16px;border-radius:6px;margin-left:8px;padding:1px 6px;font-size:12px;line-height:18px}:where(.PmptLb_search),:where(.PmptLb_manageSearch),:where(.PmptLb_input),:where(.PmptLb_select){box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-3);width:100%;height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;outline:none;padding:0 12px;font-size:13px;line-height:1.5}:where(.PmptLb_search:focus),:where(.PmptLb_manageSearch:focus),:where(.PmptLb_input:focus),:where(.PmptLb_select:focus){border-color:var(--dsw-alias-border-l4);box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}:where(.PmptLb_textarea){box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-3);width:100%;color:var(--dsw-alias-label-primary);border-radius:8px;outline:none;padding:8px 12px;font-size:13px;line-height:1.5;font-family:inherit;resize:vertical}:where(.PmptLb_textarea:focus){border-color:var(--dsw-alias-border-l4);box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}:where(.PmptLb_list){flex-direction:column;gap:2px;display:flex;overflow-y:auto}:where(.PmptLb_manageList){flex-direction:column;gap:2px;flex:1;display:flex;overflow-y:auto}:where(.PmptLb_manageBody){flex-direction:column;gap:10px;display:flex}:where(.PmptLb_form){flex-direction:column;gap:10px;display:flex}:where(.PmptLb_searchRow){display:flex;gap:6px;align-items:center}:where(.PmptLb_searchRow) :where(.PmptLb_select){width:auto;min-width:96px;flex:none}:where(.PmptLb_btn){flex:none}:where(.PmptLb_polishHint){color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px;padding:0 2px}:where(.PmptLb_polishActions){display:flex;align-items:center;justify-content:flex-end;gap:8px}:where(.PmptLb_polishErr){color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:18px;word-break:break-all}:where(.PmptLb_undoBar){display:flex;align-items:center;gap:10px;padding:12px 24px;border-top:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform)}:where(.PmptLb_rowActionConfirm){width:auto;padding:0 10px}:where(.PmptLb_spin){animation:PmptLb_spinAnim .8s linear infinite}@keyframes PmptLb_spinAnim{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){:where(.PmptLb_panel),:where(.PmptLb_polishPanel),:where(.PmptLb_manageDialog){animation:none!important}}";
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
	"rowTitleRow": "PmptLb_rowTitleRow",
	"formField": "PmptLb_formField",
	"fieldLabel": "PmptLb_fieldLabel",
	"formActionsLead": "PmptLb_formActionsLead",
	"polishActions": "PmptLb_polishActions",
	"polishErr": "PmptLb_polishErr",
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
/**
 * Classes the harness uses for its own popovers, dialogs and rows, learned from
 * whatever product surface is on screen (a product popover/dialog only exists in
 * the DOM while it is open, so this is remembered rather than looked up on demand).
 * Nothing is hardcoded: a renamed class simply means nothing is adopted and our
 * `:where()`-wrapped rules in PromptToolsCss take over.
 */
const productSurfaceClasses = { popover: "", cell: "", dialog: "", navCell: "" };

/** Remember the current product surface classes (cheap; safe to call on any mutation). */
function rememberProductStyles() {
	const set = (key, cls) => {
		if (cls !== "" && cls !== productSurfaceClasses[key]) productSurfaceClasses[key] = cls;
	};
	const clsOf = (el) => (el === null || el === void 0 ? "" : typeof el.className === "string" ? el.className : el.getAttribute("class") ?? "");
	set("popover", clsOf(document.querySelector('[role="menu"]')));
	set("cell", clsOf(document.querySelector('[role="menuitem"]')));
	set("dialog", clsOf(document.querySelector('[role="dialog"]')));
	// Nav rows: intersect the cells inside the selected cell's own list, so the
	// "active" modifier of the row that happens to be selected right now is not
	// copied onto every row of ours.
	const selectedCell = document.querySelector('[role="dialog"] button[aria-current]');
	const list = selectedCell === null ? null : selectedCell.parentElement;
	if (list !== null && list !== void 0) {
		const sets = [...list.querySelectorAll("button")].map((b) => (clsOf(b) || "").split(/\s+/).filter((c) => c !== ""));
		if (sets.length > 0) {
			const shared = sets[0].filter((c) => sets.every((set_) => set_.includes(c)) && !/active|selected|current/i.test(c));
			if (shared.length > 0) set("navCell", shared.join(" "));
		}
	}
}

/** Dress one of our surfaces with the learned product class for its role. */
function adoptProductSurface(el, key) {
	const learned = productSurfaceClasses[key];
	if (el === null || el === void 0 || learned === "") return;
	const product = learned.split(/\s+/).filter((c) => c !== "");
	const own = (el.className || "").split(/\s+/).filter((c) => c !== "" && !product.includes(c));
	const next = [...own, ...product].join(" ");
	if (next !== el.className) el.className = next;
}

/** Our popover surfaces: the panel itself plus its row buttons. */
const POPOVER_SURFACE = [[null, "popover"], [".PmptLb_item,.PmptLb_manageBtn", "cell"]];
/** The plugin's modal: the dialog shell plus its left-hand nav rows. */
const DIALOG_SURFACE = [[null, "dialog"], [".PmptLb_manageRow", "navCell"]];
/** The polish mini panel: popover shell plus its two action rows. */
const POLISH_SURFACE = [[null, "popover"], [".PmptLb_btnPrimary,.PmptLb_btnSecondary", "cell"]];

/**
 * Keep one of our surfaces dressed in the harness's own chrome.
 * @param ref - ref to the surface root.
 * @param mappings - [selector|null, key] pairs applied to the root and its children.
 * @param dep - value that changes when the surface re-opens (re-applies then).
 */
function useProductSurfaces(ref, mappings, dep) {
	(0, react.useEffect)(() => {
		let cancelled = false;
		const dress = () => {
			const root = ref.current;
			if (cancelled || root === null || root === void 0) return;
			rememberProductStyles();
			for (const [selector, key] of mappings) {
				if (selector === null) adoptProductSurface(root, key);
				else for (const el of root.querySelectorAll(selector)) adoptProductSurface(el, key);
			}
		};
		dress();
		const raf = requestAnimationFrame(dress);
		const timers = [window.setTimeout(dress, 500), window.setTimeout(dress, 1500)];
		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			for (const timer of timers) window.clearTimeout(timer);
		};
	}, [ref, mappings, dep]);
}
/** Dress every injected button inside one container (dock roots hold several). */
function adoptProductButtonsIn(container, preferText = false) {
	if (container === null || container === void 0) return;
	for (const el of container.querySelectorAll("button")) {
		if (/(^|\s)(PmptLb_|Sggst_)/.test(el.className || "")) adoptProductButtonStyle(el, preferText);
	}
}
/**
* Keep one injected surface dressed in the product's own control style: applied on
* mount and again shortly after, because the product's own buttons can render
* after our slot entry.
* @param ref - ref to our button, or to a container holding our buttons.
* @param preferText - see {@link adoptProductButtonStyle}.
*/
function useProductButtonStyle(ref, preferText = false) {
	(0, react.useEffect)(() => {
		let cancelled = false;
		const dress = () => {
			const el = ref.current;
			if (cancelled || el === null || el === void 0) return;
			if (el.tagName === "BUTTON") adoptProductButtonStyle(el, preferText);
			else adoptProductButtonsIn(el, preferText);
		};
		dress();
		const raf = requestAnimationFrame(dress);
		const timers = [window.setTimeout(dress, 400), window.setTimeout(dress, 1500)];
		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			for (const timer of timers) window.clearTimeout(timer);
		};
	}, [ref, preferText]);
}
/**
* Copy the harness's own control class onto one of our injected buttons, so the
* plugin reuses the product button style instead of shipping its own look.
*
* The class comes from a live product button in the nearest ancestor that holds
* one — never a hardcoded hash — so a product restyle is picked up for free and a
* renamed class merely means "nothing adopted". Our own rules are written with
* `:where()` (zero specificity), so a product class always wins when present.
*
* @param el - our button element.
* @param preferText - pick a labelled product control (pills) instead of the first
*   icon control in the row (composer tool buttons).
*/
function adoptProductButtonStyle(el, preferText = false) {
	if (el === null || el === void 0) return;
	const ours = (className) => /(^|\s)(PmptLb_|Sggst_|enhc-|enhancer-)/.test(className || "");
	const controlsIn = (scope) => [...scope.querySelectorAll("button")]
		.filter((b) => b !== el && !ours(b.className) && (b.className || "").trim() !== "");
	const scopes = [];
	for (let node = el.parentElement, depth = 0; node !== null && depth < 6; depth += 1, node = node.parentElement) scopes.push(node);
	// The suggestion dock renders ABOVE the composer card, so the ancestor walk
	// cannot reach the controls it should imitate — the bar is the stable seat.
	const bar = document.querySelector('[data-slot="conversation.composer.bar"]');
	if (bar !== null) scopes.push(bar);
	for (const scope of scopes) {
		const candidates = controlsIn(scope);
		const ref = preferText ? candidates.find((b) => (b.textContent || "").trim() !== "") : candidates[0];
		if (ref === void 0) continue;
		const product = (ref.className || "").split(/\s+/).filter((c) => c !== "" && !ours(c));
		if (product.length === 0) continue;
		const own = (el.className || "").split(/\s+/).filter((c) => c !== "" && ours(c));
		const next = [...own, ...product].join(" ");
		if (next !== el.className) el.className = next;
		return;
	}
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
	const anchorRef = (0, react.useRef)(null);
	const panelRef = (0, react.useRef)(null);
	const manageRef = (0, react.useRef)(null);
	useProductButtonStyle(anchorRef);
	const [open, setOpen] = (0, react.useState)(false);
	const [manageOpen, setManageOpen] = (0, react.useState)(false);
	// must run after the state they depend on (open/manageOpen) is initialised
	useProductSurfaces(panelRef, POPOVER_SURFACE, open);
	useProductSurfaces(manageRef, DIALOG_SURFACE, manageOpen);
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
						ref: panelRef,
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
					ref: manageRef,
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
												jsxs("div", { className: PromptTools_module_css_default.rowTitleRow, children: [
													jsx("div", { className: PromptTools_module_css_default.rowTitle, children: item.title }),
													item.group ? jsx("span", { className: PromptTools_module_css_default.rowGroup, children: item.group }) : null
												] }),
												jsx("div", { className: PromptTools_module_css_default.rowPreview, children: item.text.replace(/\s+/g, " ").slice(0, 60) })
											] }),
											jsx("button", { type: "button", className: PromptTools_module_css_default.rowAction + " " + PromptTools_module_css_default.rowActionDanger + (confirmId === item.id ? " " + PromptTools_module_css_default.rowActionConfirm : ""), "aria-label": PTT.del, onClick: (e) => { e.stopPropagation(); if (confirmId === item.id) { removeItem(item.id); } else { setConfirmId(item.id); window.setTimeout(() => setConfirmId((c) => c === item.id ? null : c), 2000); } }, children: confirmId === item.id ? jsx("span", { style: { fontSize: 12, color: "var(--dsw-alias-state-danger,#e53935)", whiteSpace: "nowrap" }, children: PTT.delConfirm }) : jsx("svg", { viewBox: "0 0 16 16", width: 14, height: 14, "aria-hidden": true, children: jsx("path", { d: "M5 3V2h6v1h3v1.5H2V3h3zm1 4v5h1V7H6zm3 0v5h1V7H9zM3.5 5l.5 9h8l.5-9h-9z", fill: "currentColor" }) }) })
										]
									}, item.id))
								}))((items ?? []).filter((item) => { if (manageGroupFilter !== "" && (item.group || "") !== manageGroupFilter) return false; const q = manageFilter.trim().toLowerCase(); if (!q) return true; return (item.title || "").toLowerCase().includes(q) || (item.group || "").toLowerCase().includes(q) || (item.text || "").toLowerCase().includes(q); }))
							] }),
							jsxs("div", { className: PromptTools_module_css_default.manageRight, children: [
								jsx("div", { className: PromptTools_module_css_default.formHeader, children: editId ? PTT.editing : PTT.addNew }),
								jsxs("div", { className: PromptTools_module_css_default.formField, children: [
									jsx("div", { className: PromptTools_module_css_default.fieldLabel, children: PTT.titlePh }),
									jsx("input", { className: PromptTools_module_css_default.input, value: draftTitle, onChange: (e) => setDraftTitle(e.currentTarget.value) })
								] }),
								jsxs("div", { className: PromptTools_module_css_default.formField, children: [
									jsx("div", { className: PromptTools_module_css_default.fieldLabel, children: PTT.groupPh }),
									jsx("input", { className: PromptTools_module_css_default.input, value: draftGroup, onChange: (e) => setDraftGroup(e.currentTarget.value) })
								] }),
								jsxs("div", { className: PromptTools_module_css_default.formField, children: [
									jsx("div", { className: PromptTools_module_css_default.fieldLabel, children: PTT.textPh }),
									jsx("textarea", { className: PromptTools_module_css_default.textarea, rows: 8, value: draftText, onChange: (e) => setDraftText(e.currentTarget.value) })
								] }),
								polishErr !== "" && jsx("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-state-error-primary)" }, children: polishErr }),
								saveErr !== "" && jsx("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-state-error-primary)" }, children: saveErr }),
								saveOk && jsx("div", { style: { fontSize: 12, lineHeight: "18px", color: "var(--dsw-alias-state-success-primary,#2e7d32)" }, children: PTT.saved }),
								jsxs("div", { className: PromptTools_module_css_default.formActions, children: [
									jsx("button", { type: "button", className: PromptTools_module_css_default.btnSecondary + " " + PromptTools_module_css_default.formActionsLead, disabled: polishing || !draftText.trim(), onClick: polishDraft, children: polishing ? PTT.running : PTT.runManage }),
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
	const polishRef = (0, react.useRef)(null);
	const polishPanelRef = (0, react.useRef)(null);
	useProductButtonStyle(polishRef);
	const [open, setOpen] = (0, react.useState)(false);
	useProductSurfaces(polishPanelRef, POLISH_SURFACE, open);
	const [req, setReq] = (0, react.useState)("");
	const [busy, setBusy] = (0, react.useState)(false);
	const [polishErr, setPolishErr] = (0, react.useState)("");
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
						ref: polishPanelRef,
						className: PromptTools_module_css_default.polishPanel,
						style: polishPos ?? void 0,
						children: [
							jsx("div", { className: PromptTools_module_css_default.polishHint, children: PTT.polishHint }),
							jsx("input", { className: PromptTools_module_css_default.input, placeholder: PTT.customPh, value: req, onChange: (e) => setReq(e.currentTarget.value), onKeyDown: (e) => { if (e.key === "Enter" && req.trim()) run(req.trim()); } }),
							polishErr !== "" && jsx("div", { className: PromptTools_module_css_default.polishErr, children: polishErr }),
							jsxs("div", { className: PromptTools_module_css_default.polishActions, children: [
								jsx("button", { type: "button", className: PromptTools_module_css_default.btnSecondary, disabled: busy || !req.trim(), onClick: () => run(req.trim()), children: PTT.runCustom }),
								jsx("button", { type: "button", className: PromptTools_module_css_default.btnPrimary, disabled: busy, onClick: () => run(""), children: busy ? PTT.running : PTT.runDefault })
							] })
						]
					})
				]
			})
		]
	});
}
//#endregion

//#region dsh-enhance-tool: suggestion dock (conversation.input.dock)
const SuggestionDockCss = ".Sggst_root{box-sizing:border-box;flex-direction:row;flex-wrap:wrap;align-items:center;gap:7px;width:calc(100% - 32px);max-width:calc(var(--dsh-composer-card-max-width,780px));margin:0 auto;padding:3px 0 6px 1px;display:flex}:where(.Sggst_item){box-sizing:border-box;height:28px;min-width:0;border:none;background:0 0;color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:24px;align-items:center;padding:0 12px;font-size:13px;font-weight:500;line-height:20px;display:inline-flex}:where(.Sggst_item:hover:not(:disabled)){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}:where(.Sggst_generate){height:28px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:24px;padding:0 12px;font-size:13px;line-height:20px}:where(.Sggst_generate:hover:not(:disabled)){color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.Sggst_hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}";
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
	const dockRef = (0, react.useRef)(null);
	useProductButtonStyle(dockRef, true);
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
		return jsx("div", { ref: dockRef, className: SuggestStrip_module_css_default.root, children: jsx("span", { className: SuggestStrip_module_css_default.hint, children: ptL("生成建议中…", "Generating…") }) });
	}
	if (suggestions === null) {
		return jsx("div", { ref: dockRef, className: SuggestStrip_module_css_default.root, children: jsx("button", { type: "button", className: SuggestStrip_module_css_default.generate, onClick: generate, children: ptL("生成建议", "Suggest") }) });
	}
	return jsx("div", {
		ref: dockRef,
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

//#region dsh-enhance-tool: session board (通用面板)
/** Session-board stylesheet: harness tokens only, zero-specificity so product classes win. */
const BoardCss = ":where(.enhc-board-overlay){position:fixed;inset:0;z-index:1300;background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur);align-items:center;justify-content:center;display:flex}:where(.enhc-board){box-sizing:border-box;background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-elevation-prominent);border-radius:32px;width:min(1360px,100vw - 48px);height:min(830px,100vh - 48px);display:flex;flex-direction:column;overflow:hidden;color:var(--dsw-alias-label-primary)}:where(.enhc-board-header){box-sizing:border-box;flex:none;align-items:center;gap:10px;height:56px;padding:20px 18px 4px 24px;display:flex}:where(.enhc-board-title){font-size:16px;font-weight:500;line-height:24px}:where(.enhc-board-count){color:var(--dsw-alias-label-tertiary);margin-left:auto;font-size:12px;line-height:18px;white-space:nowrap}:where(.enhc-board-close){cursor:pointer;width:28px;height:28px;color:var(--dsw-alias-label-primary);background:0 0;border:none;border-radius:28px;justify-content:center;align-items:center;padding:0;display:inline-flex;flex:none}:where(.enhc-board-close:hover){background:var(--dsw-alias-interactive-bg-hover)}:where(.enhc-board-toolbar){flex:none;flex-wrap:wrap;align-items:center;gap:6px;padding:0 24px 14px;display:flex}:where(.enhc-board-search){box-sizing:border-box;border:.5px solid var(--dsw-alias-border-l4);background:var(--dsw-alias-bg-layer-3);height:32px;width:240px;color:var(--dsw-alias-label-primary);border-radius:16px;outline:none;padding:0 14px;font-size:13px;line-height:1.5}:where(.enhc-board-search:focus){border-color:var(--dsw-alias-state-business-primary)}:where(.enhc-board-select){box-sizing:border-box;background:var(--dsw-alias-bg-module-platform);height:32px;max-width:190px;font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;border:none;border-radius:16px;padding:0 10px;font-size:13px;line-height:20px}:where(.enhc-board-toggle){background:0 0;height:32px;color:var(--dsw-alias-label-secondary);cursor:pointer;border:none;border-radius:16px;align-items:center;gap:6px;padding:0 12px;font-size:13px;line-height:20px;display:inline-flex}:where(.enhc-board-toggle:hover){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}:where(.enhc-board-toggle[aria-pressed=true]){background:var(--dsw-specific-sidebar-nav-item-active);color:var(--dsw-alias-label-primary)}:where(.enhc-board-sep){background:var(--dsw-alias-border-l2);width:1px;height:18px;margin:0 4px;flex:none}:where(.enhc-board-cols){flex:1;min-height:0;display:flex;gap:10px;padding:0 24px 8px;overflow-x:auto}:where(.enhc-board-col){box-sizing:border-box;flex:1 1 0;min-width:196px;background:var(--dsw-alias-bg-layer-1);border-radius:14px;flex-direction:column;display:flex;overflow:hidden;transition:box-shadow .12s var(--ds-ease-in-out)}:where(.enhc-board-col-header){flex:none;align-items:center;gap:4px;padding:8px 8px 6px 10px;display:flex}:where(.enhc-board-col-name){font-size:13px;font-weight:500;line-height:20px}:where(.enhc-board-col-count){color:var(--dsw-alias-label-tertiary);background:var(--dsw-alias-interactive-bg-hover);border-radius:8px;padding:0 6px;font-size:11px;line-height:16px}:where(.enhc-board-col-actions){margin-left:auto;align-items:center;gap:2px;display:flex;min-width:0}:where(.enhc-board-icon){height:24px;min-width:24px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:12px;justify-content:center;align-items:center;padding:0 6px;display:inline-flex;font-size:12px;line-height:16px;white-space:nowrap}:where(.enhc-board-icon:hover){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}:where(.enhc-board-icon:disabled){opacity:.5;cursor:not-allowed}:where(.enhc-board-col-body){flex:1;min-height:0;flex-direction:column;gap:6px;padding:0 8px 10px;display:flex;overflow-y:auto;overscroll-behavior:contain}:where(.enhc-board-col[data-over=true]){box-shadow:inset 0 0 0 1.5px var(--dsw-alias-state-business-primary)}:where(.enhc-board-col[data-tone=danger][data-over=true]){box-shadow:inset 0 0 0 1.5px var(--dsw-alias-state-error-primary)}:where(.enhc-board-col[data-collapsed=true]){flex:0 0 40px;min-width:40px}:where(.enhc-board-col[data-collapsed=true]) :where(.enhc-board-col-header){flex-direction:column;justify-content:flex-start;align-items:center;gap:8px;padding:8px 6px}:where(.enhc-board-col[data-collapsed=true]) :where(.enhc-board-col-name){writing-mode:vertical-rl;padding:4px 0;font-size:12px;line-height:16px;letter-spacing:.02em}:where(.enhc-board-empty){color:var(--dsw-alias-label-tertiary);border:.5px dashed var(--dsw-alias-border-l2);border-radius:10px;justify-content:center;align-items:center;padding:10px 8px;font-size:12px;line-height:18px;display:flex}:where(.enhc-board-card){box-sizing:border-box;position:relative;background:var(--dsw-alias-bg-layer-2);border:.5px solid var(--dsw-alias-border-l2);border-radius:10px;flex:none;flex-direction:column;gap:2px;padding:8px 10px;display:flex;cursor:grab;transition:background-color .12s var(--ds-ease-in-out),border-color .12s var(--ds-ease-in-out)}:where(.enhc-board-card:hover){background:var(--dsw-alias-interactive-bg-hover)}:where(.enhc-board-card:focus-visible){outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}:where(.enhc-board-card[data-dragging=true]){opacity:.45}:where(.enhc-board-card[data-current=true]){border-color:var(--dsw-alias-state-business-primary)}:where(.enhc-board-card-title){font-size:13px;font-weight:500;line-height:20px;padding-right:20px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}:where(.enhc-board-card-meta){color:var(--dsw-alias-label-tertiary);align-items:baseline;gap:5px;font-size:12px;line-height:18px;display:flex;min-width:0}:where(.enhc-board-card-meta) :where(.enhc-board-ws){text-overflow:ellipsis;white-space:nowrap;overflow:hidden;flex:0 1 auto}:where(.enhc-board-card-meta) :where(.enhc-board-card-time){flex:none}:where(.enhc-board-card-meta) :where(.enhc-board-card-auto){flex:none;opacity:.85}:where(.enhc-board-card-meta) :where(.enhc-board-card-restore){margin-left:auto;flex:none}:where(.enhc-board-card-menu){position:absolute;top:4px;right:4px;width:20px;height:20px;font-size:13px;opacity:0}:where(.enhc-board-card:hover) :where(.enhc-board-card-menu),:where(.enhc-board-card:focus-within) :where(.enhc-board-card-menu),:where(.enhc-board-card[data-menu=true]) :where(.enhc-board-card-menu){opacity:1}:where(.enhc-board-card-badges){flex-wrap:wrap;align-items:center;gap:4px;display:flex;margin-top:2px}:where(.enhc-board-badge){color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover);border-radius:7px;align-items:center;gap:4px;padding:0 6px;font-size:11px;line-height:16px;display:inline-flex}:where(.enhc-board-badge[data-tone=info]){color:var(--dsw-alias-state-business-primary)}:where(.enhc-board-badge[data-tone=success]){color:var(--dsw-alias-state-success-primary)}:where(.enhc-board-insert){height:2px;background:var(--dsw-alias-state-business-primary);border-radius:2px;margin:1px 0;flex:none}:where(.enhc-board-more){flex:none;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:.5px dashed var(--dsw-alias-border-l2);border-radius:8px;justify-content:center;align-items:center;font-size:12px;line-height:18px;display:flex}:where(.enhc-board-more:hover){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}:where(.enhc-board-menu){flex-direction:column;gap:2px;background:var(--dsw-alias-bg-layer-2);border:.5px solid var(--dsw-alias-border-l2);border-radius:10px;margin-top:4px;padding:4px;display:flex}:where(.enhc-board-menu button){box-sizing:border-box;width:100%;height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;text-align:left;background:0 0;border:none;border-radius:8px;padding:0 8px;font-size:12px;line-height:18px}:where(.enhc-board-menu button:hover){background:var(--dsw-alias-interactive-bg-hover)}:where(.enhc-board-batch){align-items:center;gap:6px;background:var(--dsw-alias-bg-module-platform);border-radius:16px;padding:4px 6px;display:flex}:where(.enhc-board-batch-text){font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}:where(.enhc-board-pill){background:var(--dsw-alias-bg-module-platform);height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;border:none;border-radius:14px;align-items:center;gap:6px;padding:0 10px;font-size:12px;line-height:18px;display:inline-flex}:where(.enhc-board-pill:hover:not(:disabled)){background:var(--dsw-alias-interactive-bg-hover)}:where(.enhc-board-pill[data-danger=true]){color:var(--dsw-alias-state-error-primary)}:where(.enhc-board-pill:disabled){opacity:.5;cursor:not-allowed}:where(.enhc-board-checkbox){width:15px;height:15px;accent-color:var(--dsw-alias-state-business-primary)}:where(.enhc-board-btn){box-sizing:border-box;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:14px;flex:none;justify-content:center;align-items:center;gap:6px;padding:0 12px;font-size:13px;line-height:20px;display:inline-flex}:where(.enhc-board-btn:hover){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}:where(.enhc-board-btn[aria-pressed=true]){background:var(--dsw-specific-sidebar-nav-item-active);color:var(--dsw-alias-label-primary)}:where(.enhc-board-btn[hidden]){display:none}:where(.enhc-board-item){background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l3)}:where(.enhc-board-item[data-done=true]) :where(.enhc-board-card-title){color:var(--dsw-alias-label-tertiary);text-decoration:line-through}:where(.enhc-board-item-check){align-items:center;gap:5px;display:inline-flex;cursor:pointer}:where(.enhc-board-note){color:var(--dsw-alias-state-business-primary);font-size:12px;line-height:18px;max-width:52%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-left:auto}:where(.enhc-board-note) + :where(.enhc-board-count){margin-left:10px}:where(.enhc-board-item-run){margin-left:auto;flex:none;height:20px;color:var(--dsw-alias-state-business-primary);cursor:pointer;background:0 0;border:.5px solid var(--dsw-alias-border-l3);border-radius:10px;align-items:center;padding:0 7px;font-size:11px;line-height:14px;display:inline-flex;white-space:nowrap}:where(.enhc-board-item-run:hover){background:var(--dsw-alias-interactive-bg-hover)}:where(.enhc-board-item-edit){flex:none;width:20px;height:20px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:10px;justify-content:center;align-items:center;padding:0;font-size:12px;line-height:14px;display:inline-flex}:where(.enhc-board-item-edit:hover){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}:where(.enhc-board-item[data-busy=true]){opacity:.6;cursor:progress}:where(.enhc-board-item-input){box-sizing:border-box;width:100%;background:var(--dsw-alias-bg-layer-3);border:.5px solid var(--dsw-alias-state-business-primary);border-radius:8px;color:var(--dsw-alias-label-primary);font:inherit;font-size:13px;line-height:18px;padding:3px 6px;outline:none}:where(.enhc-board-add){flex:none;height:30px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:.5px dashed var(--dsw-alias-border-l2);border-radius:8px;justify-content:center;align-items:center;font-size:12px;line-height:18px;display:flex}:where(.enhc-board-add:hover){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}:where(.enhc-board-add-input){font-size:12px;height:30px;padding:0 6px}:where(.enhc-board-hint){color:var(--dsw-alias-label-tertiary);padding:0 24px 18px;font-size:12px;line-height:18px;display:flex;gap:10px;align-items:center}@media (prefers-reduced-motion:reduce){:where(.enhc-board),:where(.enhc-board-card){transition:none!important}}";
/** Inject the board stylesheet once. */
function boardCss() {
	if (typeof document !== "undefined" && document.getElementById("enhc-board-css") === null) {
		const el = document.createElement("style");
		el.id = "enhc-board-css";
		el.dataset.plugin = "dsh-enhance-tool";
		el.dataset.pluginCss = "dsh-enhance-tool/board.css";
		el.textContent = BoardCss;
		document.head.appendChild(el);
	}
}
/** The five board columns, in display order. */
const BOARD_COLUMNS = [
	{ key: "todo", label: ptL("待办", "To do"), tone: "neutral" },
	{ key: "doing", label: ptL("进行中", "In progress"), tone: "info" },
	{ key: "done", label: ptL("完成", "Done"), tone: "success" },
	{ key: "shelved", label: ptL("搁置", "Shelved"), tone: "muted" },
	{ key: "archived", label: ptL("归档", "Archived"), tone: "muted" },
	{ key: "trash", label: ptL("垃圾桶", "Trash"), tone: "danger" }
];
/** localStorage key holding the board state. */
const BOARD_KEY = "dsh-enhance-tool.board";
/** Same-origin route that mirrors the board state into the profile (host half). */
const BOARD_ROUTE = "/enhancer/board";
/** Day in ms, for the "recent" auto-placement window. */
const BOARD_DAY_MS = 86400000;
/** Auto-placement window: sessions updated longer ago than this land in 归档. */
const BOARD_RECENT_DAYS = 7;
/** Unknown session ids are kept this long before the prune drops them. */
const BOARD_PRUNE_DAYS = 7;
/** Live settings written by applyState (the components read them through boardUi). */
const boardSettings = { show: true, autoFinish: true, store: "local" };
/** The sessions + workspaces services, published by apply() through ctx.inject. */
const boardBridge = { service: null, workspaces: null, listeners: /* @__PURE__ */ new Set() };
/** Publish the sessions service (and optionally the workspace controller). */
function boardSetService(service, workspaces = boardBridge.workspaces) {
	boardBridge.service = service;
	boardBridge.workspaces = workspaces;
	for (const listener of boardBridge.listeners) listener();
}
/** Publish only the workspace controller (used by the deletion chain). */
function boardSetWorkspaces(workspaces) {
	boardBridge.workspaces = workspaces;
	for (const listener of boardBridge.listeners) listener();
}
/** Subscribe to the bridge (re-renders when the service arrives). */
function useSessionsService() {
	const [, force] = (0, react.useReducer)((count) => count + 1, 0);
	(0, react.useEffect)(() => {
		boardBridge.listeners.add(force);
		return () => {
			boardBridge.listeners.delete(force);
		};
	}, []);
	return boardBridge.service;
}
/** One empty board state. */
function boardEmptyState() {
	return { version: 1, updatedAt: 0, entries: {}, collapsed: [], hidden: [], undo: [], items: {} };
}
/** Parse a persisted board payload, ignoring anything malformed. */
function boardParse(text) {
	const state = boardEmptyState();
	if (typeof text !== "string" || text === "") return state;
	try {
		const parsed = JSON.parse(text);
		if (parsed === null || typeof parsed !== "object") return state;
		const entries = parsed.entries !== null && typeof parsed.entries === "object" ? parsed.entries : {};
		for (const [id, value] of Object.entries(entries)) {
			if (value === null || typeof value !== "object") continue;
			if (typeof value.column !== "string" || !BOARD_COLUMNS.some((c) => c.key === value.column)) continue;
			state.entries[id] = {
				column: value.column,
				order: Number.isFinite(value.order) ? value.order : 0,
				manual: value.manual === true,
				at: Number.isFinite(value.at) ? value.at : 0
			};
		}
		if (Array.isArray(parsed.collapsed)) state.collapsed = parsed.collapsed.filter((k) => BOARD_COLUMNS.some((c) => c.key === k));
		if (Array.isArray(parsed.hidden)) state.hidden = parsed.hidden.filter((id) => typeof id === "string" && id !== "");
		if (Array.isArray(parsed.undo)) state.undo = parsed.undo.filter((id) => typeof id === "string" && id !== "");
		const items = parsed.items !== null && typeof parsed.items === "object" ? parsed.items : {};
		for (const [id, value] of Object.entries(items)) {
			if (id === "" || value === null || typeof value !== "object") continue;
			if (typeof value.title !== "string") continue;
			const title = value.title.trim().slice(0, BOARD_ITEM_TITLE_MAX);
			if (title === "") continue;
			state.items[id] = {
				title,
				done: value.done === true,
				at: Number.isFinite(value.at) ? value.at : 0,
				cwd: typeof value.cwd === "string" ? value.cwd : ""
			};
		}
		state.updatedAt = Number.isFinite(parsed.updatedAt) ? parsed.updatedAt : 0;
		return state;
	} catch {
		return state;
	}
}
/** Serialize the board state for storage. */
function boardSerialize(state) {
	return JSON.stringify({
		version: 1,
		updatedAt: state.updatedAt,
		entries: state.entries,
		collapsed: state.collapsed,
		hidden: state.hidden,
		undo: state.undo,
		items: state.items
	});
}
/** Longest accepted free-form to-do title. */
const BOARD_ITEM_TITLE_MAX = 200;
/** Whether an id belongs to a free-form to-do card rather than a session. */
function boardIsItem(state, id) {
	return state !== null && state !== void 0 && state.items !== null && typeof state.items === "object" && state.items[id] !== void 0;
}
/** Fresh id for a free-form to-do card (never collides with a session id). */
function boardItemId() {
	return "todo-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 1679616).toString(36);
}
/**
* Add a free-form to-do card on top of 待办 (no session involved).
* @param state - current board state.
* @param title - card text.
* @param cwd - workspace the card should run in once it becomes a session.
* @returns a new board state.
*/
function boardAddItem(state, title, cwd) {
	const text = String(title ?? "").trim().slice(0, BOARD_ITEM_TITLE_MAX);
	if (text === "") return state;
	const next = boardParse(boardSerialize(state));
	const id = boardItemId();
	next.items[id] = {
		title: text,
		done: false,
		at: Date.now(),
		cwd: typeof cwd === "string" ? cwd : ""
	};
	return boardMove(next, id, "todo", 0, true);
}
/** Edit a free-form to-do card (title and/or done flag). */
function boardUpdateItem(state, id, patch) {
	if (!boardIsItem(state, id)) return state;
	const next = boardParse(boardSerialize(state));
	const item = next.items[id];
	if (typeof patch?.title === "string") {
		const title = patch.title.trim().slice(0, BOARD_ITEM_TITLE_MAX);
		if (title !== "") item.title = title;
	}
	if (typeof patch?.done === "boolean") item.done = patch.done;
	// checking a card off files it under 完成; unchecking sends it back to 待办
	if (typeof patch?.done === "boolean") return boardMove(next, id, patch.done ? "done" : "todo", patch.done ? -1 : 0, true);
	return next;
}
/** Delete a free-form to-do card (placement included). */
function boardDeleteItem(state, id) {
	const next = boardParse(boardSerialize(state));
	delete next.items[id];
	return boardForget(next, id);
}
/**
* Turn a free-form to-do card into real work: create a Session (in the card's
* workspace when it has one) and send the card text as its first prompt.
*
* Mirrors what the composer does — `beginSubmission` registers the local echo, so
* the new session paints the pending message immediately, and `abandon()` retires
* that echo when the prompt is rejected.
*
* @param item - the free-form card.
* @param cwd - workspace for the new session (may be "").
* @returns { ok, id, prompted, reason }.
*/
async function boardRunItem(item, cwd) {
	const sessions = boardBridge.service;
	if (sessions === null || sessions === void 0 || typeof sessions.create !== "function") {
		return { ok: false, id: null, prompted: false, reason: "sessions service unavailable" };
	}
	let id;
	try {
		id = await sessions.create(cwd === void 0 || cwd === "" ? void 0 : { cwd });
	} catch (error) {
		return { ok: false, id: null, prompted: false, reason: String(error?.message ?? error).slice(0, 120) };
	}
	const face = typeof sessions.binding === "function" ? sessions.binding(id)?.session : null;
	if (face === null || face === void 0 || typeof face.prompt !== "function") {
		return { ok: true, id, prompted: false, reason: "session face unavailable" };
	}
	const handle = typeof face.beginSubmission === "function" ? face.beginSubmission({ mode: "queue", text: item.title, attachments: [] }) : null;
	let failure = "";
	try {
		const result = await face.prompt([{ type: "text", text: item.title }], "queue", void 0, handle === null ? void 0 : handle.requestId);
		if (result !== null && typeof result === "object" && result.ok === false) {
			failure = String(result.error?.message ?? result.error ?? "prompt rejected").slice(0, 120);
		}
	} catch (error) {
		failure = String(error?.message ?? error).slice(0, 120);
	}
	if (failure !== "") {
		handle?.abandon?.();
		return { ok: true, id, prompted: false, reason: failure };
	}
	return { ok: true, id, prompted: true, reason: "" };
}
/** Whether any of a session's background jobs is still running. */
function boardJobsRunning(jobs) {
	return Array.isArray(jobs) && jobs.some((job) => job !== null && (job.status === "running" || job.status === "stopping"));
}
/**
* Auto placement for a session the user has not dragged.
* @param summary - SessionSummary from the client session list.
* @param jobs - that session's background jobs.
* @param now - current epoch ms.
* @param recentDays - how long an untouched session stays in 待办.
* @returns the column key.
*/
/** Cached Session projections (host-side facts), when this client has them. */
function boardProjection(summary) {
	const pv = summary === null || summary === void 0 ? null : summary.projectionValues;
	return pv !== null && typeof pv === "object" ? pv : null;
}
/** Whether the Session has prompts queued for a later turn or step. */
function boardInboxBusy(summary) {
	const inbox = boardProjection(summary)?.inbox;
	if (inbox === null || inbox === void 0 || typeof inbox !== "object") return false;
	const queued = (key) => Array.isArray(inbox[key]) && inbox[key].length > 0;
	return queued("next-turn") || queued("next-step");
}
/** How many of the Session's own todo items are still open. */
function boardPendingTodos(summary) {
	const todos = boardProjection(summary)?.todos;
	if (!Array.isArray(todos)) return 0;
	let open = 0;
	for (const item of todos) {
		if (item === null || typeof item !== "object") continue;
		if (item.status !== "completed") open += 1;
	}
	return open;
}
/**
* Whether the last turn of a Session has been answered.
* @returns "answered" | "unanswered" | "none" (no turn) | "unknown" (projection not cached).
*/
function boardTurnState(summary) {
	const outline = boardProjection(summary)?.turnOutline;
	if (!Array.isArray(outline)) return "unknown";
	if (outline.length === 0) return "none";
	const last = outline[outline.length - 1];
	const response = last !== null && typeof last === "object" ? last.response : "";
	return typeof response === "string" && response.trim() !== "" ? "answered" : "unanswered";
}
/**
* Auto placement for a session the user has not dragged.
*
* 待办 means work that is genuinely open (an unanswered prompt or an open todo
* item), never "recently touched": a Session that already ran is 完成 while it is
* inside the recent window and 归档 afterwards. Sessions whose projections are not
* cached (cold, older Sessions) have no turn outline — they are treated as answered.
*
* @param summary - SessionSummary from the client session list.
* @param jobs - that session's background jobs.
* @param now - current epoch ms.
* @param recentDays - how long an answered session stays in 完成.
* @returns the column key.
*/
function boardAutoColumn(summary, jobs, now, recentDays) {
	if (summary === null || summary === void 0) return "todo";
	if (summary.running === true || boardJobsRunning(jobs)) return "doing";
	if (boardInboxBusy(summary)) return "doing";
	if (boardPendingTodos(summary) > 0) return "todo";
	const turn = boardTurnState(summary);
	if (turn === "unanswered") return "todo";
	const age = now - (Number.isFinite(summary.updatedAt) ? summary.updatedAt : now);
	const recent = age <= recentDays * BOARD_DAY_MS;
	// no turn at all (opened but never prompted) is still waiting on the user
	if (turn === "none") return recent ? "todo" : "archived";
	return recent ? "done" : "archived";
}
/** Next sparse order value for a column (append). */
function boardNextOrder(state, column) {
	let max = 0;
	for (const entry of Object.values(state.entries)) if (entry.column === column && Number.isFinite(entry.order)) max = Math.max(max, entry.order);
	return max + 100;
}
/**
* Move one session into a column at an index (immutable).
* @param state - current board state.
* @param id - session id.
* @param column - target column key.
* @param index - insertion index inside the target column (-1 = append).
* @param manual - whether the user performed this move (blocks auto placement).
* @returns a new board state.
*/
function boardMove(state, id, column, index, manual) {
	const next = boardParse(boardSerialize(state));
	const target = BOARD_COLUMNS.some((c) => c.key === column) ? column : "todo";
	const columnIds = Object.keys(next.entries)
		.filter((other) => other !== id && next.entries[other].column === target)
		.sort((a, b) => next.entries[a].order - next.entries[b].order);
	const at = index === null || index === void 0 || index < 0 || index > columnIds.length ? columnIds.length : index;
	const before = at > 0 ? next.entries[columnIds[at - 1]].order : null;
	const after = at < columnIds.length ? next.entries[columnIds[at]].order : null;
	let order;
	if (before === null && after === null) order = 100;
	else if (before === null) order = after - 100;
	else if (after === null) order = before + 100;
	else order = (before + after) / 2;
	next.entries[id] = { column: target, order, manual: manual === true, at: Date.now() };
	// a deliberate move means the card belongs on the board again
	next.hidden = next.hidden.filter((other) => other !== id);
	// renumber when the gap collapsed, so orders stay integers
	if (before !== null && after !== null && Math.abs(after - before) < 2) {
		const ordered = Object.keys(next.entries)
			.filter((other) => next.entries[other].column === target)
			.sort((a, b) => next.entries[a].order - next.entries[b].order);
		ordered.forEach((other, i) => {
			next.entries[other].order = (i + 1) * 100;
		});
	}
	return next;
}
/** Keep these sessions off the board without deleting them (cleared trash, failed delete). */
function boardHide(state, ids) {
	const next = boardParse(boardSerialize(state));
	const hidden = new Set(next.hidden);
	for (const id of ids) {
		if (typeof id !== "string" || id === "") continue;
		hidden.add(id);
		delete next.entries[id];
	}
	next.hidden = [...hidden];
	return next;
}
/** Remember archived-but-not-deleted sessions so the clear can be undone. */
function boardUndoAdd(state, ids) {
	const next = boardParse(boardSerialize(state));
	const undo = new Set(next.undo);
	for (const id of ids) if (typeof id === "string" && id !== "") undo.add(id);
	next.undo = [...undo];
	return next;
}
/** Forget undo entries (after a successful restore, or once the session is gone). */
function boardUndoDrop(state, ids) {
	const next = boardParse(boardSerialize(state));
	const drop = ids === void 0 || ids === null ? null : new Set(ids);
	next.undo = drop === null ? [] : next.undo.filter((id) => !drop.has(id));
	return next;
}
/** Put every hidden session back on the board. */
function boardUnhide(state, ids) {
	const next = boardParse(boardSerialize(state));
	const drop = ids === void 0 || ids === null ? null : new Set(ids);
	next.hidden = drop === null ? [] : next.hidden.filter((id) => !drop.has(id));
	return next;
}
/** Drop entries whose session disappeared (after a grace period). */
function boardPrune(state, knownIds, now) {
	const next = boardParse(boardSerialize(state));
	const known = new Set(knownIds);
	for (const [id, entry] of Object.entries(next.entries)) {
		if (known.has(id)) continue;
		if (boardIsItem(next, id)) continue; // free-form cards have no session to lose
		if (entry.at > 0 && now - entry.at <= BOARD_PRUNE_DAYS * BOARD_DAY_MS) continue;
		delete next.entries[id];
	}
	next.hidden = next.hidden.filter((id) => known.has(id) || next.entries[id] !== void 0);
	// keep undo ids while the session still exists on disk (it may just be missing
	// from the current snapshot); drop the ones whose session is really gone
	next.undo = next.undo.filter((id) => next.hidden.includes(id) || known.has(id));
	return next;
}
/**
* Resolve the board state and the live session list into the five columns.
* @param state - board state.
* @param list - SessionListState snapshot (may be null before the bridge is ready).
* @param now - current epoch ms.
* @param options - { recentDays, includeSubs, query, workspace, autoFinish }.
* @returns { columns: { key: [{ id, summary, jobs, manual, autoColumn }] }, total }.
*/
function boardView(state, list, now, options) {
	const opts = options ?? {};
	const recentDays = Number.isFinite(opts.recentDays) ? opts.recentDays : BOARD_RECENT_DAYS;
	const columns = {};
	for (const column of BOARD_COLUMNS) columns[column.key] = [];
	const ids = list !== null && list !== void 0 && Array.isArray(list.ids) ? list.ids : [];
	const byId = list !== null && list !== void 0 && list.byId !== null && typeof list.byId === "object" ? list.byId : {};
	const jobsBySession = list !== null && list !== void 0 && list.jobsBySession !== null && typeof list.jobsBySession === "object" ? list.jobsBySession : {};
	const query = typeof opts.query === "string" ? opts.query.trim().toLowerCase() : "";
	let total = 0;
	for (const id of ids) {
		const summary = byId[id];
		if (summary === void 0 || summary === null) continue;
		if (summary.blank === true) continue;
		if (state.hidden.includes(id)) continue;
		if (opts.includeSubs !== true && summary.origin === "subagent") continue;
		const jobs = jobsBySession[id] ?? [];
		const auto = boardAutoColumn(summary, jobs, now, recentDays);
		const entry = state.entries[id];
		const column = entry !== void 0 && entry.manual === true ? entry.column : auto;
		if (column === "trash" && (entry === void 0 || entry.manual !== true)) continue;
		if (query !== "") {
			const haystack = ((summary.displayTitle ?? "") + " " + (summary.cwd ?? "")).toLowerCase();
			if (!haystack.includes(query)) continue;
		}
		if (typeof opts.workspace === "string" && opts.workspace !== "") {
			const ws = opts.workspace;
			const cwd = summary.cwd ?? "";
			if (!(cwd === ws || cwd.startsWith(ws + "/"))) continue;
		}
		total += 1;
		columns[column].push({
			id,
			summary,
			jobs,
			openTodos: boardPendingTodos(summary),
			manual: entry !== void 0 && entry.manual === true,
			autoColumn: auto,
			order: entry !== void 0 && Number.isFinite(entry.order) ? entry.order : Number.MAX_SAFE_INTEGER
		});
	}
	// free-form to-do cards live beside the sessions, in the same columns
	let todoItems = 0;
	const workspaceFilter = typeof opts.workspace === "string" && opts.workspace !== "";
	for (const [id, item] of Object.entries(state.items ?? {})) {
		if (state.hidden.includes(id)) continue;
		if (workspaceFilter) continue; // a free-form card belongs to no workspace
		if (query !== "" && !item.title.toLowerCase().includes(query)) continue;
		const entry = state.entries[id];
		const column = entry !== void 0 && BOARD_COLUMNS.some((c) => c.key === entry.column) ? entry.column : "todo";
		columns[column].push({
			id,
			item,
			summary: null,
			jobs: [],
			openTodos: 0,
			manual: true,
			autoColumn: null,
			order: entry !== void 0 && Number.isFinite(entry.order) ? entry.order : Number.MAX_SAFE_INTEGER
		});
		todoItems += 1;
	}
	for (const column of BOARD_COLUMNS) columns[column.key].sort((a, b) => a.order - b.order || (b.summary?.updatedAt ?? b.item?.at ?? 0) - (a.summary?.updatedAt ?? a.item?.at ?? 0));
	return { columns, total, todoItems };
}
/** Human relative time, mirroring the sidebar's compact style. */
function boardRelTime(ms, now) {
	const diff = Math.max(0, now - (Number.isFinite(ms) ? ms : now));
	if (diff < 60000) return ptL("刚刚", "just now");
	if (diff < 3600000) return ptL(Math.floor(diff / 60000) + "分钟", Math.floor(diff / 60000) + "m");
	if (diff < BOARD_DAY_MS) return ptL(Math.floor(diff / 3600000) + "小时", Math.floor(diff / 3600000) + "h");
	if (diff < 30 * BOARD_DAY_MS) return ptL(Math.floor(diff / BOARD_DAY_MS) + "天", Math.floor(diff / BOARD_DAY_MS) + "d");
	const d = new Date(ms);
	return ptL((d.getMonth() + 1) + "月" + d.getDate() + "日", (d.getMonth() + 1) + "/" + d.getDate());
}
/** Short workspace label: the cwd's last path segment. */
function boardWorkspace(summary) {
	const cwd = summary !== null && summary !== void 0 && typeof summary.cwd === "string" ? summary.cwd : "";
	const parts = cwd.split("/").filter((part) => part !== "");
	return parts.length === 0 ? "" : parts[parts.length - 1];
}

/** Board UI state, shared by the header button and the modal. */
const boardUi = { open: false, select: false, query: "", workspace: "", subs: false, all: false, dragged: null, over: null, menuFor: null, picked: [], confirmClear: false, more: {} };
/** Cards rendered per column before the 显示更多 button takes over. */
const BOARD_COLUMN_PAGE = 20;
const boardUiListeners = /* @__PURE__ */ new Set();
/** Patch the board UI state and notify React consumers. */
function boardPatch(patch) {
	Object.assign(boardUi, patch);
	for (const listener of boardUiListeners) listener();
}
/** Subscribe to the board UI state. */
function useBoardUi() {
	const [, force] = (0, react.useReducer)((count) => count + 1, 0);
	(0, react.useEffect)(() => {
		boardUiListeners.add(force);
		return () => {
			boardUiListeners.delete(force);
		};
	}, []);
	return boardUi;
}
/** Read the board state from localStorage. */
function boardReadLocal() {
	try {
		return boardParse(localStorage.getItem(BOARD_KEY));
	} catch {
		return boardEmptyState();
	}
}
/** Write the board state to localStorage. */
function boardWriteLocal(state) {
	try {
		localStorage.setItem(BOARD_KEY, boardSerialize(state));
	} catch {}
}
/** Fetch the profile copy (null when the host route is not active yet). */
async function boardHostLoad() {
	try {
		const response = await fetch(BOARD_ROUTE, { headers: { accept: "application/json" } });
		if (!response.ok) return null;
		const payload = await response.json();
		if (payload === null || typeof payload !== "object" || payload.ok !== true) return null;
		return payload.state === null || typeof payload.state !== "object" ? null : boardParse(JSON.stringify(payload.state));
	} catch {
		return null;
	}
}
/** Push the board state to the profile copy. */
async function boardHostSave(state) {
	try {
		await fetch(BOARD_ROUTE, { method: "POST", headers: { "content-type": "application/json" }, body: boardSerialize(state) });
	} catch {}
}
let boardSaveTimer = 0;
let boardPendingState = null;
/** Persist the board state (localStorage now, profile copy debounced). */
function boardSaveState(state) {
	boardWriteLocal(state);
	if (boardSettings.store !== "profile") return;
	boardPendingState = state;
	if (boardSaveTimer !== 0) return;
	boardSaveTimer = window.setTimeout(() => {
		boardSaveTimer = 0;
		const pending = boardPendingState;
		boardPendingState = null;
		if (pending !== null) boardHostSave(pending);
	}, 800);
}
/** In-memory board state shared by the modal and the running-transition watcher. */
let boardCache = null;
const boardStateListeners = /* @__PURE__ */ new Set();
/** Current board state (lazily loaded from storage). */
function boardState() {
	if (boardCache === null) boardCache = boardReadLocal();
	return boardCache;
}
/** Commit a new board state (cache + persist + notify). */
function boardCommit(next) {
	next.updatedAt = Date.now();
	boardCache = next;
	boardSaveState(next);
	for (const listener of boardStateListeners) listener(next);
	return next;
}
/** Subscribe to board state changes. */
function useBoardState() {
	const [snapshot, setSnapshot] = (0, react.useState)(() => boardState());
	(0, react.useEffect)(() => {
		const listener = (next) => setSnapshot(next);
		boardStateListeners.add(listener);
		setSnapshot(boardState());
		return () => {
			boardStateListeners.delete(listener);
		};
	}, []);
	return snapshot;
}
/** Reconcile localStorage with the profile copy (newest updatedAt wins). */
async function boardReconcile() {
	if (boardSettings.store !== "profile") return;
	const host = await boardHostLoad();
	const local = boardReadLocal();
	if (host === null) {
		boardHostSave(local);
		return;
	}
	if (host.updatedAt > local.updatedAt) boardCommit(host);
	else if (local.updatedAt > host.updatedAt) boardHostSave(local);
}
/** Track running -> idle transitions for 进行中 cards that the user placed manually. */
const boardPrevRunning = /* @__PURE__ */ new Map();
/** Move a manually-placed 进行中 session into 完成 once its turn (and jobs) end. */
function boardWatchRunning(list) {
	if (list === null || list === void 0 || boardSettings.autoFinish !== true) return;
	const ids = Array.isArray(list.ids) ? list.ids : [];
	const byId = list.byId ?? {};
	const jobsBySession = list.jobsBySession ?? {};
	let next = null;
	for (const id of ids) {
		const summary = byId[id];
		if (summary === void 0 || summary === null) continue;
		const running = summary.running === true || boardJobsRunning(jobsBySession[id] ?? []);
		const was = boardPrevRunning.get(id) === true;
		boardPrevRunning.set(id, running);
		if (!was || running) continue;
		const state = next ?? boardState();
		const entry = state.entries[id];
		if (entry === void 0 || entry.manual !== true || entry.column !== "doing") continue;
		// manual=false hands the card back to the auto rules, which now say 完成
		next = boardMove(state, id, "done", -1, false);
	}
	if (next !== null) boardCommit(next);
}
/** Route base of the session-archive plugin that owns real session deletion. */
const BOARD_ARCHIVE_BASE = "/plugins/dsh-archived-chats";
/**
* Delete sessions for real: move them into the archive plugin's recycle store (which
* archives them and disposes live instances safely) and then purge them from disk.
* dsh core exposes no delete API of its own, so this plugin is the only safe path;
* when it is absent the caller falls back to board-only removal.
* @param ids - session ids to delete.
* @returns { deleted: string[], failed: string[], unavailable: boolean }.
*/
async function boardDeleteSessions(ids) {
	const out = { deleted: [], failed: [], unavailable: false, reasons: new Map(), archived: [] };
	if (!Array.isArray(ids) || ids.length === 0) return out;
	// The archive plugin guards its mutating routes with a CSRF-style header
	// (`x-dsh-archived-chats: 1`); without it every POST answers 403 forbidden.
	// It also answers 409 with a structured body for per-id failures, so the status
	// code alone must not be read as "route missing" — only a transport error or a
	// 404/405 is treated as unavailable.
	const post = async (path, body) => {
		let response;
		try {
			response = await fetch(BOARD_ARCHIVE_BASE + path, {
				method: "POST",
				headers: { "content-type": "application/json", "x-dsh-archived-chats": "1" },
				body: JSON.stringify(body)
			});
		} catch {
			return { transportFailed: true };
		}
		if (response.status === 404 || response.status === 405) return { transportFailed: true };
		try {
			const text = await response.text();
			return text === "" ? { ok: response.ok } : JSON.parse(text);
		} catch {
			return { transportFailed: true };
		}
	};
	const idOf = (entry) => String(entry !== null && typeof entry === "object" ? entry.id ?? "" : entry ?? "");
	// The archive plugin only trashes sessions it owns, so archive through the core
	// workspace controller first (that is exactly what its own delete flow does).
	const workspaces = boardBridge.workspaces;
	const archiveError = new Map();
	if (workspaces !== null && typeof workspaces.archiveSession === "function") {
		const archived = new Set((workspaces.list?.getSnapshot?.()?.archivedSessionIds ?? []).map(String));
		for (const id of ids) {
			if (archived.has(id)) continue;
			try {
				await workspaces.archiveSession(id);
				// archiving hides the session from the sidebar, so a delete that fails
				// afterwards must stay undoable
				out.archived.push(id);
			} catch (error) {
				// the trash move below reports the outcome, but keep the reason for the note
				archiveError.set(id, String(error?.message ?? error).slice(0, 120));
			}
		}
	}
	const moved = await post("/delete-all", { sessionIds: ids });
	if (moved.transportFailed === true) {
		out.unavailable = true;
		out.failed.push(...ids);
		return out;
	}
	const trashed = (moved.trashed ?? []).map(idOf).filter((id) => id !== "");
	for (const entry of moved.failed ?? []) {
		const id = idOf(entry);
		out.failed.push(id);
		const reason = entry !== null && typeof entry === "object" ? entry.reason ?? entry.code : void 0;
		if (typeof reason === "string") out.reasons.set(id, reason);
	}
	for (const [id, reason] of archiveError) if (!out.reasons.has(id)) out.reasons.set(id, "archive: " + reason);
	if (trashed.length === 0) return out;
	const purged = await post("/trash/purge", { ids: trashed });
	if (purged.transportFailed !== true && purged.ok === true) out.deleted.push(...(purged.purged ?? trashed).map(idOf));
	else out.failed.push(...trashed);
	return out;
}
/**
 * Undo a board clear that could not really delete: unarchive the sessions (which
 * is what made them disappear from the sidebar) and put them back on the board.
 */
async function boardRestoreArchived(ids) {
	if (!Array.isArray(ids) || ids.length === 0) return { ok: true, restored: [], failed: [] };
	let response;
	try {
		response = await fetch(BOARD_ARCHIVE_BASE + "/unarchive-all", {
			method: "POST",
			headers: { "content-type": "application/json", "x-dsh-archived-chats": "1" },
			body: JSON.stringify({ sessionIds: ids })
		});
	} catch {
		return { ok: false, restored: [], failed: ids };
	}
	if (!response.ok && response.status !== 409) return { ok: false, restored: [], failed: ids };
	let body = {};
	try {
		body = JSON.parse((await response.text()) || "{}");
	} catch { /* keep ok/failed from the status code */ }
	const failed = (body?.failed ?? []).map((entry) => String(entry?.id ?? entry ?? "")).filter((id) => id !== "");
	const restored = ids.filter((id) => !failed.includes(id));
	return { ok: failed.length === 0, restored, failed };
}
/** Forget one session's placement so the auto rules own it again. */
function boardForget(state, id) {
	const next = boardParse(boardSerialize(state));
	delete next.entries[id];
	return next;
}
/**
* A free-form to-do card: no session behind it, so the title is editable in place
* and a checkbox files it under 完成.
*/
function BoardItemCard({ card, ui, now, onMove, onDelete, onUpdate, onRun, busy }) {
	const item = card.item;
	const [draft, setDraft] = (0, react.useState)(null);
	const editing = draft !== null;
	const finish = (commit) => {
		if (commit && draft !== null && draft.trim() !== "" && draft.trim() !== item.title) onUpdate(card.id, { title: draft });
		setDraft(null);
	};
	return jsxs("div", {
		"data-enhc-card": card.id,
		"data-enhc-item": "true",
		draggable: ui.select !== true,
		tabIndex: 0,
		className: "enhc-board-card enhc-board-item",
		"data-done": item.done === true ? "true" : void 0,
		"data-busy": busy ? "true" : void 0,
		"data-dragging": ui.dragged === card.id ? "true" : void 0,
		"data-menu": ui.menuFor === card.id ? "true" : void 0,
		onDragStart: (event) => {
			if (ui.select === true) return;
			event.dataTransfer.setData("text/plain", card.id);
			event.dataTransfer.effectAllowed = "move";
			boardPatch({ dragged: card.id, over: null, menuFor: null });
		},
		onDragEnd: () => boardPatch({ dragged: null, over: null }),
		onClick: () => {
			if (ui.select === true) {
				boardPatch({ picked: ui.picked.includes(card.id) ? ui.picked.filter((id) => id !== card.id) : [...ui.picked, card.id] });
				return;
			}
			if (editing || busy) return;
			onRun(card.id);
		},
		onKeyDown: (event) => {
			if (event.key === "m" || event.key === "M") {
				event.preventDefault();
				boardPatch({ menuFor: ui.menuFor === card.id ? null : card.id });
			} else if (event.key === "Enter" && !editing) {
				event.preventDefault();
				if (!busy) onRun(card.id);
			} else if (event.key === "e" || event.key === "E") {
				event.preventDefault();
				setDraft(item.title);
			}
		},
		children: [
			jsx("button", {
				key: "menu-btn",
				type: "button",
				className: "enhc-board-icon enhc-board-card-menu",
				title: ptL("移动 / 删除（M）", "Move / delete (M)"),
				"aria-label": ptL("移动 / 删除", "Move / delete"),
				onClick: (event) => {
					event.stopPropagation();
					boardPatch({ menuFor: ui.menuFor === card.id ? null : card.id });
				},
				children: "⋯"
			}),
			editing ? jsx("input", {
				key: "edit",
				className: "enhc-board-item-input",
				autoFocus: true,
				value: draft,
				onChange: (event) => setDraft(event.currentTarget.value),
				onClick: (event) => event.stopPropagation(),
				onKeyDown: (event) => {
					event.stopPropagation();
					if (event.key === "Enter") finish(true);
					else if (event.key === "Escape") finish(false);
				},
				onBlur: () => finish(true)
			}) : jsxs("div", { key: "head", className: "enhc-board-card-title", children: [
				ui.select === true ? jsx("input", { type: "checkbox", className: "enhc-board-checkbox", checked: ui.picked.includes(card.id), readOnly: true, tabIndex: -1, style: { marginRight: 6 } }) : null,
				item.title
			] }),
			jsxs("div", { key: "meta", className: "enhc-board-card-meta", children: [
				jsx("label", {
					className: "enhc-board-item-check",
					onClick: (event) => event.stopPropagation(),
					children: [
						jsx("input", {
							type: "checkbox",
							className: "enhc-board-checkbox",
							checked: item.done === true,
							onChange: (event) => onUpdate(card.id, { done: event.currentTarget.checked })
						}),
						jsx("span", { children: item.done === true ? ptL("已完成", "done") : ptL("待办项", "to-do") })
					]
				}),
				boardWorkspace(item) !== "" ? jsx("span", { className: "enhc-board-ws", children: boardWorkspace(item) }) : null,
				jsx("span", { className: "enhc-board-card-time", children: boardRelTime(item.at, now) }),
				editing ? null : jsx("button", {
					type: "button",
					className: "enhc-board-item-run",
					title: ptL("创建会话并执行这条待办", "Create a session and run this to-do"),
					onClick: (event) => {
						event.stopPropagation();
						if (!busy) onRun(card.id);
					},
					children: busy ? ptL("创建中…", "creating…") : ptL("▶ 执行", "▶ Run")
				}),
				editing ? null : jsx("button", {
					type: "button",
					className: "enhc-board-item-edit",
					title: ptL("重命名（E）", "Rename (E)"),
					"aria-label": ptL("重命名", "Rename"),
					onClick: (event) => {
						event.stopPropagation();
						setDraft(item.title);
					},
					children: "✎"
				})
			] }),
			ui.menuFor === card.id ? jsxs("div", { key: "menu", className: "enhc-board-menu", children: [
				jsx("button", {
					type: "button",
					onClick: (event) => {
						event.stopPropagation();
						onRun(card.id);
					},
					children: ptL("▶ 创建会话并执行", "▶ Create a session and run")
				}, "run"),
				jsx("button", {
					type: "button",
					onClick: (event) => {
						event.stopPropagation();
						setDraft(item.title);
						boardPatch({ menuFor: null });
					},
					children: ptL("重命名", "Rename")
				}, "rename"),
				...BOARD_COLUMNS.filter((target) => target.key !== "trash").map((target) => jsx("button", {
					type: "button",
					onClick: (event) => {
						event.stopPropagation();
						onMove(card.id, target.key);
					},
					children: target.label
				}, target.key)),
				jsx("button", {
					type: "button",
					onClick: (event) => {
						event.stopPropagation();
						onDelete(card.id);
					},
					children: ptL("删除", "Delete")
				}, "delete")
			] }) : null
		]
	});
}
/** The "＋ 新建待办" row at the bottom of the 待办 column. */
function BoardAddItem({ onAdd }) {
	const [text, setText] = (0, react.useState)("");
	const [open, setOpen] = (0, react.useState)(false);
	const commit = (keepOpen) => {
		if (text.trim() !== "") onAdd(text);
		setText("");
		if (!keepOpen) setOpen(false);
	};
	if (!open) {
		return jsx("button", {
			type: "button",
			className: "enhc-board-add",
			onClick: () => setOpen(true),
			children: ptL("＋ 新建待办", "+ New task")
		});
	}
	return jsx("input", {
		className: "enhc-board-item-input enhc-board-add-input",
		autoFocus: true,
		value: text,
		placeholder: ptL("写点要做的，回车添加", "What needs doing? Enter to add"),
		onChange: (event) => setText(event.currentTarget.value),
		onKeyDown: (event) => {
			event.stopPropagation();
			if (event.key === "Enter") commit(true);
			else if (event.key === "Escape") {
				setText("");
				setOpen(false);
			}
		},
		onBlur: () => commit(false)
	});
}
/** One board card. */
function BoardCard({ card, column, ui, now, onOpen, onMove, onForget }) {
	const summary = card.summary;
	const workspace = boardWorkspace(summary);
	const running = summary.running === true || boardJobsRunning(card.jobs);
	const badges = [];
	if (running) badges.push(jsx("span", { key: "run", className: "enhc-board-badge", "data-tone": "info", children: ptL("● 运行中", "● running") }));
	if (boardTurnState(summary) === "unanswered") badges.push(jsx("span", { key: "wait", className: "enhc-board-badge", "data-tone": "info", children: ptL("… 等待回复", "… awaiting reply") }));
	if (card.jobs.length > 0) badges.push(jsx("span", { key: "jobs", className: "enhc-board-badge", children: ptL("⏱ " + card.jobs.length + " 个后台任务", "⏱ " + card.jobs.length + " jobs") }));
	if (card.openTodos > 0) badges.push(jsx("span", { key: "todos", className: "enhc-board-badge", "data-tone": "info", children: ptL("☑ " + card.openTodos + " 项待办", "☑ " + card.openTodos + " open") }));
	if (boardInboxBusy(summary)) badges.push(jsx("span", { key: "queue", className: "enhc-board-badge", children: ptL("⏳ 有排队消息", "⏳ queued") }));
	if (summary.origin === "subagent") badges.push(jsx("span", { key: "sub", className: "enhc-board-badge", children: ptL("子会话", "subagent") }));
	const picked = ui.picked.includes(card.id);
	return jsxs("div", {
		"data-enhc-card": card.id,
		draggable: ui.select !== true,
		tabIndex: 0,
		className: "enhc-board-card",
		"data-dragging": ui.dragged === card.id ? "true" : void 0,
		"data-current": summary.id === (boardBridge.service?.list?.getSnapshot?.()?.current ?? null) ? "true" : void 0,
		"data-menu": ui.menuFor === card.id ? "true" : void 0,
		onDragStart: (event) => {
			if (ui.select === true) return;
			event.dataTransfer.setData("text/plain", card.id);
			event.dataTransfer.effectAllowed = "move";
			boardPatch({ dragged: card.id, over: null, menuFor: null });
		},
		onDragEnd: () => boardPatch({ dragged: null, over: null }),
		onClick: () => {
			if (ui.select === true) boardPatch({ picked: picked ? ui.picked.filter((id) => id !== card.id) : [...ui.picked, card.id] });
			else onOpen(card.id);
		},
		onKeyDown: (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				onOpen(card.id);
			} else if (event.key === "m" || event.key === "M") {
				event.preventDefault();
				boardPatch({ menuFor: ui.menuFor === card.id ? null : card.id });
			}
		},
		children: [
			jsx("button", {
				key: "menu-btn",
				type: "button",
				className: "enhc-board-icon enhc-board-card-menu",
				title: ptL("移动 / 更多（M）", "Move / more (M)"),
				"aria-label": ptL("移动 / 更多", "Move / more"),
				onClick: (event) => {
					event.stopPropagation();
					boardPatch({ menuFor: ui.menuFor === card.id ? null : card.id });
				},
				children: "⋯"
			}),
			jsxs("div", { key: "head", className: "enhc-board-card-title", children: [
				ui.select === true ? jsx("input", { type: "checkbox", className: "enhc-board-checkbox", checked: picked, readOnly: true, tabIndex: -1, style: { marginRight: 6 } }) : null,
				summary.displayTitle ?? summary.id
			] }),
			jsxs("div", { key: "meta", className: "enhc-board-card-meta", children: [
				workspace !== "" ? jsx("span", { className: "enhc-board-ws", children: workspace }) : null,
				workspace !== "" ? jsx("span", { children: "·" }) : null,
				jsx("span", { className: "enhc-board-card-time", children: boardRelTime(summary.updatedAt, now) }),
				// "auto" is the default state, so only a pinned card is worth marking
				card.manual === true ? jsx("span", { className: "enhc-board-card-auto", children: ptL("· 手动", "· pinned") }) : null,
				column === "trash" ? jsx("button", {
					type: "button",
					className: "enhc-board-icon enhc-board-card-restore",
					title: ptL("恢复到自动归类", "Back to auto"),
					onClick: (event) => {
						event.stopPropagation();
						onForget(card.id);
					},
					children: ptL("恢复", "Restore")
				}) : null
			] }),
			badges.length > 0 ? jsx("div", { key: "badges", className: "enhc-board-card-badges", children: badges }) : null,
			ui.menuFor === card.id ? jsxs("div", { key: "menu", className: "enhc-board-menu", children: [
				...BOARD_COLUMNS.map((target) => jsx("button", {
					type: "button",
					onClick: (event) => {
						event.stopPropagation();
						onMove(card.id, target.key);
					},
					children: target.label
				}, target.key)),
				card.manual === true ? jsx("button", {
					type: "button",
					onClick: (event) => {
						event.stopPropagation();
						onForget(card.id);
					},
					children: ptL("重置为自动", "Reset to auto")
				}, "auto") : null
			] }) : null
		]
	});
}
/** The board modal. */
function BoardDialog() {
	boardCss();
	const ui = useBoardUi();
	const service = useSessionsService();
	const state = useBoardState();
	const [list, setList] = (0, react.useState)(null);
	const [purgeBusy, setPurgeBusy] = (0, react.useState)(false);
	const [purgeNote, setPurgeNote] = (0, react.useState)("");
	const [note, setNote] = (0, react.useState)("");
	const [runBusy, setRunBusy] = (0, react.useState)(null);
	const colRefs = (0, react.useRef)({});
	// live session list; the membership check doubles as the prune trigger, so
	// placements of sessions that no longer exist cannot pile up forever
	const prunedCount = (0, react.useRef)(-1);
	(0, react.useEffect)(() => {
		const source = service === null || service === void 0 ? null : service.list;
		if (source === null || source === void 0 || typeof source.getSnapshot !== "function") {
			const timer = window.setTimeout(() => setList(null), 0);
			return () => window.clearTimeout(timer);
		}
		const sync = () => {
			const snapshot = source.getSnapshot();
			setList(snapshot);
			const ids = Array.isArray(snapshot?.ids) ? snapshot.ids : [];
			if (ids.length === prunedCount.current) return;
			prunedCount.current = ids.length;
			const current = boardState();
			const pruned = boardPrune(current, ids, Date.now());
			if (boardSerialize(pruned) !== boardSerialize(current)) boardCommit(pruned);
		};
		sync();
		return source.subscribe(sync);
	}, [service, ui.open]);
	// reconcile with the profile copy whenever the modal opens
	(0, react.useEffect)(() => {
		if (ui.open) boardReconcile();
	}, [ui.open]);
	// Esc closes
	(0, react.useEffect)(() => {
		if (!ui.open) return;
		const onKey = (event) => {
			if (event.key === "Escape") boardPatch({ open: false, menuFor: null, confirmClear: false, picked: [] });
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [ui.open]);
	if (!ui.open || boardSettings.show !== true) return null;
	const now = Date.now();
	const view = boardView(state, list, now, {
		recentDays: ui.all ? 36500 : BOARD_RECENT_DAYS,
		includeSubs: ui.subs,
		query: ui.query,
		workspace: ui.workspace
	});
	const openSession = (id) => {
		const sessions = boardBridge.service;
		if (sessions !== null && sessions !== void 0 && typeof sessions.open === "function") sessions.open(id);
		boardPatch({ open: false, menuFor: null });
	};
	const move = (id, column, index) => boardCommit(boardMove(state, id, column, index ?? -1, true));
	const forget = (id) => boardCommit(boardForget(state, id));
	/** Workspace a free-form card should run in: its own, else the filter/current session. */
	const itemCwd = (item) => {
		if (typeof item.cwd === "string" && item.cwd !== "") return item.cwd;
		if (ui.workspace !== "") return ui.workspace;
		const current = list !== null && list !== void 0 ? list.byId?.[list.current] : null;
		return typeof current?.cwd === "string" ? current.cwd : "";
	};
	const addItem = (title) => boardCommit(boardAddItem(state, title, ui.workspace !== "" ? ui.workspace : (list !== null && list !== void 0 ? list.byId?.[list.current]?.cwd ?? "" : "")));
	/**
	* Free-form card -> real work: create a session, send the card text as its first
	* prompt, then retire the card (the live session card takes over in 进行中).
	*/
	const runItem = async (id) => {
		const item = boardState().items[id];
		if (item === void 0 || runBusy !== null) return;
		setRunBusy(id);
		setNote(ptL("正在创建会话…", "Creating a session…"));
		const result = await boardRunItem(item, itemCwd(item));
		setRunBusy(null);
		if (result.ok !== true) {
			setNote(ptL("创建会话失败：" + result.reason, "Could not create a session: " + result.reason));
			return;
		}
		boardCommit(boardDeleteItem(boardState(), id));
		if (result.prompted === true) {
			setNote(ptL("已创建会话并开始执行：「" + item.title.slice(0, 30) + "」——「进行中」里可以看到它", "Session created and running: \"" + item.title.slice(0, 30) + "\" — see 进行中"));
		} else {
			setNote(ptL("会话已创建，但首条消息没发出去（" + result.reason + "）——已帮你打开它", "Session created, but the first message failed (" + result.reason + ") — opening it for you"));
			openSession(result.id);
		}
	};
	const updateItem = (id, patch) => boardCommit(boardUpdateItem(state, id, patch));
	const deleteItem = (id) => boardCommit(boardDeleteItem(state, id));
	/**
	* Empty the 垃圾桶: really delete the sessions (archive plugin) and drop their
	* placements. Falls back to board-only removal when that plugin is missing, and
	* says which of the two happened.
	*/
	const purgeTrash = async (ids) => {
		setPurgeBusy(true);
		setPurgeNote("");
		// free-form cards are board data, not sessions: emptying the trash just drops them
		const sessionIds = ids.filter((id) => !boardIsItem(state, id));
		const itemIds = ids.filter((id) => boardIsItem(state, id));
		let next = state;
		for (const id of itemIds) next = boardDeleteItem(next, id);
		const result = sessionIds.length === 0
			? { deleted: [], failed: [], unavailable: false, reasons: new Map(), archived: [] }
			: await boardDeleteSessions(sessionIds);
		// whatever was really deleted disappears with the session; the rest stays off the
		// board (and out of the trash column) instead of bouncing back into 待办/归档
		const undoable = result.archived.filter((id) => !result.deleted.includes(id));
		let nextState = boardUndoAdd(boardHide(next, sessionIds), undoable);
		// Archiving is what makes a session vanish from the sidebar, so a delete that
		// failed afterwards must put it back on its own — leaving sessions archived is a
		// silent data change. What the plugin still refuses stays undoable by hand.
		let restoredCount = 0;
		if (undoable.length > 0) {
			const restored = await boardRestoreArchived(undoable);
			restoredCount = restored.restored.length;
			if (restoredCount > 0) nextState = boardUndoDrop(nextState, restored.restored);
		}
		boardCommit(nextState);
		boardPatch({ confirmClear: false });
		setPurgeBusy(false);
		const firstReason = [...result.reasons.values()][0] ?? "";
		const tail = undoable.length === 0
			? ""
			: ptL("；" + undoable.length + " 个未删除，已从看板移除" + (restoredCount === undoable.length ? "并已取消归档（会话仍在侧栏）" : restoredCount > 0 ? "，其中 " + restoredCount + " 个已取消归档" : "，但它们仍处于归档状态——用上方「撤销归档」放回侧栏"), "; " + undoable.length + " not deleted, removed from this board" + (restoredCount === undoable.length ? " and unarchived (still in the sidebar)" : restoredCount > 0 ? ", " + restoredCount + " unarchived" : ", but they stay archived — use 撤销归档 to put them back"));
		setPurgeNote(result.unavailable
			? ptL("未安装 dsh-archived-chats：仅从看板移除，会话数据未删除（未安装该插件时无法真删）", "Archive plugin missing: removed from this board only — a real delete needs dsh-archived-chats")
			: ptL("已删除 " + result.deleted.length + " 个会话" + (result.failed.length > 0 ? "；未删除 " + result.failed.length + " 个（" + firstReason + "）" : "") + tail,
				"deleted " + result.deleted.length + (result.failed.length > 0 ? "; " + result.failed.length + " not deleted (" + firstReason + ")" : "") + tail));
	};
	const withPicked = (column) => {
		let next = state;
		// every batch move is a user decision, so it must survive the auto rules
		for (const id of ui.picked) next = boardMove(next, id, column, -1, true);
		boardCommit(next);
		boardPatch({ picked: [] });
	};
	const columnRef = (key) => (el) => {
		if (el === null) delete colRefs.current[key];
		else colRefs.current[key] = el;
	};
	const dropIndex = (event, column) => {
		const body = colRefs.current[column];
		if (body === void 0) return -1;
		const cards = [...body.querySelectorAll("[data-enhc-card]")];
		for (let i = 0; i < cards.length; i += 1) {
			const rect = cards[i].getBoundingClientRect();
			if (event.clientY < rect.top + rect.height / 2) return i;
		}
		return cards.length;
	};
	const workspaces = [...new Set((list?.ids ?? []).map((id) => list.byId[id]?.cwd).filter((cwd) => typeof cwd === "string" && cwd !== ""))].sort();
	return jsx("div", {
		className: "enhc-board-overlay",
		onClick: (event) => {
			if (event.target === event.currentTarget) boardPatch({ open: false, menuFor: null, picked: [] });
		},
		children: jsxs("div", {
			className: "enhc-board",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": ptL("任务看板", "Task board"),
			children: [
				jsxs("div", { key: "head", className: "enhc-board-header", children: [
					jsx("div", { className: "enhc-board-title", children: ptL("任务看板", "Task board") }),
					note !== "" ? jsx("span", { className: "enhc-board-note", children: note }) : null,
					jsx("span", { className: "enhc-board-count", children: ptL("共 " + view.total + " 个会话" + (view.todoItems > 0 ? " · " + view.todoItems + " 条待办" : ""), view.total + " sessions" + (view.todoItems > 0 ? " · " + view.todoItems + " tasks" : "")) }),
					jsx("button", {
						type: "button",
						className: "enhc-board-close",
						"aria-label": ptL("关闭", "Close"),
						onClick: () => boardPatch({ open: false, menuFor: null, picked: [] }),
						children: jsx("svg", { viewBox: "0 0 16 16", width: 16, height: 16, fill: "none", "aria-hidden": true, children: jsx("path", { d: "M14.1168 13.197L13.197 14.1167L1.8833 2.80303L2.80309 1.88324L14.1168 13.197ZM13.197 1.88326L14.1168 2.80305L2.80309 14.1168L1.8833 13.197L13.197 1.88326Z", fill: "currentColor" }) })
					})
				] }),
				jsxs("div", { key: "toolbar", className: "enhc-board-toolbar", children: [
					jsx("input", {
						className: "enhc-board-search",
						placeholder: ptL("搜索会话…", "Search sessions…"),
						value: ui.query,
						onChange: (event) => boardPatch({ query: event.currentTarget.value, more: {} })
					}),
					workspaces.length > 1 ? jsx("select", {
						className: "enhc-board-select",
						value: ui.workspace,
						onChange: (event) => boardPatch({ workspace: event.currentTarget.value, more: {} }),
						children: [
							jsx("option", { value: "", children: ptL("全部工作区", "All workspaces") }, "all"),
							...workspaces.map((cwd) => jsx("option", { value: cwd, children: cwd.split("/").filter((part) => part !== "").pop() ?? cwd }, cwd))
						]
					}) : null,
					jsx("span", { className: "enhc-board-sep" }),
					jsx("button", {
						type: "button",
						className: "enhc-board-toggle",
						"aria-pressed": ui.subs,
						onClick: () => boardPatch({ subs: !ui.subs, more: {} }),
						children: ptL("含子会话", "Subagents")
					}),
					jsx("button", {
						type: "button",
						className: "enhc-board-toggle",
						"aria-pressed": ui.all,
						onClick: () => boardPatch({ all: !ui.all, more: {} }),
						children: ptL("显示全部", "Show all")
					}),
					jsx("span", { className: "enhc-board-sep" }),
					jsx("button", {
						type: "button",
						className: "enhc-board-toggle",
						"aria-pressed": ui.select,
						onClick: () => boardPatch({ select: !ui.select, picked: [], menuFor: null }),
						children: ptL("批量选择", "Select")
					}),
					ui.select && ui.picked.length > 0 ? jsxs("div", { className: "enhc-board-batch", children: [
						jsx("span", { className: "enhc-board-batch-text", children: ptL("已选 " + ui.picked.length, ui.picked.length + " selected") }),
						...BOARD_COLUMNS.map((column) => jsx("button", {
							type: "button",
							className: "enhc-board-pill",
							style: { height: 28, padding: "0 10px", fontSize: 12 },
							onClick: () => withPicked(column.key),
							children: column.label
						}, column.key)),
						jsx("button", { type: "button", className: "enhc-board-pill", style: { height: 28, padding: "0 10px", fontSize: 12 }, onClick: () => boardPatch({ picked: [] }), children: ptL("清除", "Clear") })
					] }) : null
				] }),
				jsx("div", { key: "cols", className: "enhc-board-cols", children: BOARD_COLUMNS.map((column) => {
					const cards = view.columns[column.key];
					const collapsed = state.collapsed.includes(column.key);
					// free-form cards have no session timestamp; they never go "stale"
					const stale = ui.all ? [] : cards.filter((card) => card.summary !== null && now - (card.summary.updatedAt ?? now) > BOARD_RECENT_DAYS * BOARD_DAY_MS);
					// long columns (归档 often holds 80+ sessions) render in pages
					const visible = ui.query !== "" || ui.select === true ? cards : cards.slice(0, BOARD_COLUMN_PAGE + (ui.more[column.key] ?? 0));
					const over = ui.over !== null && ui.over.column === column.key ? ui.over.index : -1;
					return jsxs("div", {
						className: "enhc-board-col",
						"data-tone": column.tone,
						"data-collapsed": collapsed ? "true" : void 0,
						// highlighted for our own card drags AND for sessions dragged in from the sidebar
						"data-over": ui.over !== null && ui.over.column === column.key ? "true" : void 0,
						onDragOver: (event) => {
							event.preventDefault();
							event.dataTransfer.dropEffect = "move";
							const index = dropIndex(event, column.key);
							if (ui.over === null || ui.over.column !== column.key || ui.over.index !== index) boardPatch({ over: { column: column.key, index } });
						},
						onDragLeave: (event) => {
							if (event.currentTarget.contains(event.relatedTarget)) return;
							boardPatch({ over: null });
						},
						onDrop: (event) => {
							event.preventDefault();
							const id = event.dataTransfer.getData("text/plain") || ui.dragged;
							const index = ui.over !== null && ui.over.column === column.key ? ui.over.index : -1;
							boardPatch({ dragged: null, over: null });
							if (typeof id === "string" && id !== "") move(id, column.key, index);
						},
						children: [
							jsxs("div", { key: "h", className: "enhc-board-col-header", children: [
								jsx("button", {
									type: "button",
									className: "enhc-board-icon",
									title: ptL("折叠 / 展开", "Collapse / expand"),
									"aria-label": ptL("折叠 / 展开", "Collapse / expand"),
									onClick: () => boardCommit({ ...state, collapsed: collapsed ? state.collapsed.filter((key) => key !== column.key) : [...state.collapsed, column.key] }),
									children: collapsed ? "▸" : "▾"
								}),
								// a collapsed column keeps its label (vertical) so the strip stays readable
								jsx("span", { className: "enhc-board-col-name", children: column.label }),
								!collapsed ? jsx("span", { className: "enhc-board-col-count", children: String(cards.length) }) : null,
								!collapsed ? jsxs("div", { className: "enhc-board-col-actions", children: [
									column.key === "todo" && stale.length > 0 ? jsx("button", {
										type: "button",
										className: "enhc-board-icon",
										style: { width: "auto", padding: "0 8px" },
										onClick: () => {
											let next = state;
											for (const card of stale) next = boardMove(next, card.id, "archived", -1, true);
											boardCommit(next);
										},
										children: ptL("归档过期 " + stale.length, "Archive " + stale.length)
									}) : null,
									column.key === "trash" && state.undo.length > 0 ? jsx("button", {
										type: "button",
										className: "enhc-board-icon",
										style: { width: "auto", padding: "0 8px" },
										onClick: async () => {
											const targets = state.undo.slice();
											const undone = await boardRestoreArchived(targets);
											boardCommit(boardUnhide(boardUndoDrop(state, undone.restored), targets));
											if (undone.failed.length > 0) setPurgeNote(ptL("撤销失败 " + undone.failed.length + " 个（会话仍在归档里）", "restore failed for " + undone.failed.length + " (still archived)"));
											else setPurgeNote(ptL("已撤销归档，会话回到侧栏", "restored: sessions are back in the sidebar"));
										},
										children: ptL("撤销归档 " + state.undo.length, "Undo " + state.undo.length)
									}) : null,
									column.key === "trash" && state.hidden.length > 0 ? jsx("button", {
										type: "button",
										className: "enhc-board-icon",
										style: { width: "auto", padding: "0 8px" },
										onClick: () => boardCommit(boardUnhide(state)),
										children: ptL("恢复显示 " + state.hidden.length, "Show " + state.hidden.length)
									}) : null,
									column.key === "trash" && cards.length > 0 ? jsx("button", {
										type: "button",
										className: "enhc-board-icon",
										style: { width: "auto", padding: "0 8px", color: ui.confirmClear ? "var(--dsw-alias-state-error-primary)" : void 0 },
										disabled: purgeBusy,
										onClick: () => {
											if (!ui.confirmClear) {
												boardPatch({ confirmClear: true });
												return;
											}
											purgeTrash(cards.map((card) => card.id));
										},
										children: purgeBusy ? ptL("删除中…", "Deleting…") : ui.confirmClear ? ptL("确认删除 " + cards.length + " 个", "Delete " + cards.length) : ptL("清空", "Empty")
									}) : null,
									column.key === "trash" && purgeNote !== "" ? jsx("span", { className: "enhc-board-batch-text", children: purgeNote }) : null
								] }) : null
							] }),
							!collapsed ? jsx("div", {
								key: "b",
								className: "enhc-board-col-body",
								ref: columnRef(column.key),
								children: cards.length === 0 && column.key !== "todo" ? jsx("div", { className: "enhc-board-empty", children: ptL("拖到此处", "Drop here") }) : [
									...visible.flatMap((card, index) => {
										const nodes = [];
										if (over === index) nodes.push(jsx("div", { className: "enhc-board-insert" }, "insert-" + card.id));
										nodes.push(card.item !== void 0
											? jsx(BoardItemCard, { card, ui, now, onMove: move, onDelete: deleteItem, onUpdate: updateItem, onRun: runItem, busy: runBusy === card.id }, card.id)
											: jsx(BoardCard, { card, column: column.key, ui, now, onOpen: openSession, onMove: move, onForget: forget }, card.id));
										return nodes;
									}),
									over === cards.length ? jsx("div", { className: "enhc-board-insert" }, "insert-end") : null,
									visible.length < cards.length ? jsx("button", {
										key: "more",
										type: "button",
										className: "enhc-board-more",
										onClick: () => boardPatch({ more: { ...ui.more, [column.key]: (ui.more[column.key] ?? 0) + BOARD_COLUMN_PAGE } }),
										children: ptL("显示更多（剩 " + (cards.length - visible.length) + " 个）", "Show more (" + (cards.length - visible.length) + " left)")
									}) : null,
									column.key === "todo" ? jsx(BoardAddItem, { key: "add", onAdd: addItem }) : null
								]
							}) : null
						]
					}, column.key);
				}) }),
				jsxs("div", { key: "hint", className: "enhc-board-hint", children: [
					jsx("span", { children: ptL("拖拽卡片跨列移动，或按 M / 「⋯」打开移动菜单。", "Drag cards between columns, or press M / ⋯ for the move menu.") }),
					jsx("span", { children: ptL("垃圾桶「清空」会尝试真正删除会话；删不掉时用「撤销归档」把它们放回侧栏。", "Emptying the trash attempts a real delete; if it cannot, 撤销归档 puts those sessions back into the sidebar.") })
				] })
			]
		})
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
					key: "board",
					title: "通用面板（任务看板）",
					desc: "会话头部「轨迹」右侧显示看板入口：待办 / 进行中 / 完成 / 归档 / 垃圾桶，可拖拽",
					control: react.createElement(ChooseControl, {
						value: state.showBoard ? "show" : "hide",
						options: [
							{ value: "show", label: "显示" },
							{ value: "hide", label: "隐藏" }
						],
						onChange: (v) => {
							onApply({ showBoard: v === "show" });
						}
					})
				}),
				react.createElement(SettingsRow, {
					key: "board-autofinish",
					title: "跑完自动移到完成",
					desc: "手动放进「进行中」的会话，在它这一轮结束后自动落到「完成」",
					control: react.createElement(ChooseControl, {
						value: state.boardAutoFinish ? "on" : "off",
						options: [
							{ value: "on", label: "开启" },
							{ value: "off", label: "关闭" }
						],
						onChange: (v) => {
							onApply({ boardAutoFinish: v === "on" });
						}
					})
				}),
				react.createElement(SettingsRow, {
					key: "board-store",
					title: "看板状态存放位置",
					desc: "「本浏览器」即时生效；「随 profile 保存」写入 enhancer-board.json（需重启 dsh web 后可用）",
					control: react.createElement(ChooseControl, {
						value: state.boardStore,
						options: [
							{ value: "local", label: "本浏览器" },
							{ value: "profile", label: "随 profile 保存" }
						],
						onChange: (v) => {
							onApply({ boardStore: v === "profile" ? "profile" : "local" });
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
			showCallDur: true,
			showBoard: true,
			boardAutoFinish: true,
			boardStore: "local"
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
				if (typeof state.showBoard !== "boolean") state.showBoard = DEFAULT_STATE.showBoard;
				if (typeof state.boardAutoFinish !== "boolean") state.boardAutoFinish = DEFAULT_STATE.boardAutoFinish;
				if (state.boardStore !== "local" && state.boardStore !== "profile") state.boardStore = DEFAULT_STATE.boardStore;
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
			// 31-board: publish the board switches to the header button / modal
			boardSettings.show = state.showBoard !== false;
			boardSettings.autoFinish = state.boardAutoFinish !== false;
			boardSettings.store = state.boardStore === "profile" ? "profile" : "local";
			for (const listener of boardUiListeners) listener();
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
			// Product surface classes (popover/dialog/row) are only in the DOM while the
			// product has them open, so remember them opportunistically for the panels.
			ctx.effect(() => {
				let raf = 0;
				const scan = () => {
					raf = 0;
					try {
						rememberProductStyles();
					} catch {}
				};
				scan();
				const mo = new MutationObserver(() => {
					if (raf !== 0) return;
					raf = requestAnimationFrame(scan);
				});
				mo.observe(document.body, { childList: true, subtree: true });
				return () => {
					mo.disconnect();
					if (raf !== 0) cancelAnimationFrame(raf);
				};
			}, `${PLUGIN_ID}: product surface styles`);
			// 31-board: the board entry, injected next to the 轨迹 tab.
			//
			// Rendered as plain DOM (not through a slot) for two reasons: the tab strip is
			// product-owned DOM that React does not reconcile, and the header's `utilities`
			// cluster sits at the far right — nothing near 轨迹. The node is placed right
			// after the tab strip inside the title cluster and dressed in the product's own
			// tab class, so it reads as a sibling control of 对话 / 轨迹.
			ctx.effect(() => {
				const label = ptL("看板", "Board");
				const button = document.createElement("button");
				button.type = "button";
				button.className = "enhc-board-btn";
				button.title = ptL("任务看板", "Task board");
				button.setAttribute("aria-label", ptL("任务看板", "Task board"));
				button.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 2.5h3.2v11H2.5zM6.5 2.5h3.2v7.5H6.5zM10.5 2.5h3.2v9.5h-3.2z" fill="currentColor"/></svg><span class="enhc-board-btn-label"></span>';
				button.querySelector(".enhc-board-btn-label").textContent = label;
				button.addEventListener("click", () => boardPatch({ open: !boardUi.open, menuFor: null, confirmClear: false, picked: [] }));
				/** Open state: product's active-tab modifier + aria-pressed for a11y. */
				const syncPressed = () => {
					const open = boardUi.open === true;
					button.setAttribute("aria-pressed", open ? "true" : "false");
					const mods = (button.dataset.enhcActiveMods ?? "").split(/\s+/).filter((name) => name !== "");
					for (const mod of mods) button.classList.toggle(mod, open);
				};
				// boardPatch fires on every interaction (including dragover), and place() is a
				// couple of selector lookups, so keeping placement in sync here is cheap.
				const onUiChange = () => {
					syncPressed();
					place();
				};
				boardUiListeners.add(onUiChange);
				/** Put the button immediately after the tab strip and borrow the tab look. */
				const place = () => {
					button.hidden = boardSettings.show !== true;
					if (button.hidden) return;
					const tabs = document.querySelector("[class$=\"_tabs\"]");
					if (tabs === null || tabs.parentElement === null) return;
					if (button.dataset.enhcDressed !== "1" || !tabs.contains(button.previousElementSibling)) {
						// borrow the tab class from an INACTIVE tab and drop its active/selected
						// modifier, so our pill is not permanently highlighted (its own
						// aria-pressed style takes over while the board is open)
						const tabList = [...tabs.querySelectorAll("[class*=\"_tab\"]")];
						const idleTab = tabList.find((candidate) => !/active|selected|current/i.test(candidate.className || ""));
						const activeTab = tabList.find((candidate) => /active|selected|current/i.test(candidate.className || ""));
						const tab = idleTab ?? tabList[0];
						if (tab !== void 0) {
							const product = (tab.className || "").split(/\s+/).filter((name) => name !== "" && !/^enhc-/.test(name) && !/active|selected|current/i.test(name));
							if (product.length > 0) {
								button.className = "enhc-board-btn " + product.join(" ");
								// remember the product's active modifier so the open state can reuse it
								const idle = new Set((tab.className || "").split(/\s+/));
								const activeMods = (activeTab?.className ?? "").split(/\s+/).filter((name) => name !== "" && !idle.has(name));
								button.dataset.enhcActiveMods = activeMods.join(" ");
								button.dataset.enhcDressed = "1";
							}
						}
					}
					if (tabs.nextSibling !== button) tabs.after(button);
					syncPressed();
				};
				place();
				const raf = requestAnimationFrame(place);
				const timer = window.setInterval(place, 1000);
				const stop = window.setTimeout(() => window.clearInterval(timer), 20000);
				const observer = new MutationObserver(place);
				observer.observe(document.body, { childList: true, subtree: true });
				return () => {
					boardUiListeners.delete(onUiChange);
					cancelAnimationFrame(raf);
					window.clearInterval(timer);
					window.clearTimeout(stop);
					observer.disconnect();
					button.remove();
				};
			}, `${PLUGIN_ID}: board entry`);
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
			ctx.inject(["workspaces"], (workspaceCtx) => {
				// 31-board: the deletion chain archives through the core controller
				boardSetWorkspaces(workspaceCtx.workspaces);
				workspaceCtx.effect(() => () => boardSetWorkspaces(null), "dsh-enhance-tool: board workspace bridge");
			});
			ctx.inject(["sessions"], (sessionCtx) => {
				// 31-board: the board reads the session list through this bridge
				boardSetService(sessionCtx.sessions);
				sessionCtx.effect(() => {
					const list = sessionCtx.sessions.list;
					const sync = () => boardWatchRunning(list.getSnapshot());
					sync();
					const unsubscribe = list.subscribe(sync);
					const timer = window.setInterval(sync, 20000);
					return () => {
						unsubscribe();
						window.clearInterval(timer);
						boardSetService(null);
					};
				}, "dsh-enhance-tool: board session feed");
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
									//#region dsh-enhance-tool: board register
			// The board entry is injected as plain DOM right after the 轨迹 tab (see the
			// placement effect below): the header's `utilities` seat is a far-right cluster,
			// which visually reads as "no button next to 轨迹".
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "enhancer-board-dlg",
				order: 2
			}, () => react.createElement(BoardDialog)));
//#endregion
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