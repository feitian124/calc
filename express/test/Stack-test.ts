import Stack from '../Stack';
import { expect } from 'chai';
import 'mocha';

describe('Stack', () => {
  it('push should work', () => {
    let stack = new Stack();
    let num = Math.random();
    stack.push(num);
    expect(stack.peek()).to.equal(num);
    expect(stack.isEmpty()).to.not.be.ok;
  });

  it('pop should work', () => {
    let stack = new Stack();
    let num = Math.random();
    stack.push(num);
    expect(stack.pop()).to.equal(num);
    expect(stack.isEmpty()).to.be.ok;
  });
});
