import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerInformationView from '../view/StepCustomerInformationView.html';

export class StepCustomerInformation implements WizardStep {

    render(wizard: Wizard): string {
        return StepCustomerInformationView;
    }

    focus(wizard: Wizard): void {

    }

    is_satisfied(wizard: Wizard): boolean {
        return false;
    }

}