import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepLandingView from '../view/wizard/StepLandingView.html';

export class StepLanding implements WizardStep {

    has_landed = false;
    name = "Start";
    render(wizard:Wizard): string {
        return StepLandingView;
    }

    focus(wizard:Wizard): void {
        let self = this;
        let landing_button_start = document.getElementById('landing_button_start');
        landing_button_start.onclick = function(){
            self.has_landed = true;
            wizard.nextStep();
        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return this.has_landed;
    }

}