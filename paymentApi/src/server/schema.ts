import {gql} from 'apollo-server';

export const typeDefs = gql`
#?models

#!banks and others eg.MOMO

type Bank {
name: String!
BIC: String!
}



type User {
id: ID!
name: String!
email: String!
phoneNumber: String
userType:UserType
}

type CardDetails {
cc: String!
cvv: String!
expiryDate: String!
}

type BankDetails {
bank: Bank!
depositAcc: String!
}

type MomoDetails {
phoneNumber: String!
carrier: String!
}

union DepositDetails = CardDetails | BankDetails | MomoDetails

#!transactions
type Transaction {
txnId: ID!
txnType: TxnType!
status: Status!
client: User
description:String
depositDetails: DepositDetails!
paymentType: PaymentType!
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
enum PaymentType {
card
momo
bank
}
enum Status {
success
rejected
processing
failed
}

enum UserType{
  merchant
  user
}

#!utilities

input momoTransactionInput {
txnId: ID!
txnType: TxnType!
status: Status!
client: UserInput
description:String
depositDetails: MomoDetailsInput!
paymentType: PaymentType!
amount: Float!
date: String!
refund: RefundInput
}
input cardTransactionInput {
txnId: ID!
txnType: TxnType!
status: Status!
client: UserInput
description:String
depositDetails: CardDetailsInput!
paymentType: PaymentType!
amount: Float!
date: String!
refund: RefundInput
}

input bankTransactionInput {
txnId: ID!
txnType: TxnType!
status: Status!
client: UserInput!
description:String
depositDetails: BankDetailsInput!
paymentType: PaymentType!
amount: Float!
date: String!
refund: RefundInput
}

input MomoDetailsInput {
phoneNumber: String!
carrier: String!
}
input CardDetailsInput {
cc: String!
cvv: String!
expiryDate: String!
}
input BankDetailsInput {
bank: BankInput!
depositAcc: String!
}
input BankInput {
name: String!
BIC: String!
}

input UserInput {
id: ID!
name: String!
email: String!
phoneNumber: String
}


input RefundInput {
amount: Float!
date: String!
status: Status!
}

input PayerInput {
id: ID!
name: String!
accountNumber: String!
}


#?Query
type Query {
  getTransaction(txnId: ID!): Transaction
  getTransactionbyDate(,date: String!): [Transaction!]
  allTransactions(date: String): [Transaction!]
}

#?mutations and resolvers
type Subscription {
MomoPay(payload: momoTransactionInput!): Transaction!
cardPayment(payload: cardTransactionInput!): Transaction!
bankPayment(payload: bankTransactionInput!): Transaction!
}


`;

