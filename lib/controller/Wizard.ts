import {WizardRenderer} from "../interface/WizardRenderer";

export class Wizard {

    public steps: Array<WizardStep>;
    public current_index: number;
    public render_target:HTMLElement;
    public wizard_renderer:WizardRenderer;

    constructor(target? : HTMLElement, wizardRenderer?: WizardRenderer) {
        this.steps = [];
        this.current_index = 0;
        this.render_target = target;
        this.wizard_renderer = wizardRenderer;
    }

    render() {
        if (this.wizard_renderer){
            this.wizard_renderer.render(this);
        }
    }

    addStep(wizard_step: WizardStep) {
        this.steps.push(wizard_step);
    }

    nextStep(){
        this.current_index++;
        this.current_index = Math.min(this.current_index, this.steps.length);
        this.render();
    }

    getStep(): WizardStepIndex | null {
        let s = null;
        let i = 0;
        this.steps.forEach(function (step: WizardStep) {
            if (!step.is_satisfied() && !s) {
                s = step;
                return;
            }
            i++;
        });
        this.current_index = i;
        return (!!s ? {
            step: s,
            index: i
        } : null);
    }

    getStepFromIndex(index: number) {
        return (!!this.steps[index] ? {
            step: this.steps[index],
            index: index
        } : null)
    }

}

export interface WizardStep {
    render(wizard: Wizard): string;

    focus(wizard: Wizard): void;

    is_satisfied(): boolean;
}

export interface WizardStepIndex {
    step: WizardStep;
    index: number;
}