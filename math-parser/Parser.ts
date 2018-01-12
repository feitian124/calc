// http://www.jb51.net/article/53537.htm
// http://blog.csdn.net/nkuhjp/article/details/53365036
// http://blog.csdn.net/LoveLion/article/details/7713644
// https://medium.freecodecamp.org/parsing-math-expressions-with-javascript-7e8f5572276e

import Stack from "./Stack";

export default class Parser {
  inputs: Stack;
  outputs: Stack;

  constructor() {
    this.inputs = new Stack();
    this.outputs = new Stack();
  }

  isOperator(value){
    var operatorString = "+-*/()";
    return operatorString.indexOf(value) > -1
}

getPrioraty(value){
    switch(value){
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}

prioraty(o1, o2){
    return this.getPrioraty(o1) <= this.getPrioraty(o2);
}

dal2Rpn(exp){
    var inputStack = [];
    var outputStack = [];
    var outputQueue = [];

    for(var i = 0, len = exp.length; i < len; i++){
        var cur = exp[i];
        if(cur != ' ' ){
            inputStack.push(cur);
        }
    }
    console.log('step one');
    while(inputStack.length > 0){
        var cur = inputStack.shift();
        if(this.isOperator(cur)){
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
                while(this.prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0){
                    outputQueue.push(outputStack.pop());
                }
                outputStack.push(cur);
            }
        }else{
            outputQueue.push(new Number(cur));
        }
    }
    console.log('step two');
    if(outputStack.length > 0){
        if(outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '('){
            throw "error: unmatched ()";
        }
        while(outputStack.length > 0){
            outputQueue.push(outputStack.pop());
        }
    }
    console.log('step three');
    return outputQueue;
  }

  evalRpn(rpnQueue){
    var outputStack = [];
    while(rpnQueue.length > 0){
        var cur = rpnQueue.shift();

        if(!this.isOperator(cur)){
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

  test() {
    console.log(this.dal2Rpn('1 + 2'));
    console.log(this.dal2Rpn('1 + 2 + 3'));
    console.log(this.dal2Rpn('1 + 2 * 3'));
    console.log(this.dal2Rpn('1 + 2 * 3 - 4 / 5'));
    console.log(this.dal2Rpn('( 1 + 2 )'));

    console.log(this.dal2Rpn('( 1 + 2 ) * ( 3 - 4 ) / 5'));
    console.log(this.dal2Rpn('( 1 + 2 ) * (( 3 - 4 ) / 5)'));
  }
}

let parser = new Parser();
parser.test();
