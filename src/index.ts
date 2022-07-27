import { QinTabs } from "./qin-tabs";

import { GetParams } from "./tests/get-params";
import { SetValues } from "./tests/set-values";

class QinCase extends QinTabs {
  public constructor() {
    super();
    this.addTab({
      title: "GetParams",
      viewer: new GetParams(),
    });
    this.addTab({
      title: "SetValues",
      viewer: new SetValues(),
    });
  }
}

new QinCase().style.putAsBody();
