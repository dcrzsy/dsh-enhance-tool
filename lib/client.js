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
		const css = ":root{--enhancer-content-width:748px;--enhancer-font-size:14px;--enhancer-font-line:21px;--enhancer-sidebar-scale:1;--enhancer-chat-scale:1}div[data-phase]{--dsh-chat-content-width:var(--enhancer-content-width)!important}[data-input-scroll],[data-slot=conversation\\.session] [class$=_bubble]{font-size:var(--enhancer-font-size);line-height:var(--enhancer-font-line)}[data-slot=\"conversation.composer.bar\"] [class$=_trigger]{font-size:calc(13px * var(--enhancer-chat-scale,1));line-height:calc(20px * var(--enhancer-chat-scale,1));height:calc(28px * var(--enhancer-chat-scale,1))}[data-slot=\"conversation.composer.bar\"] [class$=_trigger] svg,[data-slot=\"conversation.composer.bar\"] [class$=_add] svg{width:calc(14px * var(--enhancer-chat-scale,1));height:calc(14px * var(--enhancer-chat-scale,1))}[data-slot=\"conversation.composer.bar\"] [class$=_primary] svg{width:calc(16px * var(--enhancer-chat-scale,1));height:calc(16px * var(--enhancer-chat-scale,1))}[role=menu] [class^=_list_]{padding:calc(4px * var(--enhancer-chat-scale,1));border-radius:calc(12px * var(--enhancer-chat-scale,1));min-width:calc(218px * var(--enhancer-chat-scale,1));max-width:calc(360px * var(--enhancer-chat-scale,1))}[role=menu] [class^=_item_]{font-size:calc(14px * var(--enhancer-chat-scale,1));line-height:calc(22px * var(--enhancer-chat-scale,1));min-height:calc(40px * var(--enhancer-chat-scale,1));padding:calc(8px * var(--enhancer-chat-scale,1)) calc(10px * var(--enhancer-chat-scale,1));border-radius:calc(10px * var(--enhancer-chat-scale,1));gap:calc(8px * var(--enhancer-chat-scale,1))}[role=menu] [class^=_itemIcon_],[role=menu] [class^=_check_]{width:calc(16px * var(--enhancer-chat-scale,1));height:calc(16px * var(--enhancer-chat-scale,1))}[role=menu] [class^=_label_]{font-size:calc(12px * var(--enhancer-chat-scale,1));line-height:calc(16px * var(--enhancer-chat-scale,1));padding:calc(8px * var(--enhancer-chat-scale,1)) calc(10px * var(--enhancer-chat-scale,1))}[data-slot=sidebar] [class$=_newSession]{font-size:calc(14px * var(--enhancer-sidebar-scale));height:calc(38px * var(--enhancer-sidebar-scale))}[data-slot=sidebar] [class$=_newSessionLabel]{max-width:calc(200px * var(--enhancer-sidebar-scale))}[data-slot=sidebar] [class$=_brand] svg{width:calc(182px * var(--enhancer-sidebar-scale));height:calc(24px * var(--enhancer-sidebar-scale))}[data-slot=sidebar] [class$=_logoRow] [class$=_iconButton]{width:calc(28px * var(--enhancer-sidebar-scale));height:calc(28px * var(--enhancer-sidebar-scale))}[data-slot=sidebar] [class$=_logoRow] [class$=_iconButton] svg{width:calc(16px * var(--enhancer-sidebar-scale));height:calc(16px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.settings] [class$=_trigger]{font-size:calc(14px * var(--enhancer-sidebar-scale));height:calc(34px * var(--enhancer-sidebar-scale))}[data-slot=\"sidebar.footer.action\"] [class$=_badge]{font-size:calc(14px * var(--enhancer-sidebar-scale));height:calc(49px * var(--enhancer-sidebar-scale))}[data-slot=\"sidebar.footer.action\"] [class$=_badge] svg{width:calc(14px * var(--enhancer-sidebar-scale));height:calc(14px * var(--enhancer-sidebar-scale))}[data-slot=\"sidebar.footer.action\"] [class$=_badgeCount]{font-size:calc(12px * var(--enhancer-sidebar-scale));line-height:calc(16px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces]{font-size:calc(14px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_title]{font-size:calc(14px * var(--enhancer-sidebar-scale));line-height:calc(20px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_meta],[data-slot=sidebar\\.workspaces] [class$=_time]{font-size:calc(12px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_sectionHeader]{font-size:calc(13px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_iconButton]{width:calc(28px * var(--enhancer-sidebar-scale));height:calc(28px * var(--enhancer-sidebar-scale))}[data-slot=sidebar\\.workspaces] [class$=_iconButton] svg{width:calc(16px * var(--enhancer-sidebar-scale));height:calc(16px * var(--enhancer-sidebar-scale))}[data-slot=settings\\.section] h2[class$=_title],[data-slot=settings\\.section] h2[class$=_heading]{margin:0 0 -8px;font-size:18px;font-weight:600;line-height:26px}[data-slot=settings\\.section] p[class$=_intro]{border-bottom:1px solid var(--dsw-alias-border-l2);margin:0 0 12px;padding-bottom:12px;font-size:13px;line-height:20px}[data-slot=settings\\.section] .dsh_notification_subtitle,[data-slot=settings\\.section] [class$=_head]>[class$=_sub]{border-bottom:1px solid var(--dsw-alias-border-l2);padding-bottom:12px}[data-slot=settings\\.section] [class$=_titleRow]>svg{display:none}[data-slot=settings\\.section] .dsh_notification_heading{gap:4px}[data-slot=settings\\.section] h2.dsh_notification_title{margin-bottom:0}[data-slot=settings\\.section] h2.enhc-settings-title{color:var(--dsw-alias-label-primary);margin:0 0 -8px;font-size:18px;font-weight:600;line-height:26px}button[class$=_crumb],button[class$=_crumbCurrent]{max-width:560px}[class$=_versionPicker] select{-webkit-appearance:none;appearance:none;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);cursor:pointer;border:none;border-radius:18px;min-width:0;height:32px;padding:0 32px 0 14px;font-size:13px;line-height:20px}[class$=_versionPicker] select:hover{background-color:var(--dsw-alias-interactive-bg-hover)}[class$=_versionPicker] select:focus-visible{outline:2px solid var(--dsw-alias-border-l3);outline-offset:1px}[class$=_versionPicker] select option{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-size:13px}input[type=range].CG7lXq_uitw-slider{-webkit-appearance:none;appearance:none;background:var(--dsw-alias-border-l2);cursor:pointer;border-radius:2px;outline:none;height:4px}input[type=range].CG7lXq_uitw-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;background:var(--dsw-alias-bg-layer-2);border:2px solid var(--dsw-alias-brand-primary);cursor:pointer;border-radius:50%;width:14px;height:14px}input[type=range].CG7lXq_uitw-slider::-moz-range-thumb{background:var(--dsw-alias-bg-layer-2);border:2px solid var(--dsw-alias-brand-primary);cursor:pointer;border-radius:50%;width:14px;height:14px}input[type=range].CG7lXq_uitw-slider::-moz-range-track{background:var(--dsw-alias-border-l2);border-radius:2px;height:4px}body [class$=_toggleButton]{border:1px solid var(--dsw-alias-border-l2);width:32px;height:32px;color:var(--dsw-alias-label-secondary);background:0 0;border-radius:16px}body [class$=_toggleButton]:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.W-zNGW_toggleButton[aria-pressed=true],.W-zNGW_toggleButton[aria-pressed=true]:hover{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-inverted);border-color:#0000}body .dsx-stats-capsule[aria-pressed=true]{color:var(--dsw-alias-label-primary-inverted)}body [class$=_toggleCluster]{gap:6px;top:12px;right:12px}body .W-zNGW_panel{top:var(--dsx-rail-top,75px);background:var(--dsw-alias-bg-layer-1);border:none;border-left:1px solid var(--dsw-alias-border-l2);box-shadow:var(--dsw-shadow-lv3);border-radius:14px 0 0 14px;overflow:hidden}body .W-zNGW_panelResize{left:0}body .W-zNGW_bottomPanel{background:var(--dsw-alias-bg-base);border-top:1px solid var(--dsw-alias-border-l2)}[data-slot=\"conversation.session.header\"]>header{border-bottom:none!important;padding:12px 90px 12px 20px!important}[data-slot=\"conversation.session.header\"]>header:after{content:none}[class$=_tabs]{align-items:center;gap:8px;margin:0 0 0 8px;display:flex}[class$=_tabs] [class*=_tab]{border:1px solid var(--dsw-alias-border-l2,transparent);background:var(--dsw-alias-bg-layer-1);height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;border-radius:14px;flex:none;justify-content:center;align-items:center;padding:0 14px;font-size:13px;line-height:20px;display:inline-flex}[class$=_tabs] [class*=_tab]:hover:not(:disabled):not([class*=_tabActive]){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}[class$=_tabs] [class*=_tabActive],[class$=_tabs] [class*=_tab][aria-selected=true]{background:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-label-primary-inverted);border-color:#0000}[class$=_tabs] [class*=_tab]:after{content:none}body .W-zNGW_panel .W-zNGW_tab{border-right:none}body .W-zNGW_panel .W-zNGW_pane{background:var(--dsw-alias-bg-layer-1)}body .W-zNGW_panel .W-zNGW_paneContent,body .W-zNGW_panel .W-zNGW_paneTab,body .W-zNGW_panel .W-zNGW_explorer,body .W-zNGW_panel .W-zNGW_explorerBody{min-width:0;max-width:100%}body .W-zNGW_panel .W-zNGW_explorerBody{overflow-x:hidden}body .W-zNGW_panel .W-zNGW_explorerRow{max-width:100%}html #root{margin-right:0}html #root>div[data-slot=root]>div>div:nth-child(2){margin-bottom:0}[data-slot=conversation\\.session]>[class$=_viewArea]{margin-right:0;transition:margin-right var(--ds-transition-duration-slow) var(--ds-ease-in-out)}div[class$=_composerSeat]{margin-right:0;transition:margin-right var(--ds-transition-duration-slow) var(--ds-ease-in-out)}body.dsx-stats-active [data-conversation-scroll]:has([data-conversation-composer-overlay])>[class$=_composerSeat]{right:calc(var(--dsh-scrollbar-width,0px) + var(--dsx-rail-w,220px))}.enhancer-trigger-group{flex-direction:column;gap:0;width:100%;margin:0;padding:0;display:flex}.enhancer-trigger{width:100%;height:34px;color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13);text-align:left;cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-radius var(--ds-transition-duration-fast) var(--ds-ease-in-out);box-sizing:border-box;background:0 0;border:none;border-radius:0;align-items:center;gap:10px;margin:4px -4px;padding:6px 2px 6px 10px;display:flex}.enhancer-trigger:hover{background:var(--dsw-alias-interactive-bg-hover);border-radius:8px}.enhancer-trigger:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px;border-radius:8px}.enhancer-trigger-icon{width:16px;height:16px;color:var(--dsw-alias-label-secondary);flex:none}.enhancer-trigger-label{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.enhancer-trigger-label-hidden{clip:rect(0, 0, 0, 0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.enhancer-overlay{z-index:20;pointer-events:auto;background:#0000003d;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.enhancer-panel{box-sizing:border-box;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);width:min(760px,100vw - 48px);height:min(560px,100vh - 64px);box-shadow:var(--dsw-shadow-lv3);border-radius:16px;display:flex;overflow:hidden}.enhancer-nav{box-sizing:border-box;border-right:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);flex:none;width:200px;padding:16px 8px;overflow-y:auto}.enhancer-navTitle{font:var(--dsw-font-xs-13);color:var(--dsw-alias-label-secondary);padding:0 10px 12px;font-weight:600}.enhancer-navList{flex-direction:column;gap:2px;display:flex}.enhancer-navCell{width:100%;height:40px;color:var(--dsw-alias-label-primary);font:var(--dsw-font-s-14);text-align:left;cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out);box-sizing:border-box;background:0 0;border:none;border-radius:10px;align-items:center;gap:10px;padding:0 10px;display:flex}.enhancer-navCell:hover{background:var(--dsw-alias-interactive-bg-hover)}.enhancer-navCell-active{background:var(--dsw-alias-state-business-primary);color:#fff}.enhancer-navCell-active:hover{background:var(--dsw-alias-state-business-primary)}.enhancer-navIcon{flex:none;width:16px;height:16px}.enhancer-navLabel{text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0;overflow:hidden}.enhancer-right{background:var(--dsw-alias-bg-layer-2);flex-direction:column;flex:1;min-width:0;display:flex}.enhancer-header{border-bottom:1px solid var(--dsw-alias-border-l2);flex:none;justify-content:space-between;align-items:flex-start;gap:16px;padding:16px 24px;display:flex}.enhancer-headingBox{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.enhancer-title{color:var(--dsw-alias-label-primary);margin:0;font-size:18px;font-weight:600;line-height:26px}.enhancer-subtitle{font:var(--dsw-font-xs-13);color:var(--dsw-alias-label-tertiary);margin:0}.enhancer-headerActions{flex:none;align-items:center;gap:8px;display:flex}.enhancer-close{width:28px;height:28px;color:var(--dsw-alias-label-tertiary);cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:none;border-radius:8px;flex:none;justify-content:center;align-items:center;padding:0;display:flex}.enhancer-close:hover,.enhancer-close:focus-visible{background:var(--dsw-alias-interactive-bg-hover)}.enhancer-close:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.enhancer-options{flex:1;min-height:0;padding:16px 24px 24px;overflow-y:auto}.enhancer-section{flex-direction:column;gap:4px;display:flex}.enhancer-row{border-bottom:1px solid var(--dsw-alias-border-l2);align-items:center;gap:8px;padding:16px 0;display:flex}.enhancer-rowIcon{width:16px;height:16px;color:var(--dsw-alias-label-secondary);flex:none}.enhancer-rowText{flex-direction:column;flex:1;gap:4px;min-width:0;padding-right:48px;display:flex}.enhancer-rowTitle{font:var(--dsw-font-s-14);color:var(--dsw-alias-label-primary);font-weight:500}.enhancer-rowDesc{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.enhancer-empty{font:var(--dsw-font-xs-13);color:var(--dsw-alias-label-tertiary);padding:12px 0}.enhancer-hint{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-label-tertiary);padding-top:12px;line-height:18px}.enhancer-error{font:var(--dsw-font-xxs-12);color:var(--dsw-alias-state-error-primary);padding-top:8px}.enhancer-form{flex-direction:column;gap:8px;padding:12px 0;display:flex}.enhancer-form-bordered{border-bottom:1px solid var(--dsw-alias-border-l2)}.enhancer-fieldLabel{font:var(--dsw-font-xs-13);color:var(--dsw-alias-label-secondary);font-weight:600}.enhancer-input,.enhancer-textarea{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-input-major);width:100%;color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13);border-radius:10px;outline:none;padding:0 10px}.enhancer-input{height:36px}.enhancer-textarea{resize:vertical;min-height:72px;padding:8px 10px;font-family:inherit}.enhancer-input:focus,.enhancer-textarea:focus{border-color:var(--dsw-alias-state-business-primary)}.enhancer-pillBtn{background:var(--dsw-alias-bg-module-platform);height:36px;color:var(--dsw-alias-label-primary);font:var(--dsw-font-s-14);cursor:pointer;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out);border:none;border-radius:18px;justify-content:center;align-self:flex-start;align-items:center;gap:6px;padding:0 14px;display:inline-flex}.enhancer-pillBtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.enhancer-pillBtn:disabled{opacity:.5;cursor:not-allowed}.enhancer-pillBtn:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.enhancer-toggleOn,.enhancer-toggleOff{height:32px;font:var(--dsw-font-xs-13);cursor:pointer;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out);border:none;border-radius:16px;justify-content:center;align-items:center;padding:0 14px;display:inline-flex}.enhancer-toggleOn{background:var(--dsw-alias-state-business-primary);color:#fff}.enhancer-toggleOff{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary)}.enhancer-toggleOff:hover{background:var(--dsw-alias-interactive-bg-hover)}.enhancer-ghostBtn{height:28px;color:var(--dsw-alias-label-secondary);font:var(--dsw-font-xxs-12);cursor:pointer;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:none;border-radius:8px;justify-content:center;align-items:center;padding:0 8px;display:inline-flex}.enhancer-ghostBtn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.enhancer-ghostBtn:disabled{opacity:.5;cursor:not-allowed}.enhancer-dangerBtn{height:28px;color:var(--dsw-alias-state-error-primary);font:var(--dsw-font-xxs-12);cursor:pointer;white-space:nowrap;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out);background:0 0;border:none;border-radius:8px;justify-content:center;align-items:center;padding:0 8px;display:inline-flex}.enhancer-dangerBtn:hover{background:var(--dsw-alias-interactive-bg-hover)}.enhancer-task{border-bottom:1px solid var(--dsw-alias-border-l2)}.enhancer-taskDetail{flex-direction:column;gap:8px;padding:0 0 14px 24px;display:flex}.enhancer-taskPrompt{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-primary);font:var(--dsw-font-xs-13);white-space:pre-wrap;border-radius:10px;padding:10px 12px;line-height:20px}.enhancer-history{flex-direction:column;gap:6px;padding-top:4px;display:flex}.enhancer-historyItem{font:var(--dsw-font-xxs-12);align-items:flex-start;gap:10px;line-height:18px;display:flex}.enhancer-historyTime{color:var(--dsw-alias-label-tertiary);flex:none;min-width:132px}.enhancer-historyOk{color:var(--dsw-alias-state-success-primary);flex:none}.enhancer-historyFail{color:var(--dsw-alias-state-error-primary);flex:none}.enhancer-historyNote{min-width:0;color:var(--dsw-alias-label-tertiary);text-overflow:ellipsis;white-space:nowrap;flex:1;overflow:hidden}@media (prefers-reduced-motion:reduce){.enhancer-trigger,.enhancer-navCell,.enhancer-close,.enhancer-pillBtn,.enhancer-toggleOn,.enhancer-toggleOff,.enhancer-ghostBtn,.enhancer-dangerBtn{transition:none!important}.enhancer-overlay,.enhancer-panel,.PmptLb_manageDialog,.PmptLb_panel,.PmptLb_polishPanel,.Sggst_root,[class*=_userStack] [class*=_bubble] div{animation:none!important;transition:none!important}}div[data-phase=hero]{padding-bottom:var(--dsh-bottom-panel-height,0px)}div[data-phase=hero] .wSkVaW_composerHero{margin-bottom:var(--dsh-bottom-panel-height,0px)}/* 17-userfullwidth: user message stack fills the column */[class*=_userStack]{flex-direction:column;align-items:flex-end;gap:8px;min-width:0;width:100%!important;max-width:100%!important;display:flex}/* 17-herolayout: hero composer pinned to bottom, headline on top */.wSkVaW_root[data-phase=hero] .wSkVaW_scrollBody{justify-content:flex-start;overflow-y:auto}.wSkVaW_root[data-phase=hero] .wSkVaW_composerSeat{margin-top:auto;flex:1;min-height:0}.wSkVaW_root[data-phase=hero] .wSkVaW_composerHero{height:100%;flex:none;padding-bottom:0;overflow:hidden}.wSkVaW_root[data-phase=hero] .wSkVaW_composerHero .pXSMma_root{flex:1;min-height:0}.wSkVaW_root[data-phase=hero] .wSkVaW_composerHero [data-slot=conversation\.composer\.bar]{margin-top:auto}/* 27-userfullrow: user bubbles size to content, cap at full column width */[class*=_userStack] [class*=_bubble]{width:fit-content;max-width:100%;box-sizing:border-box}[class*=_userStack] [class*=_userRow]{width:fit-content;max-width:100%;box-sizing:border-box}/* 28-user-collapse: long user messages collapse to 5 lines, click to expand */.enhc-collapsed{overflow:hidden}.enhc-expand-btn{background:0 0;border:none;color:var(--dsw-alias-state-business-primary);cursor:pointer;font-size:13px;line-height:18px;padding:4px 2px 0;margin:0;display:inline-block}[class*=_userStack] [class*=_bubble] div{transition:max-height .22s ease,min-height .22s ease}@keyframes enhc-fade{from{opacity:0}to{opacity:1}}@keyframes enhc-pop{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}@keyframes enhc-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.enhancer-overlay{animation:enhc-fade .18s ease}.enhancer-panel{animation:enhc-pop .24s cubic-bezier(.2,.8,.25,1)}.PmptLb_manageDialog{animation:enhc-pop .22s cubic-bezier(.2,.8,.25,1)}.PmptLb_panel,.PmptLb_polishPanel{animation:enhc-rise .2s ease}.Sggst_root{animation:enhc-rise .25s ease}";
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
function PromptLibraryButton({ inputActions, session }) {
	promptToolsCss();
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
		const el = composerTextarea();
		const current = el ? el.value : "";
		const sep = current === "" || current.endsWith("\n") ? "" : "\n";
		inputActions?.setDraft(current + sep + text);
		setOpen(false);
		if (el) window.setTimeout(() => el.focus(), 60);
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
			const resp = await fetch("/polish", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text: draftText, requirement: "", sessionId: session?.sessionId }) });
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
function PolishButton({ inputActions, session }) {
	promptToolsCss();
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
		const el = composerTextarea();
		const text = el ? el.value : "";
		if (text.trim() === "" || busy) return;
		setBusy(true);
		setPolishErr("");
		try {
			const response = await fetch("/polish", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ text, requirement: customReq || "", sessionId: session?.sessionId })
			});
			const payload = await response.json();
			if (payload.ok && typeof payload.text === "string") {
				inputActions?.setDraft(payload.text);
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
	const lastText = (0, react.useMemo)(() => {
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
			const st = JSON.parse(localStorage.getItem("harness-ui-enhancer.state") || "{}");
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
			suggestSend: true
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
			const root = document.documentElement;
			for (const property of ROOT_PROPERTIES) root.style.removeProperty(property);
		}
		//#endregion
		//#region src/client/mcp-auto.ts
		/**
		* Harness UI Enhancer — MCP + Automation.
		*
		* Two INDEPENDENT sidebar-foot controls, each styled exactly like the official
		* Settings trigger (`VOzbGW_trigger`):
		*   - full sidebar width, only horizontal padding, no permanent pill shape
		*   - hover shows a rounded-rect background
		*   - when the sidebar collapses to rail width, the text label hides and only
		*     the icon remains
		*
		* Each opens its OWN Settings-style modal dialog with the exact same chrome as
		* the product Settings panel: a left nav rail (`VOzbGW_nav` lookalike) and a
		* right content column with header/actions/close/options.
		*
		* No product class names are read or written. Everything is built with
		* `--dsw-alias-*` / `--dsw-font-*` tokens and scoped to our own class names.
		*/
		/** Icon paths (reused from ui-primitives gear/clock glyphs). */
		const PLUG_PATH = "M11 1.5a.6.6 0 0 1 1.2 0V5h.8a.5.5 0 0 1 .5.5v5a3 3 0 0 1-3 3h2.5v1H3v-1h2.5a3 3 0 0 1-3-3v-5A.5.5 0 0 1 3 5h.8V1.5a.6.6 0 0 1 1.2 0V5h5V1.5Z";
		const CLOCK_PATH = "M8 0.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0 1.6a5.9 5.9 0 1 1 0 11.8 5.9 5.9 0 0 1 0-11.8ZM8 3a.8.8 0 0 1 .8.8v3.7l2.4 1.4a.8.8 0 0 1-.8 1.4L7.2 8.5V3.8A.8.8 0 0 1 8 3Z";
		const CLOSE_PATH = "M14.1168 13.197L13.197 14.1167L1.8833 2.80303L2.80309 1.88324L14.1168 13.197ZM13.197 1.88326L14.1168 2.80305L2.80309 14.1168L1.8833 13.197L13.197 1.88326Z";
		function Icon({ d, size = 16, className }) {
			return react.createElement("svg", {
				width: size,
				height: size,
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": true,
				className
			}, react.createElement("path", {
				d,
				fill: "currentColor"
			}));
		}
		/** Minimal client↔host JSON call (same-origin route). */
		async function api(request) {
			const response = await fetch("/enhancer/enhancer-api", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(request)
			});
			const text = await response.text();
			let data = {};
			try {
				data = JSON.parse(text);
			} catch {}
			if (!response.ok || data.ok !== true) {
				const prefix = response.status === 405 ? "后端路由未就绪，请重启 dsh web 后重试。" : "";
				throw new Error(prefix + (data.error || `HTTP ${response.status}`));
			}
			return data;
		}
		const state = {
			mcpOpen: false,
			autoOpen: false
		};
		const listeners = /* @__PURE__ */ new Set();
		function notify() {
			for (const l of listeners) l();
		}
		function useDialogState() {
			const [, force] = react.useReducer((c) => c + 1, 0);
			react.useEffect(() => {
				listeners.add(force);
				return () => {
					listeners.delete(force);
				};
			}, []);
			const patch = (p) => {
				Object.assign(state, p);
				notify();
			};
			return [state, patch];
		}
		const RAIL_COLLAPSE_WIDTH = 80;
		function useCollapsed(ref) {
			const [collapsed, setCollapsed] = react.useState(false);
			react.useEffect(() => {
				const el = ref.current;
				if (!el) return;
				const ro = new ResizeObserver((entries) => {
					const width = entries[0]?.contentRect.width ?? el.clientWidth;
					setCollapsed(width < RAIL_COLLAPSE_WIDTH);
				});
				ro.observe(el);
				return () => ro.disconnect();
			}, [ref]);
			return collapsed;
		}
		/** One Settings-trigger-style foot button. */
		function TriggerButton({ kind, label, onClick }) {
			const ref = react.useRef(null);
			const collapsed = useCollapsed(ref);
			return react.createElement("button", {
				ref,
				type: "button",
				className: "enhancer-trigger",
				title: label,
				"aria-label": label,
				onClick
			}, [react.createElement(Icon, {
				key: "i",
				d: kind === "mcp" ? PLUG_PATH : CLOCK_PATH,
				size: 16,
				className: "enhancer-trigger-icon"
			}), react.createElement("span", {
				key: "l",
				className: collapsed ? "enhancer-trigger-label enhancer-trigger-label-hidden" : "enhancer-trigger-label"
			}, label)]);
		}
		/**
		* Two trigger buttons stacked vertically, wrapped in a transparent container
		* (zero padding) that goes inside one sidebar.footer.action slot entry.
		* The wrapper does NOT add any spacing — the shell controls the gap between
		* this entry and the settings trigger, while the gap between MCP and 自动化
		* is our own controlled value.
		*/
		function AutoLauncher() {
			const [, patch] = useDialogState();
			return react.createElement("div", { className: "enhancer-trigger-group" }, [react.createElement(TriggerButton, {
				key: "mcp",
				kind: "mcp",
				label: "MCP",
				onClick: () => patch({ mcpOpen: true })
			}), react.createElement(TriggerButton, {
				key: "auto",
				kind: "auto",
				label: "自动化",
				onClick: () => patch({ autoOpen: true })
			})]);
		}
		function useEscClose(open, onClose) {
			react.useEffect(() => {
				if (!open) return;
				const priorOverflow = document.body.style.overflow;
				document.body.style.overflow = "hidden";
				const onKey = (e) => {
					if (e.key === "Escape") onClose();
				};
				window.addEventListener("keydown", onKey);
				return () => {
					document.body.style.overflow = priorOverflow;
					window.removeEventListener("keydown", onKey);
				};
			}, [open, onClose]);
		}
		function SettingsDialog({ navTitle, navCells, title, subtitle, action, onClose, children }) {
			return react.createElement("div", {
				className: "enhancer-overlay",
				onClick: onClose
			}, [react.createElement("div", {
				key: "panel",
				className: "enhancer-panel",
				role: "dialog",
				"aria-modal": true,
				"aria-label": title,
				onClick: (e) => e.stopPropagation()
			}, [react.createElement("nav", {
				key: "nav",
				className: "enhancer-nav"
			}, [react.createElement("div", {
				key: "nt",
				className: "enhancer-navTitle"
			}, navTitle), react.createElement("div", {
				key: "nl",
				className: "enhancer-navList"
			}, navCells.map((cell) => react.createElement("button", {
				key: cell.id,
				type: "button",
				className: cell.active ? "enhancer-navCell enhancer-navCell-active" : "enhancer-navCell",
				"aria-current": cell.active ? "true" : void 0
			}, [react.createElement(Icon, {
				key: "i",
				d: cell.icon,
				size: 16,
				className: "enhancer-navIcon"
			}), react.createElement("span", {
				key: "l",
				className: "enhancer-navLabel"
			}, cell.label)])))]), react.createElement("div", {
				key: "right",
				className: "enhancer-right"
			}, [react.createElement("div", {
				key: "header",
				className: "enhancer-header"
			}, [
				react.createElement("div", {
					key: "hb",
					className: "enhancer-headingBox"
				}, [react.createElement("h2", {
					key: "h",
					className: "enhancer-title"
				}, title), react.createElement("p", {
					key: "s",
					className: "enhancer-subtitle"
				}, subtitle)]),
				react.createElement("div", {
					key: "actions",
					className: "enhancer-headerActions"
				}, action),
				react.createElement("button", {
					key: "close",
					type: "button",
					className: "enhancer-close",
					"aria-label": "关闭",
					onClick: onClose
				}, react.createElement(Icon, {
					d: CLOSE_PATH,
					size: 14
				}))
			]), react.createElement("div", {
				key: "options",
				className: "enhancer-options"
			}, children)])])]);
		}
		const inputClass = "enhancer-input";
		const textareaClass = "enhancer-textarea";
		const pillBtnClass = "enhancer-pillBtn";
		const dangerBtnClass = "enhancer-dangerBtn";
		const ghostBtnClass = "enhancer-ghostBtn";
		const toggleOnClass = "enhancer-toggleOn";
		const toggleOffClass = "enhancer-toggleOff";
		function McpPanel() {
			const [servers, setServers] = react.useState([]);
			const [busy, setBusy] = react.useState(false);
			const [err, setErr] = react.useState("");
			const [name, setName] = react.useState("");
			const [command, setCommand] = react.useState("");
			const refresh = async () => {
				try {
					const r = await api({ kind: "mcp/list" });
					setServers(Array.isArray(r.servers) ? r.servers : []);
					setErr("");
				} catch (e) {
					setErr(String(e instanceof Error ? e.message : e));
				}
			};
			react.useEffect(() => {
				refresh();
			}, []);
			const add = async () => {
				if (!name.trim() || !command.trim()) return;
				setBusy(true);
				try {
					await api({
						kind: "mcp/apply",
						op: "add",
						serverName: name.trim(),
						server: {
							serverName: name.trim(),
							transport: "stdio",
							command: command.trim()
						}
					});
					setName("");
					setCommand("");
					await refresh();
				} catch (e) {
					setErr(String(e instanceof Error ? e.message : e));
				} finally {
					setBusy(false);
				}
			};
			const remove = async (serverName) => {
				try {
					await api({
						kind: "mcp/apply",
						op: "remove",
						serverName
					});
					await refresh();
				} catch (e) {
					setErr(String(e instanceof Error ? e.message : e));
				}
			};
			return react.createElement("div", { className: "enhancer-section" }, [
				servers.length === 0 ? react.createElement("div", {
					key: "empty",
					className: "enhancer-empty"
				}, "尚未配置 MCP 服务器。") : servers.map((s) => react.createElement("div", {
					key: String(s.serverName),
					className: "enhancer-row"
				}, [
					react.createElement(Icon, {
						key: "i",
						d: PLUG_PATH,
						size: 16,
						className: "enhancer-rowIcon"
					}),
					react.createElement("div", {
						key: "text",
						className: "enhancer-rowText"
					}, [react.createElement("div", {
						key: "t",
						className: "enhancer-rowTitle"
					}, String(s.serverName)), react.createElement("div", {
						key: "d",
						className: "enhancer-rowDesc"
					}, String(s.command || s.url || s.transport))]),
					react.createElement("button", {
						key: "rm",
						type: "button",
						className: dangerBtnClass,
						onClick: () => void remove(String(s.serverName))
					}, "移除")
				])),
				react.createElement("div", {
					key: "form",
					className: "enhancer-form"
				}, [
					react.createElement("input", {
						key: "name",
						className: inputClass,
						placeholder: "服务器名 (serverName)",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					react.createElement("input", {
						key: "cmd",
						className: inputClass,
						placeholder: "启动命令 (stdio, 如 npx -y …)",
						value: command,
						onChange: (e) => setCommand(e.target.value)
					}),
					react.createElement("button", {
						key: "add",
						type: "button",
						className: pillBtnClass,
						disabled: busy || !name.trim() || !command.trim(),
						onClick: () => void add()
					}, busy ? "添加中…" : "添加 MCP 服务器")
				]),
				err !== "" ? react.createElement("div", {
					key: "err",
					className: "enhancer-error"
				}, err) : null
			]);
		}
		function McpDialog() {
			const [s, patch] = useDialogState();
			const close = () => patch({ mcpOpen: false });
			useEscClose(s.mcpOpen, close);
			if (!s.mcpOpen) return null;
			return react.createElement(SettingsDialog, {
				navTitle: "MCP",
				navCells: [{
					id: "mcp",
					label: "MCP 服务器",
					icon: PLUG_PATH,
					active: true
				}],
				title: "MCP 服务器",
				subtitle: "管理 dsh-mcp-client 服务器条目，写入 profiles/web/cordis.patch.yml，实时生效。",
				onClose: close
			}, react.createElement(McpPanel));
		}
		function formatTime(ts) {
			return ts === void 0 ? "—" : new Date(ts).toLocaleString();
		}
		function TaskItem({ task, onChanged }) {
			const [expanded, setExpanded] = react.useState(false);
			const [err, setErr] = react.useState("");
			const [running, setRunning] = react.useState(false);
			const toggle = async () => {
				try {
					await api({
						kind: "tasks/toggle",
						id: task.id
					});
					onChanged();
				} catch (e) {
					setErr(String(e instanceof Error ? e.message : e));
				}
			};
			const runNow = async () => {
				setRunning(true);
				try {
					await api({
						kind: "tasks/run-now",
						id: task.id
					});
					onChanged();
				} catch (e) {
					setErr(String(e instanceof Error ? e.message : e));
				} finally {
					setRunning(false);
				}
			};
			const remove = async () => {
				try {
					await api({
						kind: "tasks/delete",
						id: task.id
					});
					onChanged();
				} catch (e) {
					setErr(String(e instanceof Error ? e.message : e));
				}
			};
			const history = Array.isArray(task.history) ? task.history : [];
			return react.createElement("div", { className: "enhancer-task" }, [react.createElement("div", {
				key: "row",
				className: "enhancer-row"
			}, [
				react.createElement(Icon, {
					key: "i",
					d: CLOCK_PATH,
					size: 16,
					className: "enhancer-rowIcon"
				}),
				react.createElement("div", {
					key: "text",
					className: "enhancer-rowText"
				}, [react.createElement("div", {
					key: "t",
					className: "enhancer-rowTitle"
				}, task.name), react.createElement("div", {
					key: "d",
					className: "enhancer-rowDesc"
				}, `每 ${task.frequencyMinutes} 分钟 · 下次 ${formatTime(task.nextAt)} · 上次 ${task.lastRunAt !== void 0 ? formatTime(task.lastRunAt) : "从未运行"}`)]),
				react.createElement("button", {
					key: "toggle",
					type: "button",
					className: task.enabled ? toggleOnClass : toggleOffClass,
					onClick: () => void toggle()
				}, task.enabled ? "已启用" : "已暂停"),
				react.createElement("button", {
					key: "run",
					type: "button",
					className: ghostBtnClass,
					disabled: running,
					onClick: () => void runNow()
				}, running ? "运行中…" : "立即运行"),
				react.createElement("button", {
					key: "expand",
					type: "button",
					className: ghostBtnClass,
					onClick: () => setExpanded((v) => !v)
				}, expanded ? "收起" : "详情"),
				react.createElement("button", {
					key: "del",
					type: "button",
					className: dangerBtnClass,
					onClick: () => void remove()
				}, "删除")
			]), expanded ? react.createElement("div", {
				key: "detail",
				className: "enhancer-taskDetail"
			}, [
				react.createElement("div", {
					key: "ws",
					className: "enhancer-rowDesc"
				}, `工作区: ${task.workspace || "（默认）"}`),
				react.createElement("div", {
					key: "pr",
					className: "enhancer-taskPrompt"
				}, task.prompt),
				history.length > 0 ? react.createElement("div", {
					key: "hist",
					className: "enhancer-history"
				}, history.slice(-5).reverse().map((h, idx) => react.createElement("div", {
					key: `${h.at}-${idx}`,
					className: "enhancer-historyItem"
				}, [
					react.createElement("span", {
						key: "t",
						className: "enhancer-historyTime"
					}, formatTime(h.at)),
					react.createElement("span", {
						key: "o",
						className: h.ok ? "enhancer-historyOk" : "enhancer-historyFail"
					}, h.ok ? "✓" : "✗"),
					react.createElement("span", {
						key: "n",
						className: "enhancer-historyNote"
					}, String(h.note ?? ""))
				]))) : null,
				err !== "" ? react.createElement("div", {
					key: "err",
					className: "enhancer-error"
				}, err) : null
			]) : err !== "" ? react.createElement("div", {
				key: "err",
				className: "enhancer-error"
			}, err) : null]);
		}
		function AutoPanel() {
			const [tasks, setTasks] = react.useState([]);
			const [err, setErr] = react.useState("");
			const [showForm, setShowForm] = react.useState(false);
			const [creating, setCreating] = react.useState(false);
			const [name, setName] = react.useState("");
			const [workspace, setWorkspace] = react.useState("");
			const [prompt, setPrompt] = react.useState("");
			const [freq, setFreq] = react.useState("60");
			const refresh = async () => {
				try {
					const r = await api({ kind: "tasks/list" });
					setTasks(Array.isArray(r.tasks) ? r.tasks : []);
					setErr("");
				} catch (e) {
					setErr(String(e instanceof Error ? e.message : e));
				}
			};
			react.useEffect(() => {
				refresh();
			}, []);
			const create = async () => {
				if (!name.trim() || !prompt.trim()) return;
				setCreating(true);
				try {
					await api({
						kind: "tasks/create",
						task: {
							name: name.trim(),
							workspace: workspace.trim(),
							prompt: prompt.trim(),
							frequencyMinutes: Number(freq) || 60
						}
					});
					setName("");
					setWorkspace("");
					setPrompt("");
					setFreq("60");
					setShowForm(false);
					await refresh();
				} catch (e) {
					setErr(String(e instanceof Error ? e.message : e));
				} finally {
					setCreating(false);
				}
			};
			return react.createElement("div", { className: "enhancer-section" }, [
				react.createElement("button", {
					key: "add",
					type: "button",
					className: pillBtnClass,
					onClick: () => setShowForm((v) => !v)
				}, showForm ? "收起新建表单" : "+ 新建定时任务"),
				showForm ? react.createElement("div", {
					key: "form",
					className: "enhancer-form enhancer-form-bordered"
				}, [
					react.createElement("label", {
						key: "l1",
						className: "enhancer-fieldLabel"
					}, "任务名称"),
					react.createElement("input", {
						key: "f1",
						className: inputClass,
						placeholder: "如：每日晨间摘要",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					react.createElement("label", {
						key: "l2",
						className: "enhancer-fieldLabel"
					}, "工作区"),
					react.createElement("input", {
						key: "f2",
						className: inputClass,
						placeholder: "工作区目录路径（留空使用当前工作区）",
						value: workspace,
						onChange: (e) => setWorkspace(e.target.value)
					}),
					react.createElement("label", {
						key: "l3",
						className: "enhancer-fieldLabel"
					}, "提示词"),
					react.createElement("textarea", {
						key: "f3",
						className: textareaClass,
						placeholder: "要发送给新会话的提示词…",
						rows: 4,
						value: prompt,
						onChange: (e) => setPrompt(e.target.value)
					}),
					react.createElement("label", {
						key: "l4",
						className: "enhancer-fieldLabel"
					}, "执行频率（分钟）"),
					react.createElement("input", {
						key: "f4",
						className: inputClass,
						inputMode: "numeric",
						placeholder: "60",
						value: freq,
						onChange: (e) => setFreq(e.target.value)
					}),
					react.createElement("button", {
						key: "go",
						type: "button",
						className: pillBtnClass,
						disabled: creating || !name.trim() || !prompt.trim(),
						onClick: () => void create()
					}, creating ? "创建中…" : "创建定时任务")
				]) : null,
				tasks.length === 0 && !showForm ? react.createElement("div", {
					key: "empty",
					className: "enhancer-empty"
				}, "还没有定时任务。点击「新建定时任务」创建一个。") : tasks.map((t) => react.createElement(TaskItem, {
					key: t.id,
					task: t,
					onChanged: () => void refresh()
				})),
				react.createElement("div", {
					key: "hint",
					className: "enhancer-hint"
				}, "定时任务到达执行时间时，会在工作区中新建一个会话并发送预设提示词（等价于 WorkBuddy 的定时任务 / ChatGPT Scheduled Tasks）。运行记录保留在下方历史中。"),
				err !== "" ? react.createElement("div", {
					key: "err",
					className: "enhancer-error"
				}, err) : null
			]);
		}
		function AutoDialog() {
			const [s, patch] = useDialogState();
			const close = () => patch({ autoOpen: false });
			useEscClose(s.autoOpen, close);
			if (!s.autoOpen) return null;
			return react.createElement(SettingsDialog, {
				navTitle: "自动化",
				navCells: [{
					id: "auto",
					label: "定时任务",
					icon: CLOCK_PATH,
					active: true
				}],
				title: "定时任务",
				subtitle: "定期在工作区新建会话并发送预设提示词，查看运行历史。",
				onClose: close
			}, react.createElement(AutoPanel));
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
				const syncBottomPanel = () => {
					const panel = document.querySelector(".nArs4W_bottomPanel");
					const root = document.documentElement;
					if (panel === null) { root.style.setProperty("--dsh-bottom-panel-height", "0px"); return; }
					const hidden = panel.classList.contains("nArs4W_bottomPanelHidden");					const h = hidden ? 0 : panel.getBoundingClientRect().height;
					root.style.setProperty("--dsh-bottom-panel-height", h + "px");
				};
				syncBottomPanel();
				const observer = new MutationObserver(syncBottomPanel);
				observer.observe(document.body, {
					attributes: true,
					childList: true,
					subtree: true,
					attributeFilter: ["class", "style"]
				});
				const ro = new ResizeObserver(syncBottomPanel);
				let observedPanel = null;
				const attachPanelRo = () => {
					const panelEl = document.querySelector(".nArs4W_bottomPanel");
					if (panelEl === null || panelEl === observedPanel) return;
					ro.disconnect();
					ro.observe(panelEl);
					observedPanel = panelEl;
				};
				attachPanelRo();
				// Lazy re-attach only: the panel may appear after boot (hero page has
				// none). Cheap querySelector every second; size/class changes are
				// already covered by ResizeObserver + MutationObserver.
				const t = window.setInterval(attachPanelRo, 1e3);
				return () => { observer.disconnect(); ro.disconnect(); window.clearInterval(t); };
			}, `${PLUGIN_ID}: hero bottom-panel clearance`);
ctx.effect(() => {
				const syncToggleStates = () => {
					const panel = document.querySelector(".W-zNGW_panel");
					const bottom = document.querySelector(".W-zNGW_bottomPanel");
					const buttons = document.querySelectorAll(".W-zNGW_toggleButton");
					if (!panel || !bottom || buttons.length < 2) return;
					const panelOpen = !panel.classList.contains("W-zNGW_panelHidden");
					const bottomOpen = !bottom.classList.contains("W-zNGW_bottomPanelHidden");
					buttons[0].setAttribute("aria-pressed", String(bottomOpen));
					buttons[1].setAttribute("aria-pressed", String(panelOpen));
				};
				syncToggleStates();
				const observer = new MutationObserver(syncToggleStates);
				observer.observe(document.body, {
					attributes: true,
					childList: true,
					subtree: true,
					attributeFilter: ["class"]
				});
				return () => observer.disconnect();
			}, `${PLUGIN_ID}: better-sidebar toggle state sync`);
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
				const alignPanel = () => {
					const scroll = document.querySelector(".wSkVaW_scrollBody");
					if (!scroll) return;
					let mr = 0;
					const panel = document.querySelector(".nArs4W_panel");
					const root = document.querySelector(".wSkVaW_root");
					const rootR = root ? Math.round(root.getBoundingClientRect().right) : window.innerWidth;
					if (panel && !panel.classList.contains("nArs4W_panelHidden")) {
						const r = panel.getBoundingClientRect();
						if (r.left > 0 && r.left < window.innerWidth - 20) {
							mr = Math.max(0, Math.round(rootR - r.left - 8));
						}
					}
					scroll.style.marginRight = mr + "px";
				};
				const schedule = () => {
					cancelAnimationFrame(raf);
					raf = requestAnimationFrame(() => applyState(state));
					alignPanel();
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
					alignPanel();
					schedule();
				};
				attach();
				// Poll only for the scroll container appearing/changing (e.g. hero→
				// session navigation replaces the composer seat); one querySelector
				// per second instead of full alignPanel+applyState every 250ms.
				const tick = window.setInterval(attach, 1e3);
				window.addEventListener("resize", schedule);
				return () => {
					if (ro) ro.disconnect();
					window.removeEventListener("resize", schedule);
					window.clearInterval(tick);
					cancelAnimationFrame(raf);
					const scroll = document.querySelector(".wSkVaW_scrollBody");
					if (scroll) scroll.style.marginRight = "";
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
			ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
				name: "sidebar.footer.action",
				id: "enhancer-triggers",
				order: 20
			}, () => react.createElement(AutoLauncher)));
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "enhancer-mcp-dlg",
				order: 0
			}, () => react.createElement(McpDialog)));
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "enhancer-auto-dlg",
				order: 1
			}, () => react.createElement(AutoDialog)));
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
					const textarea = document.querySelector('[data-slot="conversation.composer.bar"] textarea');
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
						// scroll lists): our overlay cap must not fight it.
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
					const textarea = document.querySelector('[data-slot="conversation.composer.bar"] textarea');
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
						// scroll lists): our overlay cap must not fight it.
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