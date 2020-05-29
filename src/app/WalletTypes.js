let list = new Map();

list.set(1, 'ETH');
list.set(2, 'NEO');
list.set(3, 'EOS');
list.set(4, 'EOSFORCE');
list.set(5, 'ONT');
list.set(6, 'BTC');
list.set(7, 'ESN');
list.set(8, 'TRX');
list.set(9, 'NAS');
list.set(10, 'BOS');
list.set(11, 'ENU');
list.set(12, 'TELOS');
list.set(13, 'ZILLIQA');
list.set(14, 'BINANCE');
list.set(15, 'IRIS');
list.set(16, 'COSMOS');
list.set(17, 'CHAINX');
list.set(19, 'CODEX');
list.set(20, 'VECHAIN');
list.set(21, 'FT');
list.set(19, 'POLKADOT');
list.set(19001, 'KUSAMA');

const WalletTypes = {
  getType(id) {
    return list.has(id) ? list.get(id) : 'UNKNOWN';
  },

  getID(type) {
    type = type.toUpperCase();
    for (const [key, value] of list) {
      if (value == type) return key;
    }
    return 0;
  }
};

export default WalletTypes;