import { types } from 'node:util';
import { v4 as uuidv4 } from 'uuid';
export default class WalletServiceImpl {
    constructor(userRepo, walletRepo, transactionRepo) {
        this.userRepo = userRepo;
        this.walletRepo = walletRepo;
        this.transactionRepo = transactionRepo;
    }
    findMerchantWallet(name) {
        let merchant = this.userRepo.FindMerchantAccountByName(name);
        if (types.isNativeError(merchant)) {
            console.error("Error cannot find merchant %s \n", merchant.message);
            return merchant;
        }
        else {
            return this.walletRepo.FindByUserID(merchant.userID);
        }
    }
    Pay(cmd) {
        let merchantWallet = this.findMerchantWallet(cmd.merchantId);
        if (types.isNativeError(merchantWallet)) {
            console.error("Error Pay cannot find merchant %s \n", merchantWallet.message);
            return merchantWallet;
        }
        let customerWallet = this.walletRepo.FindByID(cmd.debitedWalletID);
        if (types.isNativeError(customerWallet)) {
            console.error("Error Pay cannot find wallet %s \n", customerWallet.message);
            return customerWallet;
        }
        let txnID = uuidv4();
        let txn = new Transaction(txnID, cmd.transactionType, cmd.paymentMethod, Status.processing, cmd.Description, Date.now().toString(), cmd.Amount, new DepositDetails(cmd.bank, cmd.creditWalletID, cmd.debitedWalletID), null);
        var err = this.transactionRepo.Save(txn);
        if (err != null) {
            console.error("Error Pay %s \n", err.message);
            return err;
        }
        err = merchantWallet.creditBalance(cmd.Amount);
        if (err != null) {
            console.error("Error Pay %s \n", err.message);
            return err;
        }
        err = this.walletRepo.Save(merchantWallet);
        if (err != null) {
            console.error("Error Pay %s \n", err.message);
            return err;
        }
        err = customerWallet.debitBalance(cmd.Amount);
        if (err != null) {
            console.error("Error Pay %s \n", err.message);
            return err;
        }
        err = this.walletRepo.Save(customerWallet);
        if (err != null) {
            console.error("Error Pay %s \n", err.message);
            return err;
        }
        return txnID;
    }
    Topup(cmd) {
        let wallet = this.walletRepo.FindByID(cmd.WalletID);
        if (types.isNativeError(wallet)) {
            console.error("Error topup on find wallet %s \n", wallet.message);
            return wallet;
        }
        let txnID = uuidv4();
        let txn = new Transaction(txnID, cmd.transactionType, cmd.paymentMethod, Status.processing, cmd.Description, Date.now().toString(), cmd.Amount, new DepositDetails(cmd.bank, cmd.creditWalletID), null);
        let err = this.transactionRepo.Save(txn);
        if (err != null) {
            console.error("Error topup %s \n", err.message);
            return err;
        }
        wallet.creditBalance(cmd.Amount);
        err = this.walletRepo.Save(wallet);
        if (err != null) {
            console.error("Error topup %s \n", err.message);
            return err;
        }
        return txnID;
    }
    RegisterCustomer(cmd) {
        let userID = uuidv4();
        let account = new UserAccount(userID, cmd.name, cmd.email, UserType.user, cmd.phoneNumber);
        return this.createWallet(account);
    }
    RegisterMerchant(cmd) {
        var _a;
        let userID = uuidv4();
        let account = new UserAccount(userID, cmd.name, cmd.email, UserType.merchant, (_a = cmd.phoneNumber) !== null && _a !== void 0 ? _a : "");
        return this.createWallet(account);
    }
    ;
    createWallet(account) {
        let err = this.userRepo.Save(account);
        if (err != null) {
            console.error("Error creating user account %s \n", err.message);
            return err;
        }
        let walletID = uuidv4();
        let wallet = new Wallet(walletID, account.userID);
        err = this.walletRepo.Save(wallet);
        if (err != null) {
            console.error("Error creating user account %s \n", err.message);
            return err;
        }
        return walletID;
    }
}
