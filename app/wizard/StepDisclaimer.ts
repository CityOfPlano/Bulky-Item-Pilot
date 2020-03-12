import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepDisclaimerView from '../view/StepDisclaimerView.html';
import {ClientWizardState} from "../../lib/WizardState";
import {ValidateNumberField} from "../../lib/util/ValidateField";

export class StepDisclaimer implements WizardStep {

    has_landed = false;

    render(wizard:Wizard): string {
        return StepDisclaimerView;
    }

    focus(wizard:Wizard): void {
        let self= this;
        let disclaimer_input_agree = <HTMLInputElement>document.getElementById("disclaimer_input_agree");
        let disclaimer_button_next = <HTMLButtonElement>document.getElementById('disclaimer_button_next');

        disclaimer_input_agree.checked = wizard.getState().CustomerContactAgreeDisclaimer;

        disclaimer_input_agree.onclick = function(){
            wizard.getState().CustomerContactAgreeDisclaimer = !!disclaimer_input_agree.checked;
            self.update(wizard.getState());
        };

        disclaimer_button_next.onclick = function(){
            wizard.nextStep();
        };
        this.update(wizard.getState());
    }

    update(state:ClientWizardState){
        let disclaimer_button_next = <HTMLButtonElement>document.getElementById('disclaimer_button_next');
        let disclaimer_button_tip = document.getElementById("disclaimer_button_tip");

        if (state.CustomerContactAgreeDisclaimer) {
            disclaimer_button_next.disabled = false;
            disclaimer_button_tip.style.display = "none";
        } else {
            disclaimer_button_next.disabled = true;
            disclaimer_button_tip.style.display = "inline-block";
        }
    }

    is_satisfied(wizard: Wizard): boolean {
        return this.has_landed;
    }

}