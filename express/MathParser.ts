// http://www.jb51.net/article/53537.htm
// http://blog.csdn.net/nkuhjp/article/details/53365036
// http://blog.csdn.net/LoveLion/article/details/7713644
// https://medium.freecodecamp.org/parsing-math-expressions-with-javascript-7e8f5572276e

import Stack from "./Stack";

export default class MathParser {
  inputs: Stack;
  outputs: Stack;

  constructor(message: string) {
    this.inputs = new Stack();
    this.outputs = new Stack();
  }
}
