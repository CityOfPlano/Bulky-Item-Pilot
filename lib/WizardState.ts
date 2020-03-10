import {CustomerUtiligyAuth, PayloadWithToken} from "./interface/CustomerUtiligyAuth";

export class ClientWizardState implements PayloadWithToken, CustomerUtiligyAuth {
    public Token: string = null;
    public WorkOrderNum: number = -1;
    public BillingAccountNumber: number = -1;
    public BillingAccountAddress: string = "";
    public BillingAccountNameOnAddress: string = "";
    public BillingUtilityIsAuthenticated: boolean = false;
    public InformationUsedFreePickups: number;

    reset() {

    }
}