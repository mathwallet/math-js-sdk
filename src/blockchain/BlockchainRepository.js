import BTC from './btc/btc';
import NEO from './neo/neo';
import EOS from './eos/eos';

class BlockchainRepository {
  constructor() {
    this.blockchains = [
      new BTC(),
      new NEO(),
      new EOS(),
    ];
  }

  getBlockchain(chain) {
    return this.blockchains.find(blockchain => blockchain.chain === chain);
  }

  getBlockchains() {
    return this.blockchains;
  }
}

const blockchainRepository = new BlockchainRepository();
export default blockchainRepository;