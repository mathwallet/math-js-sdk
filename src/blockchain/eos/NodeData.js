import * as NodeDataUrls from './NodeDataUrls';
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

export default NodeData;