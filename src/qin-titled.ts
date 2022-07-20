import { QinBase } from "./qin-base";
import { QinColumn } from "./qin-column";
import { QinLabel } from "./qin-label";
import { QinLine } from "./qin-line";

export class QinTitled extends QinColumn {
  private _qinTitle = new QinLabel();
  private _qinHead = new QinLine({ items: [this._qinTitle] });
  private _qinBody = new QinLine();

  public constructor(options?: QinTitledSet, isQindred?: string) {
    super(null, (isQindred ? isQindred + "_" : "") + "titled");
    if (options?.title) {
      this._qinTitle.title = options.title;
    }
    this._qinHead.install(this);
    this._qinBody.install(this);
    if (options?.items) {
      options.items.forEach((item) => item.install(this));
    }
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinTitled {
    super.styled(styles);
    return this;
  }

  public override put(item: QinBase): QinTitled {
    item.install(this);
    return this;
  }

  public override addChild(child: QinBase) {
    if (child === this._qinBody || child === this._qinHead) {
      super.addChild(child);
    } else {
      this._qinBody.addChild(child);
    }
  }

  public override delChild(child: QinBase) {
    if (child === this._qinBody || child === this._qinHead) {
      super.delChild(child);
    } else {
      this._qinBody.delChild(child);
    }
  }

  public get title(): string {
    return this._qinTitle.title;
  }

  public set title(title: string) {
    this._qinTitle.title = title;
  }
}

export type QinTitledSet = {
  title?: string;
  items?: QinBase[];
};
