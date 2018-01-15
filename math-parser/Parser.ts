import Stack from "./Stack";
import Operator from "./Operator";

export default class Parser {
  inputStack: Stack;
  outputStack: Stack;
  outputQueue: any[];

  constructor() {
    this.inputStack = new Stack();
    this.outputStack = new Stack();
    this.outputQueue = [];
  }

  dal2Rpn(exp) {
    console.log(exp);
    for (var i = 0, len = exp.length; i < len; i++) {
      var cur = exp[i];
      if (cur != ' ') {
        this.inputStack.push(cur);
      }
    }
    while (!this.inputStack.isEmpty()) {
      var cur = this.inputStack.pop();
      if (Operator.isOperator(cur)) {
        if (cur == '(') {
          this.outputStack.push(cur);
        } else if (cur == ')') {
          var po = this.outputStack.pop();
          while (po != '(' && !this.outputStack.isEmpty()) {
            this.outputQueue.push(po);
            po = this.outputStack.pop();
          }
          if (po != '(') {
            throw new Error('unmatched (),last  key: ' + po);
          }
        } else {
          while (Operator.prioraty(cur, this.outputStack.peek()) && !this.outputStack.isEmpty()) {
            this.outputQueue.push(this.outputStack.pop());
          }
          this.outputStack.push(cur);
        }
      } else {
        this.outputQueue.push(new Number(cur));
      }
    }
    if (!this.outputStack.isEmpty()) {
      if (this.outputStack.peek() == ')' || this.outputStack.peek() == '(') {
        throw "error: unmatched ()";
      }
      while (!this.outputStack.isEmpty()) {
        this.outputQueue.push(this.outputStack.pop());
      }
    }
    return this.outputQueue;
  }

  evalRpn(rpnQueue) {
    var outputStack = [];
    while (rpnQueue.length > 0) {
      var cur = rpnQueue.shift();

      if (!Operator.isOperator(cur)) {
        outputStack.push(cur);
      } else {
        if (outputStack.length < 2) {
          throw "unvalid stack length";
        }
        var sec = outputStack.pop();
        var fir = outputStack.pop();

        outputStack.push(this.getResult(fir, sec, cur));
      }
    }

    if (outputStack.length != 1) {
      throw "unvalid expression";
    } else {
      return outputStack[0];
    }
  }

  getResult(fir: Number, sec: Number, cur): Number {
    let exp: string = fir + cur + sec;
    return eval(exp);
  }

  test() {
    console.log(this.evalRpn(this.dal2Rpn('1 + 2')));
    console.log(this.evalRpn(this.dal2Rpn('1 + 2 + 3')));
    console.log(this.evalRpn(this.dal2Rpn('1 + 2 * 3')));
    console.log(this.evalRpn(this.dal2Rpn('1 + 2 * 3 - 4 / 5')));
    console.log(this.evalRpn(this.dal2Rpn('( 1 + 2 )')));

    console.log(this.evalRpn(this.dal2Rpn('( 1 + 2 ) * ( 3 - 4 ) / 5')));
    console.log(this.evalRpn(this.dal2Rpn('( 1 + 2 ) * (( 3 - 4 ) / 5)')));
  }
}

let parser = new Parser();
parser.test();
