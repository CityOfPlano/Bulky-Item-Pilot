export function ValidateNumberField(value): ValidationResponse {
    if (!parseInt(value)){
        return new ValidationResponse(false, "Not a number");
    }
    return new ValidationResponse(true, "");
}

export function AddValidationClass(element, _class):void{
        element.classList.add(_class);
}

export function ClearValidationClass(element):void{
        element.classList.remove("warning");
}

export class ValidationResponse {
    success: boolean;
    reason: string;

    constructor(success: boolean, reason: string) {
        this.success = success;
        this.reason = reason;
    }
}