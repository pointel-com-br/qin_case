import { QinNature } from "qin_soul";
import { QinAsset } from "./qin-assets";
import { QinEdit } from "./qin-edit";
import { QinIcon } from "./qin-icon";
import { QinIconCell } from "./qin-icon-cell";
import { QinLine } from "./qin-line";

export class QinIconPick extends QinEdit<QinAsset> {
    private _readOnly = false;

    public constructor(options?: QinIconPickSet, isQindred?: string) {
        super((isQindred ? isQindred + "_" : "") + "icon-pick", new QinLine());
        this.styleAsEditable();
        if (options?.initial) {
            this.setData(options?.initial);
        }
        if (options?.icons) {
            for (const icon of options.icons) {
                this.addIcon(icon);
            }
        }
        if (options?.cells) {
            for (const cell of options.cells) {
                this.addCell(cell);
            }
        }
        if (options?.readOnly) {
            this.turnReadOnly();
        }
        this.prepareEdit();
    }

    public override castedQine(): QinLine {
        return this.qinedBase as QinLine;
    }

    public override styled(styles: Partial<CSSStyleDeclaration>): QinIconPick {
        super.styled(styles);
        return this;
    }

    public override getNature(): QinNature {
        return QinNature.CHARS;
    }

    protected override getData(): QinAsset {
        for (let child of this.children()) {
            if (child instanceof QinIconCell) {
                if (child.selected) {
                    return child.qinIcon.asset;
                }
            }
        }
        return null;
    }

    protected override setData(asset: QinAsset) {
        let found = false;
        for (let child of this.qinedBase.children()) {
            if (child instanceof QinIconCell) {
                if (child.qinIcon.asset == asset) {
                    found = true;
                    child.selected = true;
                } else {
                    child.selected = false;
                }
            }
        }
    }

    protected override mayChange(): HTMLElement[] {
        return [];
    }

    public override turnReadOnly(): void {
        this._readOnly = true;
        this.styleAsReadOnly();
    }

    public override turnEditable(): void {
        this._readOnly = false;
        this.styleAsEditable();
    }

    public override isEditable(): boolean {
        return !this._readOnly;
    }

    public addIcon(icon: QinIcon) {
        this.addCell(new QinIconCell(icon));
    }

    public addCell(cell: QinIconCell) {
        cell.addActionMain((_) => {
            if (this.isEditable()) {
                this.setData(cell.asset);
            }
        });
        cell.install(this.qinedBase);
    }
}

export type QinIconPickSet = {
    initial?: QinAsset;
    icons?: QinIcon[];
    cells?: QinIconCell[];
    readOnly?: boolean;
};
