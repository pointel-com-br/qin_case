import { QinAction } from "qin_soul";
import { QinButton } from "../qin-button";
import { QinColumn } from "../qin-column";
import { QinLabel } from "../qin-label";
import { QinLine } from "../qin-line";
import { QinText } from "../qin-text";

export class UseGiz extends QinColumn {
  private _qinListAct = new QinButton({ label: new QinLabel("List") });
  private _qinListText = new QinText();
  private _qinListLine = new QinLine({
    items: [this._qinListAct, this._qinListText],
  });

  private _qinListActMain: QinAction = (_) => {
    this.qinpel.talk.giz
      .list()
      .then((res) => {
        for (let line of res) {
          this._qinListText.appendLine(line);
        }
      })
      .catch((err) => this.qinpel.jobbed.showError(err, "{qin_case}(ErrCode-000004)"));
  };

  public constructor() {
    super();
    this._qinListLine.install(this);
    this._qinListAct.addActionMain(this._qinListActMain);
  }
}
