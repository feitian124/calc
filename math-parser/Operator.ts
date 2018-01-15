export default class Operator {
  key: string;
  precedence: number;
  associativity: Associativity;

  private constructor(key: string, precedence: number, associativity: Associativity) {
    this.key = key;
    this.precedence = precedence;
    this.associativity = associativity;
  }

  static getInstance(key: string): Operator {
    switch (key) {
      case '(':
        return new Operator('(', 0, Associativity.Right);
      case ')':
        return new Operator(')', 0, Associativity.Left);
      case '+':
        return new Operator('+', 1, Associativity.Left);
      case '-':
        return new Operator('-', 1, Associativity.Left);
      case '*':
        return new Operator('*', 2, Associativity.Left);
      case '/':
        return new Operator('/', 2, Associativity.Left);
      default:
        throw new Error('no operator found for key ' + key);
    }
  }

  static isOperator(key: string): boolean {
    try {
      let operator: Operator = this.getInstance(key);
      if (operator) return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 获取数学表达式中字符的权重
   * @param value
   */
  static getPrioraty(value: string): Number {
    try {
      let operator: Operator = this.getInstance(value);
      if (operator) return operator.precedence;
    } catch (e) {
      return 0;
    }
  }

  static prioraty(o1: string, o2: string): boolean{
    return this.getPrioraty(o1) <= this.getPrioraty(o2);
  }
}

export enum Associativity {
  None,
  Left,
  Right
}
