# dsh-enhance-tool

DeepSeek Harness (`dsh`) web 界面增强插件 — 润色、提示词库、预测回复、宽度/字号设置、MCP 与定时自动化面板。

- **安装形态**：100% 插件注入（slot / shell.overlay / settings / sessionTitle 官方机制），**零 bundle 补丁**
- **兼容版本**：`dsh >= 0.1.0-rc.7`（已实测 `0.1.1-rc.2`、`0.1.2-rc.1`）
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

- **实测版本**：`0.1.0-rc.7`、`0.1.1-rc.2`、`0.1.2-rc.1`
- **布局增强失效表现**：安装后 AI/用户消息样式无变化（无错误提示，功能静默不生效）
- **处理方式**：布局失效时，其余功能（润色 / 提示词库 / 建议条 / MCP / 自动化 / 标题）不受影响；请提交 issue 附上你的 dsh 版本与 `document.querySelector('*[class]').className` 中对应的消息区类名前缀，我们会更新注入选择器。

### 其他已知问题

- **dsh 0.1.1-rc.2 的 modlens 适配器缺少 `prepareCall`**：插件启动时自动为缺失的适配器补丁（包装 `stream` 实现），使 `/polish`、`/suggest`、标题生成直接使用**用户会话选择的模型**；若补丁不可用则自动 fallback 到内置 `deepseek-official`。
- **dsh 0.1.2 起 web 端需要认证**：直接访问 `http://127.0.0.1:3080/` 会返回 401，请使用启动日志中打印的 `http://127.0.0.1:3080/?token=...`（换取 cookie 后即可正常访问）。
- **dsh 0.1.2 的用户气泡结构变化**：文本由块级 `div` 改为内联 `span`，折叠逻辑改为裁剪气泡本体（高度 = 5 行 + 气泡内边距），展开按钮挂在气泡外的 `userStack` 上以免被 `overflow:hidden` 裁掉。
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

---

## 数据文件（勿提交 / 勿外发）

- `~/.dsh/prompts.json` — 提示词库（可能含环境敏感信息）
- `~/.dsh/profiles/web/enhancer-tasks.json` — 自动化任务
- `~/.dsh/profiles/web/cordis.patch.yml` — MCP 合并写入目标
