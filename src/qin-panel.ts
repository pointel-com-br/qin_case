import { QinBase } from "./qin-base";

export class QinPanel extends QinBase {
  public constructor(options?: QinPanelSet, isQindred?: string) {
    super((isQindred ? isQindred + "_" : "") + "panel", document.createElement("div"));
    this.styleAsDisplayFlex();
    if (options?.items) {
      for (const item of options.items) {
        item.install(this);
      }
    }
  }

  public override castedQine(): HTMLDivElement {
    return this.qinedHTML as HTMLDivElement;
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinPanel {
    super.styled(styles);
    return this;
  }

  public override put(item: QinBase): QinPanel {
    item.install(this);
    return this;
  }
}

export type QinPanelSet = {
  items?: QinBase[];
};
