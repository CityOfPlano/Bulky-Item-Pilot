import WizardControlsView from "../../app/view/WizardControlsView.html";
import WizardFooterView from "../../app/view/WizardFooterView.html";
import {Wizard} from "./Wizard";
import {WizardRenderer} from "../interface/WizardRenderer";

export class DomWizardRenderer implements WizardRenderer {

    constructor() {
    }

    render(wizard: Wizard) {
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