import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerSummaryView from '../view/wizard/StepCustomerSummaryView.html';
import WizardCompletedView from '../view/wizard/WizardCompletedView.html';
import {StringTemplate} from "../../lib/StringTemplate";
import {PickupTypeOptions} from "../../lib/enum/PickupType";
import {ClientWizardState} from "../../lib/WizardState";
import {LambdaProvider} from "../../lib/LambdaProvider";
import {CustomerUtiligyAuth} from "../../lib/interface/CustomerUtiligyAuth";
import {AddValidationClass} from "../../lib/util/ValidateField";

export class StepCustomerSummary implements WizardStep {
    name = "Summary";
    has_landed = false;

    render(wizard: Wizard): string {
        let msg: any = {};
        let state = wizard.getState();
        Object.assign(msg, state);
        msg.pickupTypeName = PickupTypeOptions[state.CustomerPickupType].name;
        msg.CustomerNotifyEmail = (state.CustomerNotifyEmail === "" ? "N/A" : state.CustomerNotifyEmail);
        msg.CustomerNotifyPhone = (state.CustomerNotifyPhone === "" ? "N/A" : state.CustomerNotifyPhone);
        return new StringTemplate(StepCustomerSummaryView).apply(msg);
    }

    focus(wizard: Wizard): void {
        let self = this;
        let landing_button_start = document.getElementById('summary_button_next');
        landing_button_start.onclick = function () {
            self.has_landed = true;


            let provider = new LambdaProvider();
            let msg  = Object.assign({route:"SubmitRequest"}, wizard.getState());
            provider.postPayload(msg, function (data) {
                console.log('GOT MSG BACK FROM SUBMITREQUEST', data);
            });


            wizard.getRenderer().showModal(WizardCompletedView);
            let modal_button_reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById("modal_button_reset");

            if (modal_button_reset) {
                modal_button_reset.onclick = function () {
                    wizard.useState(new ClientWizardState());
                    wizard.setStep(0);
                    wizard.render();
                };
            }

        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return this.has_landed;
    }

}