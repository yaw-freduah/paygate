import * as admin from "firebase-admin";
import {ApiServiceImpl,} from '../services/service'
const serviceAccount = require("../../payment-portal-1438f-firebase-adminsdk-xjngp-e6fd79a5f1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


let apiSrv = new ApiServiceImpl()

const resolvers = {
  //!query

  Query: {
    getTransaction: (txnId: string) => {
      //TODO:TALK TO FIREBASE
      // return new Transaction()
    },

    getTransactionbyDate: (date: string) => {
      // return new Transaction()
    },
    allTransactions: (date?: string) => {},
    //!subscriptions

    Mutation: {
      MomoPay: (payload: Transaction) => {
       
          return   apiSrv.MakeMoMoPayment(payload);
        }  
        
      },
      cardPayment: (payload: Transaction) => {

      },
      bankPayment: (payload: Transaction) => {
          apiSrv.MakeBankPayment(payload);
      },
    
  },
};

export default resolvers;
