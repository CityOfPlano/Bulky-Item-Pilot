import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerInformationView from '../view/StepCustomerInformationView.html';

export class StepCustomerInformation implements WizardStep {

    render(wizard: Wizard): string {
        return StepCustomerInformationView;
    }

    focus(wizard: Wizard): void {
        let landing_button_start = document.getElementById('landing_button_start');
        landing_button_start.onclick = function () {
        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return false;
    }

}