# dsh-enhance-tool

DeepSeek Harness (`dsh`) web 界面增强插件 — 润色、提示词库、预测回复、消息工具条常显、工具调用耗时、宽度/字号/侧栏缩放。

- **安装形态**：100% 插件注入（slot / shell.overlay / settings / sessionTitle 官方机制）+ 一个**随包发布的声明式挂载层** `cordis.patch.yml`（`package.json` 的 `dsh.bundle.patch`：`insert ui-enhancer` + 禁用官方 `session-title-llm`）。它不改 dsh 官方 bundle 源文件、也不手改 profile 的 patch 配置（旧文档「零 bundle 补丁」的说法不准确，已删）
- **兼容版本**：`dsh ^0.2.0-rc.2`（以 `package.json` 的 `peerDependencies` 为准；已实测 `0.2.0-rc.2`）。此前的实测版本为 `0.1.0-rc.7` / `0.1.1-rc.2` / `0.1.2-rc.1` / `0.1.5-rc.2`——**0.1.x 已不在当前声明范围内**（dsh 0.2.0 起会按 `peerDependencies` 跳过版本不匹配的 bundle），0.1.x 用户请继续使用 `v0.13.1`
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

`install.sh` 自动完成：`dsh plugin add` 标准安装（本地目录失败时依次退到 github 目标、自包含拷贝安装）→ 确认 profile 的 `dsh.profile.bundles` **真的启用了**本插件 → 链接 `dsh-session-title-llm` 依赖 → 全文件语法验证。任何一步没做成都会给出可行动文案并以非 0 退出（不会再出现"没启用却打印 `[7/7] done.`"）。

> **`link:` 提示**：`dsh plugin --profile web add <本地目录>` 会被 pnpm 记成 `link:` 符号链接，指向你 clone 的那个目录。脚本会检测并提示：**clone 一移走/删掉，下次启动插件就只剩一行 `skipping profile bundle "dsh-enhance-tool"`**（已实测）。要"拷贝安装、与 clone 脱钩"就用：
>
> ```bash
> bash install.sh --copy
> ```
>
> `--copy` 直接把文件拷进 profile 的 `node_modules` 并把 `dsh-enhance-tool` 写进 `dsh.profile.bundles`（不经过 pnpm）。它**可以叠加在默认的 link 安装之上**：拷贝前会先清掉 `node_modules/dsh-enhance-tool`（活链接、悬空链接、旧目录三种情况都按 `rm -rf` 处理；只删链接本身，不动 clone），所以从默认安装切到 `--copy` 不会卡在 [4/7]；重复跑也幂等。实测：装完把 clone 移走/删掉，`dsh --profile web --dump-config` 仍能挂上 `ui-enhancer`、stderr 0 行。取舍：它不在 pnpm 的依赖图里，之后对 profile 跑 `dsh plugin add/install` 这类包管理操作时可能被清掉——那时重跑一次 `bash install.sh --copy` 即可。

### 卸载

```bash
dsh plugin --profile web remove dsh-enhance-tool   # 正确：依赖与 dsh.profile.bundles 条目一起清掉
```

没有 dsh CLI，或用 `--copy` 安装时：

```bash
bash install.sh --uninstall
```

> **别只删目录**（旧版 install.sh 结尾曾这么写）：`rm -rf …/node_modules/dsh-enhance-tool` 会留下 `dsh.profile.bundles` 里的条目，之后每次启动都打一行 `dsh: skipping profile bundle "dsh-enhance-tool"`（已实测）。`--uninstall` 会删目录、清条目，并用 `dsh --profile web --dump-config` 复验不再出现该告警。

### 安装后

```bash
# 重启 dsh web：优雅退出（SIGINT），不写死端口、不用 fuser/SIGKILL
#   前台运行：在它自己的终端里 Ctrl+C，然后重新执行 `dsh web`
#   后台/分离运行：先确认 PID 再发 SIGINT（3080 可能被别的服务占着，
#   `fuser -k 3080/tcp` 会杀错进程、而且 -k 默认就是 SIGKILL 硬杀）
pgrep -af 'dsh web'      # 确认是你那份 dsh web
kill -INT <pid>
# 装了 dsh-power-button 的话，直接用它的 restart 入口即可
```

浏览器 **Ctrl+Shift+R** 硬刷新即可。

> 插件通过自带的 `cordis.patch.yml`（`dsh.bundle.patch`）自动挂载，无需手动改配置。
> 卸载：`dsh plugin --profile web remove dsh-enhance-tool` 后重启 dsh web（细节与"只删目录会留下永久 skip 告警"的对照见上面的「卸载」）。

---

## 功能清单

### 1. 输入增强（composer）

| 功能 | 机制 | 位置 |
|---|---|---|
| **润色** | `/polish` API，用当前会话的模型重写草稿（默认润色 / 自定义要求润色） | `conversation.input.left` 按钮 |
| **提示词库** | `/prompt-library` API，持久化 `~/.dsh/prompts.json`；支持分组 / 搜索 / 增删改 / 一键插入 | `conversation.input.left` 按钮 |
| **预测回复（建议条）** | `/suggest` API：把**你的上一条提问 + AI 的最后一条回复**一起给模型，要求三条覆盖**不同意图**（推进 / 追问原因 / 换做法）并跟随对话语言；带「预测回复」标签与 `1/2/3` 序号的胶囊按钮。**点击直接发送**（设置可改为"仅填入输入框"）；**Shift+点击**或 **Alt+Shift+1/2/3** 只填入不发送；**Alt+1/2/3** 快捷选择 | `conversation.input.dock` |

### 2. 布局与宽度（设置页 + 运行时）

| 功能 | 说明 |
|---|---|
| **对话内容宽度滑块** | 60%–200%（100%=748px，200% 占满可用宽），localStorage 持久化 |
| **对话字号滑块** | 12–20px，消息区字号 + 行高联动 |
| **AI 消息占满消息列** | 无背景卡片、`width:100%` 消除右侧空白 |
| **用户消息自适应宽度** | `fit-content + max-width:100%`：内容少小气泡、内容多撑满整列 |
| **用户长消息折叠** | 渲染行 > 5 行自动折叠，点击展开/收起（含历史消息） |
| **任务看板（通用面板）** | 会话头部「轨迹」右侧的「看板」页签式入口：待办 / 进行中 / 完成 / 搁置 / 归档 / 垃圾桶六列；卡片默认是会话，**「待办」列可新建自由待办卡，点一下就建会话并开始执行**；支持拖拽跨列与列内排序、批量选择、列折叠、搜索/工作区过滤、自动归类 | 设置 → 通用 → 通用面板 |
| **消息工具条常显** | 每条消息常显发送时间与复制 / 分叉 / 调用量 / 耗时按钮（当天 `HH:mm`，跨天带日期）——产品默认需悬浮才显示 | 设置 → 通用 → 消息工具条常显 |
| **工具调用耗时** | 每条工具调用与子工具（PTC 子调用）右侧常显耗时（`296ms` / `2分02秒`）；**进行中的调用实时计时**（蓝色脉动，如 `35s…`），完成后自动定型；悬浮显示开始 / 结束时刻 | 设置 → 通用 → 工具调用耗时 |
| **面板打开时消息区让位** | 工作台面板 / 侧边栏打开时消息列自适应，不重叠不压缩 |
| **hero 页面适配** | hero composer 固定底部、headline 置顶 |

### 3. 会话标题

- 自定义标题 provider（所有消息触发）+ **创建时间戳后缀**（`-YYYYMMDDHHmmss`）
- 自动禁用官方 `session-title-llm`（通过 bundle.patch）

### 4. 任务看板（通用面板）

会话头部**「轨迹」紧右边**的 pill 按钮「看板」打开一个宽模态看板，**卡片 = 会话**。入口的实现方式：**不用 `utilities` slot**（那个位是头部最右侧的一簇控制，离「轨迹」有 600px 以上，实测容易看不见），而是把按钮作为**纯 DOM 节点插到 tab 条之后**，并从相邻的**未选中 tab** 借用类名（同时记住产品的 active modifier，面板打开时切上），所以它看起来就是「对话 / 轨迹」的兄弟页签，打开时变蓝。设置项关闭时同一个节点隐藏，无需重载。这是给「一堆并行会话」做的人工分诊台，不改动任何会话数据。

**六列与自动归类**（未被手动拖过的会话按下列规则自动落列，从上到下首个命中）

| 列 | 自动规则 |
|---|---|
| 进行中 | `running`，或该会话有 `running` / `stopping` 的后台任务，或 `inbox` 里有排队消息（`next-turn` / `next-step`） |
| 待办 | **真的还有事没完**：最后一轮**还没被回复**（`turnOutline` 最后一条的 `response` 为空），或会话自己的 todo 还有未完成项（`todos[].status !== "completed"`） |
| 完成 | 已回复的会话，且最近 7 天内动过（工具栏「显示全部」可放开这个窗口） |
| 搁置 | **只有手动拖入**（不自动进；用来把"暂时不做"单独放一边） |
| 归档 | 其余（更早的、或投影信息未缓存的会话） |
| 垃圾桶 | **只有手动拖入**（不自动进） |

自动规则只读 host 侧已有的 **session 投影**（`summary.projectionValues` 里的 `turnOutline` / `todos` / `inbox`），不发额外请求：`turnOutline` 记录了每一轮的 `prompt` 与 `response`，所以"这一轮跑完没有"是可直接观察的事实。

> **为什么不再用"最近动过 = 待办"**：dsh 的 `SessionSummary` **根本没有 `completed` 字段**（只有 `sessionId / updatedAt / running / blank / parentSessionId / origin / cwd / projectionValues`），所以早先"完成 = `completed`"这条规则永远不会命中，跑完的会话全都掉进「待办」。现在「待办」只放真正没完成的事，跑完的会话进「完成」，更早的进「归档」；**冷会话**（投影未缓存、没有 `turnOutline`）按"已回复"处理。

手动拖拽/菜单/批量移动 = `manual`，之后自动规则不再改它；卡片上的「⋯ → 重置为自动」交还给自动规则。设置项「跑完自动移到完成」开启时，手动放进「进行中」的会话在这一轮结束后会自动落到「完成」。

**「待办」支持新建（自由待办卡）**

「待办」列底部常驻一条虚线 `＋ 新建待办`：点开变成输入框，**回车添加、输入框保留**（可以连着敲好几条），`Esc` 或失焦关闭。新建的卡片**不属于任何会话**，因此：

- 卡片表面用 `bg-layer-1`（内凹感）与「会话卡」区分，元信息行是 `☑ 待办项 · 工作区 · 相对时间`；
- **点卡片 = 创建会话并执行这条待办**（见下）；改名走元信息行右端的 `✎` 按钮或 `E` 键或 `⋯` 菜单（因为单击已经是"执行"了）；左下角勾选框 = 完成 → 卡片进「完成」，再取消勾选回到「待办」（列内顺序仍由稀疏 `order` 维护）；
- `⋯` / `M` 菜单是**六列（去掉垃圾桶）+ 删除**（自由卡片没有"重置为自动"的说法，它本来就是手动放置的）；
- 它们和会话卡一样能拖拽、批量选择、被搜索命中；但**不受工作区过滤影响**（无 cwd），也**永远不会被"过期归档"或剪枝清掉**（`boardPrune` 只清理会话来路不明的条目）；
- 垃圾桶「清空」时：自由卡片是看板自己的数据，**直接删掉**；只有会话走归档→回收站→物理删除那条链路（**0.2.0 起先探测 `dsh-archived-chats` 是否可用**：不可用时一个会话都不归档，只把卡片移出看板并如实提示，见「0.2.0-rc.2 兼容性修复（本轮）」的 B16）。

**点一下 → 建会话并执行**

点自由待办卡（或卡片右下的 `▶ 执行`、或 `⋯ → 创建会话并执行`）会：

1. `sessions.create({ cwd })` 建一个会话 —— `cwd` 用**建卡时记下的工作区**（建卡时落在 `item.cwd`：当时的面板工作区过滤，或当前打开会话的 cwd），所以卡片天然知道"这条待办该在哪干"；
2. 用**产品自己的提交链路**发首条消息：`binding(id).session.beginSubmission({mode:'queue', text})` 先登记本地回显（新会话立刻显示 pending 消息），再 `prompt([{type:'text', text}], 'queue', …, requestId)`；被拒时 `abandon()` 撤掉回显；
3. 成功后**撤掉这张自由卡片** —— 它已经变成一个真会话，会话卡会在「进行中」出现（不会重复显示两张卡）；标题栏给一行提示「已创建会话并开始执行：…」；
4. 失败则**保留卡片**并提示原因；如果只是首条消息没发出去（会话已建好），会自动帮你打开那个会话，手动发即可。

批量选择模式下点击仍然是勾选（不会误触发执行）；`▶ 执行` 的创建期间卡片显示 `data-busy` 并忽略点击。

落在看板状态里的 `items` 字段（`{id: {title, done, at}}`，placement 仍在 `entries` 里，因此拖拽/排序逻辑完全复用）。payload 版本仍是 `1`，旧状态照样能解析。

**交互**

- 拖拽：原生 HTML5 DnD；拖到列内会显示插入位置（2px 品牌色横线），目标列高亮描边（垃圾桶用 danger 色）。列内排序用稀疏 `order`（插入取中点，间隙收窄时自动重排）。
- 键盘 / 触屏兜底：卡片可聚焦，`Enter` 打开会话，`M` 或卡片「⋯」打开「移到…」菜单（六列 + 重置为自动）。
- 从侧边栏拖入：dsh 侧栏的行拖拽 payload 就是 `sessionId`（实测 `dataTransfer.getData("text/plain")`），所以**可以直接把侧边栏会话拖到某一列**。
- 点击卡片 = 打开该会话并关闭面板；`批量选择` 模式下点击 = 勾选，工具栏出现批量条（六列 + 清除）。
- 其他：搜索（标题/路径，也搜自由待办卡）、工作区下拉、含子会话、显示全部、列折叠（持久化，折叠后保留**竖排列名**）、待办列「新建待办」与「归档过期 N」（把超过窗口的待办一次性归档）、垃圾桶「清空」（两步确认）。
- 标题右侧计数形如 `共 108 个会话 · 3 条待办`（有自由待办卡时才显示后半段）。
- 卡片徽标：`● 运行中`、`… 等待回复`（最后一轮还没被回复）、`⏱ N 个后台任务`、`☑ N 项待办`（会话自己的 todo 未完成项）、`⏳ 有排队消息`、`子会话`、`· 手动`（只标记被手动固定的卡片——「自动」是默认态，不占位）。
- 自由待办卡的 `▶ 执行` 会**真的创建会话并消耗模型调用**；只想记一笔就先别点，或在批量选择模式下点（= 勾选）。

**排版**（0.10.2 起）

- 面板 `1360×830`（随视口收缩），六列等宽（每列 ≥196px），列间距 10px、圆角 14px，沿用产品弹层底色/描边/字号变量。
- 卡片两行制：**标题**（13px/20px，最多 2 行）→ **元信息行**（工作区 · 相对时间 · `· 手动`）；「⋯」是**卡片右上角的悬停按钮**（原先是独占一行），垃圾桶里的「恢复」在元信息行右端。卡片高度从 142px 降到 ~78px。
- 长列**分页渲染**：每列先渲染 20 张，末尾是虚线「显示更多（剩 N 个）」按钮，每次 +20；搜索/批量选择时不分页（要看到全部结果）。
- 顶部：计数移到标题行右侧；工具条按「筛选 | 视图 | 批量」用细分隔线分组，控件高度统一 32px。
- 底部提示一行两块：拖拽/菜单用法 + 清空的真实语义（不再误称不可恢复）。

**状态存放**（设置 → 通用 → 看板状态存放位置）

| 模式 | 说明 |
|---|---|
| 本浏览器（默认） | `localStorage["dsh-enhance-tool.board"]`，即时生效，无需重启 |
| 随 profile 保存 | 额外通过 `GET/POST /enhancer/board` 写入 `~/.dsh/profiles/web/enhancer-board.json`（带 `.bak`，payload 形状校验，>256KB 返回 413）。写盘 debounce 800ms；打开面板时按 `updatedAt` 较新者胜（host 较新则采纳并回写 localStorage，反之推送 host）。**该路由随 host 半边加载，需重启一次 dsh web 后才可用**；未生效时自动只走 localStorage，不报错 |

**已知限制 / 有意未做**

- 侧边栏行**不显示所属列的小色点**：侧栏 DOM 里没有任何会话 id 属性（实测只有 class/role/aria-*；id 只在拖拽 payload 里），按标题匹配太脆，故不做。
- **不与 `dsh-archived-chats` 联动**：那个插件自带 host 侧归档/回收站/保留策略与自己的路由，跨插件读它的内部状态很脆，且两套「真删」逻辑并存有风险；本看板的归档/垃圾桶只影响看板本身（面板底部有明确提示）。**唯一的例外是「清空」链路**：需要真删时会按需调用它的路由（0.2.0 起先做一次能力探测，不可用就不动手，见下）。
- 垃圾桶的**清空 = 真删尝试**（两步确认）：链路是「核心 `workspaces.archiveSession` 归档 → `dsh-archived-chats` 的 `/delete-all` 移入它的回收站 → `/trash/purge` 物理删除」，并带上它要求的 CSRF 头 `x-dsh-archived-chats: 1`；每个会话的失败原因会显示在垃圾桶列里（例如 `persistence-response-invalid`）。**dsh 核心没有删除会话的 API**（`workspace/delete` 删的是工作区登记，不是会话），所以真删只能借这个插件。**0.2.0 起这条链路是"先探测后动手"**：不可用时立刻返回、一个会话都不归档，只把卡片移出看板并如实提示（`dsh-archived-chats@1.4.5` 在 0.2.0 上会被版本门禁跳过，探测必然不通过）。
- **注意（0.1.5 时代的旧记录）**：实测本机装的 `dsh-archived-chats@1.1.0` 在 dsh 0.1.5 上**删不掉**：它校验会话头必须 `version === 2`，而 0.1.5 写的是 `version: 3`，因此其 `/delete-all` 对任何会话都回 `persistence-response-invalid`（它自己的回收站/删除大概也是坏的，建议更新或反馈给该插件作者）。在它能用之前，清空的效果是：**把卡片从看板移除（不再弹回待办/归档），会话本身仍在 dsh 里**；垃圾桶列头上的「恢复显示 N」可以把它们放回看板。
- **撤销归档**：清空会先归档（归档 = 会话从侧栏消失），所以"归档了但没删掉"必须可逆 —— 看板把这类会话记在 `state.undo` 里，垃圾桶列头出现「撤销归档 N」，点击走 `/unarchive-all` 取消归档并把卡片放回看板；否则那些会话会一直不出现在侧栏。

### 5. 注入控件与面板沿用 dsh 默认样式（不自带皮肤/容器外观）

**按钮**
- composer 工具栏的「提示词库 / 润色」按钮、建议条候选按钮，挂载后**从活的 DOM 读取相邻产品控件的类名并复制到自己身上**（`adoptProductButtonStyle`）：工具按钮取同排的 `指令 / 添加附件`，建议条取 composer 里的文字 pill（如「完全权限」）。外观与产品逐像素一致，产品改样式自动跟随，类名是**从 DOM 读的、不写死哈希**。

**面板（弹层 / 对话框）**
- 产品自己的弹层/对话框只在打开时存在，所以用一个**被动学习的登记表**（`rememberProductStyles`，rAF 节流的 MutationObserver）：一旦屏幕上出现过 `[role=menu]` / `[role=menuitem]` / `[role=dialog]` / 对话框里的导航行，就把它们的类名记下来。提示词库弹层、润色小面板借**产品的 menu**（`background:--dsw-specific-menu`、20px 圆角、`--dsw-elevation-prominent` 阴影、4px 内边距），管理对话框借**产品的设置面板**（32px 圆角 + 同款阴影），列表行借 menu cell / 对话框 navCell（40px、10/12px 圆角、hover 用 `--dsw-alias-interactive-bg-hover`）。
- 学习失败时（用户还没打开过任何产品弹层、或产品改了类名）由 `:where()` 包裹的**零优先级回退**兜底，取值全部照抄产品规则体（含 token）——实测回退与产品数值完全一致，所以不存在“没学到就难看”的窗口。
- 我们自己的行因为要放两行内容（标题 + 摘要），用**双类名**（`.PmptLb_item.PmptLb_item`）提高优先级来放宽产品行的固定高度、并 `flex:0 0 auto` 防止被列表压缩；选中态同理（`.PmptLb_manageRowActive.PmptLb_manageRowActive`）以免被借来的类名盖掉。

**面板排版（0.9.3）**

- 润色弹窗：`提示文案（12px 次级色）→ 自定义要求输入框 → 右侧动作行[按要求润色][默认润色]`；主按钮用产品 composer 发送键的 `--dsw-alias-button-info-fill`（蓝色），去掉原来的分隔线与整行按钮。
- 提示词管理：左侧 236px 导航列（搜索 + 分组筛选 + 两行行项：标题 + 分组胶囊 + 摘要，删除按钮常驻右侧、不挤压标题）+ `.5px` 分隔线；右侧表单列固定 520px 宽、字段带 12px 标签（标题 / 分组（可选）/ 提示词内容）、`8` 行文本域；底部动作行以 `.5px` 上边线隔开，左侧「润色提示词」、右侧「取消 / 保存」（保存为蓝色主按钮）。
- 弹层/对话框层级：管理对话框 `z-index: 1200`，高于润色/提示词库弹层（1100），避免弹窗叠在对话框之上。
- 新增类名必须同时加进 `PromptTools_module_css_default` 映射表（`lib/client.js` 里那张手写表），否则 `className` 是 `undefined`、样式静默不生效。

### 6. UI 修复

- **hero 菜单 overlay 修复**：下拉菜单覆盖输入框时自动限高滚动（不影响模型选择等短菜单）

---

## 兼容性与已知问题（重要，安装前必读）

### 版本锁定声明

本插件的 **布局增强**（AI 消息无背景、用户气泡自适应、长消息折叠、面板让位、宽度设置）通过运行时 CSS 注入实现。用户消息相关选择器已改为**哈希无关**的后缀匹配（`[class*=_userStack]` / `[class*=_bubble]` / `[class*=_bubble] div`），因此不受 dsh 0.1.2 把用户气泡从 `dsh-client-ui-conversation` 迁到 `dsh-client-ui-chat`（哈希前缀 `gdEzaW_*` → `Sixlwa_*`）的影响；其余布局选择器仍依赖 dsh 客户端 bundle 的 **CSS-in-JS 哈希类名**（`wSkVaW_*` / `pXSMma_*`）。这些类名随 dsh 每次构建可能变化。

- **实测版本**：`0.2.0-rc.2`（2026-09 全量审计：宿主 A1–A6 + 客户端 B1–B16 + 打包 C1–C4 共 26 项 + 2 个假设，原始证据见 `reports/compat-0.2.0/REPORT.md`）；此前实测版本为 `0.1.0-rc.7`、`0.1.1-rc.2`、`0.1.2-rc.1`、`0.1.5-rc.2`
- **0.2.0 的实际情况（修正旧说法，别再按"哈希漂移"排查）**：`wSkVaW_*` / `pXSMma_*` 在 0.2.0 **仍然存在**（0.2.0 头部实测 `[class$="_tabs"]`=1 且类名就是 `wSkVaW_tabs`；插件代码里这两个前缀分别仍有 13 / 1 处引用），hero 布局与头部 tab 条照常命中。本轮真正静默失效的是 **D1 / D2 / D3** 三条（会话判据、宽度变量名、消息时间节点层级），与哈希前缀无关——详见下方「0.2.0-rc.2 兼容性修复（本轮）」。`VOzbGW_*` / `nArs4W_*` 插件已 0 引用（旧文档提到它们属清理前的记录）
- **布局增强失效表现**：安装后 AI/用户消息样式无变化（无错误提示，功能静默不生效）
- **处理方式**：布局失效时，其余功能（润色 / 提示词库 / 建议条 / 标题 / 消息工具条 / 工具耗时）不受影响；请提交 issue 附上你的 dsh 版本与 `document.querySelector('*[class]').className` 中对应的消息区类名前缀，我们会更新注入选择器。

### 其他已知问题

**0.2.0-rc.2 引入、本轮已修**（机制与复验证据见下方「0.2.0-rc.2 兼容性修复（本轮）」）

- **D1 当前会话判据（已修）**：0.2.0 的会话列表快照 `SessionListState` 已**没有 `current` 字段**（只剩 `ids` / `byId` / `phase` / `projectionsBySession`），插件原先读 `sessions.list.getSnapshot().current` → 恒 `undefined` → 事件窗口永不订阅，于是**建议条不渲染、工具调用耗时全为 0、看板当前会话卡不高亮**（同一个根因）。现改为 `resolveCurrentSessionId()`：优先用 slot 给的显式 sessionId，否则取 `byId` 里 `retainedBy.mainView > 0` 的那个，老版 `.current` 仅作回退。
- **D2 对话内容宽度滑块无效（已修）**：插件原来写 `--dsh-user-chat-width`，0.2.0 里**没有消费者**；而 `--dsh-chat-content-width` 会被 `.wSkVaW_body` 自身声明的 `clamp(…)` 覆盖 → 消息列宽恒 ~742px。现改写产品真旋钮 `--dsh-chat-user-width`（`--dsh-user-chat-width` 保留作 0.1.x 回退），字号三项未动。
- **D3 消息工具条常显失效（已修）**：0.2.0 把每条消息的 **END 时钟包进 `span._endInfo`**，它不再是 `_actions` 的直接子元素 → CSS `:has(> [class*=_timeEnd])` 与 JS `clock.parentElement` **双路失配**（不悬浮时助手消息行仍 `opacity:0`）。CSS 改为后代匹配 `:has([class*=_timeEnd])`，JS 改为 `clock.closest("[class*=_actions]")`。

**0.1.x 时代的问题（保留原记录）**

- **dsh 0.1.1-rc.2 的 modlens 适配器缺少 `prepareCall`**：插件启动时自动为缺失的适配器补丁（包装 `stream` 实现），使 `/polish`、`/suggest`、标题生成直接使用**用户会话选择的模型**；若补丁不可用则自动 fallback 到内置 `deepseek-official`。（**0.2.0 现状**：`LlmAdapter` 基类已自带具体 `prepareCall`（`dsh-llm/lib/index.js:1734`，只有 `stream` 是 abstract），所以补丁在这条路径上**必然是 no-op**——不是坏了，而是不再需要；因此启动日志里不会出现 `patched prepareCall onto adapter`，别用它判断插件是否加载。）
- **dsh 0.1.5 输入框改成 Lexical contenteditable（页面里已无 `<textarea>`）**：composer 不再有 `textarea`，因此「润色」与「提示词库插入」原先读 `composerTextarea().value` 会拿到空串（潦色直接不动、库插入丢失已有草稿）。现改为从 slot 的 `useInput((state) => state.draft)` 读草稿、用 `inputActions.setDraft(text)` 写回——这是能到达 Lexical 内部状态的唯一写入口；DOM textarea 仅作老版本回退（`composerDraft` / `setComposerDraft` / `focusComposer` 三个小助手）。
- **dsh 0.1.5 的 dock slot `session` 只带生命周期字段（无 `nodes`）**：预测回复原先用 `session.nodes` 找最后一条 AI 回复，所以 `lastText` 恒为空、整个建议条不渲染（表现为“功能消失”）。现改为从 Session 事件窗口取最后一条 `assistant/message` 的 text 块（`suggestTextFeed` 共享馈送），`session.nodes` 路径仅作回退。
- **建议条点击行为读错了 localStorage key**：`useDraft` 读的是旧版 `harness-ui-enhancer.state`（迁移时已经被删掉），所以“仅填入”设置被忽略、永远直接发送。现改读 `dsh-enhance-tool.state`（旧 key 作为回退）。
- **dsh 0.1.5 的 `conversation.input.left` props 用 `sessionId` 而不是 `session`**：润色与库内润色现在优先传 `sessionId`，让 `/polish` 用会话自己的模型路由，`session?.sessionId` 仅作回退。
- **dsh 0.1.2 起 web 端需要认证**：直接访问 `http://127.0.0.1:3080/` 会返回 401，请使用启动日志中打印的 `http://127.0.0.1:3080/?token=...`（换取 cookie 后即可正常访问）。
- **dsh 0.1.2 的用户气泡结构变化**：文本由块级 `div` 改为内联 `span`，折叠逻辑改为裁剪气泡本体（高度 = 5 行 + 气泡内边距），展开按钮挂在气泡外的 `userStack` 上以免被 `overflow:hidden` 裁掉。
- **消息工具条常显（29-msgmeta）**：不新增 DOM，直接复用产品自身的消息工具条（`*_actions` 行：时钟 `*_timeStart` / `*_timeEnd`、复制 / 分叉、用量 / 耗时），时间随产品本地化格式（当天 `HH:mm`，跨天 `M月D日 HH:mm`）。产品在 `@media (hover:hover)` 下把整行设为 `opacity:0`（仅 hover / 最近一条时才显示），本插件做两层保证：
  1. CSS：两条独立的 `:has()` 选择器强制该行可见（不用 `:is(:has())` 嵌套，部分引擎对嵌套支持不完整）——用户行的 `_timeStart` 是 `_actions` 的直接子元素，用 `:has(> [class*=_timeStart])`；助手行的 END 时钟在 0.2.0 被包进 `span._endInfo`，改用后代匹配 `:has([class*=_timeEnd])`（见上方 D3）。两者都不依赖任何哈希类名前缀。
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

### 0.2.0-rc.2 兼容性修复（本轮）

2026-09 对 `dsh 0.2.0-rc.2` 做了一次只读全量审计（26 项 + 2 个假设），并把其中**用户可见的失效**修完、用实浏览器复验。审计与复核报告在 `reports/compat-0.2.0/`（`REPORT.md` 判定表、`verification.md` 反证、`fix-verification.md` 修复后实测 + 17 张截图）。

客户端 4 处静默失效 + 1 组死规则：

| # | 原来为什么坏（0.2.0 的机制） | 现在怎么修 | 复验 |
|---|---|---|---|
| **D1** 建议条 / 工具耗时 / 看板当前会话高亮 | 会话列表快照没有 `current` → 当前会话判据恒 `null` → 事件窗口永不订阅（建议条 `return null`、`.enhc-call-dur` 恒 0、`[data-current]` 恒 0） | 新增 `resolveCurrentSessionId(sessions, explicit)`（显式 slot id → `byId` 中 `retainedBy.mainView > 0` → 老版 `.current` 回退），三处调用点全部改走它 | 36/36 调用行有真实耗时 chip（改前恒 0）；42 张卡中 1 张 `[data-current]` 且正是当前会话；dock 出现 `.Sggst_root` + 3 条真实候选 |
| **D2** 对话内容宽度滑块无效 | 写的是 0.2.0 无消费者的 `--dsh-user-chat-width`，而 `--dsh-chat-content-width` 被 `.wSkVaW_body` 自己的 `clamp(…)` 覆盖 → 列宽恒 ~742px | 改写产品真旋钮 `--dsh-chat-user-width`（旧名仅作 0.1.x 回退）；字号三项未动 | 消息列宽 748px → 1089px，`page.reload()` 后仍 1089px；字号 14→18px 不回归 |
| **D3** 消息工具条常显失效 | END 时钟被包进 `span._endInfo`，不再是 `_actions` 直接子元素 → CSS `:has(>…)` 与 JS `parentElement` 双路失配 | CSS 改后代匹配 `:has([class*=_timeEnd])`；JS 改 `closest("[class*=_actions]")` | 12/12 `_actions` 行 computed `opacity=1`（鼠标不在消息上），其中 9 行正是旧的失配情形 |
| **B16** 垃圾桶「清空」语义（外部依赖被跳过） | 原链路「先归档 → `/delete-all` → `/trash/purge`」在 `dsh-archived-chats` 被 0.2.0 门禁跳过时，前两步已经把会话归档掉；失败文案也与实际不符 | 改为先探测后动手：开板时对该路由发一次**空 id 列表** POST 判定能力，不可用就一个会话都不碰、只移出看板并如实提示；真删中途发现路由已死则降级缓存；恢复改用核心 `workspaces.unarchiveSession` | 垃圾桶列常驻「真删不可用（未加载 dsh-archived-chats）」；开板仅 1 次空 id 探测 POST、0 次归档请求 |
| **P2** 三条死规则 | `[data-slot="conversation.session.header"]>header`(+`:after`) 方向反了（0.2.0 的 header 是 slot 的**父**元素，实测 `header:has(>…)` 才命中）、`[class*=_userStack] [class*=_userRow]` 层级反了（真实是 `userRow > userStack`）、`fillSectionTitle` 依赖「通用」分区已不存在的 `p[class$=_intro]` → 三处静默 return | 删掉两条 0 命中规则（留恢复条件注释，不强行反向以免引入未验证的布局副作用）；`fillSectionTitle` 去掉 intro 硬前置，改为「产品自有 h1/h2/h3 或本插件页头 → 不注入」 | 设置页五个分区无重复标题、13 个 slot 子元素 / 3 个滑块完好；看板入口三页签位置不变 |

打包与安装侧（同轮）：

- **C1 版本门禁**：`package.json` 现在显式声明 `"@deepseek-ai/dsh": "^0.2.0-rc.2"`。dsh 0.2.0 会按 `peerDependencies` **跳过**版本不匹配的 bundle（`dsh-app-boot` 的 `evaluatePluginCompatibility`）；此前是"零声明 → 门禁完全不检查"的幸运通过。新声明已用**真实门禁函数**求值确认在 `0.2.0-rc.2` 上判定为兼容（不会被跳过）。
- **C2 失真声明**：`dsh.client.inject` 由 5 项清理为 3 项（`-ui-settings` / `-locale` / `-ui-conversation`）——删掉 0.2.0 全树都不存在的 `@deepseek-ai/dsh-client-runtime`，以及存在但已无 `dsh.client` 声明的 `-ui-slots`。
- **install.sh**：版本前提不再写死（直接读 `package.json` 的 `peerDependencies`），并在写入前用 dsh 自己的门禁做前置检查（读取 profile 的 `compatibility.json` 豁免、不匹配时给出可行动报错并以非 0 退出）；`bash install.sh --check` 只读干跑（`--help` 里有退出码说明）。第二轮打包复查后补齐：全局 dsh 解析**优先取 PATH 上那份 dsh**（标准 nvm 布局下旧写法按 glob 字典序取到最老的 node 版本 → 误拒），无 `node` 时前置报错而不是死在 `行 325: node: 未找到命令`，`dsh plugin add` 失败时打印诊断并依次退到 github 目标与**自包含拷贝安装**（拷文件 + 写 `dsh.profile.bundles`，失败则回滚并 exit 1），新增 `--copy` 与 `--uninstall`。

**仍未闭合（UNKNOWN / 按设计接受，不要当已修）**

- **B6 自由待办卡的「执行」功能链路**：4 个 API 签名一致，但未授权真的建会话执行 → **功能 UNKNOWN**（点 `▶ 执行` 会消耗模型调用）。
- **B13 hero 菜单限高**：按设计退让（产品自带 ≈视口高度的 `max-height` 时主动让位），锚点回退命中 `[data-composer-input]`；**用户可见目标未达成**（菜单仍会压住 composer）。
- **B16 端到端**：只读面 PASS（文案 + 探测请求），但按钮级语义未渲染（垃圾桶为空）、破坏性拖拽未做 → **PARTIAL**；`dsh-archived-chats` 仍是外部依赖。
- **B7 hero 布局效果**：前缀确实还在（见上），但最初那条证据测的是产品自身的 `hWmORq_root`，不足以证明 hero 规则的用户可见效果 → **未验**。
- **D1 的 `data-live` 子项**（进行中调用实时计时）：80 次钉底采样未捕捉到运行态行 → **PARTIAL**（chip 本身已 PASS，代码侧 `data-live` 与 500ms ticker 存在）。
- **A1 的 400 文案分支**：本机 profile 配了默认模型，该分支不可达 → **UNKNOWN**（自检里已注明前提）。
- **0.1.x 真机回归**：本轮无 0.1.x 运行时，未跑 → **未验**（0.1.x 也不在当前 `peerDependencies` 声明范围内）。

---

## 0.1.5 API 漂移体检（2026-09 实测）

> 本节是 **0.1.5 时代**的历史记录（保留原始结论与证据）；0.2.0-rc.2 的同类体检见上方「0.2.0-rc.2 兼容性修复（本轮）」。

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
# 0. 安装前：只读干跑（检查 profile / 全局 dsh / 版本门禁 / 依赖 / 源码语法，不安装任何东西）
bash install.sh --check        # 期望 exit 0，末行 "nothing was installed (--check)"

# 1. 插件会被加载（全部只读，不碰 profile）
grep -n 'dsh-enhance-tool' ~/.dsh/profiles/web/package.json      # dsh.profile.bundles 里有它
node -e "console.log(require(process.env.HOME+'/.dsh/profiles/web/node_modules/dsh-enhance-tool/package.json').version)"   # 期望 0.14.0
grep -c 'skipping profile bundle "dsh-enhance-tool"' <启动日志>   # 期望 0，即没被版本门禁跳过
# 注意：别用 `grep "patched prepareCall"` 判断——0.2.0 的 LlmAdapter 基类已自带 prepareCall，
#       补丁必然跳过，那条日志不会出现（此时插件仍可能完全正常）。
# 可选（更强，但会按设计重写 profile 根文件 cordis.yml——固定模板、幂等，介意就别跑）：
#   dsh --profile web --dump-config | grep -A1 'id: ui-enhancer'   # 期望 - id: ui-enhancer / name: dsh-enhance-tool

# 2. 润色 API 可用
curl -s -X POST http://127.0.0.1:3080/polish -H "content-type: application/json" -d '{"text":"测试"}'
# 期望 A（profile 未选默认模型）: HTTP 400 {"ok":false,"error":"no model route configured: open a session and pick a model first"}
# 期望 B（profile 配了默认模型，如本机 agent-default-model = deepseek-official/deepseek-flash）:
#          HTTP 200 {"ok":true,"text":"…"} —— 两种都算通过。
# 需要认证时：curl -s -c /tmp/jar "http://127.0.0.1:3080/?token=<启动日志里的 token>"，之后请求加 -b /tmp/jar

# 3. 浏览器（Ctrl+Shift+R 硬刷新）：composer 工具栏出现 提示词库 / 润色 按钮；消息右侧常显时间与工具耗时；
#    打开有消息的会话后，输入框上方出现建议条（0.2.0 上这三项依赖本轮 D1/D2/D3 修复）
```

---

## 开发

插件本体**就是仓库根目录**（旧文档写的"插件本体在 `dsh-enhance-tool/`"指的不是这个仓库的嵌套目录）：

```
.
├── package.json          # dsh.bundle.patch 声明（自动挂载）+ dsh.client.inject、peerDependencies 门禁
├── cordis.patch.yml      # 插件挂载 + 禁用官方 session-title-llm
├── lib/
│   ├── index.js          # host 侧：路由 / 定时器 / 标题 provider / 适配器补丁
│   ├── client.js         # client 侧：全部 UI 组件 + 注入样式（构建产物）
│   └── polish-routes.js  # /polish /suggest /prompt-library 路由
├── install.sh            # 安装辅助：默认 pnpm 路径；--copy / --check / --uninstall
├── tools/                # 测试与工具（见下）：board-logic-test / board-ui-probe / board-archive-gate-test / css-diff.py
├── .github/workflows/    # CI：语法检查 + 两个回归网（含负控）
├── LICENSE               # MIT
└── reports/              # 兼容性审计与复验报告（本机证据，package.json 的 files 不含它）
```

`package.json` 的 `files` 只发布 `lib/` 与 `cordis.patch.yml`，`tools/`、`reports/`、`install.sh` 都不进 tarball。

`client.js` 是对 dsh 官方 client bundle 的**注入产物**（通过 slot 注入 + 运行时 CSS，不修改 bundle 源文件）。重注入脚本与本地开发流程见内部 `dsh-patches/`（未随仓库发布）。

### 看板的三个测试工具

```bash
node tools/board-logic-test.mjs      # 纯逻辑：落列/排序/剪枝/隐藏/撤销的不变量（CI 跑）
node tools/board-ui-probe.mjs "$TOKEN" "$SESSION_ID" [/tmp/shot.png]   # 真界面 e2e（需活的 dsh web + Chrome + xvfb）
node tools/board-archive-gate-test.mjs                        # B16 门禁回归网：清空不得先把会话归档（exit 0 = 33 条断言全过，组 0 + A–G）
node tools/board-archive-gate-test.mjs --mutate <name>|all    # 负控：exit 0 = 变异被检出（不检出 = 这张网形同虚设）；all 在 shipped guard 是 layout (a) 时额外用内存生成的 layout (b) 等价重构再跑一遍（是 layout (b) 则只跑 1 源并打 note）
```

`board-logic-test.mjs` 从 `lib/client.js` 里把纯函数抠出来跑沙箱断言，不需要浏览器。`board-ui-probe.mjs` 用 puppeteer 驱动真实面板（拖拽、菜单、批量、折叠、搜索、新建/改名/勾选/删除自由待办卡、清空→撤销归档、刷新持久化）；**默认不碰会话**，加 `BOARD_PROBE_RUN=1` 才会真的走一遍"待办 → 建会话执行"（会新建一个会话，脚本会打印 id 方便清理），**会动真会话**，但结束时会把动过的都还原，并断言没有残留归档（会话被归档就会从侧栏消失，所以这个收尾很重要）。

`board-archive-gate-test.mjs` 守的是**破坏性顺序**：真删会话要靠 `dsh-archived-chats` 的 `/delete-all` → `/trash/purge`，而 0.2.0-rc.2 的版本门禁会跳过 `archived-chats@1.4.5`，这两条路由只会 404/405 —— 这时"清空"只能降级成"把卡片移出看板"。一旦实现退化成"先归档、再发现删不掉"，会话就被移出侧栏且没有东西能把它放回来（用户却以为只是从看板移走了卡片）。所以它断言 `boardDeleteSessions` 的能力门禁必须排在 `workspaces.archiveSession` 循环**之前**：不可用时核心归档调用数必须为 **0**，唯一的请求是一次**空 id** 的能力探测，且探测结论被缓存为不可用。

**33 条断言，分 0 + A–G 八组**：0 哨兵（切片确实来自当前 `lib/client.js`、归档路径仍在，`--mutate` 也跑）/ A 不可用时降级 / B 可用时走完整链路（core archive → `/delete-all` → `/trash/purge`）/ C purge 半途失败后核心 `workspaces.unarchiveSession` 能把会话收回（不留悬空归档）/ D 插件 `/unarchive-all` 成功时走插件且不碰 core，回 405 时仍能被 core 收回 / E 探测请求抛错时判 false 且不抛 / F 探测通过但 `/delete-all` 失败时如实上报并降级缓存 / **G 归属（整包范围，9 条）**。

G 组是第二轮复查（F6/R1）加的，因为**只切函数的运行时断言挡不住"把归档调用搬到切片之外"**：把 `boardBridge.workspaces.archiveSession(id)` 循环塞进调用点 `purgeTrash`（它只是组件里的一个闭包，从来不在切片里）后，旧版仍是 18/18 全绿。验收规则现在是显式的：**任何把归档调用挪到门禁之前的等价改法都必须转红，包括挪出被切片函数的范围**。G 组因此在**整份 `lib/client.js`** 上断言（9 条）：`BOARD_ARCHIVE_BASE` 的**每一次引用**（声明处除外）都必须落在路由层的声明内（`boardDeleteSessions` / `boardProbeArchiveRoutes` / `boardRestoreArchived` / `boardRestoreSessions`，这份白名单是**显式写死**的，新加的 `boardArchive*` helper 不会被自动放行）；路由字面量 `/plugins/dsh-archived-chats` 全包只能出现一次且必须在常量声明处；`archiveSession` 的**每一处直接引用**都只能在被门禁保护的 `boardDeleteSessions` 内；`boardBridge` 不许在路由层之外做计算成员访问；并且在该函数内门禁必须存在、**文本上先于**归档循环、且是提前 return。

**已知残余局限（刻意不追）**：以上都是**文本级**归属断言，能拦住所有通过 `BOARD_ARCHIVE_BASE` 常量或 `archiveSession` 这个名字的等价破坏（包括"复用常量手搓路由"与"新 helper + 复用常量"这两种曾经的逃逸），但**刻意拼写变形**（例如 `workspaces["archive" + "Session"](id)`）不在保证范围内——静态文本匹配追不出所有变形，追下去只会把测试变成脆弱的字符串迷宫，而且这个项目已经因为"锚点耦合 `lib/client.js` 内部结构"吃过一次亏。风险可接受的理由：这类写法在实践中只会出现在刻意规避审查的场景（常量就摆在同一个文件里，正常改法都会用它），代码评审可见；运行期网络（A–F 组）仍然保证**被切片的 owner** 在链路不可用时一个会话都不归档。

负控现在有 8 个，全部纳入 `--mutate all`（CI 跑）：函数内破坏 `gate`（把门禁条件短路）与 `reorder`（门禁与归档循环换位）、`probe`（探测恒 true）；切片外破坏 `move`（调用方直接归档）、`helper`（新 helper 直接归档）、`move-route`（调用方**复用常量**手搓 `/delete-all`，即上一轮复审的逃逸 A）、`move-helper-route`（新顶层 helper `boardArchivePurge` 复用常量路由，即逃逸 C）、`inline`（调用方重打路由字面量）。每一轮都要求"原始全绿 + 变异转红"。

**重构容忍是有边界的，而且是可执行验证的**：工具容忍的门禁写法**只有两种**（与它的 JSDoc/头部逐字一致）——

- layout (a)：`if (await boardArchiveAvailable() !== true) { … }`
- layout (b)：`const capability = await boardArchiveAvailable(); if (capability !== true) { … }`

这两种形状内部的格式差异（加括号、换行、插注释、局部变量改名）都能容忍。`--mutate all` 会验证它：当 shipped guard 是 layout (a) 时，它额外在内存里生成一份语义等价的 layout (b) 变体再跑一遍整套负控（**2 源 / 16 次检出**，输出 `… detected on 2 source(s)`）；当 shipped guard 本来就是 layout (b) 时没有第二份源可生成，工具会打印 `note: the shipped guard already uses the hoisted layout — the refactor-tolerance pass reuses it` 并只跑**1 源 / 8 次检出**（输出 `… on 1 source(s)`）。两种情况都要求"原始全绿 + 全部负控转红"，否则 `exit 1`。这正是不让 t9 的 O1 复活的那道保险（当时 `guardBlock` 的 layout (b) 分支把语句自己的 `;` 也算进切片检查 → 恒不命中 → `gate`/`reorder` 抛错 → `--mutate all` 假红，而文档还写着"不会让负控假红"）。

**边界之外会怎样（已实测，写在文档里而不是靠读者猜）**：把门禁再深一层、经过一个中间布尔变量，例如

```js
const capability = await boardArchiveAvailable();
const denied = capability !== true;
if (denied) { … }
```

仍然会让 `--mutate all` `exit 1`，报 `REFACTOR TOLERANCE FAILED: could not build the layout-(b) equivalence source … the guard locator is coupled to one code layout, so a legal refactor of the gate would redden CI for no reason`。**这是假红，不是漏检**：主套件（真正守回归的那条）仍然全绿——它的断言读的是结构而非文本；所有真实破坏也仍被抓住；报错本身干净、可行动（指明了原因和出路：把守卫写成上面两种布局之一，或者按下面的原则收敛声明）。

**为什么不再扩定位器（有意的设计边界）**：静态定位器对任意嵌套的容忍是**无穷递归**——每容忍一层，就会有人写出更深一层的等价写法；而且每扩一次都在把测试与 `lib/client.js` 的现实写法绑得更紧（这个项目已经因为"锚点耦合"在同一天让两个成员互相打破了对方的改动）。所以规则是：**声明边界，不扩容器**。将来若又遇到新的等价写法导致假红，按同一原则**限定声明**（或把守卫写成两种已记明布局之一），而不是加大容错。假红是可接受的失败方向：宁可多报，不可漏检——一张会多报的网仍然拦住破坏，一张会漏检的网什么也拦不住。

切片也是自适应的：`boardArchive*` / `boardProbe*` 一族在文件顶层的声明会被自动纳入沙箱（漏掉一个只会变成宽松模式下的隐式全局——旧版就是这样侥幸通过的），必需的 8 个声明消失才会抛错。`--mutate gate` / `--mutate probe` 不锚定具体代码文本，而是**结构化地**把门禁条件改写成 `false`／把探测函数体换成 `return true`。

实现沿用 `board-logic-test.mjs` 的 `matchDelimiter()` / `locate()` 惯用法，从**当前** `lib/client.js` 切出真实声明并注入桩（`fetch` + `boardBridge.workspaces`），因此不需要浏览器、不启 dsh、不碰 `$DSH_HOME`；**锚点消失会直接抛错**（canary），不会静默变成空跑。`--mutate <name>`（或 `all`）是它的**负控**：在内存里改写**整份源码**（仓库文件不动）再重新切片，先跑原始、再跑变异，只有"原始全绿、变异后转红"才 `exit 0` —— 这是证明这张网不是恒绿的**唯一**手段（变异仍通过则 `exit 1`，说明网形同虚设）；参数错 `exit 2`，`--help` `exit 0`。CI 里同时跑主套件与 `--mutate all`，所以这类破坏性回归**过不了 PR**。

### 改注入样式前先跑规则级 diff

注入的样式表在 `lib/client.js` 里是**一整行 JS 字符串**，普通 `git diff` 看不出「从逗号列表里删掉一个选择器」这类改动——已因此踩过两次坑（`[data-slot=x] [class$=_meta],[data-slot=x] [class$=_time]` 删掉前半段后变成 `[data-slot=x] [data-slot=x] …`，永不命中；`[class$=_brand] svg` 放宽成 `[class*=_brand] svg` 把品牌 wordmark 压扁）。所以改完必须跑：

```bash
python3 tools/css-diff.py            # HEAD vs 工作区，按规则列出增删
python3 tools/css-diff.py --lint --check   # 只扫可疑模式（重复属性步、空规则），CI 也跑这条
python3 tools/css-diff.py 0f8acdb HEAD     # 任意两个版本对比
```

规则 diff 只说明「改了什么」，是否**该**这么改还得在浏览器里确认：把 `style[data-plugin-css="dsh-enhance-tool/enhancer.module.css"]` 的 `sheet.disabled` 在 `true/false` 之间切换，对比 `getComputedStyle` + `getBoundingClientRect`，并逐个列出被新命中的元素（放宽后缀→子串匹配时尤其重要）。

### 本地开发闭环（只改 client.js 时无需重启 dsh web）

profile 里的 `dsh-enhance-tool` 是**拷贝还是符号链接，取决于安装方式**：

- `dsh plugin --profile web add github:…` / npm 上的 tarball 装法（以及 `install.sh --copy`）：profile 里是**拷贝**（content-addressed store 的硬链接，或直接拷进去），改完仓库文件必须覆盖过去；
- `dsh plugin --profile web add <本地目录>`（`install.sh` 的默认路径）：pnpm 记成 **`link:` 符号链接**指向 clone，这时 profile 里那份**就是**仓库文件（`cp -f` 反而是"自己覆盖自己"，会报 `are the same file`，无害），改仓库即生效；但**把 clone 移走/删掉插件就会静默消失**（`install.sh` 会检测并提示，建议改用 `--copy`）。

按拷贝安装（最常见）覆盖：

```bash
cp -f lib/client.js ~/.dsh/profiles/web/node_modules/dsh-enhance-tool/lib/client.js
```

`@deepseek-ai/dsh-client-hmr` 会以 500ms 轮询 profile 里的 client bundle，检测到变化后重新计算该插件的 bundle rev（`index.html` 中 `dsh-enhance-tool/client.js&rev=...` 会变）并通知浏览器热重载 —— **不需要重启 dsh web**。实测：已打开的标签页会在几秒内自动热替换插件（SSE `rebuilt` 帧 → 重载模块 + 重建样式标签），无需刷新；但标签页被浏览器冻结/SSE 断连时会错过该帧，此时 Ctrl+Shift+R 硬刷新即可。注意 `index.html` 里合并大 bundle 的那个 `rev=` 不会变，别用它判断是否生效；host 侧 `lib/index.js` 的改动仍然要重启 dsh web。

---

## 数据文件（勿提交 / 勿外发）

- `~/.dsh/prompts.json` — 提示词库（可能含环境敏感信息）
- `~/.dsh/profiles/web/enhancer-board.json`（+ `.bak`）— 任务看板状态（仅当选择「随 profile 保存」时生成）
