import { QinButton } from "../qin-button";
import { QinField } from "../qin-field";
import { QinLabel } from "../qin-label";
import { QinRow } from "../qin-row";
import { QinString } from "../qin-string";

export class UseParams extends QinRow {
    private _qinName = new QinField("Name", new QinString());
    private _qinGet = new QinButton({ label: new QinLabel("Get >") });
    private _qinValue = new QinField("Value", new QinString());

    public constructor() {
        super();
        this._qinName.install(this);
        this._qinGet.install(this);
        this._qinValue.install(this);
        this._qinGet.addActionMain((_) => {
            this.qinpel.talk.param
                .get(this._qinName.value, "default")
                .then((val) => (this._qinValue.value = val))
                .catch((err) => this.qinpel.jobbed.showError(err, "{qin_case}(ErrCode-000003)"));
        });
    }
}
