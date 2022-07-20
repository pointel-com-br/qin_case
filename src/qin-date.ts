import { QinNature } from "qin_soul";
import { QinEdit } from "./qin-edit";

export class QinDate extends QinEdit<string> {
  public constructor(options?: QinDateSet, isQindred?: string) {
    super((isQindred ? isQindred + "_" : "") + "date", document.createElement("input"));
    this.castedQine().type = "date";
    this.style.putAsEditable();
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

  public override styled(styles: Partial<CSSStyleDeclaration>): QinDate {
    super.styled(styles);
    return this;
  }

  public override getNature(): QinNature {
    return QinNature.DATE;
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
    this.castedQine().readOnly = true;
    this.style.putAsReadOnly();
  }

  public override turnEditable(): void {
    this.castedQine().readOnly = false;
    this.style.putAsEditable();
  }

  public override isEditable(): boolean {
    return !this.castedQine().readOnly;
  }
}

export type QinDateSet = {
  initial?: string;
  readOnly?: boolean;
};
