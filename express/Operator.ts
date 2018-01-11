export default class Operator {
  key: string;
  precedence: number;
  associativity: Associativity;
}

export enum Associativity {
  None,
  Left,
  Right
}
