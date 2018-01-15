import Parser from '../Parser';
import { expect } from 'chai';
import 'mocha';

describe('Parser', () => {
  let parser = new Parser();
  it('1+2', () => {
    let rpn = parser.dal2Rpn('1+2');
    let result = parser.evalRpn(rpn);
    expect(result).to.equal(3);
  });
});
