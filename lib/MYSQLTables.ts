import {ClientWizardState} from "./WizardState";

export class MYSQLTables {
    getInsertValuesFromClientWizardState(state:ClientWizardState){
        return `INSERT INTO requests (workOrderStatusId,customerPickupTypeId,customerPickupDate,customerStreetAddress,customerBillingAccountName,customerBillingAccountNumber,customerDescribeDetail,customerContactName,customerNotifyPhone,customerNotifyEmail,customerNotifyByPhone,customerNotifyByEmail) VALUES (1,${state.CustomerPickupType},'${state.CustomerPickupDate}','${state.BillingAccountAddress}','${state.BillingAccountNameOnAddress}',${state.BillingAccountNumber},'${state.CustomerDescribeDetail}','${state.CustomerContactName}','${state.CustomerNotifyPhone}','${state.CustomerNotifyEmail}',${state.CustomerNotifyByPhone?1:0},${state.CustomerNotifyByEmail?1:0})`;
    }

    getCreateTables() {

        let cols = [
            `pickupId INT NOT NULL AUTO_INCREMENT PRIMARY KEY`,
            `workOrderStatusId INT NOT NULL`,
            `customerPickupTypeId INT NOT NULL`,
            `customerPickupDate VARCHAR(100)`,
            `customerStreetAddress VARCHAR(100)`,
            `customerBillingAccountName VARCHAR(200)`,
            `customerBillingAccountNumber INT`,
            `customerDescribeDetail VARCHAR(1000)`,
            `customerContactName VARCHAR(200)`,
            `customerNotifyPhone VARCHAR(20)`,
            `customerNotifyEmail VARCHAR(200)`,
            `customerNotifyByEmail TINYINT(1)`,
            `customerNotifyByPhone TINYINT(1)`,
        ];

        return `CREATE TABLE requests (${cols.join(', ')})`;

    }
}