import { QinSkin } from "qin_soul";
import { QinAsset } from "./qin-assets";
import { QinBase } from "./qin-base";

export class QinBaseStyle {
    private _el: HTMLElement;

    public constructor(origin: HTMLElement | QinBase) {
        if (origin instanceof QinBase) {
            this._el = origin.qinedHTML;
        } else {
            this._el = origin;
        }
    }

    public putAsBody() {
        document.body.appendChild(this._el);
        QinSkin.styleAsBody(this._el);
    }

    public delAsBody() {
        document.body.removeChild(this._el);
    }

    public styleAsWhole() {
        this.styleAsPositionAbsolute();
        this.styleAsBounds(0, 0, 0, 0);
    }

    public styleAsBase() {
        QinSkin.styleAsBase(this._el);
    }

    private _styledAsEditableFocusEvent = null;
    private _styledAsEditableFocusoutEvent = null;
    private _styledAsReadOnlyFocusEvent = null;
    private _styledAsReadOnlyFocusoutEvent = null;

    public styleAsEditable() {
        this.styleAsBase();
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

    public styleAsReadOnly() {
        this.styleAsBase();
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

    public styleAsScroll() {
        this._el.style.overflow = "auto";
    }

    public styleAsMargin(margin?: number) {
        this._el.style.margin = this.getPixelsOrInitial(margin);
    }

    public styleAsMarginTop(margin?: number) {
        this._el.style.marginTop = this.getPixelsOrInitial(margin);
    }

    public styleAsMarginBottom(margin?: number) {
        this._el.style.marginBottom = this.getPixelsOrInitial(margin);
    }

    public styleAsMarginLeft(margin?: number) {
        this._el.style.marginLeft = this.getPixelsOrInitial(margin);
    }

    public styleAsMarginRight(margin?: number) {
        this._el.style.marginRight = this.getPixelsOrInitial(margin);
    }

    public styleAsPadding(padding?: number) {
        this._el.style.padding = this.getPixelsOrInitial(padding);
    }

    public styleAsPaddingTop(padding?: number) {
        this._el.style.paddingTop = this.getPixelsOrInitial(padding);
    }

    public styleAsPaddingBottom(padding?: number) {
        this._el.style.paddingBottom = this.getPixelsOrInitial(padding);
    }

    public styleAsPaddingLeft(padding?: number) {
        this._el.style.paddingLeft = this.getPixelsOrInitial(padding);
    }

    public styleAsPaddingRight(padding?: number) {
        this._el.style.paddingRight = this.getPixelsOrInitial(padding);
    }

    public styleAsBorder(
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

    public styleAsBorderTop(
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

    public styleAsBorderBottom(
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

    public styleAsBorderLeft(
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

    public styleAsBorderRight(
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

    public styleAsBorderRadius(radius: number) {
        this._el.style.borderRadius = radius + "px";
    }

    public styleAsBorderTopLeftRadius(radius: number) {
        this._el.style.borderTopLeftRadius = radius + "px";
    }

    public styleAsBorderTopRightRadius(radius: number) {
        this._el.style.borderTopRightRadius = radius + "px";
    }

    public styleAsBorderBottomRightRadius(radius: number) {
        this._el.style.borderBottomRightRadius = radius + "px";
    }

    public styleAsBorderBottomLeftRadius(radius: number) {
        this._el.style.borderBottomLeftRadius = radius + "px";
    }

    public styleAsDisplayFlex() {
        this._el.style.display = "flex";
    }

    public styleAsDisplayInline() {
        this._el.style.display = "inline";
    }

    public styleAsDisplayInlineBlock() {
        this._el.style.display = "inline-block";
    }

    public styleAsPositionStatic() {
        this._el.style.position = "static";
    }

    public styleAsPositionAbsolute() {
        this._el.style.position = "absolute";
    }

    public styleAsPositionFixed() {
        this._el.style.position = "fixed";
    }

    public styleAsPositionRelative() {
        this._el.style.position = "relative";
    }

    public styleAsPositionSthicky() {
        this._el.style.position = "sthicky";
    }

    public styleAsPositionInitial() {
        this._el.style.position = "initial";
    }

    public styleAsFlexDirectionRow() {
        this._el.style.flexDirection = "row";
    }

    public styleAsFlexDirectionRowReverse() {
        this._el.style.flexDirection = "row-reverse";
    }

    public styleAsFlexDirectionColumn() {
        this._el.style.flexDirection = "column";
    }

    public styleAsFlexDirectionColumnReverse() {
        this._el.style.flexDirection = "column-reverse";
    }

    public styleAsFlexWrap() {
        this._el.style.flexWrap = "wrap";
    }

    public styleAsFlexWrapNot() {
        this._el.style.flexWrap = "nowrap";
    }

    public styleAsFlexWrapReverse() {
        this._el.style.flexWrap = "wrap-reverse";
    }

    public styleAsFlexMin() {
        this._el.style.flex = "none";
    }

    public styleAsFlexMax() {
        this._el.style.flex = "auto";
    }

    public styleAsAllCentered() {
        this._el.style.textAlign = "center";
        this._el.style.alignItems = "center";
        this._el.style.alignContent = "center";
        this._el.style.verticalAlign = "middle";
    }

    public styleAsJustifyContentFlexStart() {
        this._el.style.alignItems = "flex-start";
    }

    public styleAsJustifyContentFlexEnd() {
        this._el.style.alignItems = "flex-end";
    }

    public styleAsJustifyContentCenter() {
        this._el.style.alignItems = "center";
    }

    public styleAsJustifyContentSpaceBetween() {
        this._el.style.alignItems = "space-between";
    }

    public styleAsJustifyContentSpaceAround() {
        this._el.style.alignItems = "space-around";
    }

    public styleAsJustifyContentSpaceEvenly() {
        this._el.style.alignItems = "space-evenly";
    }

    public styleAsJustifyContentInitial() {
        this._el.style.alignItems = "initial";
    }

    public styleAsJustifyContentInherit() {
        this._el.style.alignItems = "inherit";
    }

    public styleAsAlignItemsStretch() {
        this._el.style.alignItems = "stretch";
    }

    public styleAsAlignItemsCenter() {
        this._el.style.alignItems = "center";
    }

    public styleAsAlignItemsFlexStart() {
        this._el.style.alignItems = "flex-start";
    }

    public styleAsAlignItemsFlexEnd() {
        this._el.style.alignItems = "flex-end";
    }

    public styleAsAlignItemsBaseline() {
        this._el.style.alignItems = "baseline";
    }

    public styleAsAlignItemsInitial() {
        this._el.style.alignItems = "initial";
    }

    public styleAsAlignItemsInherit() {
        this._el.style.alignItems = "inherit";
    }

    public styleAsBounds(top: number, right: number, bottom: number, left: number) {
        this._el.style.top = this.getPixelsOrInitial(top);
        this._el.style.right = this.getPixelsOrInitial(right);
        this._el.style.bottom = this.getPixelsOrInitial(bottom);
        this._el.style.left = this.getPixelsOrInitial(left);
    }

    public styleAsWidth(width: number) {
        this._el.style.width = this.getPixelsOrInitial(width);
    }

    public styleAsHeight(height: number) {
        this._el.style.height = this.getPixelsOrInitial(height);
    }

    public styleAsSize(width: number, height: number) {
        this._el.style.width = this.getPixelsOrInitial(width);
        this._el.style.height = this.getPixelsOrInitial(height);
    }

    public styleAsMinWidth(width: number) {
        this._el.style.minWidth = this.getPixelsOrInitial(width);
    }

    public styleAsMinHeight(height: number) {
        this._el.style.minHeight = this.getPixelsOrInitial(height);
    }

    public styleAsMinSize(width: number, height: number) {
        this._el.style.minWidth = this.getPixelsOrInitial(width);
        this._el.style.minHeight = this.getPixelsOrInitial(height);
    }

    public styleAsMaxWidth(width: number) {
        this._el.style.maxWidth = this.getPixelsOrInitial(width);
    }

    public styleAsMaxHeight(height: number) {
        this._el.style.maxHeight = this.getPixelsOrInitial(height);
    }

    public styleAsMaxSize(width: number, height: number) {
        this._el.style.maxWidth = this.getPixelsOrInitial(width);
        this._el.style.maxHeight = this.getPixelsOrInitial(height);
    }

    public styleAsForeground(foreground: string) {
        this._el.style.color = foreground;
    }

    public styleAsBackground(background: string) {
        this._el.style.background = background;
    }

    public styleAsBackAsset(asset: QinAsset) {
        this._el.style.backgroundImage = "url('/app/qinpel-app/assets/" + asset + "')";
    }

    public styleAsBackInitial() {
        this._el.style.backgroundImage = "initial";
    }

    public styleAsZIndex(index: number) {
        if (index == null || index == undefined) {
            this._el.style.zIndex = "initial";
        } else {
            this._el.style.zIndex = index.toString();
        }
    }

    public styleAsDisabledSelection() {
        QinSkin.disableSelection(this._el);
    }

    public styleAsWhiteSpaceNormal() {
        this._el.style.whiteSpace = "normal";
    }

    public styleAsWhiteSpaceNoWrap() {
        this._el.style.whiteSpace = "nowrap";
    }

    public styleAsWhiteSpacePre() {
        this._el.style.whiteSpace = "pre";
    }

    public styleAsWhiteSpacePreLine() {
        this._el.style.whiteSpace = "pre-line";
    }

    public styleAsWhiteSpacePreWrap() {
        this._el.style.whiteSpace = "pre-wrap";
    }

    public styleAsWhiteSpaceInitial() {
        this._el.style.whiteSpace = "initial";
    }

    public styleAsWhiteSpaceInherit() {
        this._el.style.whiteSpace = "inherit";
    }

    private getPixelsOrInitial(value: number): string {
        if (value == null || value == undefined) {
            return "initial";
        }
        return value + "px";
    }
}
