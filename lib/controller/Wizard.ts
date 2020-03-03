import {WizardRenderer} from "../interface/WizardRenderer";

export class Wizard {

    public steps: Array<WizardStep>;
    public current_index: number;
    public render_target: HTMLElement;
    public wizard_renderer: WizardRenderer;

    constructor(target?: HTMLElement, wizardRenderer?: WizardRenderer) {
        this.steps = [];
        this.current_index = 0;
        this.render_target = target;
        this.wizard_renderer = wizardRenderer;
    }

    render() {
        if (this.wizard_renderer) {
            this.wizard_renderer.render(this);
        }
    }

    addStep(wizard_step: WizardStep) {
        this.steps.push(wizard_step);
    }

    nextStep() {
        this.current_index++;
        this.current_index = Math.min(this.current_index, this.steps.length);
        this.render();
    }

    prevStep() {
        this.current_index--;
        this.render();
    }

    getStep(): WizardStepIndex | null {
        let _step = null;
        let _index = 0;
        this.steps.forEach(function (step: WizardStep) {
            if (!step.is_satisfied() && !_step) {
                _step = step;
                return;
            }
            _index++;
        });
        this.current_index = _index;
        return (!!_step ? {
            step: _step,
            index: _index
        } : null);
    }

    getStepFromIndex(index: number): WizardStepIndex | null {
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