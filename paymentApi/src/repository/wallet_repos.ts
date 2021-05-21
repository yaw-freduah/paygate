import firebase from'firebase';
import { appendFile } from 'node:fs';

let db=firebase.firestore();
class UserRepository implements UserRepo{
    GetAllTransanctions(userId: string): [Transaction] {
        throw new Error("Method not implemented.");
    }
   
    FindByID(userID: string): UserAccount | Error {
        throw new Error("Method not implemented.");
    }
    FindMerchantAccountByName(name: string): UserAccount | Error {
        throw new Error("Method not implemented.");
    }
    Save(account: UserAccount): Error | null {
        throw new Error
        
        ("Method not implemented.");
    }


    SignIn(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
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


export class TransactionRepository implements TransactionRepo{
     userCollection= db.collection("users");
     transactionCollection =db.collection("transactions");
   async FindByID(txnID: string):Promise<Transaction> {
       try {
           let transaction:Transaction
        let result=await (await this.transactionCollection.doc(txnID).get()).data();
        transaction= result as Transaction
      return transaction;
       } catch (error) {
           throw Error(error);
       }
    
    }
    async GetAllTransaction(date?:string):Promise<Transaction[]> {
        let txns:Transaction[]=[];
        try {
            if(date !=null){
            let query = await this.transactionCollection.where("data","==",date).get();
            query .docs.forEach((txn)=>{
             txns.push(txn.data() as Transaction);
            
            }
            );
            if(txns.length > 0){
                return txns;
            }else {
                throw Error("No transactions Available");
            }
            }else {
                let query = await this.transactionCollection.get();
                query .docs.forEach((txn)=>{
                 txns.push(txn.data() as Transaction);
                
                }
                );
                if(txns.length > 0){
                    return txns;
                }else {
                    throw Error("No transactions Available");
                }
        
            }
        } catch (error) {
            throw  Error(error);
        }

    }
   async Save(txn: Transaction):Promise<void> {
        try {
            await this.transactionCollection.add(Transaction);   
        } catch (error) {
            throw error;
        }
     
      
    }

    MakeBankPayment(txn:Transaction):Transaction{
        throw new Error('Method not implemented.');
    }
    MakeMomoPayment(txn:Transaction):Transaction{
        throw new Error('Method not implemented.');
    }

}



export class PhoneMo {

}