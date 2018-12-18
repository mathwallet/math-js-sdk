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
export default Account;