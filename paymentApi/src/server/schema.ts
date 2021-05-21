import { gql } from "apollo-server";

export const typeDefs = gql`
  #?models

  #!banks and others eg.MOMO


  type User  {
		walletID:ID!  
		name:String       
  }


  type CardDetails {
    cc: String!
    cvv: String!
    expiryDate: String!
  }



  union DepositDetails = CardDetails | BankDetails | MomoDetails

  #!transactions
  type Transaction {
    txnId: ID!
    txnType: TxnType!
    status: Status!
    client: User!
    userType: UserType
    description: String
    depositDetails: DepositDetails!
    paymentMethod: PaymentMethod!
    amount: Float!
    date: String!
    refund: Refund
  }

  type Refund {
    amount: Float!
    date: String!
    status: Status!
  }

  #!enums
  enum TxnType {
    deposit
    refund
  }
  enum PaymentMethod {
    card
    bank
  }
  enum Status {
    success
    rejected
    failed
  }

  enum UserType {
    merchant
    user
  }

  #!utilities
  input cardTransactionInput {
    txnId: ID!
    txnType: TxnType!
    status: Status!
    client: UserInput!
    userType: UserType!
    description: String
    depositDetails: CardDetailsInput!
    paymentMethod: PaymentMethod!
    amount: Float!
    date: String!
    refund: RefundInput
  }

  input bankTransactionInput {
    txnId: ID!
    txnType: TxnType!
    status: Status!
    client: UserInput!
    userType: UserType!
    description: String
    depositDetails: BankDetailsInput!
    paymentMethod: PaymentMethod!
    amount: Float!
    date: String!
    refund: RefundInput
  }

  input CardDetailsInput {
    cc: String!
    cvv: String!
    expiryDate: String!
  }
  input BankDetailsInput {
   walletID:String!

  }
  

  input UserInput {
    walletID:ID!  
		name:String        
  }

  input RefundInput {
    amount: Float!
    date: String!
    status: Status!
  }

  #?Query
  type Query {
    getTransaction(txnId: ID!): Transaction
    getTransactionbyDate(date: String!): [Transaction!]
    allTransactions(date: String): [Transaction!]
  }

  #?mutations and resolvers
  type Mutations {
    cardPayment(payload: cardTransactionInput!): Transaction!
    bankPayment(payload: bankTransactionInput!): Transaction!
  }
`;
