import {Wizard} from "../controller/Wizard";

export interface WizardRenderer {
    render(wiz:Wizard):any;
    showModal(html:string):void;
    clearModal():void;
}