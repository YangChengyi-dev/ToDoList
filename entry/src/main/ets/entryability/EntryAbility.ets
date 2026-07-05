import { window } from '@kit.ArkUI';
import { Ability, Want } from '@kit.AbilityKit';

export default class EntryAbility extends Ability {
  onCreate(want: Want, launchParam: object): void {
    // 应用启动时的初始化逻辑
  }

  onDestroy(): void {
    // 应用销毁时的清理逻辑
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // 设置主页面
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        console.error('Failed to load content', err);
        return;
      }
      console.info('Succeeded in loading content');
    });
  }

  onWindowStageDestroy(): void {
    // 窗口销毁时的逻辑
  }

  onForeground(): void {
    // 应用切换到前台时的逻辑
  }

  onBackground(): void {
    // 应用切换到后台时的逻辑
  }
}