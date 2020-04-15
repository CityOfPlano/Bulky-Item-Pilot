import CSRContainerView from './view/CSRContainerView.html';
import {Router} from "./csr/Router";
import {CSRLanding} from "./csr/CSRLanding";
import {CSRReports} from "./csr/CSRReports";
import {CSRNew} from "./csr/CSRNew";
document.body.innerHTML = CSRContainerView;

let router = new Router(document.getElementById('working-area'));

let controller_landing = new CSRLanding();
let controller_reports = new CSRReports();
let controller_new = new CSRNew();

document.getElementById('focus-new').onclick = function(){
    router.focusController(controller_new);
};

document.getElementById('focus-reports').onclick = function(){
    router.focusController(controller_reports);
};

document.getElementById('focus-daily').onclick = function(){
    router.focusController(controller_reports);
};

document.getElementById('focus-close').onclick = function(){
    router.focusController(controller_reports);
};

router.focusController(controller_landing);