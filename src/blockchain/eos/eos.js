import Blockchain from '../Blockchain';
import * as BlockchainTypes from '../BlockchainTypes';
import PostMessage from '../../app/PostMessage';
import Account from './Account';
import NodeData from './NodeData';
import Network from '../../util/Network';

class EOS extends Blockchain {
  constructor() {
    super(BlockchainTypes.EOS);
    this.account = new Account();
  }

  init ( config ) {
    this.node = new NodeData(config);
    return true;
  }

  //获取链信息
  get_info(){
    return Network.get({
      url : this.node.getRpcUrl('get_info')
    });
  }

  //序列化
  abi_json_to_bin( data ){
    return Network.post({
      url : this.node.getRpcUrl('abi_json_to_bin'),
      data : data
    });
  }

  //发起交易
  push_transaction(transaction,signatures,compression){
    if(!compression) compression = "none";
    return Network.post({
      url : this.node.getRpcUrl('push_transaction'),
      data : {
        compression : compression,
        transaction : transaction,
        signatures : signatures,
      }
    });
  }

  //发起交易 - 传入完整数据
  push_transaction_all(data){
    return Network.post({
      url : this.node.getRpcUrl('push_transaction'),
      data : data
    });
  }

  signTransaction(transaction){
    if(!this.node) throw new Error('EOS chain need to initialize.');
    return PostMessage.send('eosTransactionSign',{
      transaction:transaction,
      network:{
        blockchain : "eos",
        chainId : this.node.getChainID(),
      }
    });
  }

  customSignProvider({buf, sign, transaction}) {
    return new Promise((resolve, reject) => {
      this.signTransaction(transaction).then((res) => {
        if(res.error){
          reject(res.error);
        }else{
          resolve(res.result);
        }
      });
    });
  }

  getEos() {
    if(typeof Eos == 'undefined'){
      throw new Error('Eos.js not found!');
    }
    if(typeof this.node == 'undefined'){
      throw new Error('EOS chain need to initialize.');
    }
    return Eos({
      httpEndpoint: this.node.getHttpEndPoint(),
      chainId:      this.node.getChainID(),
      signProvider: this.customSignProvider,
    });
  }

  getAccount() {
    return new Promise((resolve, reject) => {
      PostMessage.send('eosGetAccount').then((accountInfo) => {
        this.account.setAccount(accountInfo.account);
        this.node.setNode(accountInfo.node);
        if(accountInfo.authority){
          this.account.setAccountPermission(accountInfo.authority);
        }
        resolve(accountInfo);
      },reject);
    });
  }
}

export default EOS;