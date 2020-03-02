import {Wizard} from "../lib/controller/Wizard";
import {StepLoading} from "./wizard/StepLoading";
import {StepLanding} from "./wizard/StepLanding";

let wizard = new Wizard();

let step_loading = new StepLoading();

wizard.addStep(step_loading);
wizard.addStep(new StepLanding());

wizard.render(document.body);

window.setTimeout(function(){
    step_loading.has_loaded = true;
    wizard.render(document.body);
}, 100);
