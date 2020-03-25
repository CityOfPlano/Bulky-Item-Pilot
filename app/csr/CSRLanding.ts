import {StringTemplate} from "../../lib/StringTemplate";
import StepCustomerContactView from "../view/wizard/StepCustomerContactView.html";

export class CSRLanding {

    render(): string {
        return new StringTemplate(StepCustomerContactView).getContents();
    }

    focus(): void {
    }

    update() {
    }

}