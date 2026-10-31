if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    todoList?: TodoItem[];
    inputValue?: string;
}
// 待办事项数据模型
class TodoItem {
    text: string;
    isCompleted: boolean = false;
    constructor(text: string) {
        this.text = text;
    }
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__todoList = new ObservedPropertyObjectPU([
            new TodoItem('学习ArkTS基础语法'),
            new TodoItem('完成待办列表案例'),
            new TodoItem('阅读HarmonyOS开发文档'),
            new TodoItem('练习声明式UI布局')
        ], this, "todoList");
        this.__inputValue = new ObservedPropertySimplePU('', this, "inputValue");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.todoList !== undefined) {
            this.todoList = params.todoList;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__todoList.purgeDependencyOnElmtId(rmElmtId);
        this.__inputValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__todoList.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __todoList: ObservedPropertyObjectPU<TodoItem[]>;
    get todoList() {
        return this.__todoList.get();
    }
    set todoList(newValue: TodoItem[]) {
        this.__todoList.set(newValue);
    }
    private __inputValue: ObservedPropertySimplePU<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    addTodo() {
        const trimmed = this.inputValue.trim();
        if (trimmed.length > 0) {
            this.todoList = [...this.todoList, new TodoItem(trimmed)];
            this.inputValue = '';
        }
    }
    toggleTodo(index: number) {
        const item = this.todoList[index];
        const updated = new TodoItem(item.text);
        updated.isCompleted = !item.isCompleted;
        this.todoList[index] = updated;
        // 触发数组更新
        this.todoList = [...this.todoList];
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Text.create('待办列表');
            // 标题栏
            Text.fontSize(28);
            // 标题栏
            Text.fontWeight(FontWeight.Bold);
            // 标题栏
            Text.width('100%');
            // 标题栏
            Text.padding({ top: 20, bottom: 10 });
            // 标题栏
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 标题栏
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 输入区域
            Row.create();
            // 输入区域
            Row.width('100%');
            // 输入区域
            Row.padding({ left: 16, right: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({
                placeholder: '请输入待办事项',
                text: this.inputValue
            });
            TextInput.layoutWeight(1);
            TextInput.onChange((value: string) => {
                this.inputValue = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加');
            Button.onClick(() => {
                this.addTodo();
            });
        }, Button);
        Button.pop();
        // 输入区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 列表区域
            List.create();
            // 列表区域
            List.width('100%');
            // 列表区域
            List.layoutWeight(1);
            // 列表区域
            List.padding({ left: 16, right: 16 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding(16);
                            Row.borderRadius(8);
                            Row.backgroundColor('#F5F5F5');
                            Row.margin({ bottom: 8 });
                            Row.onClick(() => {
                                this.toggleTodo(index);
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 完成状态图标
                            Text.create(item.isCompleted ? '✓' : '○');
                            // 完成状态图标
                            Text.fontColor(item.isCompleted ? '#4CAF50' : '#999');
                            // 完成状态图标
                            Text.margin({ right: 12 });
                        }, Text);
                        // 完成状态图标
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 待办文本
                            Text.create(item.text);
                            // 待办文本
                            Text.fontSize(20);
                            // 待办文本
                            Text.decoration({
                                type: item.isCompleted ? TextDecorationType.LineThrough : TextDecorationType.None
                            });
                            // 待办文本
                            Text.fontColor(item.isCompleted ? '#999' : '#333');
                            // 待办文本
                            Text.layoutWeight(1);
                        }, Text);
                        // 待办文本
                        Text.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.todoList, forEachItemGenFunction, (item: TodoItem) => item.text, true, false);
        }, ForEach);
        ForEach.pop();
        // 列表区域
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    public __resetStateVarsOnReuse__Internal(params: Object): void {
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.todolist", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
