import { QinSkin } from "qin_soul";
import { QinAsset } from "./qin-assets";
import { QinIcon } from "./qin-icon";
import { QinPanel } from "./qin-panel";

export class QinIconCell extends QinPanel {
  private _qinIcon: QinIcon;
  private _selected = false;

  public constructor(icon: QinIcon, isQindred?: string) {
    super(null, (isQindred ? isQindred + "_" : "") + "icon-cell");
    let border = Math.round(icon.size.width / 10);
    let padding = border * 2;
    this.styleAsBorderRadius(border);
    this.styleAsPadding(padding);
    this._qinIcon = icon;
    this._qinIcon.install(this);
  }

  public override styled(styles: Partial<CSSStyleDeclaration>): QinIconCell {
    super.styled(styles);
    return this;
  }

  public get qinIcon(): QinIcon {
    return this._qinIcon;
  }

  public get selected(): boolean {
    return this._selected;
  }

  public set selected(value: boolean) {
    this._selected = value;
    if (this._selected) {
      this.qinedHTML.style.backgroundColor = QinSkin.styles.ColorSelected;
    } else {
      this.qinedHTML.style.backgroundColor = "initial";
    }
  }

  public get asset(): QinAsset {
    return this._qinIcon.asset;
  }
}
