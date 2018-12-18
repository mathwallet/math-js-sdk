let list = new Map();

list.set(1 , 'ETH');
list.set(2 , 'NEO');
list.set(3 , 'EOS');
list.set(4 , 'EOSFORCE');
list.set(5 , 'ONT');
list.set(6 , 'BTC');
list.set(7 , 'ESN');
list.set(8 , 'TRX');

const WalletTypes = {
  getType(id) {
    return list.has(id) ? list.get(id) : 'UNKNOWN';
  },

  getID(type) {
    type = type.toUpperCase();
    for ( const [ key, value ] of list ) {
      if(value == type) return key;
    }
    return 0;
  }
};

export default WalletTypes;