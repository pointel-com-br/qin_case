import { Qinpel } from "qin_desk/types/qinpel";
const refQinpel = (window.frameElement as any).qinpel as Qinpel;

export const QinTool = {
  qinpel: refQinpel,
};
