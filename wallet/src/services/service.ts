


import { types } from 'node:util';
import { v4 as uuidv4} from 'uuid';

	 interface WalletService{
		RegisterCustomer(cmd:RegisterCustomer) :(string| Error)
		RegisterMerchant(cmd:RegisteredMerchant) :(string| Error)
		Topup(cmd:TopUp):(string| Error)
		Pay(cmd :Payment) :(string| Error)
	}

   export default class	WalletServiceImpl implements WalletService {
		userRepo       : UserRepo
		walletRepo      :WalletRepo
		transactionRepo :TransactionRepo
	constructor(userRepo:UserRepo,walletRepo:WalletRepo,transactionRepo:TransactionRepo){
		this.userRepo=userRepo;
		this.walletRepo=walletRepo;
		this.transactionRepo=transactionRepo;
	}

			findMerchantWallet(name: string):( Wallet| Error) {
			let merchant= this.userRepo.FindMerchantAccountByName(name)
			if (types.isNativeError(merchant)) {
				console.error("Error cannot find merchant %s \n", merchant.message)
				return merchant;
			}else {
				return this.walletRepo.FindByUserID(merchant.userID)
			}
		
		
		}




		 Pay(cmd:Payment): string| Error {
			let merchantWallet = this.findMerchantWallet(cmd.merchantId)
			if (types.isNativeError(merchantWallet)  ) {
				console.error("Error Pay cannot find merchant %s \n", merchantWallet.message);
				return merchantWallet;
			}
		
			let customerWallet= this.walletRepo.FindByID(cmd.debitedWalletID)
			if (types.isNativeError(customerWallet)){
				console.error("Error Pay cannot find wallet %s \n", customerWallet.message)
				return customerWallet;
			}
		
			let txnID:string = uuidv4();
			let txn = new Transaction(
				  txnID,
				  cmd.transactionType,
				cmd.paymentMethod,
				Status.processing,
				cmd.Description,
				Date.now().toString(),
				cmd.Amount,
				new DepositDetails( 
				cmd.bank,
				cmd.creditWalletID,
				cmd.debitedWalletID,
				),
				null
			 )
		
			var err = this.transactionRepo.Save(txn); if (err != null) {
				console.error("Error Pay %s \n", err.message)
				return  err
			}
		
			 err = merchantWallet.creditBalance(cmd.Amount); if (err != null) {
				console.error("Error Pay %s \n", err.message)
				return  err
			}
		
			 err = this.walletRepo.Save(merchantWallet); if (err != null) {
				console.error("Error Pay %s \n", err.message)
				return  err
			}
		
			 err = customerWallet.debitBalance(cmd.Amount); if (err != null) {
				console.error("Error Pay %s \n", err.message)
				return  err
			}
		
			 err = this.walletRepo.Save(customerWallet); if (err != null) {
				console.error("Error Pay %s \n", err.message)
				return  err
			}
		
			return txnID
		}
		
		 Topup(cmd:TopUp) :(string| Error) {
			let wallet= this.walletRepo.FindByID(cmd.WalletID)
			if (types.isNativeError(wallet)){
				console.error("Error topup on find wallet %s \n", wallet.message)
				return wallet
			}
		
			let txnID = uuidv4()
			let txn = new  Transaction(
				txnID,
				cmd.transactionType,
			  cmd.paymentMethod,
			  Status.processing,
			  cmd.Description,
			  Date.now().toString(),
			  cmd.Amount,
			  new DepositDetails( 
			  cmd.bank,
			  cmd.creditWalletID,
			  ),
			  null
			)
		
			let err = this.transactionRepo.Save(txn); if (err != null) {
				console.error("Error topup %s \n", err.message)
				return  err
			}
		
			wallet.creditBalance(cmd.Amount)
			 err = this.walletRepo.Save(wallet);  if (err != null) {
				console.error("Error topup %s \n", err.message)
				return  err
			}
		
			return txnID
		}
		
		RegisterCustomer(cmd :RegisterCustomer): (string| Error) {
			let userID = uuidv4()
		
			let account =new  UserAccount(
				userID,
				 cmd.Name,
			     cmd.Email,
			    UserType.user,
				cmd.Phonenumber,
			)
		
			return this.createWallet(account)
		}
		
	 RegisterMerchant(cmd:RegisteredMerchant): (string| Error) {
			let userID = uuidv4()
		
			let account = new UserAccount(
				 userID,
				 cmd.name,
				 cmd.email,
				UserType.merchant,
				cmd.phoneNumber??""
			)
		
			return this.createWallet(account)
		};
		
		 createWallet(account:UserAccount): (string| Error) {
			let err =this.userRepo.Save(account); if (err != null) {
				console.error("Error creating user account %s \n", err.message)
				return  err
			}
		
			let walletID = uuidv4()
			let wallet = new Wallet(
				walletID,
			   account.userID,
			)
		
			 err = this.walletRepo.Save(wallet);  if (err != null) {
				console.error("Error creating user account %s \n", err.message)
				return  err
			}
		
			return walletID
		}
		
	}

   




