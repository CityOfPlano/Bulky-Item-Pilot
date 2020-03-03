import {Wizard, WizardStep} from "../../lib/controller/Wizard";
import StepCustomerAuthView from '../view/StepCustomerAuthView.html';

export class StepCustomerAuth implements WizardStep {

    render(wizard:Wizard): string {
        return StepCustomerAuthView;
    }

    focus(wizard:Wizard): void {
    }

    is_satisfied(): boolean {
        return false;
    }

}