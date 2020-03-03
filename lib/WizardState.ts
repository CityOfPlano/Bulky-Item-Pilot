export class ClientWizardState {
    private Token:string;
    private WorkOrderNum:number;
    public BillingAccountNumber:number;
    public BillingAccountAddress:string;

    reset(){
        this.Token = null;
        this.WorkOrderNum = null;
        this.BillingAccountNumber = null;
        this.BillingAccountAddress = null;
    }
}