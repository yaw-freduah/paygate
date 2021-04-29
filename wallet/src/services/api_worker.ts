interface RegisterCustomer  {
    Name        :string
    Email       :string
    Phonenumber :string
}

interface RegisterMerchant  {
    Name  :string
    Email :string
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


