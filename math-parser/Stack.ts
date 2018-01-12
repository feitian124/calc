export default class Stack {
  top: any;

  constructor() {
    this.top = null;
  }

  push(value: any) {
    this.top = {
      value: value,
      next: this.top
    };
  }

  pop() {
    let value = this.top.value;
    this.top = this.top.next;
    return value;
  }

  peek() {
    return this.top.value;
  }

  isEmpty() {
    return this.top === null;
  }
}
