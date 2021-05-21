
	class UserAccount  {
		userID      :string;
		name        :string;
		email       :string;
		phoneNumber :string|null;
		userType  : UserType;


		constructor(id:string,name:string,email:string,usertype:UserType,phoneNumber:string,){
			this.userID=id;
			this.name=name;
			this.email=email;
			this.phoneNumber=phoneNumber;
			this.userType=usertype;

		}
	}

	
	class Wallet  {
		walletID :string;
		userID   :string;
		balance  :number;
		transactions?:[Transaction]

            constructor(id:string,userid:string,balance:number=0){
		
				this.userID=userid;
				this.walletID=id
				this.balance=balance;	

			}


			toJson():Object{

				return {
					"userID":this.userID,
					"walletID":this.walletID,
					"balance":this.balance,
					"transactions":this.transactions
				}
			}

         creditBalance(amount :number):Error|null{
            this.balance = this.balance + amount;
			
            return null;
        }
        
          debitBalance(amount :number):null  {
            if (this.balance < amount) {
                throw Error("insuficient balance")
            }
            this.balance = this.balance - amount
            return null
        }


		refundWallet(txn:Transaction){
			//?update transaction
			let date=Date.now().toString();
			txn.refund=new Refund(txn.amount,date,Status.processing)
			//TODO:CALL API HERE 
			//?call debitBalance
			try {
				this.debitBalance(txn.amount)
			} catch (error) {
				throw error;
			}
		
			
			
		}

		
	}

	class Transaction  {
		transactionID   :string;
		transactionType :TxnType;
		paymentMethod	:string;
		status     		:Status;
		description		:string;
		depositDetails  :DepositDetails;
		date 			:string;
		amount          :number;
		refund			:Refund|null;
		constructor(txnid:string,txntype:TxnType,paymethod:string,status:Status, description:string,date:string,amount:number,depositDetails:DepositDetails,refund:Refund|null){
			this.transactionID=txnid;
			this.transactionType=txntype;
			this.paymentMethod=paymethod;
			this.status=status;
			this.description=description;
			this.depositDetails=depositDetails;
			this.date=date;
			this.amount=amount;
			this.refund=refund; 

		}
		
	}



	class Refund{
		amount:number;
		date:string;
		status:Status;


		constructor(amount:number,date:string,status:Status=Status.processing){
			this.amount=amount;
			this.date=date;
			this.status=status;
		}
	}
	class Bank{
		
		constructor(public name:string,public BIC:string){}
	}


	class DepositDetails{
		bank			:Bank;
		CreditWallet?    :string;
		DebitedWallet?  :string;

		constructor(bank:Bank,creditWallet?:string,debitWallet?:string){
			this.bank=bank;
			this.CreditWallet=creditWallet;
			this.DebitedWallet=debitWallet;
		}
	}
	



	enum TxnType{
		deposit="deposit",
		refund ="refund"
	}

	enum Status{
		success="success",
		failed="failed",
		rejected="rejected",
		processing="processing",
	}
	enum UserType{
		merchant="merchant",
		user="user",
	}