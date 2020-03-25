import {StringTemplate} from "../../lib/StringTemplate";
import CSRReportsView from "../view/CSRReportsView.html";

export class CSRReports {

    render(): string {
        return new StringTemplate(CSRReportsView).getContents();
    }

    focus(): void {
    }

    update() {
    }

}