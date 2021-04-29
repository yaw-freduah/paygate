import { test as t } from './api_worker.js';
// 	 interface WalletService{
// 		RegisterCustomer(cmd:RegisterCustomer) :(string| Error)
// 		RegisterMerchant(cmd:RegisterMerchant) :(string| Error)
// 		Topup(cmd:TopUp):(string| Error)
// 		Pay(cmd :Payment) :(string| Error)
// 	}
//     class	WalletServiceImpl  {
// 		userRepo       : UserRepo
// 		walletRepo      :WalletRepo
// 		transactionRepo :TransactionRepo
// 	}
//    function Pay(cmd:Payment,s:WalletServiceImpl): string| Error {
// 	let merchantWallet = s.findMerchantWallet(cmd.Merchant)
// 	if err != nil {
// 		fmt.Printf("Error Pay cannot find merchant %s \n", err.Error())
// 		return "", err
// 	}
// 	customerWallet, err := s.walletRepo.FindByID(cmd.WalletID)
// 	if err != nil {
// 		fmt.Printf("Error Pay cannot find wallet %s \n", err.Error())
// 		return "", err
// 	}
// 	txnID := uuid.NewV4().String()
// 	txn := Transaction{
// 		TransactionID:   txnID,
// 		ReferenceID:     cmd.ReferenceID,
// 		CreditWallet:    merchantWallet.WalletID,
// 		DebitedWallet:   cmd.WalletID,
// 		Description:     cmd.Description,
// 		Amount:          cmd.Amount,
// 		TransactionDate: time.Now(),
// 		TransactionType: TXN_PAYMENT,
// 	}
// 	if err := s.TransactionRepo.Save(&txn); err != nil {
// 		fmt.Printf("Error Pay %s \n", err.Error())
// 		return "", err
// 	}
// 	if err := merchantWallet.creditBalance(cmd.Amount); err != nil {
// 		fmt.Printf("Error Pay %s \n", err.Error())
// 		return "", err
// 	}
// 	if err := s.walletRepo.Save(merchantWallet); err != nil {
// 		fmt.Printf("Error Pay %s \n", err.Error())
// 		return "", err
// 	}
// 	if err := customerWallet.debitBalance(cmd.Amount); err != nil {
// 		fmt.Printf("Error Pay %s \n", err.Error())
// 		return "", err
// 	}
// 	if err := s.walletRepo.Save(customerWallet); err != nil {
// 		fmt.Printf("Error Pay %s \n", err.Error())
// 		return "", err
// 	}
// 	return txnID, nil
// }
// function (s *WalletServiceImpl) Topup(cmd *TopUp) (string, Error) {
// 	wallet, err := s.walletRepo.FindByID(cmd.WalletID)
// 	if err != nil {
// 		fmt.Printf("Error topup on find wallet %s \n", err.Error())
// 		return "", err
// 	}
// 	txnID := uuid.NewV4().String()
// 	txn := Transaction{
// 		TransactionID:   txnID,
// 		ReferenceID:     cmd.ReferenceID,
// 		CreditWallet:    cmd.WalletID,
// 		Description:     cmd.Description,
// 		Amount:          cmd.Amount,
// 		TransactionDate: time.Now(),
// 		TransactionType: TXN_TOPUP,
// 	}
// 	if err := s.transactionRepo.Save(&txn); err != nil {
// 		fmt.Printf("Error topup %s \n", err.Error())
// 		return "", err
// 	}
// 	wallet.creditBalance(cmd.Amount)
// 	if err := s.walletRepo.Save(wallet); err != nil {
// 		fmt.Printf("Error topup %s \n", err.Error())
// 		return "", err
// 	}
// 	return txnID, nil
// }
// func (s *WalletServiceImpl) RegisterCustomer(cmd *RegisterCustomer) (string, Error) {
// 	userID := uuid.NewV4().String()
// 	account := UserAccount{
// 		UserID:      userID,
// 		Name:        cmd.Name,
// 		Email:       cmd.Email,
// 		Phonenumber: cmd.Phonenumber,
// 		UserType:    CUSTOMER,
// 	}
// 	return s.createWallet(&account)
// }
// func (s *WalletServiceImpl) RegisterMerchant(cmd *RegisterMerchant) (string, Error) {
// 	userID := uuid.NewV4().String()
// 	account := UserAccount{
// 		UserID:   userID,
// 		Name:     cmd.Name,
// 		Email:    cmd.Email,
// 		UserType: MERCHANT,
// 	}
// 	return s.createWallet(&account)
// }
// func (s *WalletServiceImpl) createWallet(account *UserAccount) (string, Error) {
// 	if err := s.userRepo.Save(account); err != nil {
// 		fmt.Printf("Error creating account %s \n", err.Error())
// 		return "", err
// 	}
// 	walletID := uuid.NewV4().String()
// 	wallet := Wallet{
// 		WalletID: walletID,
// 		UserID:   account.UserID,
// 	}
// 	if err := s.walletRepo.Save(&wallet); err != nil {
// 		fmt.Printf("Error creating wallet %s \n", err.Error())
// 		return "", err
// 	}
// 	return walletID, nil
// }
// func (s *WalletServiceImpl) findMerchantWallet(name string) (*Wallet, Error) {
// 	merchant, err := s.userRepo.FindMerchantAccountByName(name)
// 	if err != nil {
// 		fmt.Printf("Error cannot find merchant %s \n", err.Error())
// 		return nil, err
// 	}
// 	return s.walletRepo.FindByUserID(merchant.UserID)
// }
let pay;
pay = {
    "WalletID": "weef", "Amount": 20, "Description": "paying for dog good", "ReferenceID": "9aefa", "Merchant": "idaf", "test": t.t1
};
let test = JSON.stringify(pay);
console.log(test);
