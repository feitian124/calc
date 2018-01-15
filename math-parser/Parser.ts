import Operator from "./Operator";

export default class Parser {
  outputQueue: any[] = [];

  rpn(exp) {
    let inputStack = [];
    let outputStack = [];

    for (let i = 0, len = exp.length; i < len; i++) {
      let cur = exp[i];
      if (cur != ' ') {
        inputStack.push(cur);
      }
    }
    while (inputStack.length > 0) {
      let cur = inputStack.shift();
      if (Operator.isOperator(cur)) {
        if (cur == '(') {
          outputStack.push(cur);
        } else if (cur == ')') {
          let po = outputStack.pop();
          while (po != '(' && outputStack.length > 0) {
            this.outputQueue.push(po);
            po = outputStack.pop();
          }
          if (po != '(') {
            throw "error: unmatched ()";
          }
        } else {
          while (Operator.prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0) {
            this.outputQueue.push(outputStack.pop());
          }
          outputStack.push(cur);
        }
      } else {
        this.outputQueue.push(new Number(cur));
      }
    }
    if (outputStack.length > 0) {
      if (outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '(') {
        throw "error: unmatched ()";
      }
      while (outputStack.length > 0) {
        this.outputQueue.push(outputStack.pop());
      }
    }
    return this;
  }

  result() {
    let outputStack = [];
    while (this.outputQueue.length > 0) {
      let cur = this.outputQueue.shift();

      if (!Operator.isOperator(cur)) {
        outputStack.push(cur);
      } else {
        if (outputStack.length < 2) {
          throw "unvalid stack length";
        }
        let sec = outputStack.pop();
        let fir = outputStack.pop();

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
}
