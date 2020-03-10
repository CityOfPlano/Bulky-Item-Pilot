import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerDescribeView from '../view/StepCustomerDescribeView.html';
import {StringTemplate} from "../../lib/StringTemplate";
import {ClientWizardState} from "../../lib/WizardState";
import {AddValidationClass, ClearValidationClass, ValidateNumberField} from "../../lib/util/ValidateField";

export class StepCustomerDescribe implements WizardStep {

    render(wizard: Wizard): string {
        return new StringTemplate(StepCustomerDescribeView).apply(wizard.getState());
    }

    focus(wizard: Wizard): void {
        let self = this;

        let describe_detail = <HTMLTextAreaElement>document.getElementById("describe_detail");
        describe_detail.onkeyup = function () {
            ClearValidationClass(describe_detail);
            wizard.getState().CustomerDescribeDetail = describe_detail.value.toUpperCase();
            self.update(wizard.getState());
        };

        self.update(wizard.getState());

    }

    update(state:ClientWizardState){
        let describe_button_next = <HTMLButtonElement>document.getElementById("describe_button_next");
        let describe_button_tip = document.getElementById("describe_button_tip");

        if (state.CustomerDescribeDetail.length >= 1) {
            describe_button_next.disabled = false;
            describe_button_tip.style.display = "none";
        } else {
            describe_button_next.disabled = true;
            describe_button_tip.style.display = "inline-block";
        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return false;
    }

}