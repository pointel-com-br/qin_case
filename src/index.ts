import { QinTabs } from "./qin-tabs";

import { UseGiz } from "./uses/use-giz";
import { UseParams } from "./uses/use-params";
import { UseTests } from "./uses/use-tests";

class QinCase extends QinTabs {
    public constructor() {
        super();
        this.addTab({
            title: "Giz",
            viewer: new UseGiz(),
        });
        this.addTab({
            title: "Params",
            viewer: new UseParams(),
        });
        this.addTab({
            title: "Tests",
            viewer: new UseTests(),
        });
    }
}

new QinCase().putAsBody();
