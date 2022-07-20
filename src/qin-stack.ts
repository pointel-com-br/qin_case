import { QinBase } from "./qin-base";
import { QinPanel, QinPanelSet } from "./qin-panel";

export class QinStack extends QinPanel {
  public constructor(options?: QinPanelSet, isQindred?: string) {
    super(options, (isQindred ? isQindred + "_" : "") + "stack");
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinStack {
    super.styled(styles);
    return this;
  }

  public override put(item: QinBase): QinStack {
    item.install(this);
    return this;
  }

  public override addChild(child: QinBase): void {
    this.children().forEach((inChild) => {
      inChild.unDisplay();
    });
    super.addChild(child);
  }

  public stack(child: QinBase): QinStack {
    return this.put(child);
  }

  public show(child: QinBase) {
    this.children().forEach((inChild) => {
      if (inChild === child) {
        inChild.reDisplay();
      } else {
        inChild.unDisplay();
      }
    });
  }
}
