import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerDateView from '../view/StepCustomerDateView.html';
import {StringTemplate} from "../../lib/StringTemplate";
import {ClientWizardState} from "../../lib/WizardState";
import {AddValidationClass, ClearValidationClass, ValidateNumberField} from "../../lib/util/ValidateField";
import {Calendar} from "../../lib/controller/Calendar";

export class StepCustomerDate implements WizardStep {

    private calendar:Calendar;

    render(wizard: Wizard): string {
        this.calendar = new Calendar(wizard.getState().CustomerPickupDate);
        return new StringTemplate(StepCustomerDateView).apply(wizard.getState());
    }

    focus(wizard: Wizard): void {
        let self = this;
        let date_button_next = <HTMLButtonElement>document.getElementById("date_button_next");
        let calendar_container = document.getElementById('calendar_container');
        calendar_container.appendChild(this.calendar.getElement());

        this.calendar.onChange(function(selected_date:string){
                wizard.getState().CustomerPickupDate = selected_date;
            calendar_container.innerHTML='';
            calendar_container.appendChild(self.calendar.getElement());
            self.update(wizard.getState());
        });

        date_button_next.onclick=function(){
            wizard.nextStep();
        };

        this.update(wizard.getState());
    }

    update(state:ClientWizardState){
        let date_button_next = <HTMLButtonElement>document.getElementById("date_button_next");
        let date_button_tip = document.getElementById("date_button_tip");

        if (state.CustomerPickupDate && state.CustomerPickupDate.length >= 1) {
            date_button_next.disabled = false;
            date_button_tip.style.display = "none";
        } else {
            date_button_next.disabled = true;
            date_button_tip.style.display = "inline-block";
        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return false;
    }

}