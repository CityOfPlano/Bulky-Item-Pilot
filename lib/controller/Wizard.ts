import {WizardRenderer} from "../interface/WizardRenderer";
import {ClientWizardState} from "../WizardState";

export class Wizard {

    public steps: Array<WizardStep>;
    public current_index: number;
    public render_target: HTMLElement;
    public wizard_renderer: WizardRenderer;
    private wizard_state: ClientWizardState;

    constructor(target?: HTMLElement, wizardRenderer?: WizardRenderer) {
        this.steps = [];
        this.current_index = 0;
        this.render_target = target;
        this.wizard_renderer = wizardRenderer;
        this.wizard_state = null;
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
        console.log("goTo Previous");
        this.current_index--;
        this.render();
    }

    getStep(): WizardStepIndex | null {
        let self = this;
        let _step = null;
        let _index = 0;
        this.steps.forEach(function (step: WizardStep) {
            if (!step.is_satisfied(self) && !_step) {
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

    useState(state: ClientWizardState) {
        this.wizard_state = state;
    }

    getState() {
        return this.wizard_state;
    }

    getRenderer():WizardRenderer|null{
        return this.wizard_renderer;
    }

}

export interface WizardStep {
    render(wizard: Wizard): string;

    focus(wizard: Wizard): void;

    is_satisfied(wizard: Wizard): boolean;
}

export interface WizardStepIndex {
    step: WizardStep;
    index: number;
}