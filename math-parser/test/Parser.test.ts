import Parser from '../src/Parser';
import { expect } from 'chai';
import 'mocha';

describe('Parser', () => {
  let parser = new Parser();
  it('1 + 2', () => {
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

  it('( 1 + 9 )', () => {
    expect(parser.rpn('( 1 + 9 )').result()).to.equal(10);
  });

  it('( 1 + 99 )', () => {
    expect(parser.rpn('( 1 + 99 )').result()).to.equal(100);
  });

  it('( 11 + 22 ) * ( 33 - 44 ) / 55', () => {
    expect(parser.rpn('( 11 + 22 ) * ( 33 - 44 ) / 55').result()).to.equal(6.6);
  });

  it('( 1.1 + 8.9 ) * (( 100.9 - 90.9 ) / 5)', () => {
    expect(parser.rpn('( 1.1 + 8.9 ) * (( 100.9 - 90.9 ) / 5)').result()).to.equal(20);
  });

  it('2 / 3', () => {
    expect(parser.rpn('2 / 3').result()).to.equal(0.6666666666666666);
  });
});
