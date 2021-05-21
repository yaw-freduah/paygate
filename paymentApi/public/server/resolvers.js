import * as admin from 'firebase-admin';
const serviceAccount = require("../../payment-portal-1438f-firebase-adminsdk-xjngp-e6fd79a5f1.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
class Transaction {
    constructor(txnid, txntype, paymethod, status, description, date, amount, depositDetails, refund) {
        this.transactionID = txnid;
        this.transactionType = txntype;
        this.paymentMethod = paymethod;
        this.status = status;
        this.description = description;
        this.depositDetails = depositDetails;
        this.date = date;
        this.Amount = amount;
        this.refund = refund;
    }
}
const transactionHolder = {};
class Refund {
    constructor(amount, date, status = Status.processing) {
        this.amount = amount;
        this.date = date;
        this.status = status;
    }
}
class Bank {
    constructor(name, BIC) {
        this.name = name;
        this.BIC = BIC;
    }
}
class DepositDetails {
    constructor(bank, creditWallet, debitWallet) {
        this.bank = bank;
        this.CreditWallet = creditWallet;
        this.DebitedWallet = debitWallet;
    }
}
var TxnType;
(function (TxnType) {
    TxnType["deposit"] = "deposit";
    TxnType["refund"] = "refund";
})(TxnType || (TxnType = {}));
var Status;
(function (Status) {
    Status["success"] = "success";
    Status["failed"] = "failed";
    Status["rejected"] = "rejected";
    Status["processing"] = "processing";
})(Status || (Status = {}));
var UserType;
(function (UserType) {
    UserType["merchant"] = "merchant";
    UserType["user"] = "user";
})(UserType || (UserType = {}));
const resolvers = {
    //!query 
    Query: {
        getTransaction: (txnId) => {
            //TODO:TALK TO FIREBASE 
            // return new Transaction()
        },
        getTransactionbyDate: (date) => {
            // return new Transaction()
        },
        allTransactions: (date) => { },
        //!subscriptions 
        MomoPay: (payload) => { },
        cardPayment: (payload) => { },
        bankPayment: (payload) => { }
    }
};
export default resolvers;
