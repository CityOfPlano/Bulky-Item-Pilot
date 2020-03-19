import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerSummaryView from '../view/StepCustomerSummaryView.html';
import {StringTemplate} from "../../lib/StringTemplate";
import {PickupTypeOptions} from "../../lib/enum/PickupType";

export class StepCustomerSummary implements WizardStep {

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
            //wizard.nextStep();
        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return this.has_landed;
    }

}