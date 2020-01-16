'use strict';

const u   = typeof navigator != 'undefined' ? navigator.userAgent : '';
const app = typeof navigator != 'undefined' ? navigator.appVersion : '';
const browser = {
  trident: u.indexOf('Trident') > -1,
  presto: u.indexOf('Presto') > -1,
  webKit: u.indexOf('AppleWebKit') > -1,
  gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
  mobile: !!u.match(/AppleWebKit.*Mobile.*/),
  ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
  iPhone: u.indexOf('iPhone') > -1 ,
  iPad: u.indexOf('iPad') > -1,
  mdsApp: u.indexOf('MdsApp') > -1,
  mdsVer: u.indexOf('MdsApp') > -1?u.match(/MdsApp\/[^\s]+\s?/)[0].trim().split('/')[1]:'0' //MdsApp版本
};

class PostMessage {
  constructor(browser$$1) {
    if(browser$$1.mdsApp && browser$$1.android) {
      this.postMessageHandler = window.mds;
    }else if(browser$$1.mdsApp && browser$$1.iPhone && typeof window.webkit != 'undefined'){
      this.postMessageHandler = window.webkit.messageHandlers.mds;
    }else{
      // this.postMessageHandler = window;
      this.postMessageHandler = {
        postMessage : console.log //debug
      };
    }
  }


  sign_global_callback(callback){
    if(typeof callback == 'function'){
      let globalCallbackFuncName = 'mdseosappcallback' + new Date().getTime() + Math.floor(Math.random()*100000000+10000000);
      window[globalCallbackFuncName] = function(res){
        callback(res);
        window[globalCallbackFuncName] = null;
      };
      console.log(globalCallbackFuncName);
      return globalCallbackFuncName;
    }else{
      return callback;
    }
  }



  send(method, payload = {}, returnData = false) {
    return new Promise((resolve, reject) => {
      const callback = (res) => {
        if(returnData){
          return resolve(res);
        }

        let result = JSON.parse(res);
        if(result.error){
          reject(result.error);
        }else{
          resolve(result);
        }
        return true;
      };

      let message = {
        method : method,
        params : payload,
        callback : this.sign_global_callback(callback)
      };

      try{
        this.postMessageHandler.postMessage(JSON.stringify(message));
      }catch(err){
        reject(err);
      }
    });
  }
}

let postMessage = new PostMessage(browser);

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

class MathApp {
  isMath() {
    return browser.mdsApp;
  }

  openUrl(url) {
    return postMessage.send('openURL', { url: url });
  }

  openThirdApp(url) {
    return postMessage.send('openThirdApplication', { appSchemeURL: url });
  }

  close() {
    return postMessage.send('close');
  }

  back() {
    return postMessage.send('goBack');
  }

  // 0-normal 1-fullScreen
  fullScreen(mode = 1) {
    return postMessage.send('fullScreen', { mode: mode });
  }

  // 0-portrait 1-landscape
  orientation(mode = 0) {
    let orientation = 'portrait';
    switch (mode) {
      case 1:
        orientation = 'landscape';
        break;
      default:
        orientation = 'portrait';
    }
    return postMessage.send('deviceOrientation', { orientation: orientation });
  }

  share(params) {
    return postMessage.send('shareAction', {
      "type": 1,
      "imageURL": params.img,
      "activity": {
        "type": "event",
        "app": "app",
        "event": "share",
        "name": params.name,
        "data": params.data
      }
    });
  }
  // 1-image 2-link
  shareTo(type = 1, params = {}) {
    return postMessage.send('shareAction', {
      "type": type,
      ...params
    });
  }

  getAppInfo() {
    return postMessage.send('getAppInfo');
  }

  getLanguage() {
    return new Promise((resolve, reject) => {
      postMessage.send('getLanguage', {}, true).then((language) => {
        resolve(language);
      }, reject);
    });
  }

  getWalletType() {
    return new Promise((resolve, reject) => {
      postMessage.send('activeWalletType').then((res) => {
        resolve(WalletTypes.getType(res.type));
      }, reject);
    });
  }

  getCurrentWallet() {
    return postMessage.send('activeWalletAccount');
  }

  getWallets() {
    return postMessage.send('selectWallets');
  }

  getWalletList(type) {
    let typeID = WalletTypes.getID(type);
    return postMessage.send('getWalletsWithType', { type: typeID });
  }

  postCustomMessage(method, payload) {
    return postMessage.send(method, payload);
  }
}

class Blockchain {
  constructor(chain = ''){
    this.chain = chain;
  }
}

const BTC = 'BTC';
const NEO = 'NEO';
const EOS = 'EOS';

class BTC$1 extends Blockchain {
  constructor() {
    super(BTC);
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
    return postMessage.send('sendTransaction',{
      blockchain : this.chain,
      action : "transfer",
      data : data
    });
  }
}

class NEO$1 extends Blockchain {
  constructor() {
    super(NEO);
  }

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
    data.symbol = data.symbol ? data.symbol : "NEO";
    data.precision = data.precision ? data.precision : 8;
    return postMessage.send('sendTransaction',{
      blockchain : this.chain,
      action : "transfer",
      data : data
    });
  }
}

class Account {
  //初始化
  constructor( config ) {
    if(config){
      this.account            =  config.account            ? config.account : null;
      this.accountPermission  =  config.accountPermission  ? config.accountPermission : 'active';
    }
  }

  //设置活跃账号
  setAccount( account ) {
    this.account = account;
  }

  //获取活跃账号
  getAccount(){
    return this.account;
  }

  //设置活跃账户权限
  setAccountPermission( permission ){
    this.accountPermission = permission;
  }

  //获取活跃账户权限
  getAccountPermission(){
    return this.accountPermission;
  }
}

const get_info             =  '/v1/chain/get_info';
const abi_json_to_bin      =  '/v1/chain/abi_json_to_bin';
const push_transaction     =  '/v1/chain/push_transaction';
const get_table_rows       =  '/v1/chain/get_table_rows';
const get_account          =  '/v1/chain/get_account';
const get_producers        =  '/v1/chain/get_producers';
const get_currency_balance =  '/v1/chain/get_currency_balance';
const get_account_registed =  '/v1/chain/get_account';
const get_actions          =  '/v1/history/get_actions';

var NodeDataUrls = /*#__PURE__*/Object.freeze({
  get_info: get_info,
  abi_json_to_bin: abi_json_to_bin,
  push_transaction: push_transaction,
  get_table_rows: get_table_rows,
  get_account: get_account,
  get_producers: get_producers,
  get_currency_balance: get_currency_balance,
  get_account_registed: get_account_registed,
  get_actions: get_actions
});

class NodeData {
  //初始化
  constructor( config ) {
    if(config){
      this.httpEndpoint      =  config.httpEndpoint      ? config.httpEndpoint : null;
      this.chainID           =  config.chainID           ? config.chainID : null;
      this.nodes             =  config.nodes             ? config.nodes : [];
    }
    if(config.defaultNode){
      this.setNode(config.defaultNode);
    }
  }

  //设置当前社区
  setNode(chainID){
    if(this.nodes[chainID] && this.nodes[chainID].jsonRpc){
      this.chainID = chainID;
      this.httpEndpoint = this.nodes[chainID].jsonRpc;
      this.netChainID = this.nodes[chainID].chainID;
      return true;
    }else{
      return false;
    }
  }

  //获取当前社区
  getNode(){
    return this.chainID;
  }

  //获取当前链ID
  getChainID(){
    return this.netChainID;
  }

  //获取当前节点地址
  getHttpEndPoint(){
    return this.httpEndpoint;
  }

  //获取Rpc地址
  getRpcUrl(type)
  {
    if(typeof NodeDataUrls[type] == 'undefined'){
      throw new Error("undefined url");
    }
    return this.getHttpEndPoint() + NodeDataUrls[type];
  }
}

const getResponseData = (response , type = 'JSON') => {
  type = type.toLowerCase();
  switch (type) {
    case 'json' : 
      return response.json();
    case 'html' : 
      return response.text();
    case 'blob' : 
      return response.blob();
    default : 
      return new Promise((resolve) => {resolve(response.body);});
  }
};

class Network {

  static get(params) {
    if(typeof params.dataType == 'undefined') params.dataType = 'JSON';
    return new Promise((resolve, reject) => {
      const options = {
        method : 'GET',
        headers : params.headers
      };
      fetch(params.url , options).then((res) => {
        if(res.ok){
          getResponseData(res, params.dataType).then(resolve, reject);
        }else{
          reject(res.status);
        }
      }, (err)=>reject(err));
    });
  }

  static post(url , data = {}, headers = {}) {
    if(headers['Content-Type']){
      headers['Content-Type'] = 'application/json';
    }
    return fetch(url , {
      method : 'POST',
      headers : headers,
      body : JSON.stringify(data)
    });
  }
}

class EOS$1 extends Blockchain {
  constructor() {
    super(EOS);
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
    return postMessage.send('eosTransactionSign',{
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
      postMessage.send('eosGetAccount').then((accountInfo) => {
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

class BlockchainRepository {
  constructor() {
    this.blockchains = [
      new BTC$1(),
      new NEO$1(),
      new EOS$1(),
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

class MathWallet extends MathApp {
  constructor(){
    super();
    // load support blockchains
    blockchainRepository.getBlockchains();
    blockchainRepository.getBlockchains().map(blockchain => {
      this[blockchain.chain] = blockchain;
    });
  }
}

let mathwallet = new MathWallet();

// browsers
if(typeof window !== 'undefined'){
  window.mathwallet = mathwallet;
}

module.exports = mathwallet;
