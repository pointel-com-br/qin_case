import { QinAction } from "qin_soul";
import { QinButton } from "../qin-button";
import { QinColumn } from "../qin-column";
import { QinLabel } from "../qin-label";
import { QinLine } from "../qin-line";
import { QinString } from "../qin-string";
import { QinText } from "../qin-text";

export class UseGiz extends QinColumn {
    private _qinListAct = new QinButton({ label: new QinLabel("List") });
    private _qinListText = new QinText();
    private _qinListLine = new QinLine({
        items: [this._qinListAct, this._qinListText],
    });

    private _qinRunPath = new QinString();
    private _qinRunAct = new QinButton({ label: new QinLabel("Run") });
    private _qinRunOut = new QinText();
    private _qinRunLine = new QinLine({
        items: [this._qinRunPath, this._qinRunAct, this._qinRunOut],
    });

    public constructor() {
        super();
        this._qinListAct.addActionMain(this._qinListActMain);
        this._qinListLine.install(this);
        this._qinRunAct.addActionMain(this._qinRunActMain);
        this._qinRunLine.install(this);
    }

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

    private _qinRunActMain: QinAction = (_) => {
        this.qinpel.talk.giz
            .run({ exec: "test.giz" })
            .then((res) => {
                this.qinpel.talk.issued
                    .askWhenDone({
                        token: res,
                        askOutLines: true,
                    })
                    .then((res) => (this._qinRunOut.value = res.outLines))
                    .catch((err) =>
                        this.qinpel.jobbed.showError(err, "{qin_case}(ErrCode-000006)")
                    );
            })
            .catch((err) => this.qinpel.jobbed.showError(err, "{qin_case}(ErrCode-000005)"));
    };
}
