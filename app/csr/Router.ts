import {Wizard} from "../../lib/controller/Wizard";
import {StringTemplate} from "../../lib/StringTemplate";
import StepCustomerContactView from "../view/wizard/StepCustomerContactView.html";
import {ClearValidationClass} from "../../lib/util/ValidateField";
import {ClientWizardState} from "../../lib/WizardState";

export class Router {
    render_element:HTMLElement;

    constructor(elem:HTMLElement) {
        this.render_element = elem;
    }

    focusController(controller){
        this.render_element.innerHTML = controller.render();
        controller.focus();
    }
}