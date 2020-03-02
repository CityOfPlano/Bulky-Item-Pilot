import WizardControlsView from '../../app/view/WizardControlsView.html';

export class Wizard {

    public steps: Array<WizardStep>;
    public current_index: number;
    public render_target:HTMLElement;

    constructor(target : HTMLElement) {
        this.steps = [];
        this.current_index = 0;
        this.render_target = target;
    }

    render() {
        let self = this;
        self.render_target.innerHTML = WizardControlsView + this.getStepFromIndex(this.current_index).step.render(this);
        this.getStepFromIndex(this.current_index).step.focus(this);

        let wizard_button_back:HTMLFormElement = <HTMLFormElement>document.getElementById("wizard_button_back");
        if (this.current_index <= 1){
            wizard_button_back.disabled = true;
        }else {
            wizard_button_back.onclick = function () {
                self.current_index--;
                self.render();
            };
        }
        let wizard_button_reset = document.getElementById("wizard_button_reset");

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