class MathError extends Error{
  constructor(msg, code) {
    this.msg = msg;
    this.code = code;
    console.log(this.code + ':' + this.msg);
  }
}

export default MathError;