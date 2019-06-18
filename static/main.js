    
class Profile {	
    constructor({ username, name: { firstName, lastName }, password }) {	
        this.username = username;	
        this.name = {	
            firstName,	
            lastName,	
        };	
        this.password = password;	
    };	
    create(callback) {	
        return ApiConnector.createUser({	
                username: this.username,	
                name: this.name,	
                password: this.password,	
            },	
            (err, data) => {	
                console.log(`Creating user ${this.username}`);	
                callback(err, data);	
         });
    };	

     authorize(callback) {	
        return ApiConnector.performLogin(	
            { username: this.username, password: this.password },	
            (err, data) => {	
                console.log(`Authorizing user ${this.username}`);	
                callback(err, data);	
        });
    };

     addMoney({ currency, amount }, callback) {	
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {	
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);	
            callback(err, data);	
        });	
    };

     transferMoney({ to, amount }, callback) {	
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {	
            console.log(`Transfering ${amount} of Netcoins to ${to}`);	
            callback(err, data);	
        });	
    };

     convertToCoins({ fromCurrency, targetAmount }, callback) {	
        return ApiConnector.convertMoney(	
            { fromCurrency, targetCurrency: 'NETCOIN', targetAmount },	
            (err, data) => {	
                console.log(`Converting ${fromCurrency} to ${targetAmount} Netcoins`);	
                callback(err, data);	
        });
    }	

     convertFromCoins({ targetCurrency, targetAmount }, callback) {	
        return ApiConnector.convertMoney(	
            { fromCurrency: 'NETCOINS', targetCurrency, targetAmount },	
            (err, data) => {	
                console.log(`Converting Netcoins to ${targetAmount} of ${targetCurrency}`);	
                callback(err, data);	
         });		
    };	
};	

 function getStocks(callback) {	
    return ApiConnector.getStocks((err, data) => {	
        console.log(`Getting stocks info`);	
        callback(err, data[99]);	
    });	
};	