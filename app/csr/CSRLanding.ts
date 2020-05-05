import {StringTemplate} from "../../lib/StringTemplate";
import CSRLandingView from "../view/CSRLandingView.html";

export class CSRLanding {

    render(): string {
        return new StringTemplate(CSRLandingView).getContents();
    }

    focus(): void {
    }

    update() {
    }

}