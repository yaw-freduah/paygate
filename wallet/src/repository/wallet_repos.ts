

class UserRepository implements UserRepo{
    FindByID(userID: string): UserAccount | Error {
        throw new Error("Method not implemented.");
    }
    FindMerchantAccountByName(name: string): UserAccount | Error {
        throw new Error("Method not implemented.");
    }
    Save(account: UserAccount): Error | null {
        throw new Error("Method not implemented.");
    }
}



class WalletRepository implements WalletRepo{
    FindByID(walletID: string): Wallet | Error {
        throw new Error("Method not implemented.");
    }
    FindByUserID(userID: string): Wallet | Error {
        throw new Error("Method not implemented.");
    }
    Save(wallet: Wallet): Error {
        throw new Error("Method not implemented.");
    }
}


class TransactionRepository implements TransactionRepo{
    FindByID(txnID: string): Error | Transaction {
        throw new Error("Method not implemented.");
    }
    Save(txn: Transaction): Error | null {
        throw new Error("Method not implemented.");
    }

}