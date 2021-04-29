
    class	RegisterCustomer  {
		id	  :string;
		name        :string;
		email       :string;
		phonenumber :string;

		constructor(name:string,email:string,phoneNumber:string){
			this.id=""
			this.name=name;
			this.email=email;
			this.phonenumber=phoneNumber;
		}
	}

	class RegisteredMerchant  {
		id	  :string;
		name  :string;
		phoneNumber :string|null
		email :string;

		constructor(name:string,email:string,phoneNumber:string|null=null){
			this.id=""
			this.name=name;
			this.email=email;
			this.phoneNumber=phoneNumber
		}
	}

	class TopUp  {
		walletID    :string;
		amount      :number;
		userID 		:string;
		description :string;

		constructor(walletid:string,amount:number,description:string,userId:string){
			this.walletID=walletid;
			this.amount=amount;
			this.userID=userId;
			this.description=description;
		}
	}

	class	payment  {
		walletID    :string;
		merchantID    :string;
		amount      :number;
		userID 		:string;
		description :string;

		constructor(walletid:string,amount:number,description:string,userId:string,merchant:string){
			this.walletID=walletid;
			this.amount=amount;
			this.userID=userId;
			this.description=description;
			this.merchantID=merchant;
		}
	}
