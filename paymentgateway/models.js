class Transaction{


    id; 
    txnType;
    status;
    client;
    depositDetails;
    paymentType;
    amount;
    date;
    refund;

    constructor(id,{paymentMethod ,status ,client, depositDetails,paymentType,amount,date,refund }){
        this.id=id;
        this.txnType=paymentMethod;
        this.status=status;
        this.client=client;
        this.depositDetails=depositDetails;
        this.paymentType=paymentType
        this.date=date;
        this.refund=refund;
        this.amount=amount;
    }
    
    

}

const status=[
    "success",
    "failed",
    "rejected",
    "processing"
]

function createEnum(values) {
    const enumObject = {};
    for (const val of values) {
        enumObject[val] = val;
    }
    return Object.freeze(val);
  }
  
