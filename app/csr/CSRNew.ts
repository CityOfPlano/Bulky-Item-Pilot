import {StringTemplate} from "../../lib/StringTemplate";
import CSRNewView from "../view/CSRNewView.html";

export class CSRNew {

    render(): string {
        return new StringTemplate(CSRNewView).getContents();
    }

    focus(): void {
    }

    update() {
    }

}