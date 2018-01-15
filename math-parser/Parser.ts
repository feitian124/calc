

import Stack from "./Stack";
import Operator from "./Operator";

export default class Parser {
  inputs: Stack;
  outputs: Stack;

  constructor() {
    this.inputs = new Stack();
    this.outputs = new Stack();
  }

dal2Rpn(exp){
    var inputStack = [];
    var outputStack = [];
    var outputQueue = [];

    console.log(exp);

    for(var i = 0, len = exp.length; i < len; i++){
        var cur = exp[i];
        if(cur != ' ' ){
            inputStack.push(cur);
        }
    }
    while(inputStack.length > 0){
        var cur = inputStack.shift();
        if(Operator.isOperator(cur)){
            if(cur == '('){
                outputStack.push(cur);
            }else if(cur == ')'){
                var po = outputStack.pop();
                while(po != '(' && outputStack.length > 0){
                    outputQueue.push(po);
                    po = outputStack.pop();
                }
                if(po != '('){
                    throw "error: unmatched ()";
                }
            }else{
                while(Operator.prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0){
                    outputQueue.push(outputStack.pop());
                }
                outputStack.push(cur);
            }
        }else{
            outputQueue.push(new Number(cur));
        }
    }
    if(outputStack.length > 0){
        if(outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '('){
            throw "error: unmatched ()";
        }
        while(outputStack.length > 0){
            outputQueue.push(outputStack.pop());
        }
    }
    return outputQueue;
  }

  evalRpn(rpnQueue){
    var outputStack = [];
    while(rpnQueue.length > 0){
        var cur = rpnQueue.shift();

        if(!Operator.isOperator(cur)){
            outputStack.push(cur);
        }else{
            if(outputStack.length < 2){
                throw "unvalid stack length";
            }
            var sec = outputStack.pop();
            var fir = outputStack.pop();

            outputStack.push(this.getResult(fir, sec, cur));
        }
    }

    if(outputStack.length != 1){
        throw "unvalid expression";
    }else{
        return outputStack[0];
    }
}

getResult(fir: Number, sec: Number, cur) : Number {
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
