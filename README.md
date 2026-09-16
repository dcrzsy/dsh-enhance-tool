# dsh-enhance-tool

DeepSeek Harness (`dsh`) web 界面增强插件 — 润色、提示词库、预测回复、宽度/字号设置、MCP 与定时自动化面板。

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

### 4. MCP 服务器管理（侧边栏 → 面板）

- 列表 / 添加 / 移除 `dsh-mcp-client` 服务器条目（stdio / http）
- **合并写入** `~/.dsh/profiles/web/cordis.patch.yml`，保留用户其他配置，dsh 热应用

### 5. 定时自动化任务（侧边栏 → 面板）

- 任务字段：任务名 / 工作区 / 提示词 / 执行频率（分钟）
- 到点自动新建会话并发送预设提示词（spawn 子代理）
- 运行历史（时间 / 成功失败 / 失败原因 / 会话 ID），持久化 `enhancer-tasks.json`

### 6. UI 修复

- **hero 菜单 overlay 修复**：下拉菜单覆盖输入框时自动限高滚动（不影响模型选择等短菜单）

---

## 兼容性与已知问题（重要，安装前必读）

### 版本锁定声明

本插件的 **布局增强**（AI 消息无背景、用户气泡自适应、长消息折叠、面板让位、宽度设置）通过运行时 CSS 注入实现。用户消息相关选择器已改为**哈希无关**的后缀匹配（`[class*=_userStack]` / `[class*=_bubble]` / `[class*=_userRow]`），因此不受 dsh 0.1.2 把用户气泡从 `dsh-client-ui-conversation` 迁到 `dsh-client-ui-chat`（哈希前缀 `gdEzaW_*` → `Sixlwa_*`）的影响；其余布局选择器仍依赖 dsh 客户端 bundle 的 **CSS-in-JS 哈希类名**（如 `wSkVaW_*` / `pXSMma_*` / `VOzbGW_*` / `nArs4W_*`）。这些类名随 dsh 每次构建可能变化。

- **实测版本**：`0.1.0-rc.7`、`0.1.1-rc.2`、`0.1.2-rc.1`、`0.1.5-rc.2`
- **布局增强失效表现**：安装后 AI/用户消息样式无变化（无错误提示，功能静默不生效）
- **处理方式**：布局失效时，其余功能（润色 / 提示词库 / 建议条 / MCP / 自动化 / 标题）不受影响；请提交 issue 附上你的 dsh 版本与 `document.querySelector('*[class]').className` 中对应的消息区类名前缀，我们会更新注入选择器。

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

## 安装后自检

```bash
# 1. 插件已加载（后端日志应出现）
grep "patched prepareCall" ~/.dsh/web.log   # 或 dsh 日志文件

# 2. 润色 API 可用（无 sessionId 时返回友好报错）
curl -s -X POST http://127.0.0.1:3080/polish -H "content-type: application/json" -d '{"text":"测试"}'
# 期望: no model route configured: open a session and pick a model first

# 3. 浏览器：composer 工具栏应出现 提示词库 / 润色 按钮，侧边栏出现 MCP / 自动化 入口
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

### 本地开发闭环（只改 client.js 时无需重启 dsh web）

profile 里的 `dsh-enhance-tool/lib/client.js` 与仓库文件是**两份拷贝**（不是符号链接），因此改完仓库文件要覆盖过去：

```bash
cp -f lib/client.js ~/.dsh/profiles/web/node_modules/dsh-enhance-tool/lib/client.js
```

`@deepseek-ai/dsh-client-hmr` 会以 500ms 轮询 profile 里的 client bundle，检测到变化后重新计算该插件的 bundle rev（`index.html` 中 `dsh-enhance-tool/client.js&rev=...` 会变）并通知浏览器热重载 —— **不需要重启 dsh web**。实测：已打开的标签页会在几秒内自动热替换插件（SSE `rebuilt` 帧 → 重载模块 + 重建样式标签），无需刷新；但标签页被浏览器冻结/SSE 断连时会错过该帧，此时 Ctrl+Shift+R 硬刷新即可。注意 `index.html` 里合并大 bundle 的那个 `rev=` 不会变，别用它判断是否生效；host 侧 `lib/index.js` 的改动仍然要重启 dsh web。

---

## 数据文件（勿提交 / 勿外发）

- `~/.dsh/prompts.json` — 提示词库（可能含环境敏感信息）
- `~/.dsh/profiles/web/enhancer-tasks.json` — 自动化任务
- `~/.dsh/profiles/web/cordis.patch.yml` — MCP 合并写入目标
