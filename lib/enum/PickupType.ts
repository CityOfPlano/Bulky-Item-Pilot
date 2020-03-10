export class PickupType {
    crewCode : number;
    desc :string;
    type: number;
    name:string;
    taskName:string;
    constructor(code, desc, type, name, taskName) {
        this.crewCode = code;
        this.desc = desc;
        this.type = type;
        this.name = name;
        this.taskName = taskName;
    }
}

export const PickupTypeOptions = {
    0: new PickupType(362,"On Call Bulky Waste", 0, "Bulky Waste", "OCBW"),
    1: new PickupType(362,"On Call Yard Trimmings", 1, "Brush & Trimmings", "OCYT"),
    2: new PickupType(362,"On Call Yard Trimmings & Bulky Waste", 2, "Both Bulky & Brush", "OCYB"),
};
