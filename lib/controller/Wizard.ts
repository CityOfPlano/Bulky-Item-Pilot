export class Wizard {

    public steps: Array<WizardStep>;

    constructor() {
        this.steps = [];
    }

    render(element: HTMLElement){
        element.innerHTML = this.getStep().step.render();
    }

    addStep(wizard_step: WizardStep) {
        this.steps.push(wizard_step)
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
        return (!!s ? {
            step: s,
            index: i
        } : null);
    }

    getStepFromIndex(index:number){
        return (!!this.steps[index] ? {
            step: this.steps[index],
            index: index
        } : null)
    }

}

export interface WizardStep {
    render(): string;
    focus(): void;
    is_satisfied(): boolean;
}

export interface WizardStepIndex {
    step: WizardStep;
    index: number;
}