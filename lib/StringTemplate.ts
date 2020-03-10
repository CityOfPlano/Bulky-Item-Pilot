import {replaceAll} from "./util/StringMethods";

export class StringTemplate {
    private readonly contents: string;

    constructor(input: string) {
        this.contents = input;
    }

    getContents(): string {
        return this.contents;
    }

    apply(template_key_value: any) {
        let s = ''.concat(this.getContents());
        for (let data in template_key_value) {
            console.log("replacing",'{' + (data) + '}', "with", template_key_value[data]);
            s = replaceAll(s, '{' + (data) + '}', template_key_value[data]);
        }
        return s;
    }

}