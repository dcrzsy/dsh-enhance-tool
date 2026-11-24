# dsh-enhance-tool

DeepSeek Harness（`dsh`）Web 界面增强插件：润色、提示词库、预测回复、消息工具条、工具耗时、宽度/字号/侧栏缩放、会话任务看板、上下文查看、会话分享为图片，以及新会话系统提示词管理。

- **安装形态**：100% 插件注入（slot / shell.overlay / settings / sessionTitle 官方机制）+ 随包发布的 `cordis.patch.yml`（`package.json` 的 `dsh.bundle.patch`：挂载 `ui-enhancer`、禁用官方 `session-title-llm`）。不修改 dsh 官方 bundle 源文件，也不手改 profile 的 patch 配置。
- **兼容版本**：以 `package.json` 的 `peerDependencies` 为准，当前支持 `dsh >=0.2.1-rc.1 <0.3.0`。
- **许可证**：MIT。

## 目录

- [安装](#安装)
- [功能](#功能)
- [设置](#设置)
- [兼容性与已知问题](#兼容性与已知问题)
- [安装后自检](#安装后自检)
- [开发](#开发)
- [数据文件（勿提交 / 勿外发）](#数据文件勿提交--勿外发)

## 安装

### 方式一：dsh 官方插件命令（推荐）

```bash
dsh plugin --profile web add github:dcrzsy/dsh-enhance-tool
```

安装后补两个 pnpm 解析不到的依赖（它们位于全局 dsh 包内）：

```bash
DSH=$(dirname "$(dirname "$(node -e 'console.log(require.resolve("@deepseek-ai/dsh/package.json"))')")")
ln -sfn "$DSH/node_modules/@deepseek-ai/dsh-session-title"     ~/.dsh/profiles/web/node_modules/@deepseek-ai/
ln -sfn "$DSH/node_modules/@deepseek-ai/dsh-session-title-llm" ~/.dsh/profiles/web/node_modules/@deepseek-ai/
```

> `dsh plugin` 是官方插件管理命令（转发到 profile 目录的 pnpm），与 `dsh-power-button`、`dsh-better-sidebar` 等社区插件的安装方式一致。

### 方式二：一键脚本

```bash
git clone https://github.com/dcrzsy/dsh-enhance-tool
cd dsh-enhance-tool
bash install.sh
```

`install.sh` 会依次完成：

1. `dsh plugin add` 标准安装；本地目录失败时依次退到 GitHub 目标、自包含拷贝安装；
2. 确认 profile 的 `dsh.profile.bundles` 真的启用了本插件；
3. 链接 `dsh-session-title-llm` 依赖；
4. 全文件语法验证。

任何一步失败都会给出可行动提示并以非 0 退出，不会出现“没启用却打印 `[7/7] done.`”的情况。

> **`link:` 提示**：`dsh plugin --profile web add <本地目录>` 会被 pnpm 记成 `link:` 符号链接，指向你 clone 的目录。clone 移走/删除后，插件会在下次启动时静默消失（日志只剩 `skipping profile bundle "dsh-enhance-tool"`）。要“拷贝安装、与 clone 脱钩”请用：
>
> ```bash
> bash install.sh --copy
> ```
>
> `--copy` 直接把文件拷进 profile 的 `node_modules`，并把 `dsh-enhance-tool` 写进 `dsh.profile.bundles`，不经过 pnpm。它可以叠加在默认 link 安装之上：拷贝前会清理 `node_modules/dsh-enhance-tool`（活链接、悬空链接、旧目录都按 `rm -rf` 处理，只删链接本身，不动 clone），重复执行幂等。实测装完把 clone 移走/删掉，`dsh --profile web --dump-config` 仍能挂上 `ui-enhancer`，stderr 为 0 行。
>
> 取舍：`--copy` 不在 pnpm 依赖图里，之后对 profile 执行 `dsh plugin add/install` 可能把它清掉；届时重跑 `bash install.sh --copy` 即可。

### 卸载

```bash
dsh plugin --profile web remove dsh-enhance-tool
```

没有 dsh CLI，或用 `--copy` 安装时：

```bash
bash install.sh --uninstall
```

> **别只删目录**：`rm -rf …/node_modules/dsh-enhance-tool` 会留下 `dsh.profile.bundles` 里的条目，之后每次启动都打印 `dsh: skipping profile bundle "dsh-enhance-tool"`。`--uninstall` 会删目录、清条目，并用 `dsh --profile web --dump-config` 复验不再出现该告警。

### 安装后

```bash
# 重启 dsh web：优雅退出（SIGINT），不写死端口，不用 fuser/SIGKILL
# 前台运行：在它自己的终端里 Ctrl+C，再执行 `dsh web`
# 后台/分离运行：先确认 PID 再发 SIGINT
pgrep -af 'dsh web'
kill -INT <pid>
# 装了 dsh-power-button 的话，直接用它的 restart 入口
```

浏览器按 **Ctrl+Shift+R** 硬刷新即可。

> 插件通过自带的 `cordis.patch.yml`（`dsh.bundle.patch`）自动挂载，无需手动改配置。
> 卸载后同样重启 dsh web；细节见上面的「卸载」。

## 功能

### 1. 输入增强（composer）

| 功能 | 机制 | 位置 |
|---|---|---|
| **润色** | `/polish` API，用当前会话模型重写草稿（默认润色 / 自定义要求润色） | `conversation.input.left` 按钮 |
| **发送前自动润色** | 默认关闭。开启后拦截普通 Enter 与发送按钮，先调用 `/polish`（可带「自动润色规范」作为 `requirement`），再发送润色后的草稿；润色期间再次 Enter/点击会被吞掉，避免重复发送；`/` 开头命令跳过；失败回退原文并浮动提示 | 设置 → 界面增强 |
| **提示词库** | `/prompt-library` API，持久化 `~/.dsh/prompts.json`；支持分组/搜索/增删改/一键插入。插入按“粘贴”语义：已有草稿时先换行再追加，不覆盖原草稿；读不到 `useInput` 的旧构建回退读 Lexical contenteditable | `conversation.input.left` 按钮 |
| **自动润色规范** | 设置中的多行文本，最多 4000 字，随状态持久化；开启自动润色时作为 `/polish` 的 `requirement` 发送。留空使用默认润色 | 设置 → 界面增强 |
| **预测回复（建议条）** | `/suggest` API：把上一条提问 + AI 最后一条回复一起给模型，要求生成三条不同意图（推进/追问原因/换做法）并跟随对话语言；带「预测回复」标签与 `1/2/3` 序号。点击直接发送（可改为仅填入）；Shift+点击或 Alt+Shift+1/2/3 只填入；Alt+1/2/3 快捷选择 | `conversation.input.dock` |

> 主要配置项按「界面布局 / 输入与润色 / 消息与分享 / 任务看板」分类集中在 **设置 → 界面增强** 独立菜单，不再写入产品「设置 → 通用」页。默认系统提示词是左侧栏独立入口，不在设置中重复。

### 2. 布局与消息

| 功能 | 说明 |
|---|---|
| **对话内容宽度** | 60%–200%（100%=748px，200% 占满可用宽），localStorage 持久化 |
| **对话字号 / 工作区字号 / UI 字体** | 对话字号 12–20px，消息区字号与行高联动；工作区字号 12–20px；UI 字体多预设可选 |
| **AI 消息占满消息列** | 无背景卡片、`width:100%`，消除右侧空白 |
| **用户消息自适应宽度** | `fit-content + max-width:100%`：内容少时小气泡，内容多时撑满整列 |
| **用户长消息折叠** | 渲染行 > 5 行自动折叠，点击展开/收起（含历史消息） |
| **消息工具条常显** | 每条消息常显发送时间、复制/分叉/调用量/耗时按钮（当天 `HH:mm`，跨天带日期） |
| **工具调用耗时** | 每条工具调用与子工具（PTC 子调用）右侧常显耗时；进行中的调用实时计时，完成后定型；悬浮显示开始/结束时刻 |
| **面板打开时消息区让位** | 工作台面板 / 侧边栏打开时消息列自适应，不重叠、不压缩 |
| **hero 页面适配** | hero composer 固定底部，headline 置顶 |

### 3. 会话标题

- 自定义标题 provider（所有消息触发）+ 创建时间戳后缀（`-YYYYMMDDHHmmss`）。
- 通过 bundle.patch 禁用官方 `session-title-llm`。

### 4. 任务看板（通用面板）

会话头部「轨迹」紧右侧的 pill「看板」打开宽模态看板，卡片 = 会话。入口不使用 `utilities` slot（该位置在头部最右侧，离「轨迹」超过 600px，实际容易看不见），而是作为纯 DOM 节点插到 tab 条之后，并按产品 pill 逐条复刻 token：28px 高、`0 14px` 内边距、1px `--dsw-alias-border-l2` 描边、14px 圆角、13/500 字重、`--dsw-alias-label-secondary` 文字；打开时换成 `--dsw-alias-state-business-primary` 填充 + 反色文字。入口不带图标，也不借产品 tab 的类名：看板按钮是 tab 条的兄弟，借来的类只命中基础规则，会变成无底无边的文字链。设置关闭时同一节点隐藏，无需重载。这是并行会话的人工分诊台，不改动任何会话数据。

#### 六列与自动归类

未被手动拖过的会话按以下顺序自动落列，首个命中生效：

| 列 | 自动规则 |
|---|---|
| 进行中 | `running`，或存在 `running` / `stopping` 的后台任务，或 `inbox` 中有排队消息（`next-turn` / `next-step`） |
| 待办 | 真正还有事没完：最后一轮还没被回复（`turnOutline` 最后一条 `response` 为空），或会话自己的 todo 还有未完成项（`todos[].status !== "completed"`） |
| 完成 | 已回复，且最近 7 天内动过（工具栏「显示全部」可放开窗口） |
| 搁置 | 只有手动拖入，不自动进入 |
| 归档 | 其余（更早的，或投影信息未缓存的会话） |
| 垃圾桶 | 只有手动拖入，不自动进入 |

自动规则只读 host 侧已有 session 投影（`summary.projectionValues` 中的 `turnOutline` / `todos` / `inbox`），不发额外请求。`SessionSummary` 没有 `completed` 字段（只有 `sessionId / updatedAt / running / blank / parentSessionId / origin / cwd / projectionValues`），所以不能用它判断完成；冷会话（投影未缓存、没有 `turnOutline`）按“已回复”处理。

手动拖拽/菜单/批量移动会记为 `manual`，之后自动规则不再改它；卡片「⋯ → 重置为自动」交还自动规则。开启「跑完自动移到完成」时，手动放进「进行中」的会话在本轮结束后自动落到「完成」。

#### 自由待办卡

「待办」列底部常驻虚线 `＋ 新建待办`：点开变输入框，回车添加、输入框保留，`Esc` 或失焦关闭。自由待办卡不属于任何会话：

- 卡片用 `bg-layer-1` 与会话卡区分，元信息行为 `☑ 待办项 · 工作区 · 相对时间`。
- 点卡片 = 创建会话并执行；改名走元信息行 `✎` 按钮、`E` 键或 `⋯` 菜单。左下角勾选框 = 完成 → 进「完成」，取消勾选回「待办」（列内顺序仍由稀疏 `order` 维护）。
- `⋯` / `M` 菜单为六列（去掉垃圾桶）+ 删除；自由卡没有“重置为自动”。
- 可拖拽、批量选择、被搜索命中；不受工作区过滤影响（无 cwd），也不会被“过期归档”或剪枝清掉（`boardPrune` 只清理会话来路不明的条目）。
- 垃圾桶「清空」时，自由卡直接删除；会话走归档 → 回收站 → 物理删除链路。0.2.0 起先探测 `dsh-archived-chats` 是否可用，不可用时一个会话都不归档，只把卡片移出看板并如实提示。

点自由卡（或 `▶ 执行`、`⋯ → 创建会话并执行`）会：

1. `sessions.create({ cwd })` 建会话，`cwd` 用建卡时记录的 `item.cwd`（当时面板的工作区过滤，或当前打开会话的 cwd）。
2. 用产品提交链路发首条消息：`binding(id).session.beginSubmission({mode:'queue', text})` 先登记本地回显，再 `prompt([{type:'text', text}], 'queue', …, requestId)`；被拒时 `abandon()` 撤掉回显。
3. 成功后撤掉自由卡（它已变成真会话），标题栏提示「已创建会话并开始执行：…」。
4. 失败保留卡片并提示原因；若只是首条消息没发出去（会话已建好），自动打开该会话，手动发送即可。

批量选择模式下点击 = 勾选，不会误触发执行；`▶ 执行` 创建期间卡片显示 `data-busy` 并忽略点击。

看板状态 `items` 字段为 `{id: {title, done, at}}`，placement 仍在 `entries` 里，拖拽/排序逻辑复用；payload 版本仍为 `1`，旧状态可解析。

#### 交互

- 拖拽：原生 HTML5 DnD；列内显示插入位置（2px 品牌色横线），目标列高亮描边（垃圾桶用 danger 色）；列内排序用稀疏 `order`（插入取中点，间隙收窄时重排）。
- 键盘/触屏：卡片可聚焦，`Enter` 打开会话，`M` 或「⋯」打开移动菜单（六列 + 重置为自动）；`Esc` 先关菜单/「清空」确认，再按一次才关面板。
- 从侧栏拖入：侧栏行拖拽 payload 就是 `sessionId`（实测 `dataTransfer.getData("text/plain")`），可直接拖到某一列。
- 点击卡片 = 弹窗预览会话内容（用户提问 + 助手回复文本，最多 80 轮/次；来自 `sessions.using` → `binding.session.open()` → `eventSource.getSnapshot()`，只读；`<system-reminder>` 等注入 user 消息会过滤）。预览右上角「打开会话」才切换主视图并关闭面板（走 `ctx.uiWorkspace.openSession`；旧的 `sessions.open` 在 0.2.x 不导航）。`Esc` 先关预览、再关菜单/面板。批量选择模式下点击 = 勾选。
- 其他：搜索（标题/路径，也搜自由卡）、工作区下拉、含子会话/显示全部（分段控件）、列折叠（持久化，折叠后保留竖排列名）、待办列「新建待办」与「归档过期」按钮（时钟图标 + 计数，完整语义在 tooltip / `aria-label`）、垃圾桶「清空」（两步确认）。
- 标题右侧计数形如 `共 108 个会话 · 3 条待办`（有自由卡时才显示后半段）。
- 卡片徽标：`● 运行中`、`… 等待回复`、`⏱ N 个后台任务`、`☑ N 项待办`、`⏳ 有排队消息`、`子会话`、`· 手动`（只标记手动固定的卡片，自动态不占位）。
- 自由卡「执行」会真的创建会话并消耗模型调用；只记一笔时不要点，或进入批量选择再点。

#### 排版

- 面板 `1360×830`（随视口收缩），六列等宽（每列 ≥160px：1360 板宽时约 210px，1220 板宽时约 187px），列间距 10px、圆角 14px，沿用产品弹层底色/描边/字号变量。160px 下限保证六列在约 1220px 板上仍铺满；原 196px 下限会让板窄时最后一列被裁掉并出现横向滚动条。
- 卡片两行：标题（13px/20px，最多 2 行，最小 2 行高 40px，保证同列等高）+ 元信息行（工作区 · 相对时间 · `· 手动`）；「⋯」是卡片右上角常显菜单按钮（静止 0.7 透明度、命中区 24×24，hover/键盘聚焦提亮）。菜单是浮层，默认在卡片下方，列底空间不足时自动翻到上方，带 `--dsw-elevation-prominent` 阴影，打开不再把整列往下推。垃圾桶「恢复」在元信息行右端；垃圾桶卡片不再标「· 手动」。
- 自由卡元信息行只放「完成勾选 + 相对时间 + 执行/重命名图标」；工作区名移进「执行」按钮 tooltip（`在 <工作区> 创建会话并执行`），元信息行强制单行。
- 看板标题会剥掉创建时间戳后缀（`-YYYYMMDDHHmmss`；侧栏与存储保留），避免密集列中标题被时间戳吃掉。
- 长列按工作区分组 + 组内分页：组头为「工作区名 + 计数」，可点折叠/展开（`aria-expanded` 同步，折叠后只留组头）；每组先渲染 20 张，组尾是虚线「显示更多 <组名>（剩 N 个）」。归档列中超过一页（20 张）的组默认折叠；折叠状态随看板状态持久化（`state.folded`，键 `列|工作区`）。搜索/批量选择/只有单个工作区时不分组也不分页。
- 控制图标统一为产品同款 16px / 1.2px 线性 SVG（`BoardIcon`）；徽标文字里的 `● … ⏱ ☑ ⏳` 保留。
- 顶部计数在标题行右侧；工具条按「筛选 | 视图 | 批量」分组，控件高度统一 32px。
- 六列都有可辨的列容器（浅色约 1.08:1、深色约 1.13:1）与列头底色；待办/进行中/完成带极轻语义色，搁置/归档/垃圾桶用中性底色；列计数徽标、底部提示与右上计数在浅色下均 ≥3:1。
- 底部提示压成一行短句（拖拽跨列 · `M` 移动 · 垃圾桶「清空」需 `dsh-archived-chats` 才能真删），完整语义在 tooltip。

#### 状态存放（设置 → 界面增强）

| 模式 | 说明 |
|---|---|
| 本浏览器（默认） | `localStorage["dsh-enhance-tool.board"]`，即时生效，无需重启 |
| 随 profile 保存 | 通过 `GET/POST /enhancer/board` 写入 `~/.dsh/profiles/web/enhancer-board.json`（带 `.bak`，payload 形状校验，>256KB 返回 413）。写盘 debounce 800ms；打开面板时按 `updatedAt` 较新者胜（host 较新则采纳并回写 localStorage，反之推送 host）。路由随 host 半边加载，需重启一次 dsh web 才可用；未生效时只走 localStorage，不报错 |

#### 已知限制 / 有意未做

- 侧边栏行不显示所属列色点：侧栏 DOM 没有会话 id 属性（实测只有 class/role/aria-*；id 只在拖拽 payload 里），按标题匹配太脆。
- 不与 `dsh-archived-chats` 深度联动：该插件自带 host 侧归档/回收站/保留策略与路由，跨插件读内部状态很脆，两套“真删”逻辑并存有风险；本看板的归档/垃圾桶只影响看板本身。例外只有「清空」链路：需要真删时按需调用其路由，0.2.0 起先做能力探测，不可用就不动手。「看板归档时同时从侧栏收起会话」走核心 `workspaces.archiveSession` / `unarchiveSession`，与该插件路由无关。
- 垃圾桶「清空」= 真删尝试（两步确认）：核心 `workspaces.archiveSession` 归档 → `dsh-archived-chats` 的 `/delete-all` 移入回收站 → `/trash/purge` 物理删除，并带 CSRF 头 `x-dsh-archived-chats: 1`；每个会话的失败原因显示在垃圾桶列（如 `persistence-response-invalid`）。dsh 核心没有删除会话 API（`workspace/delete` 删的是工作区登记），真删只能借该插件。0.2.0 起先探测后动手：不可用时立刻返回、一个会话都不归档，只把卡片移出看板并提示。
- 运行中的会话删不掉：dsh 不允许归档仍有运行任务的会话（`workspace/session-active`），而插件只删已归档会话，链路会以 `session-not-archived` 半失败。看板先查 `summary.running`，这类会话标成 `session-running`，提示「会话还在运行：dsh 不允许归档/删除运行中的会话，等它跑完再清空」，并且不发归档/删除请求。常见失败码会翻译成可读文案：`session-live-purge-pending` → 已停放、重启 dsh 后才真删；`already-trashed` → 已在插件回收站；`trash-record-missing`、`persistence-response-invalid`。实测：运行中清空 → 未删除 1 个；跑完再清空 → 「已删除 1 个会话（数据已删，不可恢复）」，无恢复入口。
- 归档调用每次都发：核心 `workspaces.archiveSession` 对已归档 id 幂等（直接 resolve、不写盘），所以不用客户端 `archivedSessionIds` 快照跳过归档——该快照会过期，过期后会变成“看板以为已归档 → 跳过；插件看 host → 没归档 → `session-not-archived`”。归档失败真实原因（`session-running` / `session-missing` / `archive: <原文>`）会覆盖笼统提示。
- 两条契约（2026-10-19 修，1.5.2 实测）：`/trash/purge` 只读 `sessionIds`，发 `ids` 会被 400 `sessionIds-required` 拒掉；`/delete-all` 对已在回收站的会话回 `already-trashed`，这类 id 直接并入 purge 列表删一次，只有 purge 也失败才报失败。清空失败时，本来就处于归档状态的会话会被记进 undo 并尝试取消归档。
- 注意（0.1.5 时代旧记录）：本机 `dsh-archived-chats@1.1.0` 在 dsh 0.1.5 上删不掉：它校验会话头必须 `version === 2`，而 0.1.5 写的是 `version: 3`，`/delete-all` 对任何会话都回 `persistence-response-invalid`。在它可用之前，清空的效果是“把卡片从看板移除，会话本身仍在 dsh 里”；垃圾桶列头「恢复显示 N」可放回。
- 撤销归档：清空会先归档（会话从侧栏消失），所以“归档了但没删掉”必须可逆——看板把这类会话记在 `state.undo`，垃圾桶列头出现「撤销归档 N」，点击走 `/unarchive-all` 取消归档并把卡片放回看板。
- 真删成功的会话不可恢复：`/trash/purge` 真正删掉的会话数据已不存在，看板把卡片和 id 从可恢复列表移除（`boardDrop`），不进「恢复显示 N」/「撤销归档 N」；提示写「已删除 N 个会话（数据已删，不可恢复）」，关闭面板时清空。删除成功的 id 另记墓碑（`state.gone`）：冷会话被删不会触发列表事件，客户端旧列表会滞后、卡片会按自动规则弹回，墓碑在这个窗口压住它，等列表不再提到它时由 `boardPrune` 清掉；空列表快照不参与剪枝，否则会误删隐藏/撤销/墓碑。垃圾桶头「恢复显示 N」只数会话仍在列表里的隐藏卡片。
- 归档时同时从侧栏收起会话（默认关闭）：关闭时归档列只是看板内分诊状态，不碰会话（零 `archiveSession` / `unarchiveSession` 调用）。开启后，手动把卡片移入「归档」列（拖拽/⋯菜单/批量/「归档过期」）会调用核心 `workspaces.archiveSession`，会话从侧栏消失；移出「归档」列时用 `workspaces.unarchiveSession` 恢复。不依赖 `dsh-archived-chats`。标记是看板状态里的手动落列（`entries[id].manual === true && column === "archived"`），刷新后仍能恢复。安全阀：规则自动归类永不触发，只有手动动作会触发；代码级断言在 `tools/board-logic-test.mjs`，自动落列/状态函数里不许出现 `boardSidebarAction`、两个 owner 或 `archiveSession`，且两个 owner 只能在 `BoardDialog` 的手动处理函数里被调用。失败会写进看板标题栏提示（`.enhc-board-note`），不静默吞掉；批量场景提示如「已从侧栏收起 N 个会话，拖出「归档」列即可恢复」。侧栏入口：筛选会话 →「全部对话（显示已归档）」或「仅显示已归档」；归档中的对话取消归档前打不开。关闭开关不会自动放回已收起的会话；建议先把卡片移出「归档」列再关闭。

### 5. 上下文面板

入口：「轨迹」与「看板」之间的 pill「上下文」（与看板入口同一套 token、同一显隐开关）。会话未打开时头部没有 tab 条，入口也不出现。

面板（`Esc` / 遮罩 / ✕ 关闭）：

- 顶部：会话标题 + 「上下文已用 N%」+ `~已用 / 窗口`（如 `~261k / 1.0M`）。
- 组成行：系统提示词 / 工具定义 / 对话消息各自 token 数（色点区分）；「系统提示词」整行可点，跳到系统提示词页签。
- 两个页签：上下文内容（默认）与系统提示词。
- 上下文内容：用户消息、助手回复、压缩摘要；`<system-reminder>` 等注入消息过滤。压缩后按当前可见 surface 显示——被替换的旧消息隐藏，摘要落在实际替换位置（会话日志与「轨迹」仍保留完整历史）。
- 系统提示词：单独、完整显示系统提示（最多 200k 字符）。长会话的系统提示在日志最开头、尾页窗口通常没有；第一次切到该页签自动向前翻页（每轮最多 12 页），找不到时显示「加载更早历史」，翻到开头仍没有则如实提示。
- 底部两个动作：压缩、编辑上下文。

实时刷新：面板打开期间订阅会话 `eventSource` 与 `contextPressure` / `contextBreakdown` 两个投影（160ms 合并），对话运行或压缩完成时百分比、组成和内容自动更新。

「压缩」：调用 `binding.session.command("/compact")`（agent 忙时宿主拒绝，底部如实显示）。发起后进入「压缩中…」，按会话日志的 `command/run` + `command/done` 等待真实结果：成功显示「压缩完成，上下文已更新」；没有可压缩历史显示「没有可压缩的历史」；失败显示宿主错误；3 分钟无结果则恢复按钮并提示结果会出现在对话里。压缩摘要同时以 flow node 出现在对话里。

「编辑上下文」：把当前会话内容（系统提示词不参与）渲染成 `[你] / [助手] / [压缩摘要]` 可编辑文本；发送后作为新消息进入上下文。要替换旧历史而不是追加，再点一次「压缩」。

数据来源（0.2.0 实测）：用量/组成从会话自己的投影 store 读（`binding.session.projections.faceOf("contextPressure" | "contextBreakdown").getSnapshot()`）。列表 summary 的 `projectionValues` 只带 title/turnOutline/todos/inbox 等种子，拿不到这两个；`contextPressure` 提供 `projectedTokens / pressureTokens / contextWindow`（没有 `surfaceTokens`），`contextBreakdown` 直接是 `{systemTokens, toolsTokens, messageTokens}`（没有再包一层 `breakdown`），两处都做了兜底。内容列表覆盖事件窗口（最多 80 条），系统提示词页签最多显示 8 条；压缩替换由 `compaction/summary.shadowedSeqs` 与替换消息的 `surfaceOp` 共同确定，面板按 surface 位置（不是 seq 顺序）还原。

### 6. 系统提示词（新会话 / 按工作区）

左侧栏「工作区」上方的「默认提示词」入口维护新会话 system prompt；它不放在按会话打开的「上下文」面板里。

- 作用域：全局默认 + 每个工作区覆盖；有工作区覆盖时优先工作区，否则回退全局。
- 存储：profile 的 `enhancer-system-prompt.json`，结构 `{ global: {text,updatedAt}, workspaces: { [cwd]: {text,updatedAt} } }`；由 host 路由 `GET|POST /enhancer/system-prompt` 读写，POST 可带 `workspace`。
- 替换：host 在 `system-prompt/assemble` waterfall 中把 `assembly.sections` 整体替换为命中作用域的文本；工具定义与运行时上下文仍由产品提供，不会被删。
- 生效范围：只替换尚未开始第一轮对话的会话（按日志第一条 `user/message` 时间与命中作用域的 `updatedAt` 比较）；已有用户消息的会话不变。
- 工作区留空保存 = 删除该工作区覆盖并回退全局；全局留空保存 = 恢复产品默认系统提示词。

### 7. 会话分享（图片）

会话头部最右侧「分享」按钮进入选择模式，把选中轮次生成图片并写入剪贴板。

- 选择粒度是内容块：每条用户消息、每段助手正文各一个勾选；取消勾选即可去掉。思考过程、工具调用、复制/分叉等交互控件不会出现。
- 进入后每段内容上方出现勾选胶囊（默认全选）：用户块显示 `你 · 时间 · 预览`，助手块显示 `AI · 预览`，点击切换；底部浮动条显示「已选 N / M 段」，支持全选/清空/复制图片/退出（`Esc` 也可退出）。
- 复制图片：把所选轮次渲染成 PNG 后直接写入剪贴板；成功退出选择模式并提示「已复制图片到剪贴板」。
- 图片内容：会话标题、轮次数与时间范围、只渲染勾选内容块（按轮次分组、保持原 DOM 顺序）、未选轮次的「省略 N 轮」分隔、页脚；表格/代码块/列表/引用/内联图片按页面样式保留。
- 失败可恢复：剪贴板被拒绝（未聚焦、权限、非安全上下文）时弹出预览对话框，可重试复制或下载 PNG，不会丢图。
- 尺寸兜底：宽度 760 CSS px，默认 2x 输出；内容过长自动降采样，超过画布上限（16000px）提示减少内容，不生成半张图；一次最多 120 段。
- 长图不截断：页脚后放整宽结束标记，按它在 SVG 栅格中的实际位置裁剪；SVG 中表格/容器布局比活 DOM 高时自动扩大渲染视口重试。
- 主题跟随：图片颜色取自当前页面主题变量，浅色/深色都与界面一致。
- 设置 → 界面增强 → 会话分享（图片）可隐藏头部按钮（默认显示）。

实现要点：图片不是截图，而是克隆产品 DOM + 回放页面 CSS，通过 SVG `foreignObject` 光栅化到 Canvas——表格、代码块、语法高亮直接沿用产品样式，不需要 Markdown 渲染器或新依赖。SVG 图片是不透明源，因此复制 CSS 前清掉所有非 `data:` URL（否则 Canvas 被污染、`toBlob()` 抛错）；DOM 图片转成 `data:` URL 内联，跨域/不支持类型跳过；`ClipboardItem` 在点击的瞬时激活内创建（先传 `Promise<Blob>`，随后再渲染），避免长渲染丢掉用户手势。

已知边界：用户消息的附件卡片（文件/图片缩略图）不进入图片，只分享消息气泡文本；KaTeX 数学公式使用系统字体回退（不内联 KaTeX 字体），复杂公式可能与页面略有差异；剪贴板只写 PNG，不支持 `ClipboardItem` 时走下载兜底。

### 8. 注入控件与面板样式

按钮：composer 工具栏的「提示词库 / 润色」、建议条候选按钮，挂载后从活的 DOM 读取相邻产品控件类名并复制到自己身上（`adoptProductButtonStyle`）：工具按钮取同排「指令 / 添加附件」，建议条取 composer 文字 pill（如「完全权限」）。外观与产品逐像素一致，产品改样式自动跟随，类名从 DOM 读、不写死哈希。

面板：产品弹层/对话框只在打开时存在，所以用被动学习登记表（`rememberProductStyles`，rAF 节流 MutationObserver）：屏幕上出现过 `[role=menu]` / `[role=menuitem]` / `[role=dialog]` / 对话框导航行时记下类名。提示词库弹层、润色小面板借产品 menu（`background:--dsw-specific-menu`、20px 圆角、`--dsw-elevation-prominent` 阴影、4px 内边距）；管理对话框借产品设置面板（32px 圆角 + 同款阴影）；列表行借 menu cell / 对话框 navCell（40px、10/12px 圆角、hover 用 `--dsw-alias-interactive-bg-hover`）。

学习失败时（尚未打开任何产品弹层，或产品改类名）由 `:where()` 零优先级回退兜底，取值照抄产品规则体，实测与产品数值一致。自己的行要放两行内容（标题 + 摘要），用双类名（`.PmptLb_item.PmptLb_item`）提高优先级放宽产品行固定高度，并 `flex:0 0 auto` 防止被列表压缩；选中态同理（`.PmptLb_manageRowActive.PmptLb_manageRowActive`）。

排版：

- 润色弹窗：提示文案（12px 次级色）→ 自定义要求输入框 → 右侧动作行「按要求润色 / 默认润色」；主按钮用产品 composer 发送键的 `--dsw-alias-button-info-fill`（蓝色）。
- 提示词管理：左侧 236px 导航列（搜索 + 分组筛选 + 两行行项，删除按钮常驻右侧、不挤压标题）+ `.5px` 分隔线；右侧表单列固定 520px 宽，字段带 12px 标签（标题 / 分组 / 提示词内容）、8 行文本域；底部动作行以 `.5px` 上边线隔开，左侧「润色提示词」，右侧「取消 / 保存」。
- 弹层/对话框层级：管理对话框 `z-index:1200`，高于润色/提示词库弹层（1100）。
- 新增类名必须同步加入 `PromptTools_module_css_default` 映射表（`lib/client.js` 手写表），否则 `className` 为 `undefined`，样式静默不生效。

### 9. UI 修复

- hero 菜单 overlay：下拉菜单覆盖输入框时自动限高滚动，不影响模型选择等短菜单。

## 设置

所有插件配置集中在独立菜单 **设置 → 界面增强**，按以下四组展示；不再写入产品「设置 → 通用」。

| 分组 | 内容 |
|---|---|
| 界面布局 | 对话内容宽度、对话字号、工作区字号、UI 字体 |
| 输入与润色 | 预测回复点击行为、发送前自动润色、自动润色规范 |
| 消息与分享 | 工具调用耗时、消息工具条常显、会话分享 |
| 任务看板 | 通用面板（看板）显隐、跑完自动移到完成、归档时同时从侧栏收起、看板状态存放位置 |

默认系统提示词由左侧栏「默认提示词」独立入口维护，不在设置菜单中重复。

## 兼容性与已知问题

### 版本锁定声明

布局增强（AI 消息无背景、用户气泡自适应、长消息折叠、面板让位、宽度设置）通过运行时 CSS 注入实现。用户消息相关选择器使用哈希无关的后缀匹配（`[class*=_userStack]` / `[class*=_bubble]` / `[class*=_bubble] div`），不受 dsh 0.1.2 把用户气泡从 `dsh-client-ui-conversation` 迁到 `dsh-client-ui-chat`（`gdEzaW_*` → `Sixlwa_*`）影响；其余布局选择器仍依赖客户端 bundle 的 CSS-in-JS 哈希类名（`wSkVaW_*` / `pXSMma_*`），这些类名可能随构建变化。

- **实测版本**：`0.2.0-rc.2`（2026-09 全量审计：宿主 A1–A6 + 客户端 B1–B16 + 打包 C1–C4 共 26 项 + 2 个假设，证据见 `reports/compat-0.2.0/REPORT.md`）；此前实测 `0.1.0-rc.7` / `0.1.1-rc.2` / `0.1.2-rc.1` / `0.1.5-rc.2`。
- **支持版本**：`dsh >=0.2.1-rc.1 <0.3.0`；0.20.2 的提示词插入修复已在活体客户端 `0.2.2-rc.1` 验证。
- **0.2.0 的实际情况**：`wSkVaW_*` / `pXSMma_*` 仍然存在（0.2.0 头部实测 `[class$="_tabs"]=1`，类名 `wSkVaW_tabs`；插件代码分别仍有 13 / 1 处引用），hero 布局与头部 tab 条照常命中。本轮真正静默失效的是 D1 / D2 / D3（会话判据、宽度变量名、消息时间节点层级），与哈希前缀无关。`VOzbGW_*` / `nArs4W_*` 插件已 0 引用。
- **布局增强失效表现**：安装后 AI/用户消息样式无变化，无错误提示，功能静默不生效。
- **处理方式**：布局失效时其余功能（润色/提示词库/建议条/标题/消息工具条/工具耗时）不受影响；请提交 issue，附 dsh 版本与 `document.querySelector('*[class]').className` 中对应的消息区类名前缀。

### 0.2.0-rc.2 已修问题

| # | 原因 | 修复 | 复验 |
|---|---|---|---|
| D1 | 会话列表快照没有 `current`，当前会话判据恒 `null` → 事件窗口不订阅（建议条 `return null`、耗时恒 0、看板 `[data-current]` 恒 0） | 新增 `resolveCurrentSessionId(sessions, explicit)`：显式 slot id → `byId` 中 `retainedBy.mainView > 0` → 老版 `.current` 回退；三处调用点全改走它 | 36/36 调用行有真实耗时；42 张卡中 1 张 `[data-current]` 且正是当前会话；dock 出现 `.Sggst_root` + 3 条真实候选 |
| D2 | 宽度写的是 0.2.0 无消费者的 `--dsh-user-chat-width`，而 `--dsh-chat-content-width` 被 `.wSkVaW_body` 自身 `clamp(…)` 覆盖 → 列宽恒约 742px | 改写产品真旋钮 `--dsh-chat-user-width`（旧名仅作 0.1.x 回退），字号三项未动 | 消息列宽 748px → 1089px，`page.reload()` 后仍 1089px；字号 14→18px 不回归 |
| D3 | END 时钟被包进 `span._endInfo`，不再是 `_actions` 直接子元素 → CSS `:has(>…)` 与 JS `parentElement` 双路失配 | CSS 改后代匹配 `:has([class*=_timeEnd])`；JS 改 `closest("[class*=_actions]")` | 12/12 `_actions` 行 computed `opacity=1`，其中 9 行是旧失配情形 |
| B16 | 原链路「先归档 → `/delete-all` → `/trash/purge`」在 `dsh-archived-chats` 被 0.2.0 门禁跳过时，前两步已把会话归档；失败文案与实际不符 | 先探测后动手：开板时对路由发一次空 id POST 判定能力，不可用就一个会话都不碰、只移出看板并提示；真删中途发现路由已死则降级缓存；恢复改用核心 `workspaces.unarchiveSession` | 垃圾桶列头 `ⓘ` 表示「真删不可用：未加载 `dsh-archived-chats`」；开板仅 1 次空 id 探测 POST、0 次归档请求 |
| P2 | 三条死规则：header 选择器方向反了、`userStack`/`userRow` 层级反了、`fillSectionTitle` 依赖的 `p[class$=_intro]` 已不存在 | 删掉两条 0 命中规则（留恢复条件注释，不强行反向）；`fillSectionTitle` 去掉 intro 硬前置，改为「产品自有 h1/h2/h3 或插件页头 → 不注入」 | 设置页五个分区无重复标题、13 个 slot 子元素/3 个滑块完好；看板入口三页签位置不变 |

打包与安装侧：

- **C1 版本门禁**：`package.json` 显式声明 `"@deepseek-ai/dsh": "^0.2.0-rc.2"`；dsh 0.2.0 会按 `peerDependencies` 跳过版本不匹配的 bundle（`dsh-app-boot` 的 `evaluatePluginCompatibility`）。新声明已用真实门禁函数确认兼容。
- **C2 声明清理**：`dsh.client.inject` 由 5 项清理为 3 项（`-ui-settings` / `-locale` / `-ui-conversation`），删掉 0.2.0 全树不存在的 `@deepseek-ai/dsh-client-runtime` 与已无 `dsh.client` 声明的 `-ui-slots`。
- **install.sh**：版本前提不再写死，直接读 `package.json` 的 `peerDependencies`，写入前用 dsh 自己的门禁检查（读取 profile 的 `compatibility.json` 豁免；不匹配时给出可行动报错并以非 0 退出）；`bash install.sh --check` 只读干跑。后续补齐：全局 dsh 解析优先取 PATH 上那份；无 `node` 时前置报错；`dsh plugin add` 失败时打印诊断并依次退到 GitHub 目标、自包含拷贝安装（失败回滚并 exit 1）；新增 `--copy` 与 `--uninstall`。

### 仍未闭合（不要当已修）

- **B6 自由待办卡「执行」链路**：4 个 API 签名一致，但未授权真的建会话执行 → 功能 UNKNOWN（点 `▶ 执行` 会消耗模型调用）。
- **B13 hero 菜单限高**：按设计退让（产品自带约视口高度的 `max-height` 时主动让位），锚点回退命中 `[data-composer-input]`；用户可见目标未达成（菜单仍会压住 composer）。
- **B16 端到端**：只读面 PASS，按钮级语义未渲染（垃圾桶为空），破坏性拖拽未做 → PARTIAL；`dsh-archived-chats` 仍是外部依赖。
- **B7 hero 布局效果**：前缀仍在，但最初证据测的是产品自身 `hWmORq_root`，不足以证明 hero 规则的用户可见效果 → 未验。
- **D1 的 `data-live` 子项**（进行中实时计时）：80 次钉底采样未捕捉到运行态行 → PARTIAL（chip 本身 PASS，`data-live` 与 500ms ticker 存在）。
- **A1 的 400 文案分支**：本机 profile 配了默认模型，该分支不可达 → UNKNOWN（自检已注明前提）。
- **0.1.x 真机回归**：本轮无 0.1.x 运行时，未跑 → 未验（0.1.x 也不在当前 `peerDependencies` 范围内）。

### 0.1.5 API 漂移体检（2026-09 历史记录）

以 `dsh 0.1.5-rc.2` 为基准，对每处依赖做了“选择器/服务是否还命中”的实测；本节保留原始结论与证据。

**有效（无需改动）**

| 类别 | 命中项 |
|---|---|
| slot | `conversation.input.left` / `conversation.input.dock` / `settings.general.item` / `shell.overlay` / `sidebar.footer.action`；hero 三个 slot 也在 |
| 布局类名 | `wSkVaW_root` / `_scrollBody` / `_composerSeat` / `_titleCluster`（标签页搬运生效）、hero 的 `wSkVaW_composerHero` / `pXSMma_root` / `div[data-phase=hero]` |
| 后缀类名 | `_add` `_bubble` `_composerSeat` `_crumbCurrent` `_iconButton` `_logoRow` `_newSession` `_primary` `_sectionHeader` `_tabs` `_time` `_title` `_titleRow` `_trigger` `_viewArea` |
| 产品属性 | `[role=menu]`、`[data-chat-call-id]`、`[data-disclosure-row]`、`[data-composer-input]`、`[data-composer-card]`、`[data-conversation-scroll]`、`[data-input-scroll]`、各 `[data-slot=…]` |
| host 侧 | `ctx.webServer/fs/jobs/agents/subagents/sessionTitle/llm/sessions` 及所用方法；`/enhancer/enhancer-api`（mcp/list、jobs/list、tasks/list）、`/polish`、`/suggest`、`/prompt-library` 均 200 |

**本次修好的漂移**

| 症状 | 原因（实测证据） | 修法 |
|---|---|---|
| 侧边栏「新建会话」文字宽度不随字号缩放 | `[class$=_newSessionLabel]` 命中 0；产品在类名后还挂 `hHd-Xa_wide` 等（`[class*=]` 命中） | 改为 `[class*=_newSessionLabel]`（实测 max-width 200px → 286px，随 scale 生效） |
| 品牌 lockup 随字号缩放 | 0.1.5 把 lockup 拆成两个 svg（mark 24×18 + wordmark 156×24）挂在 `[class*=_brandIdentity]`；旧规则会把 wordmark 压成 26px，zoom 放大又会被侧栏裁切 | 撤销品牌缩放：产品自己拥有 lockup 尺寸（老版本单 svg 规则仍按后缀匹配保留）；其余侧栏元素仍随「工作区字号」缩放 |
| 面包屑宽度限制失效 | `[class$=_crumb]` 命中 0 / `[class*=]` 命中 3 | `button[class*=_crumb]` |
| 设置滑块自定义外观失效 | 滑块类名变为无哈希的 `uitw-slider` | `input[type=range][class*=uitw-slider]`（实测 `appearance:none`、`height:4px`） |
| hero 菜单限高修复不执行 | 锚点 `…composer.bar textarea` 在 0.1.5 已不存在（输入框是 Lexical contenteditable） | 锚点回退链 `textarea → [data-composer-input] → [data-composer-card]`；0.1.5 菜单自带约视口高度的 max-height，按原设计主动让位 |

**已删除的死代码（2026-09 清理）**

均经“命中数 0 + 产品与已装插件都不存在该类名/变量”双重确认，删完复测功能与布局无变化：

| 删除项 | 依据 |
|---|---|
| `.nArs4W_panel` / `.nArs4W_bottomPanel` 相关 JS 效应（`alignPanel`、`syncBottomPanel`）与 `--dsh-bottom-panel-height` 两条 CSS | 类名与变量在产品内全库搜索为 0（仅插件自己引用）；面板让位/底部留白由产品处理 |
| `.W-zNGW_*`、`.dsx-stats-*`、`--dsx-rail-w` 及相关 `syncToggleStates` | 属于统计/工作台侧栏类插件，未安装且产品无此类名 |
| `[class$=_toggleButton]` `_toggleCluster` `[class$=_badge]` `_badgeCount` | 电源按钮/统计插件内部类名，当前 UI 命中 0 |
| `[class$=_versionPicker] select*`（4 条） | 设置页已无 `_versionPicker`，也无 `<select>`（命中 0） |
| `.dsh_notification_title/subtitle/heading` 皮肤 | 插件市场/设置页命中 0 |
| `html #root{margin-right:0}`、`…>div:nth-child(2){margin-bottom:0}`、`_viewArea`/`_composerSeat` 的 `margin-right:0` 覆盖 | 启用 vs 禁用插件样式表计算值完全相同（都是 0px），全是空操作 |

清理后样式表规则数 **156 → 127**，`lib/client.js` 约减少 6.3 KB。保留仍有用：`textarea` 老版本回退、`fillSectionTitle`（0.1.5 Agent 预设页仍有 `p[class$=_intro]`）、`.enhc-*` 自身类名。

## 已移除的功能：MCP 服务器管理、定时自动化（0.9.0）

这两个面板曾由本插件提供（侧栏底部「MCP」「自动化」入口 + `POST /enhancer/enhancer-api` 路由 + `enhancer-tasks.json` / profile `cordis.patch.yml` 写入），0.9.0 起整体移除：

- 它们属于 harness 能力，不属于「界面增强」；dsh 自身提供 MCP 客户端运行时（`dsh-mcp-client`）与 profile patch 层机制，MCP 服务器可直接写入 `~/.dsh/profiles/web/cordis.patch.yml`（dsh 会热应用）。
- 0.1.5 的 `ctx.fs` 实施 workspace-write 沙箱，profile 下文件写入被拒，这两个面板的保存路径先天不可靠。
- 移除前实现、体检结论与回归测试保留在 git 历史：`git show 845f415:lib/index.js`、`git log --oneline -- lib/index.js`。

移除后自检：侧栏底部不再出现「MCP / 自动化」（只剩 dsh 自带「设置」与第三方插件「电源」）；`/enhancer/enhancer-api` 不再注册；host 半边只保留 `/polish`、`/suggest`、`/prompt-library` 路由、适配器 `prepareCall` 补丁与标题 provider。

## 安装后自检

```bash
# 0. 安装前只读干跑（检查 profile / 全局 dsh / 版本门禁 / 依赖 / 源码语法，不安装任何东西）
bash install.sh --check        # 期望 exit 0，末行 "nothing was installed (--check)"

# 1. 插件会被加载（全部只读，不碰 profile）
grep -n 'dsh-enhance-tool' ~/.dsh/profiles/web/package.json      # dsh.profile.bundles 里有它
node -e "console.log(require(process.env.HOME+'/.dsh/profiles/web/node_modules/dsh-enhance-tool/package.json').version)"   # 期望当前版本
grep -c 'skipping profile bundle "dsh-enhance-tool"' <启动日志>   # 期望 0
# 注意：不要用 `grep "patched prepareCall"` 判断——0.2.0 的 LlmAdapter 基类已自带 prepareCall，
#       补丁必然跳过，那条日志不会出现（插件仍可能完全正常）。
# 可选（更强，但会按设计重写 profile 根文件 cordis.yml；固定模板、幂等）：
#   dsh --profile web --dump-config | grep -A1 'id: ui-enhancer'   # 期望 - id: ui-enhancer / name: dsh-enhance-tool

# 2. 润色 API 可用
curl -s -X POST http://127.0.0.1:3080/polish -H "content-type: application/json" -d '{"text":"测试"}'
# 期望 A（profile 未选默认模型）: HTTP 400 {"ok":false,"error":"no model route configured: open a session and pick a model first"}
# 期望 B（profile 配了默认模型，如本机 agent-default-model = deepseek-official/deepseek-flash）:
#          HTTP 200 {"ok":true,"text":"…"} —— 两种都算通过。
# 需要认证时：curl -s -c /tmp/jar "http://127.0.0.1:3080/?token=<启动日志里的 token>"，之后请求加 -b /tmp/jar

# 3. 浏览器 Ctrl+Shift+R 硬刷新：
#    composer 工具栏出现 提示词库 / 润色；消息右侧常显时间与工具耗时；
#    打开有消息的会话后输入框上方出现建议条（0.2.0 上三项依赖 D1/D2/D3 修复）；
#    会话头部最右侧出现「分享」按钮：进入选择模式 → 点「复制图片」→ 剪贴板里应是一张 PNG。
```

## 开发

插件本体就是仓库根目录（旧文档说的“插件本体在 `dsh-enhance-tool/`”不是本仓库的嵌套目录）：

```
.
├── package.json          # dsh.bundle.patch 声明 + dsh.client.inject、peerDependencies 门禁
├── cordis.patch.yml      # 插件挂载 + 禁用官方 session-title-llm
├── lib/
│   ├── index.js          # host 侧：路由 / 定时器 / 标题 provider / 适配器补丁
│   ├── client.js         # client 侧：全部 UI 组件 + 注入样式（构建产物）
│   └── polish-routes.js  # /polish /suggest /prompt-library 路由
├── install.sh            # 安装辅助：默认 pnpm 路径；--copy / --check / --uninstall
├── tools/                # 测试与工具：board-logic-test / board-ui-probe / board-archive-gate-test / share-logic-test / context-logic-test / prompt-insert-logic-test / css-diff.py
├── .github/workflows/    # CI：语法检查 + 回归网（含负控）
├── LICENSE               # MIT
└── reports/              # 兼容性审计与复验报告（package.json 的 files 不含它）
```

`package.json` 的 `files` 只发布 `lib/` 与 `cordis.patch.yml`；`tools/`、`reports/`、`install.sh` 不进 tarball。

`client.js` 是对 dsh 官方 client bundle 的注入产物（slot 注入 + 运行时 CSS，不修改 bundle 源文件）。重注入脚本与本地开发流程见内部 `dsh-patches/`（未随仓库发布）。

### 测试工具

```bash
node tools/share-logic-test.mjs            # 45 条断言：轮次归组 / 内容块拆分 / 时间回退 / URL 清洗 / 结束标记裁剪 / 结构锚点
node tools/board-logic-test.mjs            # 纯逻辑：落列/排序/剪枝/隐藏/撤销的不变量
node tools/board-ui-probe.mjs "$TOKEN" "$SESSION_ID" [/tmp/shot.png]   # 真界面 e2e（需活 dsh web + Chrome + xvfb）
node tools/board-archive-gate-test.mjs     # B16 门禁回归网：清空不得先把会话归档（39 条断言，组 0 + A–G）
node tools/board-archive-gate-test.mjs --mutate <name>|all   # 负控：exit 0 = 变异被检出；all 会额外跑 layout (b) 等价重构
node tools/context-logic-test.mjs          # 上下文面板纯逻辑：系统提示拆分、压缩 shadow/surface 位置、注入过滤、截断、/compact 配对（26 条）
node tools/prompt-insert-logic-test.mjs    # 提示词插入纯逻辑：保留草稿 + 单个换行分隔 + contenteditable 回退（16 条）
```

`share-logic-test.mjs` 从 `lib/client.js` 抠出 `shareGroupTurns`、`shareBlocksFromGroups`、`shareCleanUrlText`，在沙箱中断言：助手一轮里所有正文段都成为独立内容块（不能只取最后一段）、块顺序与角色正确、缺少锚点时 key 稳定、任何外部 URL 不得进入 SVG（漏一个会污染 Canvas、`toBlob()` 抛错），并锁定 utilities slot 注册、`ClipboardItem` + `Promise<Blob>` 交接、`foreignObject` 光栅化、画布上限、默认开启设置、会话重挂载不退出分享模式、120 段上限、勾选态不会画进图片（克隆时剥掉 `enhc-share-picked` / `enhc-share-excluded`）、长图按结束标记裁剪（`shareFindSentinel` / `shareCropCanvas` + 放大 SVG 视口）。

`board-logic-test.mjs` 从 `lib/client.js` 抠纯函数跑沙箱，不需要浏览器。`board-ui-probe.mjs` 用 puppeteer 驱动真实面板（拖拽、菜单、批量、折叠、搜索、新建/改名/勾选/删除自由卡、清空→撤销归档、刷新持久化）；默认不碰会话，`BOARD_PROBE_RUN=1` 才会走“待办 → 建会话执行”（会新建会话并打印 id 方便清理），结束时还原动过的状态并断言没有残留归档。

`context-logic-test.mjs` 从 `lib/client.js` 抠出 `contextItems` / `contextCompactCommand` 跑沙箱：系统提示与对话内容分栏、`<system-reminder>` 注入过滤、`compaction/summary.shadowedSeqs` 隐藏被压缩历史、替换消息 `surfaceOp` 按位置插入（不是按 seq 追加）、连续压缩与系统提示重写、截断上限，以及 `/compact` 的 `command/run` ↔ `command/done` 配对（含 “No compactable history yet.” 这类没有压缩事件的成功）。

`board-archive-gate-test.mjs` 守破坏性顺序：真删会话依赖 `dsh-archived-chats` 的 `/delete-all` → `/trash/purge`；0.2.0-rc.2 的版本门禁会跳过 `archived-chats@1.4.5`，这两条路由只会 404/405，此时“清空”只能降级为把卡片移出看板。若实现退化成“先归档、再发现删不掉”，会话会被移出侧栏且无法放回。测试断言 `boardDeleteSessions` 的能力门禁必须排在 `workspaces.archiveSession` 循环之前：不可用时核心归档调用数必须为 0，唯一请求是一次空 id 能力探测，结论缓存为不可用。

组 0 + A–G 共 39 条：0 哨兵（切片来自当前 `lib/client.js`、归档路径仍在，`--mutate` 也跑）/ A 不可用时降级 / B 可用时完整链路（core archive → `/delete-all` → `/trash/purge`；`already-trashed` 直接进 purge；原本归档的会话失败时可撤销归档）/ C purge 半途失败后核心 `workspaces.unarchiveSession` 收回（不留悬空归档）/ D 插件 `/unarchive-all` 成功时走插件且不碰 core，405 时仍由 core 收回 / E 探测请求抛错时判 false 且不抛 / F 探测通过但 `/delete-all` 失败时如实上报并降级缓存 / G 归属（整包范围，10 条）。

G 组在整份 `lib/client.js` 上断言：`BOARD_ARCHIVE_BASE` 的每次引用（声明处除外）都必须落在路由层声明内（`boardDeleteSessions` / `boardProbeArchiveRoutes` / `boardRestoreArchived` / `boardRestoreSessions`，白名单显式写死，新 helper 不会自动放行）；路由字面量 `/plugins/dsh-archived-chats` 全包只能出现一次且必须在常量声明处；`boardBridge` 不许在路由层之外做计算成员访问；门禁必须存在、文本上先于归档循环、且是提前 return。`archiveSession` 只允许两个 owner：门禁保护的 `boardDeleteSessions`，以及开关 owner `boardArchiveSessions`（默认关，只由 `BoardDialog` 手动移动处理函数经 `boardSidebarAction` 调用）。第三个声明写出 `archiveSession` 即转红；`boardArchiveSessions` 不在 `BOARD_ARCHIVE_BASE` 路由白名单里，不能借归档插件路由。

负控共 8 个，全部纳入 `--mutate all`：函数内 `gate`（短路门禁）、`reorder`（门禁与归档循环换位）、`probe`（探测恒 true）；切片外 `move`（调用方直接归档）、`helper`（新 helper 直接归档）、`move-route`（调用方复用常量手搓 `/delete-all`）、`move-helper-route`（新顶层 helper 复用常量路由）、`inline`（调用方重打路由字面量）。每轮要求“原始全绿 + 变异转红”。

重构容忍只有两种门禁写法（与其 JSDoc/头部逐字一致）：

- layout (a)：`if (await boardArchiveAvailable() !== true) { … }`
- layout (b)：`const capability = await boardArchiveAvailable(); if (capability !== true) { … }`

两种形状内部的格式差异（括号、换行、注释、局部变量改名）都能容忍。`--mutate all` 会验证：shipped guard 是 layout (a) 时额外生成 layout (b) 变体再跑（2 源 / 16 次检出）；shipped 已是 layout (b) 时打印 note 并只跑 1 源 / 8 次检出。两种情况都要求“原始全绿 + 全部负控转红”，否则 `exit 1`。

边界之外（已实测）：把门禁再深一层、经过中间布尔变量，例如：

```js
const capability = await boardArchiveAvailable();
const denied = capability !== true;
if (denied) { … }
```

`--mutate all` 会 `exit 1`，报 `REFACTOR TOLERANCE FAILED: could not build the layout-(b) equivalence source …`。这是假红，不是漏检：主套件仍全绿，真实破坏仍被抓住，报错会说明原因和出路（把守卫写成上述两种布局之一，或收敛声明）。不扩定位器是有意设计：无限容忍会不断把测试绑死在 `lib/client.js` 的现实写法上。原则是声明边界、不扩容器；假红可接受，漏检不可接受。

切片自适应：顶层 `boardArchive*` / `boardProbe*` 一族声明会自动纳入沙箱；必需的 8 个声明消失会抛错。`--mutate gate` / `--mutate probe` 结构化改写门禁条件或探测函数体，不锚定具体文本。实现复用 `board-logic-test.mjs` 的 `matchDelimiter()` / `locate()`，从当前 `lib/client.js` 切真实声明并注入桩（`fetch` + `boardBridge.workspaces`），不需要浏览器、不启 dsh、不碰 `$DSH_HOME`；锚点消失直接抛错（canary），不会静默空跑。`--mutate <name>`（或 all）在内存改写整份源码再切片，先跑原始再跑变异，只有“原始全绿、变异后转红”才 `exit 0`；参数错 `exit 2`，`--help` `exit 0`。CI 同时跑主套件与 `--mutate all`。

### 改注入样式前先跑规则级 diff

注入样式表在 `lib/client.js` 里是一整行 JS 字符串，普通 `git diff` 看不出“从逗号列表删掉一个选择器”这类改动。已踩过两次坑：`[data-slot=x] [class$=_meta],[data-slot=x] [class$=_time]` 删掉前半段后变成 `[data-slot=x] [data-slot=x] …`，永不命中；`[class$=_brand] svg` 放宽成 `[class*=_brand] svg` 把品牌 wordmark 压扁。所以改完必须跑：

```bash
python3 tools/css-diff.py            # HEAD vs 工作区，按规则列出增删
python3 tools/css-diff.py --lint --check   # 只扫可疑模式（重复属性步、空规则），CI 也跑
python3 tools/css-diff.py 0f8acdb HEAD     # 任意两个版本对比
```

规则 diff 只说明改了什么，是否该这么改仍需浏览器确认：切换 `style[data-plugin-css="dsh-enhance-tool/enhancer.module.css"]` 的 `sheet.disabled`，对比 `getComputedStyle` + `getBoundingClientRect`，并列出被新命中的元素（放宽后缀→子串匹配时尤其重要）。

### 本地开发闭环（只改 client.js 时无需重启 dsh web）

profile 里的 `dsh-enhance-tool` 是拷贝还是符号链接取决于安装方式：

- `dsh plugin --profile web add github:…` / npm tarball / `install.sh --copy`：profile 里是拷贝（content-addressed store 硬链接或直接拷入），改完仓库文件必须覆盖过去；
- `dsh plugin --profile web add <本地目录>`（`install.sh` 默认路径）：pnpm 记为 `link:` 符号链接指向 clone，profile 里那份就是仓库文件（`cp -f` 会是“自己覆盖自己”，报 `are the same file`，无害），改仓库即生效；但 clone 移走/删除插件会静默消失（`install.sh` 会检测并提示，建议改用 `--copy`）。

按拷贝安装时覆盖：

```bash
cp -f lib/client.js ~/.dsh/profiles/web/node_modules/dsh-enhance-tool/lib/client.js
```

`@deepseek-ai/dsh-client-hmr` 以 500ms 轮询 profile 里的 client bundle，检测变化后重算插件 bundle rev（`index.html` 中 `dsh-enhance-tool/client.js&rev=...` 会变）并通知浏览器热重载，不需要重启 dsh web。已打开标签页通常几秒内自动热替换（SSE `rebuilt` 帧 → 重载模块 + 重建样式标签），无需刷新；标签页被冻结或 SSE 断连时会错过该帧，此时 Ctrl+Shift+R 硬刷新。注意 `index.html` 里合并大 bundle 的 `rev=` 不会变，别用它判断是否生效；host 侧 `lib/index.js` 的改动仍需重启 dsh web。

## 数据文件（勿提交 / 勿外发）

- `~/.dsh/prompts.json` — 提示词库（可能含环境敏感信息）
- `~/.dsh/profiles/web/enhancer-board.json`（+ `.bak`）— 任务看板状态（仅当选择「随 profile 保存」时生成）
