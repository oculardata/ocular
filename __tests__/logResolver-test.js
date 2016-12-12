/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import logResolver from '../src/logResolver';

const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

test('Should not log if number arguments to log is incorrect', sinon.test(function () {
  this.stub(console, 'log');
  logResolver(['foo', 'bar', { fieldName: 'bar' }]);
  expect(console.log).not.to.have.been.called;
}));

test('Should log if number arguments to log is correct', sinon.test(function () {
  this.stub(console, 'log');
  logResolver(['foo', 'bar', { fieldName: 'bar' }, 'foo']);
  expect(console.log).to.have.been.called;
}));
