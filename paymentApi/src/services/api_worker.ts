interface RegisteredUser  {
    name        :string
    email       :string
    phoneNumber :string
}

interface TopUp  {
    WalletID    :string
    Amount      :number
    Description :string
    bank        :Bank;
	creditWalletID    :string;
    transactionType:TxnType
    paymentMethod:string
	
}

 interface Payment  {
    debitedWalletID  :string;  
    transactionType:TxnType
    paymentMethod:string
    merchantId    :string
    Amount      :number
    userID :string
    Description :string
    bank        :Bank;
	creditWalletID    :string;
	
}


interface TranferForBank extends Payment{} 

interface TranferMOtoBank  extends Payment{} 