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

export default browser;