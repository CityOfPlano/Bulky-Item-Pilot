import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerInformationView from '../view/StepCustomerInformationView.html';
import {StringTemplate} from "../../lib/StringTemplate";

export class StepCustomerInformation implements WizardStep {

    render(wizard: Wizard): string {
        console.log(wizard.getState());
        return new StringTemplate(StepCustomerInformationView).apply(wizard.getState());
    }

    focus(wizard: Wizard): void {

    }

    is_satisfied(wizard: Wizard): boolean {
        return false;
    }

}