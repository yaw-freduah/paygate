"use strict";
class UserAccount {
    constructor(id, name, email, usertype, phoneNumber) {
        this.userID = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userType = usertype;
    }
}
class Wallet {
    constructor(id, userid, balance = 0) {
        this.userID = userid;
        this.walletID = id;
        this.balance = balance;
    }
    toJson() {
        return {
            "userID": this.userID,
            "walletID": this.walletID,
            "balance": this.balance,
            "transactions": this.transactions
        };
    }
    creditBalance(amount) {
        this.balance = this.balance + amount;
        return null;
    }
    debitBalance(amount) {
        if (this.balance < amount) {
            return Error("insuficient balance");
        }
        this.balance = this.balance - amount;
        return null;
    }
    refundWallet(txn, amount) {
        //?update transaction
        let date = Date.now().toString();
        txn.refund = new Refund(amount, date, Status.processing);
        //TODO:CALL API HERE 
        //?call debitBalance
        let error = this.debitBalance(amount);
        if (error != null) {
            throw Error(error.message);
        }
    }
}
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
