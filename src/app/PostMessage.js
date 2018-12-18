import browser from '../util/Browser';

class PostMessage {
  constructor(browser) {
    if(browser.android) {
      this.postMessageHandler = window.mds;
    }else if(browser.iPhone){
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

export default postMessage;