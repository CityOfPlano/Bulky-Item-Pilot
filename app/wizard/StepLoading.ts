import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepLoadingView from '../view/wizard/StepLoadingView.html';

export class StepLoading implements WizardStep {
    name = "Loading";
    public has_loaded = false;

    render(): string {
        return StepLoadingView;
    }

    focus(): void {

    }

    is_satisfied(wizard: Wizard): boolean {
        return this.has_loaded;
    }

}