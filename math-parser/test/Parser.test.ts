import Parser from '../Parser';
import { expect } from 'chai';
import 'mocha';

describe('Parser', () => {
  let parser = new Parser();
  it('1+2', () => {
    expect(parser.rpn('1+2').result()).to.equal(3);
  });

  it('1 + 2 + 3', () => {
    expect(parser.rpn('1 + 2 + 3').result()).to.equal(6);
  });

  it('1 + 2 * 3', () => {
    expect(parser.rpn('1 + 2 * 3').result()).to.equal(7);
  });

  it('1 + 2 * 3 - 4 / 5', () => {
    expect(parser.rpn('1 + 2 * 3 - 4 / 5').result()).to.equal(6.2);
  });

  it('( 1 + 2 )', () => {
    expect(parser.rpn('( 1 + 2 )').result()).to.equal(3);
  });

  it('( 1 + 2 ) * ( 3 - 4 ) / 5', () => {
    expect(parser.rpn('( 1 + 2 ) * ( 3 - 4 ) / 5').result()).to.equal(-0.6);
  });

  it('( 1 + 2 ) * (( 3 - 4 ) / 5)', () => {
    expect(parser.rpn('( 1 + 2 ) * (( 3 - 4 ) / 5)').result()).to.equal(-0.6000000000000001);
  });
});
