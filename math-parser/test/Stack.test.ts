import Stack from '../Stack';
import { expect } from 'chai';
import 'mocha';

describe('Stack', () => {
  it('push one value to stack, can peek the value, and the stack should not be empty', () => {
    let stack = new Stack();
    let num = Math.random();
    stack.push(num);
    expect(stack.peek()).to.equal(num);
    expect(stack.isEmpty()).to.not.be.ok;
  });

  it('push one value to stack, can pop the value, and the stack should be  empty', () => {
    let stack = new Stack();
    let num = Math.random();
    stack.push(num);
    expect(stack.pop()).to.equal(num);
    expect(stack.isEmpty()).to.be.ok;
  });
});
