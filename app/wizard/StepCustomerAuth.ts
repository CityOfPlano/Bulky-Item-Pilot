import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerAuthView from '../view/StepCustomerAuthView.html';
import ModalLoadingView from '../view/ModalLoadingView.html';
import {ClientWizardState} from "../../lib/WizardState";
import {AddValidationClass, ClearValidationClass, ValidateNumberField} from "../../lib/util/ValidateField";
import {LambdaProvider} from "../../lib/LambdaProvider";
import {CustomerUtiligyAuth} from "../../lib/interface/CustomerUtiligyAuth";

export class StepCustomerAuth implements WizardStep {

    render(wizard: Wizard): string {
        return StepCustomerAuthView;
    }

    focus(wizard: Wizard): void {
        let self = this;
        let auth_input_account = <HTMLInputElement>document.getElementById("auth_input_account");
        let auth_input_address = <HTMLInputElement>document.getElementById("auth_input_address");
        let auth_button_next = <HTMLButtonElement>document.getElementById("auth_button_next");


        if (wizard.getState()) {
            auth_input_account.value = (wizard.getState().BillingAccountNumber || "").toString();
            auth_input_address.value = (wizard.getState().BillingAccountAddress || "").toString();

            auth_input_account.onkeyup = function () {
                ClearValidationClass(auth_input_account);
                wizard.getState().BillingAccountNumber = parseInt(auth_input_account.value);
                self.update(wizard.getState());
            };

            auth_input_address.onkeyup = function () {
                ClearValidationClass(auth_input_address);
                wizard.getState().BillingAccountAddress = auth_input_address.value.toUpperCase();
                self.update(wizard.getState());
            };

            auth_button_next.onclick = function () {
                wizard.getRenderer().showModal(ModalLoadingView);
                let provider = new LambdaProvider();

                let msg  = Object.assign({route:"UtilityAuth"}, wizard.getState());

                provider.postPayload(msg, function (data: CustomerUtiligyAuth) {
                    if (!data.BillingUtilityIsAuthenticated) {
                        AddValidationClass(auth_input_account, "warning");
                        AddValidationClass(auth_input_address, "warning");
                        wizard.getRenderer().clearModal();
                    } else {
                        wizard.nextStep();
                    }
                });

            };

            this.update(wizard.getState());
        }

    }

    update(w: ClientWizardState) {
        let auth_button_next = <HTMLButtonElement>document.getElementById("auth_button_next");
        let auth_button_tip = document.getElementById("auth_button_tip");

        if (ValidateNumberField(w.BillingAccountNumber).success && w.BillingAccountAddress && w.BillingAccountAddress.length >= 3) {
            auth_button_next.disabled = false;
            auth_button_tip.style.display = "none";
        } else {
            auth_button_next.disabled = true;
            auth_button_tip.style.display = "inline-block";
        }

    }

    is_satisfied(): boolean {
        return false;
    }

}