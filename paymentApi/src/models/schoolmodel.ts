
import AES from 'crypto-js/aes'
import firebaseFirestore from 'firebase';
	export class Students  {
		id      :string;
		name        :string;
		course       :string;
		fees :number;
		balance:	number;


		constructor(id:string,name:string,course:string,fees:number,balance:number){
			this.id=id;
			this.name=name;
			this.course=course;
			this.fees=fees;
			this.balance=balance;

		}
	}

	export	class Products {
			constructor(public price:number,
				public stockNumber:number){}
		}
	
		export	class Wallet  {
		walletID :string;
		name:string;
		balance  :number;
		card:Card;
		transactions?:[Transaction]

            constructor(id:string,name:string,balance:number=0,card:Card){
		
				this.name=name;
				this.walletID=id
				this.balance=balance;
				this.card=card;	

			}


			toJson():Object{

				return {
					"userID":this.name,
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


	export	class Card {
		
		constructor(public cardNumber:number,public cvv:string,public expiry:string,public name:string){
		

		}


		encodePin(cvv:string):string{
			let newstring=AES.encrypt(cvv,"a873eab00174e477027ba65b43988cf8fd835dee69884e0f910feabe49e6b0be").toString()
			return newstring;
		}

		decodePin(encryp:string){
			let decodTxt=AES.decrypt(encryp,"a873eab00174e477027ba65b43988cf8fd835dee69884e0f910feabe49e6b0be").toString(CryptoJS.enc.Utf8);
			return decodTxt;
		}


		async checkPin(cvv:string):Promise<Boolean>{
			let txt=this.decodePin(cvv)
				let query=	 (await firebaseFirestore.firestore().collection("wallet").where("card.cardNumber","==",this.cardNumber).get())
				if(query.docs.length==0){
					throw Error("No Documents available");
				}
				let result =query.docs[0].data() as Wallet
			
			if(txt==result.card.cvv){
				return true;

			}else {
				return false;
			}
		}



		
	}

	export	class Transaction {

		transactionID   :string;
		transactionType :TxnType;
		client			:;
		paymentMethod	:paymentMethod;
		status     		:Status;
		userType		:UserType;
		description		:string;
		depositDetails  :DepositDetails;
		date 			:string;
		amount          :number;
		refund			:Refund|null;


		constructor(txnid:string,txntype:TxnType,paymethod:paymentMethod,status:Status, description:string,date:string,amount:number,depositDetails:DepositDetails,refund:Refund|null,client:Students,userType:UserType){
			this.transactionID=txnid;
			this.client=client;
			this.transactionType=txntype;
			this.paymentMethod=paymethod;
			this.status=status;
			this.description=description;
			this.depositDetails=depositDetails;
			this.date=date;
			this.amount=amount;
			this.refund=refund; 
			this.userType=userType;


		}
		
	}


	


	export	class Refund{
		amount:number;
		date:string;
		status:Status;


		constructor(amount:number,date:string,status:Status=Status.processing){
			this.amount=amount;
			this.date=date;
			this.status=status;
		}
	}
	


	interface DepositDetails{
		

		
	}
	
	

		class BankDetails implements DepositDetails{
		constructor(public walletId:string){}
	}

	class cardDetails implements DepositDetails{
		constructor (public cardNumber:string){}
	}


	enum paymentMethod{
		momo="momo",
		bank="bank"
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


