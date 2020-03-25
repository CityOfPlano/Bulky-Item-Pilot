import CSRContainerView from './view/CSRContainerView.html';
import {Router} from "./csr/Router";
import {CSRLanding} from "./csr/CSRLanding";
import {CSRReports} from "./csr/CSRReports";
document.body.innerHTML = CSRContainerView;

let router = new Router(document.getElementById('working-area'));

let controller_landing = new CSRLanding();
let controller_reports = new CSRReports();

document.getElementById('focus-reports').onclick = function(){
    router.focusController(controller_reports);
};

router.focusController(controller_landing);