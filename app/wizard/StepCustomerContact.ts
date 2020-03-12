import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerContactView from '../view/StepCustomerContactView.html';
import {StringTemplate} from "../../lib/StringTemplate";
import {ClientWizardState} from "../../lib/WizardState";
import {AddValidationClass, ClearValidationClass, ValidateNumberField} from "../../lib/util/ValidateField";

export class StepCustomerContact implements WizardStep {

    render(wizard: Wizard): string {
        return new StringTemplate(StepCustomerContactView).apply(wizard.getState());
    }

    focus(wizard: Wizard): void {
        let self = this;

        let contact_input_name = <HTMLInputElement>document.getElementById("contact_input_name");
        let contact_input_phone = <HTMLInputElement>document.getElementById("contact_input_phone");
        let contact_button_next = <HTMLButtonElement>document.getElementById("contact_button_next");

        if (wizard.getState()) {
            contact_input_name.value = (wizard.getState().CustomerContactName || "").toString();
            contact_input_phone.value = (wizard.getState().CustomerContactPhone || "").toString();

            contact_input_name.onkeyup = function () {
                ClearValidationClass(contact_input_name);
                wizard.getState().CustomerContactName = contact_input_name.value;
                self.update(wizard.getState());
            };
            contact_input_phone.onkeyup = function () {
                ClearValidationClass(contact_input_phone);
                wizard.getState().CustomerContactPhone = contact_input_phone.value;
                self.update(wizard.getState());
            };


        }

        contact_button_next.onclick = function () {
            wizard.nextStep();
        };
        self.update(wizard.getState());

    }

    update(state: ClientWizardState) {
        let contact_input_name = <HTMLInputElement>document.getElementById("contact_input_name");
        let contact_input_phone = <HTMLInputElement>document.getElementById("contact_input_phone");
        let contact_button_next = <HTMLButtonElement>document.getElementById("contact_button_next");
        let contact_button_tip = document.getElementById("contact_button_tip");

        if (state.CustomerContactName.length <= 2 || state.CustomerContactName == "") {
            contact_button_next.disabled = true;
            contact_button_tip.style.display = "inline-block";
        } else if (state.CustomerContactPhone.length <= 2 || state.CustomerContactPhone == "") {
            contact_button_next.disabled = true;
            contact_button_tip.style.display = "inline-block";
        } else {
            contact_button_next.disabled = false;
            contact_button_tip.style.display = "none";
        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return false;
    }

}