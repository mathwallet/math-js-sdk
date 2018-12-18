import PostMessage from './PostMessage';
import WalletTypes from './WalletTypes';

class MathApp {
  openUrl(url) {
    return PostMessage.send('openURL', {url : url});
  }

  openThirdApp(url) {
    return PostMessage.send('openThirdApplication', {appSchemeURL : url});
  }

  close() {
    return PostMessage.send('close');
  }

  back() {
    return PostMessage.send('goBack');
  }

  // 0-normal 1-fullScreen
  fullScreen(mode = 1) {
    return PostMessage.send('fullScreen', {mode : mode});
  }

  // 0-portrait 1-landscape
  orientation(mode = 0) {
    let orientation = 'portrait';
    switch(mode)
    {
      case 1:
        orientation = 'landscape';
        break;
      default:
        orientation = 'portrait';
    }
    return PostMessage.send('deviceOrientation', {orientation : orientation});
  }

  share(params) {
    return PostMessage.send('shareAction',{
        "type":1,
        "imageURL":params.img,
        "activity":{
          "type": "event",
          "app": "app",
          "event": "share",
          "name": params.name,
          "data": params.data
        }
    });
  }

  getAppInfo() {
    return PostMessage.send('getAppInfo');
  }

  getLanguage() {
    return new Promise((resolve, reject) => {
      PostMessage.send('getLanguage',{},true).then((language) => {
        resolve(language);
      },reject);
    });
  }

  getWalletType() {
    return new Promise((resolve, reject) => {
      PostMessage.send('activeWalletType').then((res) => {
        resolve(WalletTypes.getType(res.type));
      }, reject);
    });
  }

  getCurrentWallet() {
    return PostMessage.send('activeWalletAccount');
  }

  getWallets() {
    return PostMessage.send('selectWallets');
  }

  getWalletList(type) {
    let typeID = WalletTypes.getID(type);
    return PostMessage.send('getWalletsWithType', {type : typeID});
  }

  postCustomMessage(method, payload) {
    return PostMessage.send(method, payload);
  }
}

export default MathApp;