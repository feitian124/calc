import Operator from "./Operator";
import { Big } from 'big.js';

export default class Parser {
  outputQueue: any[] = [];

  rpn(exp: string) {
    let inputStack = [];
    let outputStack = [];
    this.outputQueue = [];

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
        this.outputQueue.push(new Big(cur));
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
    console.log(this.outputQueue);
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
      return Number(outputStack[0].toString());
    }
  }

  getResult(fir: Big, sec: Big, cur: string): Big {
    switch (cur) {
      case '+':
        return fir.plus(sec);
      case '-':
        return fir.minus(sec);
      case '*':
        return fir.times(sec);
      case '/':
        return fir.div(sec);
      default:
        throw new Error('no operator found for key ' + cur);
    }
  }
}
