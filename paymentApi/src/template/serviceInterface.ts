

interface WalletRepo {
    FindByID(walletID:string): Wallet
    FindByUserID(userID:string): Wallet
    Save(wallet:Wallet) :void
}

 interface TransactionRepo{
   
    
}


