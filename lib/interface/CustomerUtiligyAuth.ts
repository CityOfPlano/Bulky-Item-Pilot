export interface PayloadWithToken {
    Token: string;
}

export interface CustomerUtiligyAuth extends PayloadWithToken {

    BillingAccountNumber:number;
    BillingAccountAddress:string;
    BillingAccountNameOnAddress:string;
    BillingUtilityIsAuthenticated: boolean;
    InformationUsedFreePickups:number;

}