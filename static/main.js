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

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) { 
        return ApiConnector.convertMoney({fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount}, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    };

    transferMoney({to, amount}, callback) { 
        return ApiConnector.transferMoney({to, amount}, (err, data) => {
            console.log(`Transfering ${amount} of Netcoins to ${to}`);
            callback(err, data);
        });
    };
};

function getStocks(callback) {	
    return ApiConnector.getStocks((err, data) => {	
        console.log(`Getting stocks info`);	
        callback(err, data[data.lenght - 1]);	
    });	
};	

function main() {
    const Andrey = new Profile({
        username: 'andrey',
        name: { firstName: 'andrey', lastName: 'shalimov' },
        password: '4kmcx',
    });

    const Dima =  new Profile({
        username: 'dima',
        name: { firstName: 'dima', lastName: 'usov' },
        password: '12356',
    });

    Andrey.create((err, data) => {
        if (err) {
            console.error('Error during creating user Andrey')
        } else {
            console.log(`Andrey is created!`);
            
            Andrey.authorize((err, data) => {
                if (err) {
                    console.error('Error during authorizing user Andrey')
                } else {
                    console.log(`Andrey is authorized!`)
                       
                    Andrey.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
                        if (err) {
                            console.error('Error during adding money to Andrey');
                        } else {
                            console.log(`Added 500000 euros to Andrey`);

                    let targetAmount = Andrey['EUR_NETCOIN'] * 500000;

                            Andrey.convertMoney({ fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: targetAmount }, (err, data) => {
                                if (err) {
                                    console.error('Error during converting money for Andrey');
                                } else {
                                    console.log(`Converted money`);
     
                                    Dima.create((err, data) => {
                                        if (err) {
                                            console.error('Error during creating user Dima')
                                        } else {
                                            console.log(`Dima is created!`);             
       
                                            Andrey.transferMoney({ to: 'dima', amount: 36000 }, (err, data) => {
                                                if (err) {
                                                    console.error('Error during transfering netcoins to Dima');
                                                } else {
                                                    console.log(`Transfered 36000 netkoins to Dima`);
                                                };
                                            });
                                        };
                                    });
                                };
                            });
                        };
                    });
                };
            });
        };
    });
                      
};  

main();  
          
                    