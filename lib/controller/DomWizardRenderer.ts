import WizardControlsView from "../../app/view/WizardControlsView.html";
import {Wizard} from "./Wizard";
import {WizardRenderer} from "../interface/WizardRenderer";

export class DomWizardRenderer implements WizardRenderer{
    constructor() {

    }
    render(wizard: Wizard){
        wizard.render_target.innerHTML = WizardControlsView + wizard.getStepFromIndex(wizard.current_index).step.render(wizard);
        wizard.getStepFromIndex(wizard.current_index).step.focus(wizard);

        let wizard_button_back:HTMLFormElement = <HTMLFormElement>document.getElementById("wizard_button_back");
        if (wizard.current_index <= 1){
            wizard_button_back.disabled = true;
        }else {
            wizard_button_back.onclick = function () {
                wizard.current_index--;
                wizard.render();
            };
        }
        let wizard_button_reset = document.getElementById("wizard_button_reset");
    }
}
