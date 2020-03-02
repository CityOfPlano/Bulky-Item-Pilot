import {Wizard} from "../lib/controller/Wizard";
import {StepLoading} from "./wizard/StepLoading";
import {StepLanding} from "./wizard/StepLanding";
import {StepCustomerAuth} from "./wizard/StepCustomerAuth";
import {DomWizardRenderer} from "../lib/controller/DomWizardRenderer";

let wizard_renderer = new DomWizardRenderer();
let wizard = new Wizard(document.body, wizard_renderer);

let step_loading = new StepLoading();

wizard.addStep(step_loading);
wizard.addStep(new StepLanding());
wizard.addStep(new StepCustomerAuth());

wizard.render();

window.setTimeout(function(){
    step_loading.has_loaded = true;
    wizard.nextStep();
}, 720);
