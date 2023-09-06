import { QinBase } from "./qin-base";
import { QinPanel, QinPanelSet } from "./qin-panel";

export class QinRow extends QinPanel {
    public constructor(options?: QinPanelSet, isQindred?: string) {
        super(options, (isQindred ? isQindred + "_" : "") + "row");
        this.styleAsFlexDirectionRow();
        this.styleAsFlexWrapNot();
        this.qinedHTML.style.minWidth = "min-content";
        this.qinedHTML.style.minHeight = "min-content";
    }

    public override styled(styles: Partial<CSSStyleDeclaration>): QinRow {
        return this;
    }

    public override put(item: QinBase): QinRow {
        item.install(this);
        return this;
    }
}
