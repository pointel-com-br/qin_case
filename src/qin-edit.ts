import { QinNature, QinWaiter, QinWaiters } from "qin_soul";
import { QinBase } from "./qin-base";

export abstract class QinEdit<T> extends QinBase {
  public constructor(qindred: string, qined: HTMLElement | QinBase) {
    super(qindred + "_" + "edit", qined);
  }

  public abstract getNature(): QinNature;

  protected abstract getData(): T;
  protected abstract setData(data: T): void;

  protected abstract mayChange(): HTMLElement[];

  protected prepareEdit() {
    for (let mayChange of this.mayChange()) {
      mayChange.addEventListener("change", () => {
        this.sendChanged();
      });
      mayChange.addEventListener("focusout", () => {
        this.sendExited();
      });
    }
  }

  public get value(): T {
    return this.getData();
  }

  public set value(data: T) {
    this.setData(data);
    this.sendChanged();
  }

  public abstract turnReadOnly(): void;
  public abstract turnEditable(): void;
  public abstract isEditable(): boolean;

  private _changedWaiters = new QinWaiters<T>();
  private _exitedWaiters = new QinWaiters<T>();

  protected sendChanged() {
    this._changedWaiters.sendWaiters(this.getData());
  }

  protected sendExited() {
    this._exitedWaiters.sendWaiters(this.getData());
  }

  public getChangeable(): HTMLElement[] {
    return this.mayChange();
  }

  public addOnChanged(waiter: QinWaiter<T>) {
    this._changedWaiters.addWaiter(waiter);
  }

  public addOnExited(waiter: QinWaiter<T>) {
    this._exitedWaiters.addWaiter(waiter);
  }
  
}
