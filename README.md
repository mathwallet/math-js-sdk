# math-js-sdk
Javascript SDK for MathWallet

## Demo
[https://medishares-cn.oss-cn-hangzhou.aliyuncs.com/demos/mathwallet-js-sdk/index.html](https://medishares-cn.oss-cn-hangzhou.aliyuncs.com/demos/mathwallet-js-sdk/index.html)  

此链接用来演示如何使用math-js-sdk，您可以在麦子钱包DAPP浏览器中打开  
This link is the demo of how to use the math-js-sdk. You can open it in the MathWallet DAPP Browser.

## Installation
#### npm
Install
```shell
npm install math-js-sdk
```
Require module
```javascript
var mathwallet = require('math-js-sdk');
```

#### html
Drop the `dist/mathwallet.min.js` bundle into your html project
```html
<script src="path/to/mathwallet.min.js"></script>
```
Get instance
```javascript
var mathwallet = window.mathwallet;
```

## Usage

### Note
<font color=#C71585>注意: 此SDK需要在麦子钱包的DAPP浏览器中使用</font>  
<font color=#C71585>Note: The SDK needs to be used in the MathWallet DAPP Browser.</font>

### Common
适用于麦子钱包DAPP浏览器的通用方法  
Common method for MathWallet DAPP Browser

#### isMath
```javascript
mathwallet.isMath();
```
Return
```javascript
true
```

#### getAppInfo
获取用户麦子钱包信息  
Get user MathWallet info
```javascript
mathwallet.getAppInfo().then(console.log);
```
Return
```javascript
{
  "name": "Math Wallet",
  "client": "iOS",
  "version": "1.9.3",
  "build": "25",
  "deviceId": "2FB1AD00-20C7-45FF-AE94-A2F30A02F8F6"
}
```

#### share
分享图片或链接到社交平台，如微信 
Share to third app like Wechat.
```javascript
// Image
mathwallet.shareTo(1,{
      "imageURL": "https://medishares-cn.oss-cn-hangzhou.aliyuncs.com/dapp/263R1568603688.jpg",
      // "text": "Share Text",
      // Extra Data
      // "activity": {
      //   "type": "event",
      //   "app": "app",
      //   "event": "share",
      //   "name": params.name,
      //   "data": params.data
      // }
      }
    ).then(console.log);
// Link
mathwallet.shareTo(2,{
      "title": "Math",
      "desc": "Math Wallet",
      "link": "https://www.mathwallet.org",
      "thumImage": "https://medishares-cn.oss-cn-hangzhou.aliyuncs.com/dapp/263R1568603688.jpg",
      // Extra Data
      // "activity": {
      //   "type": "event",
      //   "app": "app",
      //   "event": "share",
      //   "name": params.name,
      //   "data": params.data
      // }
      }
    ).then(console.log);
// Save to album
mathwallet.shareTo(3,{
      "imageURL": "https://medishares-cn.oss-cn-hangzhou.aliyuncs.com/dapp/263R1568603688.jpg"
      }
    ).then(console.log);
```
Return
```javascript
{
  "result": 1
}
```

#### openUrl
打开一个新的浏览器窗口  
Open a new webview tab
```javascript
mathwallet.openUrl("http://www.mathwallet.org").then(console.log);
```
Return
```javascript
{
  "result": 1
}
```

#### openThirdApp
打开第三方应用，如微信、KakaoTalk等  
Open third app like Wechat, KakaoTalk.
```javascript
mathwallet.openThirdApp("tel:110").then(console.log);
```
Return
```javascript
{
  "result": 1
}
```

#### close
关闭当前窗口  
Close window
```javascript
mathwallet.close().then(console.log);
```
Return
```javascript
{
  "result": 1
}
```

#### back
后退到上一页  
Back to previous page
```javascript
mathwallet.back().then(console.log);
```
Return
```javascript
{
  "result": 1
}
```

#### fullScreen
设置是否全屏  
Set full screen  
`0 - normal screen`  
`1 - full screen`
```javascript
mathwallet.fullScreen(1).then(console.log);
```
Return
```javascript
{
  "result": 1
}
```

#### orientation
设置屏幕方向  
Set screen orientation  
`0 - portrait`  
`1 - landscape`
```javascript
mathwallet.orientation(1).then(console.log);
```
Return
```javascript
{
  "result": 1
}
```

#### getLanguage
获取用户APP语言  
Get user app language 
```javascript
mathwallet.getLanguage().then(console.log);
```
Return
```javascript
"cn"
```

#### getCurrentWalletType
获取用户当前钱包类型  
Get user current wallet type
```javascript
mathwallet.geCurrentWalletType().then(console.log);
```
Return
```javascript
"BTC"
```

#### getCurrentWallet
获取用户当前钱包信息  
Get user current wallet info
```javascript
mathwallet.getCurrentWallet().then(console.log);
```
Return
```javascript
{
  "blockchain":"EOS",
  "nickname":"medisharesbp",
  "address":"medisharesbp",
  "authority":"active"
}
```
#### walletPicker
钱包地址选取器（多地址弹框，由用户授权使用哪个账户）  
Wallet Picker
```javascript
// "BTC"、"ETH"、"EOS"、"TRX"、"POLKADOT"、"ONT"
mathwallet.walletPicker("ETH").then(console.log);
```
Return
```javascript
{
  "nickname":"medisharesbp",
  "address":"medisharesbp"
}
```

#### getWalletList
获取用户某类型的钱包列表  
Get user wallets of the type
```javascript
// "BTC"、"ETH"、"EOS"、"TRX"、"POLKADOT"、"ONT"
mathwallet.getWalletList("EOS").then(console.log);
```
Return
```javascript
[
  {
    "nickname":"medisharesbp",
    "address":"medisharesbp"
  },
  {
    "nickname":"medisharesbb",
    "address":"medisharesbb"
  }
]
```

#### postCustomMessage
发送其它自定义消息  
For other custom action
```javascript
mathwallet.postCustomMessage(method, payload);
```




### BTC Wallet
麦子钱包DAPP浏览器中有关BTC钱包的方法  
BTC wallet method for MathWallet DAPP Browser

#### BTC.transfer
发起BTC转账交易  
Send BTC transaction
```javascript
mathwallet.BTC.transfer(from, amount, to, memo).then(console.log);
```
OR
```javascript
let transaction = {
  from : from,
  amount : amount,
  to : to,
  memo : memo
}
mathwallet.BTC.transfer(transaction).then(console.log);
```
Return
```javascript
{
  "result":"trxid" // transaction hash
}
```



### NEO Wallet
麦子钱包DAPP浏览器中有关NEO钱包的方法  
NEO wallet method for MathWallet DAPP Browser

#### NEO.transfer
发起NEO转账交易  
Send NEO transaction
```javascript
mathwallet.NEO.transfer(from, amount, to, memo).then(console.log);
```
OR
```javascript
let transaction = {
  from : from,
  to : to,
  amount : amount,
  contract : contract,
  precision : precision,
  symbol : symbol,
  memo : memo
}
mathwallet.NEO.transfer(transaction).then(console.log);
```
Return
```javascript
{
  "result":"trxid" // transaction hash
}
```



### EOS Wallet
麦子钱包DAPP浏览器中有关EOS钱包的方法  
EOS wallet method for MathWallet DAPP Browser  
`注意: 麦子钱包已兼容Scatter，有关EOS的DAPP开发可直接使用Scatter`  
`Note: MathWallet is already compatible with Scatter. You can use Scatter to build your EOS DAPP`

#### EOS.init
在使用EOS相关方法前需要初始化EOS节点信息  
Please initialize BP information before using the other method
```javascript
let config = {
  "nodes":[

    // 0: testnet-node
    {
      "jsonRpc":"https:\/\/eostestnet.medishares.net",
      "chainID":"cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"
    },

    // 1: testnet-node
    {
      "jsonRpc":"https:\/\/eosmainnet.medishares.net",
      "chainID":"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    }

  ]
};
mathwallet.EOS.init(config);  //return true
```

#### EOS.getAccount
获取当前钱包账户信息，在使用与账户相关方法前需要先使用getAccount()方法  
Get current account info, must use getAccount() before using the other method.
```javascript
mathwallet.EOS.getAccount().then(console.log);
```


#### EOS.get_info
获取区块信息  
Get block info
```javascript
mathwallet.EOS.get_info().then(console.log);
```

#### EOS.abi_json_to_bin
JSON信息转为二进制数据  
JSON to Bin
```javascript
mathwallet.EOS.abi_json_to_bin(data).then(console.log);
```

#### EOS.signTransaction
签名交易  
Sign transaction
```javascript
mathwallet.EOS.signTransaction(transaction).then(console.log);
```

#### EOS.push_transaction & EOS.push_transaction_all
发起交易  
Push transaction
```javascript
mathwallet.EOS.push_transaction(transaction,signatures,compression).then(console.log);
```
OR
```javascript
mathwallet.EOS.push_transaction_all(data).then(console.log);
```

#### EOS.customSignProvider
自定义签名提供者，用于类eos.js插件  
Custom Sign Provider, for plugin like eos.js
```javascript
// Eos.js
Eos({
  httpEndpoint: "https://path/to/node",
  chainId:      "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  signProvider: mathwallet.EOS.customSignProvider,
});
```

#### EOS.getEos
获取已经初始化节点信息及签名提供者后的Eos.js实例，使用前需要先引入Eos.js插件  
Get Eos.js instance which node httpEndpoint and signProvider have been initialized. Please include the eos.js plugin first.
```html
<script src="http://path/to/eos.js"></script>
<script>
var eos = mathwallet.EOS.getEos();

//do something with eos.js
eos.getBlock(1);
</script>
```



### Download Math Wallet 麦子钱包下载

[http://mathwallet.org](http://mathwallet.org)  

如果您希望将您开发的DAPP加入麦子钱包，请通过邮箱联系我们 hello@medishares.org  
  
If you would like to list your DAPP in Math Wallet, please send your DAPP information to hello@medishares.org
