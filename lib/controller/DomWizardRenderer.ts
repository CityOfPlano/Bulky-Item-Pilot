import WizardControlsView from "../../app/view/wizard/WizardControlsView.html";
import WizardFooterView from "../../app/view/wizard/WizardFooterView.html";
import WizardResetView from "../../app/view/wizard/WizardResetView.html";
import {Wizard} from "./Wizard";
import {WizardRenderer} from "../interface/WizardRenderer";
import {ClientWizardState} from "../WizardState";
import {StringTemplate} from "../StringTemplate";

export class DomWizardRenderer implements WizardRenderer {

    constructor() {
    }

    render(wizard: Wizard) {
        let self = this;
        this.clearModal();
        wizard.render_target.innerHTML = new StringTemplate(WizardControlsView).apply({percent:((((Math.min(wizard.getStep().index+1, wizard.current_index))/(wizard.steps.length-1))*100)|0),progressBar:this.generateProgressBar(wizard)}) + wizard.getStepFromIndex(wizard.current_index).step.render(wizard) + WizardFooterView;
        wizard.getStepFromIndex(wizard.current_index).step.focus(wizard);

        let wizard_button_back: HTMLButtonElement = <HTMLButtonElement>document.getElementById("wizard_button_back");
        let wizard_button_reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById("wizard_button_reset");

        if (wizard.current_index <= 0) {
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
                    wizard.setStep(0);
                    wizard.render();
                };

            };
        }
    }

    generateProgressBar(wizard: Wizard){
        let str = [];
        for (let i= 0; i< wizard.steps.length; i++){
            str.push(`<div class="step ${wizard.getStep().index>i||wizard.current_index>i?"completed":""} ${wizard.current_index==i?"selected":""}" id="${i}"><div class="tooltip">${wizard.steps[i].name}</div></div>`);
        }
        return `<div class="steps">${str.join("")}</div>`;
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