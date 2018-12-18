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

export default Network;