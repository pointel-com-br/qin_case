import { QinNature, QinWaiter } from "qin_soul";
import { QinColumn } from "./qin-column";
import { QinEdit } from "./qin-edit";
import { QinLabel } from "./qin-label";

export class QinField<T> extends QinColumn {
  private _qinLabel = new QinLabel();
  private _qinEdit: QinEdit<T>;

  public constructor(title: string, edit: QinEdit<T>, isQindred?: string) {
    super(null, (isQindred ? isQindred + "_" : "") + edit.qindred + "_field");
    this._qinLabel.title = title;
    this._qinLabel.install(this);
    this._qinEdit = edit;
    this._qinEdit.install(this);
    this._qinLabel.qinLink(this._qinEdit);
    this.style.putAsMargin(3);
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinField<T> {
    super.styled(styles);
    return this;
  }

  public get label(): QinLabel {
    return this._qinLabel;
  }

  public get edit(): QinEdit<T> {
    return this._qinEdit;
  }

  public getNature(): QinNature {
    return this._qinEdit.getNature();
  }

  public get value(): T {
    return this._qinEdit.value;
  }

  public set value(data: T) {
    this._qinEdit.value = data;
  }

  public turnReadOnly(): void {
    this._qinEdit.turnReadOnly();
  }

  public turnEditable(): void {
    this._qinEdit.turnEditable();
  }

  public isEditable(): boolean {
    return this._qinEdit.isEditable();
  }

  public addOnChanged(waiter: QinWaiter) {
    this._qinEdit.addOnChanged(waiter);
  }

  public focus() {
    this._qinEdit.focus();
  }
}
