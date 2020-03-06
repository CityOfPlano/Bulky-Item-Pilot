import {WizardStep} from "../../lib/controller/Wizard";
import StepLoadingView from '../view/StepLoadingView.html';

export class StepLoading implements WizardStep {

    public has_loaded = false;

    render(): string {
        return StepLoadingView;
    }

    focus(): void {

    }

    is_satisfied(): boolean {
        return this.has_loaded;
    }

}