import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerAuthView from '../view/StepCustomerAuthView.html';

export class StepCustomerAuth implements WizardStep {

    has_landed = false;

    render(wizard:Wizard): string {
        return StepCustomerAuthView;
    }

    focus(wizard:Wizard): void {
        let self = this;
    }

    is_satisfied(): boolean {
        return this.has_landed;
    }
}