export class Wizard {

    public steps:Array<WizardStep>;

    constructor() {
        this.steps = [];
    }

    addStep(wizard_step : WizardStep){
        this.steps.push(wizard_step)
    }

    getStep():WizardStep{
        let s = null;
        this.steps.forEach(function (step:WizardStep) {
            if (!step.is_satisfied() && !s){
                s = step;
            }
        });
        return s;
    }
}

export interface WizardStep {
    render():string;
    focus():void;
    is_satisfied():boolean;
}