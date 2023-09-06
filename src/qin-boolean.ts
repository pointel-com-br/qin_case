import { QinNature } from "qin_soul";
import { QinAsset } from "./qin-assets";
import { QinEdit } from "./qin-edit";
import { QinIcon } from "./qin-icon";
import { QinLabel } from "./qin-label";
import { QinLine } from "./qin-line";

export class QinBoolean extends QinEdit<boolean> {
    private _qinSpan = new QinLabel();
    private _qinIcon = new QinIcon(QinAsset.FaceCheckRadio);
    private _value = false;
    private _readOnly = false;

    public constructor(options?: QinBooleanSet, isQindred?: string) {
        super((isQindred ? isQindred + "_" : "") + "boolean", new QinLine());
        this._qinSpan.install(this.qinedBase);
        this._qinIcon.install(this._qinSpan);
        this._qinSpan.styleAsEditable();
        this._qinSpan.styleAsDisplayFlex();
        this._qinSpan.styleAsAllCentered();
        this._qinSpan.addAction((qinEvent) => {
            if (qinEvent.isMain && !this._readOnly) {
                this.toggle();
            }
        });
        if (options?.initial) {
            this.setData(options.initial);
        }
        if (options?.readOnly) {
            this.turnReadOnly();
        }
        this.prepareEdit();
    }

    public override castedQine(): QinLine {
        return this.qinedBase as QinLine;
    }

    public override styled(styles: Partial<CSSStyleDeclaration>): QinBoolean {
        super.styled(styles);
        return this;
    }

    public override getNature(): QinNature {
        return QinNature.BOOL;
    }

    protected override getData(): boolean {
        return this._value;
    }

    protected override setData(data: boolean) {
        this._value = data;
        this.updateIcon();
    }

    protected override mayChange(): HTMLElement[] {
        return [];
    }

    public override turnReadOnly(): void {
        this._readOnly = true;
        this._qinSpan.styleAsReadOnly();
    }

    public override turnEditable(): void {
        this._readOnly = false;
        this._qinSpan.styleAsEditable();
    }

    public override isEditable(): boolean {
        return !this._readOnly;
    }

    private updateIcon() {
        if (this._value) {
            this._qinIcon.asset = QinAsset.FaceCheckedRadio;
        } else {
            this._qinIcon.asset = QinAsset.FaceCheckRadio;
        }
    }

    public toggle() {
        this.value = !this.value;
    }
}

export type QinBooleanSet = {
    initial?: boolean;
    readOnly?: boolean;
};
