 interface UserRepo{
    FindByID(userID :string) :UserAccount
    FindMerchantAccountByName(name :string) :UserAccount
    Save(account :UserAccount) :(null)
}

interface WalletRepo {
    FindByID(walletID:string): Wallet
    FindByUserID(userID:string): Wallet
    Save(wallet:Wallet) :Error
}

 interface TransactionRepo{
    FindByID(txnID :string) :Promise<Transaction>
    Save(txn :Transaction) :Promise<void>
    
}


interface PhoneMo {
    MakePayment(txn:Transaction):Promise<Transaction>

}