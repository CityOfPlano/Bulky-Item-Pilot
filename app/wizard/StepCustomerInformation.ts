import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerInformationView from '../view/StepCustomerInformationView.html';
import {StringTemplate} from "../../lib/StringTemplate";
import ModalLoadingView from "../view/ModalLoadingView.html";
import {LambdaProvider} from "../../lib/LambdaProvider";
import {ClientWizardState} from "../../lib/WizardState";
import {AddValidationClass} from "../../lib/util/ValidateField";

export class StepCustomerInformation implements WizardStep {

    render(wizard: Wizard): string {
        return new StringTemplate(StepCustomerInformationView).apply(wizard.getState());
    }

    focus(wizard: Wizard): void {
        let info_button_next = <HTMLButtonElement>document.getElementById("customer_button_information");

        info_button_next.onclick = function () {
            wizard.nextStep();
        };
    }

    is_satisfied(wizard: Wizard): boolean {
        return false;
    }

}