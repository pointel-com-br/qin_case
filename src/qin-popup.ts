import { QinJobberPopup } from "qin_desk/types/qin-jobber-popup";
import { QinBounds } from "qin_soul";
import { QinBase } from "./qin-base";
import { QinPanel } from "./qin-panel";
import { QinTool } from "./qin-tool";

export class QinPopup {
  private _qinMain: QinJobberPopup;

  public constructor(contents: QinPanel) {
    this._qinMain = QinTool.qinpel.jobbed.newPopup(contents.castedQine());
  }

  public show() {
    this._qinMain.show();
  }

  public showOnParent(parent: QinBase) {
    this._qinMain.showOnParent(parent.qinedHTML);
  }

  public showOnBounds(bounds: QinBounds) {
    this._qinMain.showOnBounds(bounds);
  }

  public close() {
    this._qinMain.close();
  }
}
