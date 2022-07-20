import { QinSkin } from "qin_soul";
import { QinAsset } from "./qin-assets";

export class QinBaseStyle {
  private _el: HTMLElement;

  public constructor(element: HTMLElement) {
    this._el = element;
  }

  public putAsBody() {
    document.body.appendChild(this._el);
    QinSkin.styleAsBody(this._el);
  }

  public delAsBody() {
    document.body.removeChild(this._el);
  }

  public putAsWhole() {
    this.putAsPositionAbsolute();
    this.putAsBounds(0, 0, 0, 0);
  }

  public putAsBase() {
    QinSkin.styleAsBase(this._el);
  }

  private _styledAsEditableFocusEvent = null;
  private _styledAsEditableFocusoutEvent = null;
  private _styledAsReadOnlyFocusEvent = null;
  private _styledAsReadOnlyFocusoutEvent = null;

  public putAsEditable() {
    this.putAsBase();
    this._el.style.backgroundColor = QinSkin.styles.ColorInactive;
    this._el.style.border = "1px solid " + QinSkin.styles.ColorForeground;
    this._el.style.borderRadius = "3px";
    this._el.style.outline = "none";
    if (!this._styledAsEditableFocusEvent) {
      this._styledAsEditableFocusEvent = () => {
        this._el.style.backgroundColor = QinSkin.styles.ColorActive;
        this._el.style.border = "1px solid " + QinSkin.styles.ColorAccent;
      };
    }
    if (!this._styledAsEditableFocusoutEvent) {
      this._styledAsEditableFocusoutEvent = () => {
        this._el.style.backgroundColor = QinSkin.styles.ColorInactive;
        this._el.style.border = "1px solid " + QinSkin.styles.ColorForeground;
      };
    }
    if (this._styledAsReadOnlyFocusEvent) {
      this._el.removeEventListener("focus", this._styledAsReadOnlyFocusEvent);
    }
    if (this._styledAsReadOnlyFocusoutEvent) {
      this._el.removeEventListener("focusout", this._styledAsReadOnlyFocusoutEvent);
    }
    this._el.addEventListener("focus", this._styledAsEditableFocusEvent);
    this._el.addEventListener("focusout", this._styledAsEditableFocusoutEvent);
  }

  public putAsReadOnly() {
    this.putAsBase();
    this._el.style.backgroundColor = QinSkin.styles.ColorBlocked;
    this._el.style.border = "1px solid " + QinSkin.styles.ColorForeground;
    this._el.style.borderRadius = "3px";
    this._el.style.outline = "none";
    if (!this._styledAsReadOnlyFocusEvent) {
      this._styledAsReadOnlyFocusEvent = () => {
        this._el.style.backgroundColor = QinSkin.styles.ColorEntered;
        this._el.style.border = "1px solid " + QinSkin.styles.ColorAttend;
      };
    }
    if (!this._styledAsReadOnlyFocusoutEvent) {
      this._styledAsReadOnlyFocusoutEvent = () => {
        this._el.style.backgroundColor = QinSkin.styles.ColorBlocked;
        this._el.style.border = "1px solid " + QinSkin.styles.ColorForeground;
      };
    }
    if (this._styledAsEditableFocusEvent) {
      this._el.removeEventListener("focus", this._styledAsEditableFocusEvent);
    }
    if (this._styledAsEditableFocusoutEvent) {
      this._el.removeEventListener("focusout", this._styledAsEditableFocusoutEvent);
    }
    this._el.addEventListener("focus", this._styledAsReadOnlyFocusEvent);
    this._el.addEventListener("focusout", this._styledAsReadOnlyFocusoutEvent);
  }

  public putAsScroll() {
    this._el.style.overflow = "auto";
  }

  public putAsMargin(margin?: number) {
    this._el.style.margin = this.getPixelsOrInitial(margin);
  }

  public putAsMarginTop(margin?: number) {
    this._el.style.marginTop = this.getPixelsOrInitial(margin);
  }

  public putAsMarginBottom(margin?: number) {
    this._el.style.marginBottom = this.getPixelsOrInitial(margin);
  }

  public putAsMarginLeft(margin?: number) {
    this._el.style.marginLeft = this.getPixelsOrInitial(margin);
  }

  public putAsMarginRight(margin?: number) {
    this._el.style.marginRight = this.getPixelsOrInitial(margin);
  }

  public putAsPadding(padding?: number) {
    this._el.style.padding = this.getPixelsOrInitial(padding);
  }

  public putAsPaddingTop(padding?: number) {
    this._el.style.paddingTop = this.getPixelsOrInitial(padding);
  }

  public putAsPaddingBottom(padding?: number) {
    this._el.style.paddingBottom = this.getPixelsOrInitial(padding);
  }

  public putAsPaddingLeft(padding?: number) {
    this._el.style.paddingLeft = this.getPixelsOrInitial(padding);
  }

  public putAsPaddingRight(padding?: number) {
    this._el.style.paddingRight = this.getPixelsOrInitial(padding);
  }

  public putAsBorder(
    thick: number,
    color: string = QinSkin.styles.ColorForeground,
    style: string = "solid"
  ) {
    if (thick) {
      this._el.style.border = thick + "px " + style + " " + color;
    } else {
      this._el.style.border = "none";
    }
  }

  public putAsBorderTop(
    thick: number,
    color: string = QinSkin.styles.ColorForeground,
    style: string = "solid"
  ) {
    if (thick) {
      this._el.style.borderTop = thick + "px " + style + " " + color;
    } else {
      this._el.style.borderTop = "none";
    }
  }

  public putAsBorderBottom(
    thick: number,
    color: string = QinSkin.styles.ColorForeground,
    style: string = "solid"
  ) {
    if (thick) {
      this._el.style.borderBottom = thick + "px " + style + " " + color;
    } else {
      this._el.style.borderBottom = "none";
    }
  }

  public putAsBorderLeft(
    thick: number,
    color: string = QinSkin.styles.ColorForeground,
    style: string = "solid"
  ) {
    if (thick) {
      this._el.style.borderLeft = thick + "px " + style + " " + color;
    } else {
      this._el.style.borderLeft = "none";
    }
  }

  public putAsBorderRight(
    thick: number,
    color: string = QinSkin.styles.ColorForeground,
    style: string = "solid"
  ) {
    if (thick) {
      this._el.style.borderRight = thick + "px " + style + " " + color;
    } else {
      this._el.style.borderRight = "none";
    }
  }

  public putAsBorderRadius(radius: number) {
    this._el.style.borderRadius = radius + "px";
  }

  public putAsBorderTopLeftRadius(radius: number) {
    this._el.style.borderTopLeftRadius = radius + "px";
  }

  public putAsBorderTopRightRadius(radius: number) {
    this._el.style.borderTopRightRadius = radius + "px";
  }

  public putAsBorderBottomRightRadius(radius: number) {
    this._el.style.borderBottomRightRadius = radius + "px";
  }

  public putAsBorderBottomLeftRadius(radius: number) {
    this._el.style.borderBottomLeftRadius = radius + "px";
  }

  public putAsDisplayFlex() {
    this._el.style.display = "flex";
  }

  public putAsDisplayInline() {
    this._el.style.display = "inline";
  }

  public putAsDisplayInlineBlock() {
    this._el.style.display = "inline-block";
  }

  public putAsPositionStatic() {
    this._el.style.position = "static";
  }

  public putAsPositionAbsolute() {
    this._el.style.position = "absolute";
  }

  public putAsPositionFixed() {
    this._el.style.position = "fixed";
  }

  public putAsPositionRelative() {
    this._el.style.position = "relative";
  }

  public putAsPositionSthicky() {
    this._el.style.position = "sthicky";
  }

  public putAsPositionInitial() {
    this._el.style.position = "initial";
  }

  public putAsFlexDirectionRow() {
    this._el.style.flexDirection = "row";
  }

  public putAsFlexDirectionRowReverse() {
    this._el.style.flexDirection = "row-reverse";
  }

  public putAsFlexDirectionColumn() {
    this._el.style.flexDirection = "column";
  }

  public putAsFlexDirectionColumnReverse() {
    this._el.style.flexDirection = "column-reverse";
  }

  public putAsFlexWrap() {
    this._el.style.flexWrap = "wrap";
  }

  public putAsFlexWrapNot() {
    this._el.style.flexWrap = "nowrap";
  }

  public putAsFlexWrapReverse() {
    this._el.style.flexWrap = "wrap-reverse";
  }

  public putAsFlexMin() {
    this._el.style.flex = "none";
  }

  public putAsFlexMax() {
    this._el.style.flex = "auto";
  }

  public putAsAllCentered() {
    this._el.style.textAlign = "center";
    this._el.style.alignItems = "center";
    this._el.style.alignContent = "center";
    this._el.style.verticalAlign = "middle";
  }

  public putAsJustifyContentFlexStart() {
    this._el.style.alignItems = "flex-start";
  }

  public putAsJustifyContentFlexEnd() {
    this._el.style.alignItems = "flex-end";
  }

  public putAsJustifyContentCenter() {
    this._el.style.alignItems = "center";
  }

  public putAsJustifyContentSpaceBetween() {
    this._el.style.alignItems = "space-between";
  }

  public putAsJustifyContentSpaceAround() {
    this._el.style.alignItems = "space-around";
  }

  public putAsJustifyContentSpaceEvenly() {
    this._el.style.alignItems = "space-evenly";
  }

  public putAsJustifyContentInitial() {
    this._el.style.alignItems = "initial";
  }

  public putAsJustifyContentInherit() {
    this._el.style.alignItems = "inherit";
  }

  public putAsAlignItemsStretch() {
    this._el.style.alignItems = "stretch";
  }

  public putAsAlignItemsCenter() {
    this._el.style.alignItems = "center";
  }

  public putAsAlignItemsFlexStart() {
    this._el.style.alignItems = "flex-start";
  }

  public putAsAlignItemsFlexEnd() {
    this._el.style.alignItems = "flex-end";
  }

  public putAsAlignItemsBaseline() {
    this._el.style.alignItems = "baseline";
  }

  public putAsAlignItemsInitial() {
    this._el.style.alignItems = "initial";
  }

  public putAsAlignItemsInherit() {
    this._el.style.alignItems = "inherit";
  }

  public putAsBounds(top: number, right: number, bottom: number, left: number) {
    this._el.style.top = this.getPixelsOrInitial(top);
    this._el.style.right = this.getPixelsOrInitial(right);
    this._el.style.bottom = this.getPixelsOrInitial(bottom);
    this._el.style.left = this.getPixelsOrInitial(left);
  }

  public putAsWidth(width: number) {
    this._el.style.width = this.getPixelsOrInitial(width);
  }

  public putAsHeight(height: number) {
    this._el.style.height = this.getPixelsOrInitial(height);
  }

  public putAsSize(width: number, height: number) {
    this._el.style.width = this.getPixelsOrInitial(width);
    this._el.style.height = this.getPixelsOrInitial(height);
  }

  public putAsMinWidth(width: number) {
    this._el.style.minWidth = this.getPixelsOrInitial(width);
  }

  public putAsMinHeight(height: number) {
    this._el.style.minHeight = this.getPixelsOrInitial(height);
  }

  public putAsMinSize(width: number, height: number) {
    this._el.style.minWidth = this.getPixelsOrInitial(width);
    this._el.style.minHeight = this.getPixelsOrInitial(height);
  }

  public putAsMaxWidth(width: number) {
    this._el.style.maxWidth = this.getPixelsOrInitial(width);
  }

  public putAsMaxHeight(height: number) {
    this._el.style.maxHeight = this.getPixelsOrInitial(height);
  }

  public putAsMaxSize(width: number, height: number) {
    this._el.style.maxWidth = this.getPixelsOrInitial(width);
    this._el.style.maxHeight = this.getPixelsOrInitial(height);
  }

  public putAsForeground(foreground: string) {
    this._el.style.color = foreground;
  }

  public putAsBackground(background: string) {
    this._el.style.background = background;
  }

  public putAsBackAsset(asset: QinAsset) {
    this._el.style.backgroundImage = "url('/app/qinpel-app/assets/" + asset + "')";
  }

  public putAsBackInitial() {
    this._el.style.backgroundImage = "initial";
  }

  public putAsZIndex(index: number) {
    if (index == null || index == undefined) {
      this._el.style.zIndex = "initial";
    } else {
      this._el.style.zIndex = index.toString();
    }
  }

  public putAsDisabledSelection() {
    QinSkin.disableSelection(this._el);
  }

  private getPixelsOrInitial(value: number): string {
    if (value == null || value == undefined) {
      return "initial";
    }
    return value + "px";
  }
}
