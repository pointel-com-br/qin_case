import { QinDimension, QinGrandeur, QinSkin } from "qin_soul";
import { QinAsset, qinAssetUrl, qinUrlAsset } from "./qin-assets";
import { QinBase } from "./qin-base";

export class QinIcon extends QinBase {
    public constructor(
        asset: QinAsset,
        size: QinDimension | QinGrandeur = QinGrandeur.SMALL,
        isQindred?: string
    ) {
        super((isQindred ? isQindred + "_" : "") + "icon", document.createElement("img"));
        this.castedQine().src = qinAssetUrl(asset);
        QinSkin.styleSize(this.qinedHTML, size);
    }

    public override castedQine(): HTMLImageElement {
        return this.qinedHTML as HTMLImageElement;
    }

    public override styled(styles: Partial<CSSStyleDeclaration>): QinIcon {
        super.styled(styles);
        return this;
    }

    public get asset(): QinAsset {
        return qinUrlAsset(this.castedQine().src);
    }

    public set asset(asset: QinAsset) {
        this.castedQine().src = qinAssetUrl(asset);
    }

    public get size(): QinDimension {
        return QinSkin.getDimension(this.qinedHTML);
    }
}
