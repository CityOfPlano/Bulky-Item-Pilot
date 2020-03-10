import WizardControlsView from "../../app/view/WizardControlsView.html";
import WizardFooterView from "../../app/view/WizardFooterView.html";
import WizardResetView from "../../app/view/WizardResetView.html";
import {Wizard} from "./Wizard";
import {WizardRenderer} from "../interface/WizardRenderer";
import {ClientWizardState} from "../WizardState";

export class DomWizardRenderer implements WizardRenderer {

    constructor() {
    }

    render(wizard: Wizard) {
        let self = this;
        this.clearModal();
        wizard.render_target.innerHTML = WizardControlsView + wizard.getStepFromIndex(wizard.current_index).step.render(wizard) + WizardFooterView;
        wizard.getStepFromIndex(wizard.current_index).step.focus(wizard);

        let wizard_button_back: HTMLButtonElement = <HTMLButtonElement>document.getElementById("wizard_button_back");
        let wizard_button_reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById("wizard_button_reset");

        if (wizard.current_index <= 1) {
            wizard_button_back.disabled = true;
            wizard_button_reset.disabled = true;
        } else {
            wizard_button_back.onclick = function () {
                wizard.prevStep();
            };
            wizard_button_reset.onclick = function () {
                self.showModal(WizardResetView);
                let modal_button_cancel: HTMLButtonElement = <HTMLButtonElement>document.getElementById("modal_button_cancel");
                let modal_button_reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById("modal_button_reset");

                modal_button_cancel.onclick = function(){
                    self.clearModal();
                };

                modal_button_reset.onclick = function(){
                    wizard.useState(new ClientWizardState());
                    wizard.setStep(1);
                    wizard.render();
                };

            };
        }
    }

    showModal(html:string){
        let overlay = document.getElementById("overlay");
        if (overlay) {
            overlay.innerHTML = html;
            overlay.style.display = "block";
        }
    }

    clearModal(){
        let overlay = document.getElementById("overlay");
        if (overlay) {
            overlay.innerHTML = "";
            overlay.style.display = "none";
        }
    }

}