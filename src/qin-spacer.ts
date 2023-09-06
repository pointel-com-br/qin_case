import { QinPanel } from "./qin-panel";

export class QinSpacer extends QinPanel {
    public constructor(distance?: number, isQindred?: string) {
        super(null, (isQindred ? isQindred + "_" : "") + "spacer");
        this.styleAsMinSize(distance ?? 4, distance ?? 4);
    }

    public override styled(styles: Partial<CSSStyleDeclaration>): QinSpacer {
        super.styled(styles);
        return this;
    }
}
