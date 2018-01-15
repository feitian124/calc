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
    if(this.isEmpty()) {
      return null;
    }
    let value = this.top.value;
    this.top = this.top.next;
    return value;
  }

  peek() {
    if(this.isEmpty()) {
      return null;
    }
    return this.top.value;
  }

  isEmpty(): boolean {
    return this.top === null;
  }
}
