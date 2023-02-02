import { QinBase } from "./qin-base";
import { QinPanel, QinPanelSet } from "./qin-panel";

export class QinScroll extends QinPanel {
  public constructor(options?: QinPanelSet, isQindred?: string) {
    super(options, (isQindred ? isQindred + "_" : "") + "scroll");
    this.styleAsScroll();
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinScroll {
    super.styled(styles);
    return this;
  }

  public override put(item: QinBase): QinScroll {
    item.install(this);
    return this;
  }

  public hasScroll() {
    return this.qinedHTML.scrollHeight > this.qinedHTML.clientHeight;
  }

  public get scrollTop() {
    return this.qinedHTML.scrollTop;
  }

  public get scrollLeft() {
    return this.qinedHTML.scrollLeft;
  }

  public get scrollHeight() {
    return this.qinedHTML.scrollHeight;
  }

  public get scrollWidth() {
    return this.qinedHTML.scrollWidth;
  }
}
