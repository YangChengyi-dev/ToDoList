// 待办事项数据模型
class TodoItem {
  text: string;
  isCompleted: boolean = false;

  constructor(text: string) {
    this.text = text;
  }
}

@Entry
@Component
struct Index {
  @State todoList: TodoItem[] = [
    new TodoItem('学习ArkTS基础语法'),
    new TodoItem('完成待办列表案例'),
    new TodoItem('阅读HarmonyOS开发文档'),
    new TodoItem('练习声明式UI布局')
  ];

  @State inputValue: string = '';

  addTodo() {
    const trimmed = this.inputValue.trim();
    if (trimmed.length > 0) {
      this.todoList = [...this.todoList, new TodoItem(trimmed)];
      this.inputValue = '';
    }
  }

  toggleTodo(index: number) {
    const item = this.todoList[index];
    this.todoList[index] = {
      text: item.text,
      isCompleted: !item.isCompleted
    };
    // 触发数组更新
    this.todoList = [...this.todoList];
  }

  build() {
    Column() {
      // 标题栏
      Text('待办列表')
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .width('100%')
        .padding({ top: 20, bottom: 10 })
        .textAlign(TextAlign.Center)

      // 输入区域
      Row() {
        TextField({
          placeholder: '请输入待办事项',
          text: this.inputValue
        })
          .layoutWeight(1)
          .onChange((value: string) => {
            this.inputValue = value;
          })

        Button('添加')
          .onClick(() => {
            this.addTodo();
          })
      }
        .width('100%')
        .padding({ left: 16, right: 16, bottom: 16 })

      // 列表区域
      List() {
        ForEach(this.todoList, (item: TodoItem, index: number) => {
          ListItem() {
            Row() {
              // 完成状态图标
              Text(item.isCompleted ? '✓' : '○')
                .fontColor(item.isCompleted ? '#4CAF50' : '#999')
                .margin({ right: 12 })

              // 待办文本
              Text(item.text)
                .fontSize(20)
                .decoration({
                  type: item.isCompleted ? TextDecorationType.LineThrough : TextDecorationType.None
                })
                .fontColor(item.isCompleted ? '#999' : '#333')
                .layoutWeight(1)
            }
            .width('100%')
            .padding(16)
            .borderRadius(8)
            .backgroundColor('#F5F5F5')
            .margin({ bottom: 8 })
            .onClick(() => {
              this.toggleTodo(index);
            })
          }
        }, (item: TodoItem) => item.text)
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}