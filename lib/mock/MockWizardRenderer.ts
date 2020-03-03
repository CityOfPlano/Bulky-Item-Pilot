import {Wizard} from "../controller/Wizard";
import {WizardRenderer} from "../interface/WizardRenderer";

export class MockWizardRenderer implements WizardRenderer{
    constructor() {

    }
    render(wizard: Wizard){
        return wizard.getStepFromIndex(wizard.current_index).step.render(wizard);
    }

    clearModal(): void {
    }

    showModal(html: string): void {
    }
}