import { QinNature, QinSkin } from "qin_soul";
import { QinEdit } from "./qin-edit";

export class QinCombo extends QinEdit<string> {
    private _elGroups = new Array<HTMLOptGroupElement>();

    public constructor(options?: QinComboSet, isQindred?: string) {
        super((isQindred ? isQindred + "_" : "") + "combo", document.createElement("select"));
        this.styleAsEditable();
        if (options?.items) {
            for (let item of options.items) {
                this.addItem(item);
            }
        }
        if (options?.selected) {
            this.setData(options.selected);
        }
        if (options?.readOnly) {
            this.turnReadOnly();
        }
        this.prepareEdit();
    }

    public override castedQine(): HTMLSelectElement {
        return this.qinedHTML as HTMLSelectElement;
    }

    public override styled(styles: Partial<CSSStyleDeclaration>): QinCombo {
        super.styled(styles);
        return this;
    }

    public getNature(): QinNature {
        return QinNature.CHARS;
    }

    protected override getData(): string {
        return this.castedQine().value;
    }

    protected override setData(data: string) {
        this.castedQine().value = data;
    }

    protected override mayChange(): HTMLElement[] {
        return [this.castedQine()];
    }

    public override turnReadOnly(): void {
        this.castedQine().disabled = true;
        this.styleAsReadOnly();
    }

    public override turnEditable(): void {
        this.castedQine().disabled = false;
        this.styleAsEditable();
    }

    public override isEditable(): boolean {
        return !this.castedQine().disabled;
    }

    public addSame(titleAndValue: string) {
        this.addItem({ title: titleAndValue, value: titleAndValue });
    }

    public addItem(item: QinComboItem): QinCombo {
        const option = document.createElement("option");
        option.text = item.title;
        option.value = item.value;
        if (item.selected != undefined && item.selected != null) {
            option.selected = item.selected;
        }
        let group = this.getGroup(item.group);
        if (group) {
            group.appendChild(option);
        } else {
            QinSkin.styleAsBase(option);
            this.qinedHTML.appendChild(option);
        }
        return this;
    }

    private getGroup(label: string): HTMLOptGroupElement {
        if (!label) {
            return null;
        }
        for (let group of this._elGroups) {
            if (group.label == label) {
                return group;
            }
        }
        let newGroup = document.createElement("optgroup");
        newGroup.label = label;
        QinSkin.styleAsBase(newGroup);
        this._elGroups.push(newGroup);
        this.qinedHTML.appendChild(newGroup);
        return newGroup;
    }
}

export type QinComboSet = {
    items?: QinComboItem[];
    selected?: string;
    readOnly?: boolean;
};

export type QinComboItem = {
    group?: string;
    title: string;
    value: string;
    selected?: boolean;
};
