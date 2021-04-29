 interface UserRepo{
    FindByID(userID :string) :UserAccount| Error
    FindMerchantAccountByName(name :string) :UserAccount| Error
    Save(account :UserAccount) :(Error|null)
}

interface WalletRepo {
    FindByID(walletID:string): (Wallet| Error)
    FindByUserID(userID:string): Wallet| Error
    Save(wallet:Wallet) :Error
}

 interface TransactionRepo{
    FindByID(txnID :string) :Transaction | Error
    Save(txn :Transaction) :(Error|null)
}