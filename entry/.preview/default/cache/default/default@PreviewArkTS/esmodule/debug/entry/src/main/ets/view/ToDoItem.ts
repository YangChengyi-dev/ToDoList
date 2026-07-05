if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ToDoItem_Params {
    content?: string;
    isComplete?: boolean;
}
import CommonConstants from "@bundle:com.huawei.todolist/entry/ets/common/constant/CommonConstant";
export default class ToDoItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.content = undefined;
        this.__isComplete = new ObservedPropertySimplePU(false, this, "isComplete");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ToDoItem_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.isComplete !== undefined) {
            this.isComplete = params.isComplete;
        }
    }
    updateStateVars(params: ToDoItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isComplete.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isComplete.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private content?: string;
    private __isComplete: ObservedPropertySimplePU<boolean>;
    get isComplete() {
        return this.__isComplete.get();
    }
    set isComplete(newValue: boolean) {
        this.__isComplete.set(newValue);
    }
    labelIcon(icon: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("entry/src/main/ets/view/ToDoItem.ets(24:5)", "entry");
            Image.objectFit(ImageFit.Contain);
            Image.width({ "id": 16777227, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Image.height({ "id": 16777227, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Image.margin({ "id": 16777226, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
        }, Image);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/ToDoItem.ets(32:5)", "entry");
            Row.borderRadius(CommonConstants.BORDER_RADIUS);
            Row.backgroundColor({ "id": 16777219, "type": 10001, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Row.width(CommonConstants.LIST_DEFAULT_WIDTH);
            Row.height({ "id": 16777229, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Row.onClick(() => {
                this.isComplete = !this.isComplete;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isComplete) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.labelIcon.bind(this)({ "id": 16777234, "type": 20000, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.labelIcon.bind(this)({ "id": 16777225, "type": 20000, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.content);
            Text.debugLine("entry/src/main/ets/view/ToDoItem.ets(39:7)", "entry");
            Text.fontSize({ "id": 16777228, "type": 10002, params: [], "bundleName": "com.huawei.todolist", "moduleName": "entry" });
            Text.fontWeight(CommonConstants.FONT_WEIGHT);
            Text.opacity(this.isComplete ? CommonConstants.OPACITY_COMPLETED : CommonConstants.OPACITY_DEFAULT);
            Text.decoration({ type: this.isComplete ? TextDecorationType.LineThrough : TextDecorationType.None });
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
