

import types from 'node:util/types';
import { nanoid} from 'nanoid';

	 interface WalletService{
	

	}


	 interface MomoService{}


	interface ApiService {
		MakeBankPayment(txn:Transaction,walletservice:WalletService):Transaction
		MakeMoMoPayment(txn:Transaction,momoservice:MomoService):Transaction
	}



	export class ApiServiceImpl implements ApiService{
		MakeBankPayment(txn: Transaction): Transaction {
			throw new Error('Method not implemented.');
		}
		MakeMoMoPayment(txn: Transaction): Transaction {
			throw new Error('Method not implemented.');
		}

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
		



		//  Pay(cmd:Payment): string| Error {
		// 	let merchantWallet = this.findMerchantWallet(cmd.merchantId)
		// 	if (types.isNativeError(merchantWallet)  ) {
		// 		console.error("Error Pay cannot find merchant %s \n", merchantWallet.message);
		// 		return merchantWallet;
		// 	}

		
		
		// 	let customerWallet= this.walletRepo.FindByID(cmd.debitedWalletID)
		// 	if (types.isNativeError(customerWallet)){
		// 		console.error("Error Pay cannot find wallet %s \n", customerWallet.message)
		// 		return customerWallet;
				
		// 	}
		
		// 	let txnID:string = nanoid(8);
		// 	let txn = new Transaction(
		// 		  txnID,
		// 		  cmd.transactionType,
		// 		cmd.paymentMethod,
		// 		Status.processing,
		// 		cmd.Description,
		// 		Date.now().toString(),
		// 		cmd.Amount,
		// 		new DepositDetails( 
		// 		cmd.bank,
		// 		cmd.creditWalletID,
		// 		cmd.debitedWalletID,
		// 		),
		// 		null
		// 	 )
		
		// 	 this.transactionRepo.Save(txn); 
			
		// try {
			
		// 	merchantWallet.creditBalance(cmd.Amount); 
		   
		// 	this.walletRepo.Save(merchantWallet); 
		   
		// 	customerWallet.debitBalance(cmd.Amount); 
		   
		// 	this.walletRepo.Save(customerWallet); 
		   
		// 	   return txnID
		// } catch (error) {
			
		// 	throw error;
		// }
		// }
		
		//  Topup(cmd:TopUp) :(string| Error) {
		// 	let wallet= this.walletRepo.FindByID(cmd.WalletID)
		// 	if (types.isNativeError(wallet)){
		// 		console.error("Error topup on find wallet %s \n", wallet.message)
		// 		return wallet
		// 	}
		
		// 	let txnID = nanoid(8)
		// 	let txn = new  Transaction(
		// 		txnID,
		// 		cmd.transactionType,
		// 		cmd.paymentMethod,

		// 	  Status.processing,
		// 	  cmd.Description,
		// 	  Date.now().toString(),
		// 	  cmd.Amount,
		// 	  new DepositDetails( 
		// 	  cmd.bank,
		// 	  cmd.creditWalletID,
		// 	  ),
		// 	  null
		// 	)
		
		// 			 this.transactionRepo.Save(txn); 
		
		// 	wallet.creditBalance(cmd.Amount)
		//  this.walletRepo.Save(wallet);  
		
		// 	return txnID
		// }
		
		// RegisterCustomer(cmd :RegisteredUser): (string) {
		// 	let userID = nanoid(10)
		
		// 	let account =new  UserAccount(
		// 		userID,
		// 		 cmd.name,
		// 	     cmd.email,
		// 	    UserType.user,
		// 		cmd.phoneNumber,
		// 	)
		
		// 	return this.createWallet(account)
		// }
		
	 RegisterMerchant(cmd:RegisteredMerchant): (string) {
			let userID = nanoid(10)
		
			let account = new UserAccount(
				 userID,
				 cmd.name,
				 cmd.email,
				UserType.merchant,
				cmd.phoneNumber??""
			)
		
			return this.createWallet(account)
		};
		
		 createWallet(account:UserAccount): (string) {
			try {
				this.userRepo.Save(account);
		
			let walletID = nanoid(10)
			let wallet = new Wallet(
				walletID,
			   account.userID,
			)
		
			  this.walletRepo.Save(wallet);  
		
			return walletID
			} catch (error) {
				throw error;
			}
			
		}
		
	}

   




