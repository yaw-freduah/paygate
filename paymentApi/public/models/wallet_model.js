"use strict";
class RegisterCustomer {
    constructor(name, email, phoneNumber) {
        this.id = "";
        this.name = name;
        this.email = email;
        this.phonenumber = phoneNumber;
    }
}
class RegisteredMerchant {
    constructor(name, email, phoneNumber = null) {
        this.id = "";
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
class TopUp {
    constructor(walletid, amount, description, userId) {
        this.walletID = walletid;
        this.amount = amount;
        this.userID = userId;
        this.description = description;
    }
}
class payment {
    constructor(walletid, amount, description, userId, merchant) {
        this.walletID = walletid;
        this.amount = amount;
        this.userID = userId;
        this.description = description;
        this.merchantID = merchant;
    }
}
