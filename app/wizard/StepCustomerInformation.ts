import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerInformationView from '../view/wizard/StepCustomerInformationView.html';
import {StringTemplate} from "../../lib/StringTemplate";
import ModalLoadingView from "../view/wizard/ModalLoadingView.html";
import {LambdaProvider} from "../../lib/LambdaProvider";
import {ClientWizardState} from "../../lib/WizardState";
import {AddValidationClass} from "../../lib/util/ValidateField";
import {PickupType, PickupTypeOptions} from "../../lib/enum/PickupType";

export class StepCustomerInformation implements WizardStep {

    has_viewed = false;
    name = "Account";

    render(wizard: Wizard): string {
        let options = [];

        for (let prop in PickupTypeOptions){
            let option:PickupType = PickupTypeOptions[prop];
            options.push( `<label for="pickup-${option.taskName}"><input id="pickup-${option.taskName}" name="customer_pickup_type" value="${option.type}" type="radio" ${option.type === wizard.getState().CustomerPickupType?"checked":""}> ${option.name}</label>` );
        }

        let payload = {};
        Object.assign(payload, wizard.getState());
        Object.assign(payload, {optionsGroup:options.join("<br>")});
        return new StringTemplate(StepCustomerInformationView).apply(payload);
    }

    focus(wizard: Wizard): void {
        let self = this;
        let info_button_next = <HTMLButtonElement>document.getElementById("customer_button_information");

        info_button_next.onclick = function () {
            wizard.nextStep();
            self.has_viewed = true;
        };

        for (let prop in PickupTypeOptions){
            let option:PickupType = PickupTypeOptions[prop];
            let opt_radio = <HTMLInputElement>document.getElementById(`pickup-${option.taskName}`);
            opt_radio.onclick = function(e){
                wizard.getState().CustomerPickupType = parseInt(opt_radio.value);
            }

        }

    }

    is_satisfied(wizard: Wizard): boolean {
        return this.has_viewed;
    }

}