# dsh-enhance-tool

DeepSeek Harness (`dsh`) web 界面增强插件 — 润色、提示词库、预测回复、消息工具条常显、工具调用耗时、宽度/字号/侧栏缩放。

- **安装形态**：100% 插件注入（slot / shell.overlay / settings / sessionTitle 官方机制），**零 bundle 补丁**
- **兼容版本**：`dsh >= 0.1.0-rc.7`（已实测 `0.1.1-rc.2`、`0.1.2-rc.1`、`0.1.5-rc.2`）
- **许可证**：MIT

---

## 安装

### 方式一：dsh 官方插件命令（推荐）

```bash
dsh plugin --profile web add github:dcrzsy/dsh-enhance-tool
```

安装后需要补一个 pnpm 解析不到的依赖（它位于全局 dsh 包内）：

```bash
DSH=$(dirname "$(dirname "$(node -e 'console.log(require.resolve("@deepseek-ai/dsh/package.json"))')")")
ln -sfn "$DSH/node_modules/@deepseek-ai/dsh-session-title"        ~/.dsh/profiles/web/node_modules/@deepseek-ai/
ln -sfn "$DSH/node_modules/@deepseek-ai/dsh-session-title-llm"    ~/.dsh/profiles/web/node_modules/@deepseek-ai/
```

> `dsh plugin` 是官方插件管理命令（转发到 profile 目录的 pnpm），与
> `dsh-power-button`、`dsh-better-sidebar` 等社区插件的安装方式一致。

### 方式二：一键脚本

```bash
git clone https://github.com/dcrzsy/dsh-enhance-tool
cd dsh-enhance-tool
bash install.sh
```

`install.sh` 自动完成：`dsh plugin add` 标准安装 → 链接 `dsh-session-title-llm` 依赖 → 全文件语法验证。

### 安装后

```bash
fuser -k 3080/tcp && nohup dsh web &   # 重启 dsh web
```

浏览器 **Ctrl+Shift+R** 硬刷新即可。

> 插件通过自带的 `cordis.patch.yml`（`dsh.bundle.patch`）自动挂载，无需手动改配置。
> 卸载：`dsh plugin --profile web remove dsh-enhance-tool` 后重启 dsh web。

---

## 功能清单

### 1. 输入增强（composer）

| 功能 | 机制 | 位置 |
|---|---|---|
| **润色** | `/polish` API，用当前会话的模型重写草稿（默认润色 / 自定义要求润色） | `conversation.input.left` 按钮 |
| **提示词库** | `/prompt-library` API，持久化 `~/.dsh/prompts.json`；支持分组 / 搜索 / 增删改 / 一键插入 | `conversation.input.left` 按钮 |
| **预测回复（建议条）** | `/suggest` API，基于最后一条 AI 回复预测 3 条用户回复，点击**直接发送**（可在设置→通用→界面定制 改为“仅填入输入框”） | `conversation.input.dock` |

### 2. 布局与宽度（设置页 + 运行时）

| 功能 | 说明 |
|---|---|
| **对话内容宽度滑块** | 60%–200%（100%=748px，200% 占满可用宽），localStorage 持久化 |
| **对话字号滑块** | 12–20px，消息区字号 + 行高联动 |
| **AI 消息占满消息列** | 无背景卡片、`width:100%` 消除右侧空白 |
| **用户消息自适应宽度** | `fit-content + max-width:100%`：内容少小气泡、内容多撑满整列 |
| **用户长消息折叠** | 渲染行 > 5 行自动折叠，点击展开/收起（含历史消息） |
| **消息工具条常显** | 每条消息常显发送时间与复制 / 分叉 / 调用量 / 耗时按钮（当天 `HH:mm`，跨天带日期）——产品默认需悬浮才显示 | 设置 → 通用 → 消息工具条常显 |
| **工具调用耗时** | 每条工具调用与子工具（PTC 子调用）右侧常显耗时（`296ms` / `2分02秒`）；**进行中的调用实时计时**（蓝色脉动，如 `35s…`），完成后自动定型；悬浮显示开始 / 结束时刻 | 设置 → 通用 → 工具调用耗时 |
| **面板打开时消息区让位** | 工作台面板 / 侧边栏打开时消息列自适应，不重叠不压缩 |
| **hero 页面适配** | hero composer 固定底部、headline 置顶 |

### 3. 会话标题

- 自定义标题 provider（所有消息触发）+ **创建时间戳后缀**（`-YYYYMMDDHHmmss`）
- 自动禁用官方 `session-title-llm`（通过 bundle.patch）

### 4. 注入控件与面板沿用 dsh 默认样式（不自带皮肤/容器外观）

**按钮**
- composer 工具栏的「提示词库 / 润色」按钮、建议条候选按钮，挂载后**从活的 DOM 读取相邻产品控件的类名并复制到自己身上**（`adoptProductButtonStyle`）：工具按钮取同排的 `指令 / 添加附件`，建议条取 composer 里的文字 pill（如「完全权限」）。外观与产品逐像素一致，产品改样式自动跟随，类名是**从 DOM 读的、不写死哈希**。

**面板（弹层 / 对话框）**
- 产品自己的弹层/对话框只在打开时存在，所以用一个**被动学习的登记表**（`rememberProductStyles`，rAF 节流的 MutationObserver）：一旦屏幕上出现过 `[role=menu]` / `[role=menuitem]` / `[role=dialog]` / 对话框里的导航行，就把它们的类名记下来。提示词库弹层、润色小面板借**产品的 menu**（`background:--dsw-specific-menu`、20px 圆角、`--dsw-elevation-prominent` 阴影、4px 内边距），管理对话框借**产品的设置面板**（32px 圆角 + 同款阴影），列表行借 menu cell / 对话框 navCell（40px、10/12px 圆角、hover 用 `--dsw-alias-interactive-bg-hover`）。
- 学习失败时（用户还没打开过任何产品弹层、或产品改了类名）由 `:where()` 包裹的**零优先级回退**兜底，取值全部照抄产品规则体（含 token）——实测回退与产品数值完全一致，所以不存在“没学到就难看”的窗口。
- 我们自己的行因为要放两行内容（标题 + 摘要），用**双类名**（`.PmptLb_item.PmptLb_item`）提高优先级来放宽产品行的固定高度、并 `flex:0 0 auto` 防止被列表压缩；选中态同理（`.PmptLb_manageRowActive.PmptLb_manageRowActive`）以免被借来的类名盖掉。

### 5. UI 修复
### 5. UI 修复

- **hero 菜单 overlay 修复**：下拉菜单覆盖输入框时自动限高滚动（不影响模型选择等短菜单）

---

## 兼容性与已知问题（重要，安装前必读）

### 版本锁定声明

本插件的 **布局增强**（AI 消息无背景、用户气泡自适应、长消息折叠、面板让位、宽度设置）通过运行时 CSS 注入实现。用户消息相关选择器已改为**哈希无关**的后缀匹配（`[class*=_userStack]` / `[class*=_bubble]` / `[class*=_userRow]`），因此不受 dsh 0.1.2 把用户气泡从 `dsh-client-ui-conversation` 迁到 `dsh-client-ui-chat`（哈希前缀 `gdEzaW_*` → `Sixlwa_*`）的影响；其余布局选择器仍依赖 dsh 客户端 bundle 的 **CSS-in-JS 哈希类名**（如 `wSkVaW_*` / `pXSMma_*` / `VOzbGW_*` / `nArs4W_*`）。这些类名随 dsh 每次构建可能变化。

- **实测版本**：`0.1.0-rc.7`、`0.1.1-rc.2`、`0.1.2-rc.1`、`0.1.5-rc.2`
- **布局增强失效表现**：安装后 AI/用户消息样式无变化（无错误提示，功能静默不生效）
- **处理方式**：布局失效时，其余功能（润色 / 提示词库 / 建议条 / 标题 / 消息工具条 / 工具耗时）不受影响；请提交 issue 附上你的 dsh 版本与 `document.querySelector('*[class]').className` 中对应的消息区类名前缀，我们会更新注入选择器。

### 其他已知问题

- **dsh 0.1.1-rc.2 的 modlens 适配器缺少 `prepareCall`**：插件启动时自动为缺失的适配器补丁（包装 `stream` 实现），使 `/polish`、`/suggest`、标题生成直接使用**用户会话选择的模型**；若补丁不可用则自动 fallback 到内置 `deepseek-official`。
- **dsh 0.1.5 输入框改成 Lexical contenteditable（页面里已无 `<textarea>`）**：composer 不再有 `textarea`，因此「润色」与「提示词库插入」原先读 `composerTextarea().value` 会拿到空串（潦色直接不动、库插入丢失已有草稿）。现改为从 slot 的 `useInput((state) => state.draft)` 读草稿、用 `inputActions.setDraft(text)` 写回——这是能到达 Lexical 内部状态的唯一写入口；DOM textarea 仅作老版本回退（`composerDraft` / `setComposerDraft` / `focusComposer` 三个小助手）。
- **dsh 0.1.5 的 dock slot `session` 只带生命周期字段（无 `nodes`）**：预测回复原先用 `session.nodes` 找最后一条 AI 回复，所以 `lastText` 恒为空、整个建议条不渲染（表现为“功能消失”）。现改为从 Session 事件窗口取最后一条 `assistant/message` 的 text 块（`suggestTextFeed` 共享馈送），`session.nodes` 路径仅作回退。
- **建议条点击行为读错了 localStorage key**：`useDraft` 读的是旧版 `harness-ui-enhancer.state`（迁移时已经被删掉），所以“仅填入”设置被忽略、永远直接发送。现改读 `dsh-enhance-tool.state`（旧 key 作为回退）。
- **dsh 0.1.5 的 `conversation.input.left` props 用 `sessionId` 而不是 `session`**：润色与库内润色现在优先传 `sessionId`，让 `/polish` 用会话自己的模型路由，`session?.sessionId` 仅作回退。
- **dsh 0.1.2 起 web 端需要认证**：直接访问 `http://127.0.0.1:3080/` 会返回 401，请使用启动日志中打印的 `http://127.0.0.1:3080/?token=...`（换取 cookie 后即可正常访问）。
- **dsh 0.1.2 的用户气泡结构变化**：文本由块级 `div` 改为内联 `span`，折叠逻辑改为裁剪气泡本体（高度 = 5 行 + 气泡内边距），展开按钮挂在气泡外的 `userStack` 上以免被 `overflow:hidden` 裁掉。
- **消息工具条常显（29-msgmeta）**：不新增 DOM，直接复用产品自身的消息工具条（`*_actions` 行：时钟 `*_timeStart` / `*_timeEnd`、复制 / 分叉、用量 / 耗时），时间随产品本地化格式（当天 `HH:mm`，跨天 `M月D日 HH:mm`）。产品在 `@media (hover:hover)` 下把整行设为 `opacity:0`（仅 hover / 最近一条时才显示），本插件做两层保证：
  1. CSS：`body.enhc-msgmeta [class*=_actions]:has(>…_timeStart/_timeEnd){opacity:1!important}` 强制该行可见；写成**两条独立的 `:has()` 选择器**（不用 `:is(:has())` 嵌套，部分引擎对嵌套支持不完整），也不依赖任何哈希类名前缀。
  2. JS 传保险：一个 rAF 节流的 MutationObserver 给时钟行加内联 `opacity:1!important`——内联 `!important` 胜过任何样式表规则，即使产品改了 hover 规则、其它插件注入更强的 `opacity:0!important`、或浏览器 `:has()` 异常，工具条也不会再被 hover 挡住（已用“注入 `opacity:0!important` 敌意规则”的方式实测）。关闭开关或插件卸载时会移除内联样式。
  产品本身的隐藏规则只作用在整行上（单个按钮没有 opacity 规则），所以强制该行可见就能同时露出时间与全部按钮。若某个 dsh 版本没有渲染该工具条，此开关静默无效果。
- **工具调用耗时（30-calldur）**：数据来自 **Session 事件窗口**，不靠观察计时：
  - 根调用：`tool/call`（`data.callId`）→ 开始，`tool/result`（`data.message.source.callId`）→ 结束。
  - 子工具（PTC 子调用）：`tool/ptc-dispatch-start`（`data.subCallId`）→ 开始，`tool/ptc-dispatch` → 结束。
  - 事件窗口通过 `ctx.inject(["sessions"], …)` 取（`sessions.binding(id).eventSource`）——用 `ctx.inject` 而不是写进 `inject` 数组，**依赖缺失时插件照常加载、只是不显示耗时**；同时订阅 `sessions.list` 跟踪会话切换、订阅 `eventSource` 跟踪新事件。
  - 行定位靠转录里的 `[data-chat-call-id]`（子调用就是 `<rootCallId>:ptc:<n>`，与事件里的 `subCallId` 完全一致）；只有开始没有结束 = 进行中 → 500ms 定时器实时刷新，结果事件落地后自动定型。
  - 工具卡片有三种渲染形态（`[data-disclosure-row]` / `role=button[aria-expanded]` / 无 body 的 bash 行），host 元素按此顺序回退，最后一档用标题 / 摘要 span 的父元素，所以三种形态都能挂上耗时。
  - DOM 扫描用 rAF 节流（与长消息折叠同一套思路）；开关关闭或插件卸载时删除 chip 并停掉定时器。窗口外的历史行（`hasMore` 截断）没有数据，不显示耗时。
- **会话标题 provider** 需要 `@deepseek-ai/dsh-session-title-llm`（install.sh 自动链接）。

---

## 0.1.5 API 漂移体检（2026-09 实测）

插件大量依赖产品内部结构。以 `dsh 0.1.5-rc.2` 为基准，对每一处依赖都做了“选择器/服务是否还命中”的实测，结论如下。

**有效（无需改动）**

| 类别 | 命中项 |
|---|---|
| slot | `conversation.input.left` / `conversation.input.dock` / `settings.general.item` / `shell.overlay` / `sidebar.footer.action` 全部照常挂载；hero 三个 slot 也存在 |
| 布局类名 | `wSkVaW_root` / `_scrollBody` / `_composerSeat` / `_titleCluster`（标签页搬运生效）、hero 的 `wSkVaW_composerHero` / `pXSMma_root` / `div[data-phase=hero]` |
| 后缀类名 | `_add` `_bubble` `_composerSeat` `_crumbCurrent` `_iconButton` `_logoRow` `_newSession` `_primary` `_sectionHeader` `_tabs` `_time` `_title` `_titleRow` `_trigger` `_viewArea` |
| 产品属性 | `[role=menu]`、`[data-chat-call-id]`、`[data-disclosure-row]`、`[data-composer-input]`、`[data-composer-card]`、`[data-conversation-scroll]`、`[data-input-scroll]`、各 `[data-slot=…]` |
| host 侧 | `ctx.webServer/fs/jobs/agents/subagents/sessionTitle/llm/sessions` 及所用方法均在；`/enhancer/enhancer-api`（mcp/list、jobs/list、tasks/list）、`/polish`、`/suggest`、`/prompt-library` 均 200 |

**本次修好的漂移**

| 症状 | 原因（实测证据） | 修法 |
|---|---|---|
| 侧边栏「新建会话」文字宽度不随字号缩放 | `[class$=_newSessionLabel]` 命中 0，产品现在在类名后还挂 `hHd-Xa_wide` 等（`[class*=]` 命中） | 改为 `[class*=_newSessionLabel]`（实测 max-width 200px → 286px 随 scale 生效） |
| 侧边栏品牌 lockup（鲸鱼 + deepseek HARNESS）随字号缩放 | 0.1.5 把它拆成**两个 svg**（mark 24×18 + wordmark 156×24）挂在 `[class*=_brandIdentity]` 下；旧规则「给 `_brand` 下的 svg 定死 182×24」一旦改成 `[class*=]` 就会把 wordmark 压成 26px（文字变小），用 zoom 放大又会被侧栏宽度裁切 | **撤销**品牌缩放：产品自己拥有该 lockup 的尺寸（老版本的单 svg lockup 规则仍按后缀匹配保留）。其余侧栏元素（新建会话、设置触发器、图标按钮、工作区列表）仍随 `工作区字号` 缩放 |
| 面包屑宽度限制失效 | `[class$=_crumb]` 命中 0 / `[class*=]` 命中 3 | `button[class*=_crumb]` |
| 设置滑块自定义外观失效 | 滑块类名已变为**无哈希**的 `uitw-slider` | `input[type=range][class*=uitw-slider]`（实测 `appearance:none`、`height:4px`） |
| hero 菜单限高修复完全不执行 | 锚点 `…composer.bar textarea` 在 0.1.5 已不存在（输入框是 Lexical `contenteditable`） | 锚点回退链 `textarea → [data-composer-input] → [data-composer-card]`（实测效果已执行；0.1.5 菜单自带≈视口高度的 max-height，按原设计会主动让位——强行限高只会让菜单变矮却仍压住输入框，故保留让位语义） |

**已删除的死代码（2026-09 清理）**

以下样式与逻辑都做了“命中数 0 + 产品与所有已装插件里都不存在该类名/变量”的双重确认后删除，删完复测功能与布局无变化：

| 删除项 | 依据 |
|---|---|
| `.nArs4W_panel` / `.nArs4W_bottomPanel` 相关的 JS 效应（`alignPanel`、`syncBottomPanel`）与 `--dsh-bottom-panel-height` 两条 CSS | 类名与变量在产品内全库搜索为 0（仅插件自己引用）；面板让位/底部留白由产品自身处理 |
| `.W-zNGW_*`、`.dsx-stats-*`、`--dsx-rail-w` 及相关 `syncToggleStates` 效应 | 属于“统计/工作台侧栏”类插件，未安装且产品无此类名 |
| `[class$=_toggleButton]` `_toggleCluster` `[class$=_badge]` `_badgeCount` | 电源按钮/统计插件内部类名，当前 UI 命中 0 |
| `[class$=_versionPicker] select*`（4 条） | 设置页已无 `_versionPicker` 也无任何 `<select>`（命中 0） |
| `.dsh_notification_title/subtitle/heading` 皮肤 | 插件市场/设置页命中 0 |
| `html #root{margin-right:0}`、`…>div:nth-child(2){margin-bottom:0}`、`_viewArea`/`_composerSeat` 的 `margin-right:0` 覆盖 | 实测“启用 vs 禁用插件样式表”四项计算值完全相同（都是 0px），即全是空操作 |

清理后插件样式表规则数 **156 → 127**，`lib/client.js` 约 -6.3 KB。

保留（仍有用，不算死代码）：`textarea` 老版本回退路径、`fillSectionTitle`（0.1.5 的 Agent 预设页仍有 `p[class$=_intro]`，逻辑可命中）、`.enhc-*` 自身类名。

---

## 已移除的功能：MCP 服务器管理、定时自动化（0.9.0）

这两个面板曾经由本插件提供（侧栏底部的「MCP」「自动化」入口 + `POST /enhancer/enhancer-api` 路由 + `enhancer-tasks.json` / profile `cordis.patch.yml` 写入）。0.9.0 起**整体移除**，原因：

- 它们属于 harness 的能力，不属于「界面增强」；dsh 自身提供 MCP 客户端运行时（`dsh-mcp-client`）与 profile patch 层机制，MCP 服务器可以直接写进 `~/.dsh/profiles/web/cordis.patch.yml`（dsh 会热应用）。
- 0.1.5 的 `ctx.fs` 实施 workspace-write 沙箱，profile 下的文件写入被拒，这两个面板的保存路径在实现上先天不可靠。
- 移除前的实现、体检结论与回归测试都保留在 git 历史里：`git show 845f415:lib/index.js`、`git log --oneline -- lib/index.js`。

移除后的自检对照：侧栏底部不再出现「MCP / 自动化」（只剩 dsh 自带的「设置」与第三方插件的「电源」）；`/enhancer/enhancer-api` 路由不再注册；插件 host 半边只保留 `/polish`、`/suggest`、`/prompt-library` 路由、适配器 `prepareCall` 补丁与标题 provider。

---

## 安装后自检

```bash
# 1. 插件已加载（后端日志应出现）
grep "patched prepareCall" ~/.dsh/web.log   # 或 dsh 日志文件

# 2. 润色 API 可用（无 sessionId 时返回友好报错）
curl -s -X POST http://127.0.0.1:3080/polish -H "content-type: application/json" -d '{"text":"测试"}'
# 期望: no model route configured: open a session and pick a model first

# 3. 浏览器：composer 工具栏应出现 提示词库 / 润色 按钮，消息右侧出现时间与工具耗时
```

---

## 开发

插件本体在 `dsh-enhance-tool/`：

```
.
├── package.json          # dsh.bundle.patch 声明（自动挂载）
├── cordis.patch.yml      # 插件挂载 + 禁用官方 session-title-llm
├── lib/
│   ├── index.js          # host 侧：路由 / 定时器 / 标题 provider / 适配器补丁
│   ├── client.js         # client 侧：全部 UI 组件 + 注入样式（构建产物）
│   └── polish-routes.js  # /polish /suggest /prompt-library 路由
├── install.sh            # 一键安装辅助
└── .github/workflows/    # CI：语法检查
```

`client.js` 是对 dsh 官方 client bundle 的**注入产物**（通过 slot 注入 + 运行时 CSS，不修改 bundle 源文件）。重注入脚本与本地开发流程见内部 `dsh-patches/`（未随仓库发布）。

### 改注入样式前先跑规则级 diff

注入的样式表在 `lib/client.js` 里是**一整行 JS 字符串**，普通 `git diff` 看不出「从逗号列表里删掉一个选择器」这类改动——已因此踩过两次坑（`[data-slot=x] [class$=_meta],[data-slot=x] [class$=_time]` 删掉前半段后变成 `[data-slot=x] [data-slot=x] …`，永不命中；`[class$=_brand] svg` 放宽成 `[class*=_brand] svg` 把品牌 wordmark 压扁）。所以改完必须跑：

```bash
python3 tools/css-diff.py            # HEAD vs 工作区，按规则列出增删
python3 tools/css-diff.py --lint --check   # 只扫可疑模式（重复属性步、空规则），CI 也跑这条
python3 tools/css-diff.py 0f8acdb HEAD     # 任意两个版本对比
```

规则 diff 只说明「改了什么」，是否**该**这么改还得在浏览器里确认：把 `style[data-plugin-css="dsh-enhance-tool/enhancer.module.css"]` 的 `sheet.disabled` 在 `true/false` 之间切换，对比 `getComputedStyle` + `getBoundingClientRect`，并逐个列出被新命中的元素（放宽后缀→子串匹配时尤其重要）。

### 本地开发闭环（只改 client.js 时无需重启 dsh web）

profile 里的 `dsh-enhance-tool/lib/client.js` 与仓库文件是**两份拷贝**（不是符号链接），因此改完仓库文件要覆盖过去：

```bash
cp -f lib/client.js ~/.dsh/profiles/web/node_modules/dsh-enhance-tool/lib/client.js
```

`@deepseek-ai/dsh-client-hmr` 会以 500ms 轮询 profile 里的 client bundle，检测到变化后重新计算该插件的 bundle rev（`index.html` 中 `dsh-enhance-tool/client.js&rev=...` 会变）并通知浏览器热重载 —— **不需要重启 dsh web**。实测：已打开的标签页会在几秒内自动热替换插件（SSE `rebuilt` 帧 → 重载模块 + 重建样式标签），无需刷新；但标签页被浏览器冻结/SSE 断连时会错过该帧，此时 Ctrl+Shift+R 硬刷新即可。注意 `index.html` 里合并大 bundle 的那个 `rev=` 不会变，别用它判断是否生效；host 侧 `lib/index.js` 的改动仍然要重启 dsh web。

---

## 数据文件（勿提交 / 勿外发）

- `~/.dsh/prompts.json` — 提示词库（可能含环境敏感信息）
