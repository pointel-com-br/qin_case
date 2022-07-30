import { QinNature, QinSkin } from "qin_soul";
import { QinEdit } from "./qin-edit";

export class QinNumeric extends QinEdit<number> {
  public constructor(options?: QinNumericSet, isQindred?: string) {
    super((isQindred ? isQindred + "_" : "") + "numeric", document.createElement("input"));
    this.castedQine().type = "number";
    QinSkin.styleAsEditable(this.qinedHTML);
    this.qinedHTML.style.width = "120px";
    this.qinedHTML.addEventListener("focusout", () => {
      this.setData(this.getData());
    });
    if (options?.initial) {
      this.setData(options.initial);
    }
    if (options?.readOnly) {
      this.turnReadOnly();
    }
    this.prepareEdit();
  }

  public override castedQine(): HTMLInputElement {
    return this.qinedHTML as HTMLInputElement;
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinNumeric {
    super.styled(styles);
    return this;
  }

  public override getNature(): QinNature {
    return QinNature.INT;
  }

  protected override getData(): number {
    const value = this.castedQine().value;
    if (value == null || value == undefined || value.length == 0) {
      return null;
    } else {
      return parseFloat(value);
    }
  }

  protected override setData(data: number) {
    if (data == null || data == undefined) {
      this.castedQine().value = "";
    } else {
      this.castedQine().value = data.toString();
    }
  }

  protected override mayChange(): HTMLElement[] {
    return [this.castedQine()];
  }

  public override turnReadOnly(): void {
    this.castedQine().readOnly = true;
    QinSkin.styleAsReadOnly(this.qinedHTML);
  }

  public override turnEditable(): void {
    this.castedQine().readOnly = false;
    QinSkin.styleAsEditable(this.qinedHTML);
  }

  public override isEditable(): boolean {
    return !this.castedQine().readOnly;
  }
}

export type QinNumericSet = {
  initial?: number;
  readOnly?: boolean;
};
