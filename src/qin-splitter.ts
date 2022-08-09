import { QinWaiter, QinWaiters } from "qin_soul";
import { QinBase } from "./qin-base";

export class QinSplitter extends QinBase {
  private _elSideA = document.createElement("div");
  private _elMover = document.createElement("div");
  private _elGrowA = document.createElement("div");
  private _elGrowB = document.createElement("div");
  private _elSideB = document.createElement("div");

  private _isHorizontal = true;

  private _qinSideA: QinBase = null;
  private _qinSideB: QinBase = null;

  private _changedWaiters = new QinWaiters<QinSplitterBalance>();

  public constructor(options?: QinSplitterSet, isQindred?: string) {
    super((isQindred ? isQindred + "_" : "") + "splitter", document.createElement("div"));
    this.qinedHTML.appendChild(this._elSideA);
    this.qinedHTML.appendChild(this._elMover);
    this._elMover.appendChild(this._elGrowA);
    this._elMover.appendChild(this._elGrowB);
    this.qinedHTML.appendChild(this._elSideB);
    this.qinedHTML.style.display = "flex";
    this.qinedHTML.style.flexWrap = "nowrap";
    this._elSideA.style.display = "flex";
    this._elSideA.style.flexWrap = "nowrap";
    this._elSideA.style.overflow = "auto";
    this._elMover.style.display = "flex";
    this._elMover.style.flexWrap = "nowrap";
    this._elMover.style.borderRadius = "12px";
    this._elMover.style.border = "1px solid rgba(255,250,239,0.1)";
    this._elMover.style.overflow = "hidden";
    this._elMover.style.flex = "0";
    this._elGrowA.style.flex = "1";
    this._elGrowB.style.flex = "1";
    this._elSideB.style.display = "flex";
    this._elSideB.style.flexWrap = "nowrap";
    this._elSideB.style.overflow = "auto";
    this._elGrowA.addEventListener("mousedown", (_) =>
      this.balance(this._elSideA, this._elSideB)
    );
    this._elGrowA.addEventListener("touchstart", (_) =>
      this.balance(this._elSideA, this._elSideB)
    );
    this._elGrowB.addEventListener("mousedown", (_) =>
      this.balance(this._elSideB, this._elSideA)
    );
    this._elGrowB.addEventListener("touchstart", (_) =>
      this.balance(this._elSideB, this._elSideA)
    );
    if (options) {
      if (options.sideA) {
        this.setSideA(options.sideA);
      }
      if (options.sideB) {
        this.setSideB(options.sideB);
      }
    }
    if (options?.horizontal) {
      this.setHorizontal();
    } else {
      this.setVertical();
    }
  }

  private balance(grow: HTMLDivElement, fall: HTMLDivElement) {
    let related = this._isHorizontal ? "width" : "height";
    let growAt = parseInt(grow.style[related]);
    let fallAt = parseInt(fall.style[related]);
    if (fallAt <= 10) {
      return;
    }
    grow.style[related] = growAt + 10 + "%";
    fall.style[related] = fallAt - 10 + "%";
    let sideA = parseInt(this._elSideA.style[related]);
    let sideB = parseInt(this._elSideB.style[related]);
    this._changedWaiters.sendWaiters({ sideA, sideB });
  }

  public override castedQine(): HTMLDivElement {
    return this.qinedHTML as HTMLDivElement;
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinSplitter {
    super.styled(styles);
    return this;
  }

  public override addChild(child: QinBase) {
    if (this._qinSideA === null) {
      this._qinSideA = child;
      this._elSideA.appendChild(child.qinedHTML);
    } else {
      if (this._qinSideB !== null) {
        this._qinSideB.unInstall();
        this._qinSideB = null;
      }
      this._qinSideB = child;
      this._elSideB.appendChild(child.qinedHTML);
    }
    this._baseChildren.push(child);
  }

  public override delChild(child: QinBase) {
    let index = this._baseChildren.indexOf(child);
    if (index > -1) {
      this._baseChildren.splice(index, 1);
    }
    if (this._qinSideA === child) {
      this._elSideA.removeChild(child.qinedHTML);
      this._qinSideA = null;
    } else if (this._qinSideB === child) {
      this._elSideB.removeChild(child.qinedHTML);
      this._qinSideB = null;
    }
  }

  public setHorizontal() {
    this.qinedHTML.style.flexDirection = "row";
    this._elMover.style.flexDirection = "row";
    this._elSideA.style.width = "50%";
    this._elSideA.style.height = "100%";
    this._elSideB.style.width = "50%";
    this._elSideB.style.height = "100%";
    this._elMover.style.minWidth = "24px";
    this._elMover.style.maxWidth = "24px";
    this._elMover.style.minHeight = "initial";
    this._elMover.style.maxHeight = "initial";
    this._elMover.style.width = "24px";
    this._elMover.style.height = "100%";
    this._elGrowA.style.background =
      "linear-gradient(90deg, rgba(255,250,239,0.1) 0%, rgba(255,250,239,0.1) 84%, rgba(24,0,39,0.8) 98%, rgba(24,0,39,0.8) 100%)";
    this._elGrowB.style.background =
      "linear-gradient(270deg, rgba(255,250,239,0.1) 0%, rgba(255,250,239,0.1) 84%, rgba(24,0,39,0.8) 98%, rgba(24,0,39,0.8) 100%)";
    this._isHorizontal = true;
  }

  public setVertical() {
    this.qinedHTML.style.flexDirection = "column";
    this._elMover.style.flexDirection = "column";
    this._elSideA.style.width = "100%";
    this._elSideA.style.height = "50%";
    this._elSideB.style.width = "100%";
    this._elSideB.style.height = "50%";
    this._elMover.style.minWidth = "initial";
    this._elMover.style.maxWidth = "initial";
    this._elMover.style.minHeight = "24px";
    this._elMover.style.maxHeight = "24px";
    this._elMover.style.width = "100%";
    this._elMover.style.height = "24px";
    this._elGrowA.style.background =
      "linear-gradient(180deg, rgba(255,250,239,0.1) 0%, rgba(255,250,239,0.1) 84%, rgba(24,0,39,0.8) 98%, rgba(24,0,39,0.8) 100%)";
    this._elGrowB.style.background =
      "linear-gradient(0deg, rgba(255,250,239,0.1) 0%, rgba(255,250,239,0.1) 84%, rgba(24,0,39,0.8) 98%, rgba(24,0,39,0.8) 100%)";
    this._isHorizontal = false;
  }

  public setSideA(side: QinBase) {
    if (this._qinSideA !== null) {
      this._qinSideA.unInstall();
      this._qinSideA = null;
    }
    this._qinSideA = side;
    this._elSideA.appendChild(side.qinedHTML);
  }

  public setSideB(side: QinBase) {
    if (this._qinSideB !== null) {
      this._qinSideB.unInstall();
      this._qinSideB = null;
    }
    this._qinSideB = side;
    this._elSideB.appendChild(side.qinedHTML);
  }

  public addOnChanged(waiter: QinWaiter<QinSplitterBalance>) {
    this._changedWaiters.addWaiter(waiter);
  }

  public setBalance(balance: QinSplitterBalance) {
    let related = this._isHorizontal ? "width" : "height";
    this._elSideA.style[related] = balance.sideA + "%";
    this._elSideB.style[related] = balance.sideB + "%";
  }
}

export type QinSplitterSet = {
  sideA?: QinBase;
  sideB?: QinBase;
  horizontal?: boolean;
};

export type QinSplitterBalance = {
  sideA: number;
  sideB: number;
};
