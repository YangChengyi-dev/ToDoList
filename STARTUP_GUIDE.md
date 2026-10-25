# 待办列表项目启动指南

## 项目简介

本项目是基于 HarmonyOS ArkTS 的待办事项应用，使用声明式 UI 框架 ArkUI 开发。

### 技术栈

- **开发语言**: ArkTS（TypeScript 超集）
- **UI 框架**: ArkUI 声明式语法
- **构建工具**: Hvigor
- **最低 SDK 版本**: HarmonyOS NEXT Developer Beta1 SDK

---

## 环境准备

### 1. 安装 DevEco Studio

1. 访问 [HarmonyOS 官方网站](https://developer.harmonyos.com) 下载 DevEco Studio
2. 安装版本要求：**DevEco Studio NEXT Developer Beta1 及以上**
3. 安装过程中确保勾选 HarmonyOS SDK 组件

### 2. 配置环境变量

安装完成后，需要设置 HarmonyOS SDK 环境变量：

#### Windows 系统：

1. 打开「系统属性」→「高级」→「环境变量」
2. 在「系统变量」中新建变量：
   - 变量名：`OHOS_SDK_HOME`
   - 变量值：SDK 安装路径（通常类似 `C:\Users\<用户名>\Huawei\Sdk`）
3. 点击「确定」保存

#### 验证环境变量：

```powershell
echo $env:OHOS_SDK_HOME
```

输出应显示 SDK 路径。

### 3. 创建 local.properties（可选）

如果未设置环境变量，可以在项目根目录创建 `local.properties` 文件：

```properties
sdk.dir=C:\Users\<用户名>\Huawei\Sdk
```

> **注意**: 路径中的反斜杠 `\` 需要转义为 `\\`，或使用正斜杠 `/`

---

## 项目结构

```
ToDoList/
├── entry/                          # 应用主模块
│   ├── build-profile.json5         # 模块构建配置
│   ├── oh-package.json5            # 模块包配置
│   ├── src/
│   │   └── main/
│   │       ├── ets/
│   │       │   ├── pages/
│   │       │   │   └── Index.ets  # 应用主页面
│   │       │   └── entryability/
│   │       │       └── EntryAbility.ets  # 应用入口 Ability
│   │       └── module.json5       # 模块清单文件
├── hvigor/
│   └── hvigor-config.json5        # 构建工具配置
├── hvigorfile.ts                  # 构建任务定义
├── build-profile.json5            # 应用级构建配置
├── oh-package.json5               # 项目包配置
└── README.md                      # 项目说明
```

---

## 项目配置说明

### build-profile.json5（应用级）

```json5
{
  app: {
    products: [
      {
        name: 'default',
        bundleName: 'com.example.todolist',  // 应用包名（需唯一）
        vendor: 'example',
        versionCode: 1,                        // 版本号（整数）
        versionName: '1.0.0',                  // 版本名称（字符串）
        compatibleSdkVersion: '9'             // 兼容 SDK 版本（字符串格式）
      }
    ]
  },
  modules: [
    {
      name: 'entry',
      srcPath: './entry',
      targets: [
        {
          name: 'default',
          applyToProducts: ['default']
        }
      ]
    }
  ]
}
```

### entry/build-profile.json5（模块级）

```json5
{
  apiType: 'stageMode',           // API 类型：stageMode 或 factoryMode
  buildOption: {
    arkOptions: {
      // ArkTS 编译器选项
    }
  },
  target: [
    {
      name: 'default',
      runtimeOS: 'HarmonyOS',
      config: {}
    }
  ]
}
```

### entry/oh-package.json5（模块包）

```json5
{
  name: 'entry',
  version: '1.0.0',
  dependencies: {},
  modelVersion: '5.0.0'  // 必须与 hvigor-config.json5 中的 modelVersion 一致
}
```

### hvigor/hvigor-config.json5（构建工具配置）

```json5
{
  modelVersion: '5.0.0',  // 构建工具模型版本
  dependencies: {},
  execution: {
    // daemon: true,       // 启用守护进程编译
    // incremental: true,   // 启用增量编译
    // parallel: true       // 启用并行编译
  },
  logging: {
    // level: 'info'        // 日志级别
  }
}
```

---

## 启动项目

### 方法一：使用 DevEco Studio（推荐）

1. 打开 DevEco Studio
2. 选择「打开」→ 选择项目目录 `ToDoList`
3. 等待项目同步完成（首次打开可能需要下载依赖）
4. 在设备列表中选择已连接的 HarmonyOS 设备，或点击「Preview」进行预览
5. 点击运行按钮（▶）或按 `Shift+F10` 启动应用

### 方法二：使用命令行

#### 1. 进入项目目录

```powershell
cd D:\coedlabs\ToDoList
```

#### 2. 构建 Debug 包

```powershell
hvigorw assembleDebug
```

#### 3. 构建 Release 包

```powershell
hvigorw assembleRelease
```

#### 4. 安装到设备

```powersell
hdc shell bm install -p /data/local/tmp/entry-debug.hap
```

---

## 常见问题

### Q1: 构建失败 - modelVersion 不匹配

**错误信息**: `modelVersion` in `hvigor-config.json5` and `oh-package.json5` mismatch

**解决方法**: 确保两个文件中的 `modelVersion` 值一致，推荐使用 `5.0.0`

### Q2: 构建失败 - 找不到 SDK

**错误信息**: `Unable to find 'sdk.dir' in 'local.properties' or 'OHOS_SDK_HOME'`

**解决方法**:
1. 检查环境变量 `OHOS_SDK_HOME` 是否已设置
2. 或在项目根目录创建 `local.properties` 文件，添加 `sdk.dir=<SDK路径>`

### Q3: Schema 验证错误

**解决方法**: 确保 `build-profile.json5` 中使用正确的字段：
- `versionCode`: 整数类型
- `versionName`: 字符串类型
- `compatibleSdkVersion`: 字符串类型（如 `'9'`）

### Q4: 无法识别 hvigor 命令

**解决方法**:
1. 确保已安装 Node.js（版本 18.x 及以上）
2. 全局安装 Hvigor：`npm install -g @ohos/hvigor`
3. 在项目根目录执行 `npm install` 安装项目依赖

---

## 依赖管理

### 添加依赖

在 `entry/oh-package.json5` 的 `dependencies` 中添加依赖：

```json5
{
  dependencies: {
    "@ohos/arkts-graphics": "^1.0.0"
  }
}
```

然后执行：

```powershell
ohpm install
```

---

## 参考资料

- [HarmonyOS 官方文档](https://developer.harmonyos.com)
- [ArkTS 开发指南](https://developer.harmonyos.com/en/docs/develop/arkts/overview-20230801)
- [ArkUI 组件文档](https://developer.harmonyos.com/en/docs/develop/ui/ui-components-overview-20230801)