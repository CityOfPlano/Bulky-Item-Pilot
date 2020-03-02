import {WizardStep} from "../../lib/controller/Wizard";
import StepLandingView from '../view/StepLandingView.html';

export class StepLanding implements WizardStep {

    render(): string {
        return StepLandingView;
    }

    focus(): void {

    }

    is_satisfied(): boolean {
        return false;
    }
}