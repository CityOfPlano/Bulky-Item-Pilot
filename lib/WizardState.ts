import {CustomerUtiligyAuth, PayloadWithToken} from "./interface/CustomerUtiligyAuth";

export class ClientWizardState implements PayloadWithToken, CustomerUtiligyAuth {
    public Token: string;
    public WorkOrderNum: number;
    public BillingAccountNumber: number;
    public BillingAccountAddress: string;
    public BillingAccountNameOnAddress: string;
    public BillingUtilityIsAuthenticated: boolean;
    public InformationUsedFreePickups: number;

    reset() {
        this.Token = null;
        this.WorkOrderNum = null;
        this.BillingAccountNumber = null;
        this.BillingAccountAddress = null;
        this.BillingUtilityIsAuthenticated = false;
    }
}