var Parser = require('expr-eval').Parser;

var parser = new Parser();
var expr = parser.parse('0.1 + 0.2 ');
console.log(expr.evaluate({ x: 3 })); // 7

