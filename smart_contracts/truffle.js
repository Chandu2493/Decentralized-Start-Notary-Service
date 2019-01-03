var HDWalletProvider = require('truffle-hdwallet-provider');

//var mnemonic = 'pigeon flip laugh defense embody raccoon obvious bid peanut broom brass ring';
//var mnemonic = 'section clinic jaguar art peace pumpkin salt tuna romance unfold oven either';
var mnemonic = "grit little spatial lobster legal client motion glow prosper space human valley"; //wallet address of final

module.exports = {
  networks: { 
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*"
    }, 
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/96dc74d86423421fa49f19f83fbe7aa2') 
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};