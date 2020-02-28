import {Wizard} from "../lib/controller/Wizard";
import {StepLoading} from "../lib/wizard/StepLoading";

let wizard = new Wizard();

let step_loading = new StepLoading();

wizard.addStep(step_loading);
console.log(wizard.steps);

document.body.innerHTML = wizard.getStep().render();