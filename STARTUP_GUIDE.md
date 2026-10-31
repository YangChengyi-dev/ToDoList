# 待办列表项目启动指南

## 项目简介

本项目是基于 HarmonyOS ArkTS 的待办事项应用，使用声明式 UI 框架 ArkUI 开发，采用 Stage 模型。

### 技术栈

- **开发语言**：ArkTS（TypeScript 超集）
- **UI 框架**：ArkUI 声明式语法
- **构建工具**：Hvigor
- **包管理**：ohpm
- **SDK 版本**：HarmonyOS 26.0.0（API 26）

---

## 环境准备

### 1. 安装 DevEco Studio

1. 访问 [HarmonyOS 开发者官网](https://developer.harmonyos.com) 下载 DevEco Studio。
2. 版本要求：**DevEco Studio 26.0.0 及以上**。
3. 安装时确保勾选 HarmonyOS SDK（API 26）组件。

### 2. 配置 SDK 环境变量

DevEco Studio 26 使用 `DEVECO_SDK_HOME` 指向 SDK 根目录。

#### Windows 系统

1. 打开「系统属性」→「高级」→「环境变量」。
2. 在「系统变量」中新建：
   - 变量名：`DEVECO_SDK_HOME`
   - 变量值：SDK 根目录，例如
     `D:\Program Files\Huawei\DevEco Studio\sdk`

3. 保存后重新打开终端。

#### 验证环境变量

```powershell
echo $env:DEVECO_SDK_HOME
```

输出应为 SDK 根目录路径。

### 3. 配置 local.properties

项目根目录的 `local.properties` 用于指定本地 SDK 路径：

```properties
sdk.dir=D:/Program Files/Huawei/DevEco Studio/sdk
```

> **注意**：该文件与本地环境相关，不应提交到版本库。路径建议使用正斜杠 `/`。

如果 DevEco Studio 或 hvigor 仍提示旧的 SDK 路径不存在，可创建目录联接，将旧路径指向实际 SDK：

```powershell
cmd /c mklink /J "D:\旧路径\Sdk" "D:\Program Files\Huawei\DevEco Studio\sdk"
```

---

## 项目结构

```text
ToDoList/
├── AppScope/
│   ├── app.json5                         # 应用级配置
│   └── resources/base/
│       ├── element/string.json           # 应用名称
│       └── media/app_icon.png            # 应用图标
├── entry/
│   ├── build-profile.json5               # 模块构建配置
│   ├── oh-package.json5                  # 模块包配置
│   └── src/main/
│       ├── ets/
│       │   ├── entryability/EntryAbility.ets
│       │   └── pages/Index.ets
│       ├── module.json5                  # 模块清单
│       └── resources/
│           ├── base/
│           │   ├── element/color.json
│           │   ├── element/string.json
│           │   ├── media/ic_icon.png
│           │   └── profile/main_pages.json
│           ├── en_US/element/string.json
│           └── zh_CN/element/string.json
├── hvigor/hvigor-config.json5            # hvigor 配置
├── hvigorfile.ts                         # 构建任务定义
├── build-profile.json5                   # 应用级构建配置
├── oh-package.json5                      # 项目包配置
├── local.properties                      # 本地 SDK 路径
├── README.md
└── STARTUP_GUIDE.md
```

### 关键配置文件

| 文件 | 作用 |
| --- | --- |
| `AppScope/app.json5` | 应用包名、版本号、图标、应用名称 |
| `build-profile.json5` | 应用级 `products` 与 `modules` 配置 |
| `entry/build-profile.json5` | 模块 target、`runtimeOS`、构建选项 |
| `entry/src/main/module.json5` | 模块类型、Ability、页面入口、权限 |
| `entry/src/main/resources/base/profile/main_pages.json` | 页面路由注册 |
| `hvigor/hvigor-config.json5` | hvigor 版本与执行参数 |

---

## 快速开始

1. 使用 DevEco Studio 打开项目根目录。
2. 等待工程同步（Sync）完成。
3. 确认 `local.properties` 中的 `sdk.dir` 与实际 SDK 路径一致。
4. 选择 `entry` 模块，点击 `Run` 运行到模拟器或真机。

> 新增页面时，必须同时将页面路径注册到 `entry/src/main/resources/base/profile/main_pages.json`。

---

## 命令行构建

项目未内置 `hvigorw` 包装脚本，可直接使用 DevEco Studio 自带的 hvigor：

```powershell
& "D:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleHap --mode module -p product=default -p buildMode=debug --no-daemon
```

Release 构建：

```powershell
& "D:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.bat" assembleHap --mode module -p product=default -p buildMode=release --no-daemon
```

清理构建产物：

```powershell
& "D:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin\hvigorw.bat" clean --no-daemon
```

构建产物位于：

```text
entry/build/default/outputs/default/entry-default-unsigned.hap
```

### 安装到设备

未签名的 HAP 无法直接安装。请在 DevEco Studio 中配置签名（或使用自动签名）后，再通过 IDE 运行，或使用 `hdc` 安装已签名的 HAP：

```powershell
& "D:\Program Files\Huawei\DevEco Studio\sdk\default\openharmony\toolchains\hdc.exe" install <已签名 HAP 路径>
```

---

## 依赖管理

项目依赖通过 ohpm 管理：

```powershell
ohpm install
```

`ohpm` 位于 DevEco Studio 的 `tools\ohpm\bin` 目录，也可在 DevEco Studio 的 Terminal 中直接使用。

---

## 常见问题

### Q1：提示 `ENOENT: no such file or directory, realpath '...\Sdk'`

**原因**：`local.properties` 或 IDE 全局配置中的 SDK 路径已失效。

**解决**：

1. 修改 `local.properties`：

   ```properties
   sdk.dir=D:/Program Files/Huawei/DevEco Studio/sdk
   ```

2. 删除陈旧缓存后重新构建：

   ```powershell
   Remove-Item .hvigor\cache -Recurse -Force
   Remove-Item entry\build -Recurse -Force
   ```

3. 若 IDE 仍使用旧路径，可创建目录联接（见上文）。

### Q2：构建报错 `00308018 Unknown Error`

该错误为 ArkTS 编译阶段的通用错误码，具体原因需查看日志：

```text
.hvigor/outputs/build-logs/build.log
```

常见原因包括 SDK 路径失效、ArkTS 语法不兼容、资源缺失等。

### Q3：`Invalid resource name 'xxx-yyy'`

**原因**：资源文件名称包含连字符等非法字符。

**解决**：资源名必须匹配 `[a-zA-Z0-9_]`，将 `app-icon.png` 改为 `app_icon.png`，并同步修改引用：

```json5
"icon": "$media:app_icon"
```

### Q4：`The resource reference '$media:xxx' is not defined`

**原因**：`app.json5` 或 `module.json5` 引用了不存在的资源。

**解决**：在对应模块的 `resources/base/media`、`resources/base/element` 下补齐资源，或修正引用名称。

### Q5：`Cannot find name 'TextField'`

**原因**：当前 SDK（API 26）中不存在 `TextField` 组件。

**解决**：使用 `TextInput` 替代：

```ts
TextInput({
  placeholder: '请输入待办事项',
  text: this.inputValue
})
```

### Q6：`Object literal must correspond to some explicitly declared class or interface`

**原因**：ArkTS 禁止无类型的对象字面量（`arkts-no-untyped-obj-literals`）。

**解决**：使用已声明的类或接口构造对象，例如：

```ts
const updated = new TodoItem(item.text);
updated.isCompleted = !item.isCompleted;
this.todoList[index] = updated;
```

### Q7：终端提示 `hvigorw` 不是内部或外部命令

**原因**：项目未包含 `hvigorw` 包装脚本，或未加入 PATH。

**解决**：使用 DevEco Studio 自带 hvigor 的完整路径，或将以下目录加入 PATH：

```text
D:\Program Files\Huawei\DevEco Studio\tools\hvigor\bin
```

不建议通过 `npm install -g @ohos/hvigor` 安装与 SDK 不匹配的 hvigor 版本。

### Q8：`modelVersion` 不匹配

`hvigor/hvigor-config.json5` 与根目录 `oh-package.json5` 中的 `modelVersion` 应保持一致（当前为 `5.0.0`）。

### Q9：HAP 安装失败

未签名的 HAP 无法安装。请在 DevEco Studio 中完成签名配置后重新构建，或使用 IDE 的自动签名功能。

---

## 参考资料

- [HarmonyOS 官方文档](https://developer.harmonyos.com)
- [ArkTS 开发指南](https://developer.harmonyos.com/en/docs/develop/arkts/overview-20230801)
- [ArkUI 组件文档](https://developer.harmonyos.com/en/docs/develop/ui/ui-components-overview-20230801)
