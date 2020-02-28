import {WizardStep} from "../controller/Wizard";

export class StepLoading implements WizardStep {
    render():string {
        return "Loading";
    }
    focus():void{

    }
    is_satisfied(): boolean {
        return false;
    }
}