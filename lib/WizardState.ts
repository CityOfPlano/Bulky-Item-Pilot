import {CustomerUtiligyAuth, PayloadWithToken} from "./interface/CustomerUtiligyAuth";
import {PickupOptions} from "./interface/PickupOptions";

export class ClientWizardState implements PayloadWithToken, CustomerUtiligyAuth, PickupOptions {
    public Token: string = null;
    public WorkOrderNum: number = null;
    public BillingAccountNumber: number = null;
    public BillingAccountAddress: string = "";
    public BillingAccountNameOnAddress: string = "";
    public BillingUtilityIsAuthenticated: boolean = false;
    public InformationUsedFreePickups: number = 0;
    public CustomerDescribeDetail: string = "";
    public CustomerPickupType: number = 0;
}