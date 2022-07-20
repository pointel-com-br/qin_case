import { QinBase } from "./qin-base";
import { QinPanel, QinPanelSet } from "./qin-panel";

export class QinLine extends QinPanel {
  public constructor(options?: QinPanelSet, isQindred?: string) {
    super(options, (isQindred ? isQindred + "_" : "") + "line");
    this.style.putAsFlexDirectionRow();
    this.style.putAsFlexWrap();
    this.style.putAsAlignItemsFlexStart();
    this.style.putAsJustifyContentFlexStart();
    this.qinedHTML.style.minWidth = "min-content";
    this.qinedHTML.style.minHeight = "min-content";
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinLine {
    super.styled(styles);
    return this;
  }

  public override put(item: QinBase): QinLine {
    item.install(this);
    return this;
  }
}
