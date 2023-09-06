import { QinBoolean } from "../qin-boolean";
import { QinButton } from "../qin-button";
import { QinColumn } from "../qin-column";
import { QinCombo } from "../qin-combo";
import { QinInteger } from "../qin-integer";
import { QinLabel } from "../qin-label";
import { QinLine } from "../qin-line";
import { QinString } from "../qin-string";

export class UseTests extends QinColumn {
    private _qinBoolean = new QinBoolean();
    private _qinActBoolean = new QinButton({ label: new QinLabel("Boolean") });
    private _qinCombo = new QinCombo({
        items: [
            { value: "01", title: "01" },
            { value: "02", title: "02" },
        ],
    });
    private _qinActCombo = new QinButton({ label: new QinLabel("Combo") });
    private _qinInteger = new QinInteger();
    private _qinActInteger = new QinButton({ label: new QinLabel("Integer") });
    private _qinString = new QinString();
    private _qinActString = new QinButton({ label: new QinLabel("String") });

    private _qinLine = new QinLine({
        items: [
            this._qinBoolean,
            this._qinActBoolean,
            this._qinCombo,
            this._qinActCombo,
            this._qinInteger,
            this._qinActInteger,
            this._qinString,
            this._qinActString,
        ],
    });

    public constructor() {
        super();
        this._qinLine.install(this);
        this._qinBoolean.addOnChanged((res) => {
            console.log("bol: " + res);
        });
        this._qinActBoolean.addActionMain((_) => {
            this._qinBoolean.value = true;
        });
        this._qinCombo.addOnChanged((res) => {
            console.log("com: " + res);
        });
        this._qinActCombo.addActionMain((_) => {
            this._qinCombo.value = "02";
        });
        this._qinInteger.addOnChanged((res) => {
            console.log("int: " + res);
        });
        this._qinActInteger.addActionMain((_) => {
            this._qinInteger.value = 12;
        });
        this._qinString.addOnChanged((res) => {
            console.log("str: " + res);
        });
        this._qinActString.addActionMain((_) => {
            this._qinString.value = "string";
        });
    }
}
