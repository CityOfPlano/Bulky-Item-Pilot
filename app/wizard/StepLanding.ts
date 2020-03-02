import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepLandingView from '../view/StepLandingView.html';

export class StepLanding implements WizardStep {

    has_landed = false;

    render(wizard:Wizard): string {
        return StepLandingView;
    }

    focus(wizard:Wizard): void {
        let landing_button_start = document.getElementById('landing_button_start');
        landing_button_start.onclick = function(){
            wizard.nextStep();
        }
    }

    is_satisfied(): boolean {
        return this.has_landed;
    }
}