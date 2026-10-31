# 待办列表（ToDoList）

## 简介

基于 HarmonyOS ArkTS 声明式语法与 ArkUI 基础组件实现的简易待办事项应用，支持新增待办、切换完成状态，并对已完成事项添加删除线。

> 仓库暂未附带运行截图，可在 DevEco Studio 预览器或真机上运行查看效果。

## 功能说明

- 输入待办内容后点击「添加」，空白内容会被自动过滤
- 点击列表项可在「已完成 / 未完成」之间切换
- 已完成事项显示 `✓`，文字变灰并添加删除线
- 首次启动内置 4 条示例数据

## 相关概念

- **ArkTS**：HarmonyOS 应用开发语言，TypeScript 的超集
- **@State**：组件内部状态管理，状态变化自动触发 UI 刷新
- **TextInput**：文本输入组件
- **List / ListItem / ForEach**：列表容器与循环渲染
- **Column / Row**：垂直 / 水平线性布局容器

## 相关权限

不涉及。

## 使用说明

1. 打开应用首页，可看到内置的示例待办事项。
2. 在顶部输入框输入待办内容，点击「添加」将其加入列表。
3. 点击列表中的待办事项，标记为已完成。
4. 再次点击已完成事项，可取消完成状态。

## 环境要求

| 项目 | 版本 |
| --- | --- |
| DevEco Studio | 26.0.0 及以上 |
| HarmonyOS SDK | 26.0.0（API 26） |
| 运行设备 | phone |
| 开发模型 | Stage 模型 |

## 构建与运行

### 方式一：DevEco Studio

1. 使用 DevEco Studio 打开项目根目录。
2. 等待 `Sync` 完成。
3. 选择 `entry` 模块，点击 `Run` 运行到模拟器或真机。

### 方式二：命令行

项目未内置 `hvigorw` 包装脚本，可直接使用 DevEco Studio 自带的 hvigor：

```powershell
& "D:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleHap --mode module -p product=default -p buildMode=debug --no-daemon
```

构建产物：

```text
entry/build/default/outputs/default/entry-default-unsigned.hap
```

> 该产物未签名，安装到真机前需在 DevEco Studio 中配置签名，或使用 IDE 的自动签名功能。

## 约束与限制

1. 本示例仅支持标准系统，设备类型为 `phone`。
2. `compatibleSdkVersion` 为 `26.0.0`，`runtimeOS` 为 `HarmonyOS`，需使用 API 26 及以上的 SDK。
3. 资源文件名称必须匹配 `[a-zA-Z0-9_]`，不能包含连字符等特殊字符。
4. 当前 SDK 中不存在 `TextField` 组件，文本输入请使用 `TextInput`。

## 目录结构

```text
ToDoList/
├── AppScope/
│   ├── app.json5                         # 应用级配置（bundleName、版本、图标、名称）
│   └── resources/base/
│       ├── element/string.json           # 应用名称
│       └── media/app_icon.png            # 应用图标
├── entry/
│   ├── build-profile.json5               # 模块构建配置
│   ├── oh-package.json5                  # 模块包配置
│   └── src/main/
│       ├── ets/
│       │   ├── entryability/EntryAbility.ets  # 应用入口 Ability
│       │   └── pages/Index.ets                # 待办列表主页面
│       ├── module.json5                  # 模块清单（Ability、页面入口等）
│       └── resources/
│           ├── base/
│           │   ├── element/color.json    # 颜色资源
│           │   ├── element/string.json   # 字符串资源
│           │   ├── media/ic_icon.png     # Ability 图标
│           │   └── profile/main_pages.json
│           ├── en_US/element/string.json
│           └── zh_CN/element/string.json
├── hvigor/hvigor-config.json5            # hvigor 构建工具配置
├── hvigorfile.ts                         # 构建任务定义
├── build-profile.json5                   # 应用级构建配置（products、modules）
├── oh-package.json5                      # 项目包配置
└── local.properties                      # 本地 SDK 路径（不纳入版本管理）
```

## 常见问题

构建相关问题及排查方式请参阅 [STARTUP_GUIDE.md](STARTUP_GUIDE.md)。
