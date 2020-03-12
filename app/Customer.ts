import {Wizard} from "../lib/controller/Wizard";
import {StepLoading} from "./wizard/StepLoading";
import {StepLanding} from "./wizard/StepLanding";
import {StepCustomerAuth} from "./wizard/StepCustomerAuth";
import {DomWizardRenderer} from "../lib/controller/DomWizardRenderer";
import {ClientWizardState} from "../lib/WizardState";
import {StepCustomerInformation} from "./wizard/StepCustomerInformation";
import {StepCustomerDescribe} from "./wizard/StepCustomerDescribe";
import {StepCustomerDate} from "./wizard/StepCustomerDate";
import {StepCustomerContact} from "./wizard/StepCustomerContact";
import {StepDisclaimer} from "./wizard/StepDisclaimer";
import {StepCustomerNotify} from "./wizard/StepCustomerNotify";

let renderer = new DomWizardRenderer();
let wizard = new Wizard(document.body, renderer);
wizard.useState(new ClientWizardState());
wizard.getState().BillingAccountNumber = 123;
wizard.getState().BillingAccountAddress = "123 Main Street";

let step_loading = new StepLoading();

wizard.addStep(step_loading);
wizard.addStep(new StepLanding());
wizard.addStep(new StepCustomerAuth());
wizard.addStep(new StepCustomerInformation());
wizard.addStep(new StepCustomerDescribe());
wizard.addStep(new StepCustomerDate());
wizard.addStep(new StepCustomerContact());
wizard.addStep(new StepDisclaimer());
wizard.addStep(new StepCustomerNotify());
//wizard.addStep(new StepCustomerSummary());

wizard.render();

window.setTimeout(function(){
    step_loading.has_loaded = true;
    wizard.nextStep();
}, 1);