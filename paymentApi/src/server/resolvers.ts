import * as admin from 'firebase-admin';

const  serviceAccount = require("../../payment-portal-1438f-firebase-adminsdk-xjngp-e6fd79a5f1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

class Transaction  {
    transactionID   :string;
    transactionType :TxnType;
    paymentMethod	:string;
    status     		:Status;
    description		:string;
    depositDetails  :DepositDetails;
    date 			:string;
    Amount          :number;
    refund			:Refund|null;
    constructor(txnid:string,txntype:TxnType,paymethod:string,status:Status, description:string,date:string,amount:number,depositDetails:DepositDetails,refund:Refund|null){
        this.transactionID=txnid;
        this.transactionType=txntype;
        this.paymentMethod=paymethod;
        this.status=status;
        this.description=description;
        this.depositDetails=depositDetails;
        this.date=date;
        this.Amount=amount;
        this.refund=refund; 

    }
    



    
}


const transactionHolder ={}



class Refund{
    amount:number;
    date:string;
    status:Status;


    constructor(amount:number,date:string,status:Status=Status.processing){
        this.amount=amount;
        this.date=date;
        this.status=status;
    }
}
class Bank{
    
    constructor(public name:string,public BIC:string){}
}


class DepositDetails{
    bank			:Bank;
    CreditWallet?    :string;
    DebitedWallet?  :string;

    constructor(bank:Bank,creditWallet?:string,debitWallet?:string){
        this.bank=bank;
        this.CreditWallet=creditWallet;
        this.DebitedWallet=debitWallet;
    }
}






enum TxnType{
    deposit="deposit",
    refund ="refund"
}

enum Status{
    success="success",
    failed="failed",
    rejected="rejected",
    processing="processing",
}
enum UserType{
    merchant="merchant",
    user="user",
}


const resolvers= {
    //!query 

    Query:{
    getTransaction:(txnId:string )=>{
      
        //TODO:TALK TO FIREBASE 
        // return new Transaction()
    },
    
    getTransactionbyDate:(date:string)=>{
        // return new Transaction()
    },
    allTransactions:(date?:string)=>{},
//!subscriptions 
    MomoPay:(payload:Transaction)=>{},
    cardPayment:(payload:Transaction)=>{},
    bankPayment:(payload:Transaction)=>{}
    }
};

export default resolvers;