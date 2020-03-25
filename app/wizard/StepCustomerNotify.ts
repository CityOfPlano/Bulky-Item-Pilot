import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerNotifyView from '../view/wizard/StepCustomerNotifyView.html';
import {StringTemplate} from "../../lib/StringTemplate";
import {ClientWizardState} from "../../lib/WizardState";
import {AddValidationClass, ClearValidationClass, ValidateNumberField} from "../../lib/util/ValidateField";

export class StepCustomerNotify implements WizardStep {
    name = "Notification";
    has_viewed = false;
    render(wizard: Wizard): string {
        return new StringTemplate(StepCustomerNotifyView).apply(wizard.getState());
    }

    focus(wizard: Wizard): void {
        let self = this;

        let notify_select_email = <HTMLInputElement>document.getElementById("notify_select_email");
        let notify_input_email = <HTMLInputElement>document.getElementById("notify_input_email");
        notify_input_email.disabled = !wizard.getState().CustomerNotifyByEmail;

        let notify_select_phone = <HTMLInputElement>document.getElementById("notify_select_phone");
        let notify_input_phone = <HTMLInputElement>document.getElementById("notify_input_phone");
        notify_input_phone.disabled = !wizard.getState().CustomerNotifyByPhone;

        let notify_button_next = <HTMLButtonElement>document.getElementById("notify_button_next");

        if (wizard.getState()) {
            notify_select_email.checked = wizard.getState().CustomerNotifyByEmail;
            notify_select_phone.checked = wizard.getState().CustomerNotifyByPhone;

            notify_input_email.value = (wizard.getState().CustomerNotifyEmail || "").toString();
            notify_input_phone.value = (wizard.getState().CustomerNotifyPhone || "").toString();

            notify_select_email.onclick = function(){
                wizard.getState().CustomerNotifyByEmail = !!notify_select_email.checked;
                self.update(wizard.getState());
                if (wizard.getState().CustomerNotifyByEmail) {
                    notify_input_email.focus();
                }
            };

            notify_select_phone.onclick = function(){
                wizard.getState().CustomerNotifyByPhone = !!notify_select_phone.checked;
                self.update(wizard.getState());
                if (wizard.getState().CustomerNotifyByPhone) {
                    notify_input_phone.focus();
                }
            };

            notify_input_email.onkeyup = function () {
                ClearValidationClass(notify_input_email);
                wizard.getState().CustomerNotifyEmail = notify_input_email.value;
                self.update(wizard.getState());
            };

            notify_input_phone.onkeyup = function () {
                ClearValidationClass(notify_input_phone);
                wizard.getState().CustomerNotifyPhone = notify_input_phone.value;
                self.update(wizard.getState());
            };


        }

        notify_button_next.onclick = function () {
            self.has_viewed = true;
            wizard.nextStep();
        };
        self.update(wizard.getState());

    }

    update(state: ClientWizardState) {
        let notify_input_email = <HTMLInputElement>document.getElementById("notify_input_email");
        let notify_input_phone = <HTMLInputElement>document.getElementById("notify_input_phone");
        let notify_button_next = <HTMLButtonElement>document.getElementById("notify_button_next");
        let notify_button_tip = document.getElementById("notify_button_tip");

        notify_input_email.disabled = !state.CustomerNotifyByEmail;
        notify_input_phone.disabled = !state.CustomerNotifyByPhone;

        if (state.CustomerNotifyByEmail && (state.CustomerNotifyEmail.length <= 2 || state.CustomerNotifyEmail == "")) {
            notify_button_next.disabled = true;
            notify_button_tip.style.display = "inline-block";
        } else if (state.CustomerNotifyByPhone && (state.CustomerNotifyPhone.length <= 2 || state.CustomerNotifyPhone == "")) {
            notify_button_next.disabled = true;
            notify_button_tip.style.display = "inline-block";
        } else {
            notify_button_next.disabled = false;
            notify_button_tip.style.display = "none";
        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return this.has_viewed;
    }

}