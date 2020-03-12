import {CustomerUtiligyAuth, PayloadWithToken} from "./interface/CustomerUtiligyAuth";
import {PickupOptions} from "./interface/PickupOptions";
import {CustomerContact} from "./interface/CustomerContact";

export class ClientWizardState implements PayloadWithToken, CustomerUtiligyAuth, PickupOptions, CustomerContact {
    public Token: string = null;
    public WorkOrderNum: number = null;
    public BillingAccountNumber: number = null;
    public BillingAccountAddress: string = "";
    public BillingAccountNameOnAddress: string = "";
    public BillingUtilityIsAuthenticated: boolean = false;
    public InformationUsedFreePickups: number = 0;
    public CustomerDescribeDetail: string = "";
    public CustomerPickupType: number = 0;
    public CustomerPickupDate: string;
    public CustomerContactName: string = "";
    public CustomerContactPhone: string = "";
    public CustomerContactAgreeDisclaimer: boolean = false;
    public CustomerNotifyEmail: string = "";
    public CustomerNotifyPhone: string = "";
    public CustomerNotifyByEmail: boolean = false;
    public CustomerNotifyByPhone: boolean = false;
}