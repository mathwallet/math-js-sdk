import Blockchain from '../Blockchain';
import * as BlockchainTypes from '../BlockchainTypes';
import PostMessage from '../../app/PostMessage';

class BTC extends Blockchain {
  constructor() {
    super(BlockchainTypes.BTC);
  }

  /**
   * args: from, amount, to, memo
   */
  transfer(...args) {
    let data = {};
    if(typeof args[0] == 'object'){
      data = args[0];
    }else{
      data = {
        from : args[0],
        amount : args[1],
        to : args[2],
        memo : args[3]
      };
    }
    data.symbol = data.symbol ? data.symbol : "BTC";
    data.precision = data.precision ? data.precision : 6;
    return PostMessage.send('sendTransaction',{
      blockchain : this.chain,
      action : "transfer",
      data : data
    });
  }
}

export default BTC;