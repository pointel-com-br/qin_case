import { QinStyles } from "qin_soul";
import { QinBase } from "./qin-base";
import { QinButtonPick } from "./qin-button-pick";
import { QinColumn } from "./qin-column";
import { QinLabel } from "./qin-label";
import { QinLine } from "./qin-line";
import { QinPanel } from "./qin-panel";

export class QinTabs extends QinColumn {
    private _qinTabs = new QinLine();
    private _qinPanel = new QinPanel();

    private _tabs: QinTabRef[] = [];

    public constructor(options?: QinTabsSet, isQindred?: string) {
        super(null, (isQindred ? isQindred + "_" : "") + "tabs");
        this._qinTabs.install(this);
        this._qinPanel.install(this);
        this._qinTabs.styleAsMargin(0);
        this._qinTabs.styleAsPaddingLeft(5);
        this._qinPanel.styleAsMargin(0);
        this._qinPanel.styleAsBorder(1, QinStyles.ColorForeground);
        this._qinPanel.styleAsBorderRadius(3);
        this._qinPanel.styleAsPadding(5);
        this._qinPanel.styled({
            minWidth: "fit-content",
            minHeight: "fit-content",
        });
        if (options?.initial) {
            for (const tab of options?.initial) {
                this.addTab(tab);
            }
        }
    }

    public override styled(styles: Partial<CSSStyleDeclaration>): QinTabs {
        super.styled(styles);
        return this;
    }

    public get qinTabs(): QinLine {
        return this._qinTabs;
    }

    public get qinPanel(): QinPanel {
        return this._qinPanel;
    }

    public addTab(tab: QinTab) {
        const button = new QinButtonPick({ label: new QinLabel(tab.title) });
        button.styleAsMargin(0);
        button.styleAsMarginRight(1);
        button.styleAsBorderBottomRightRadius(0);
        button.styleAsBorderBottomLeftRadius(0);
        button.addActionMain((_) => this.showViewer(tab.viewer));
        button.install(this._qinTabs);
        let first = this._tabs.length == 0;
        let tabRef = {
            title: tab.title,
            viewer: tab.viewer,
            button,
        };
        this._tabs.push(tabRef);
        if (first) {
            this.showViewer(tab.viewer);
        }
    }

    public showTab(title: string) {
        for (const tab of this._tabs) {
            if (tab.title == title) {
                this.showViewer(tab.viewer);
                break;
            }
        }
    }

    public showViewer(viewer: QinBase) {
        this._qinPanel.unInstallChildren();
        viewer.install(this._qinPanel);
        for (const tab of this._tabs) {
            if (tab.viewer == viewer) {
                tab.button.pick();
            } else {
                tab.button.unPick();
            }
        }
    }
}

export type QinTabsSet = {
    initial?: QinTab[];
};

export type QinTab = {
    title: string;
    viewer: QinBase;
};

type QinTabRef = {
    title: string;
    viewer: QinBase;
    button: QinButtonPick;
};
