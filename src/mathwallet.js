import MathApp from './app/MathApp';
import BlockchainRepository from './blockchain/BlockchainRepository';


class MathWallet extends MathApp {
  constructor(){
    super();
    // load support blockchains
    BlockchainRepository.getBlockchains();
    BlockchainRepository.getBlockchains().map(blockchain => {
      this[blockchain.chain] = blockchain;
    });
  }
}

let mathwallet = new MathWallet();

// browsers
if(typeof window !== 'undefined'){
  window.mathwallet = mathwallet;
}

// nodejs
export default mathwallet;