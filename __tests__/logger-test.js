/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { keys, intersection, size } from 'lodash';
import Logger from '../src/logger';

const sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

test('Should return a map of log functions', (t) => {
  const logger = Logger('Test');
  t.is(size(intersection(keys(logger), ['trace', 'info', 'warn', 'error'])), 4);
});

test('Should be able to log different log levels', (t) => {
  const logger = Logger('Test');
  sinon.stub(console, 'log');

  logger.trace('Testing 1 2 3');
  expect(console.log).to.have.been.called;
  logger.info('Testing 1 2 3');
  expect(console.log).to.have.been.called;
  logger.warn('Testing 1 2 3');
  expect(console.log).to.have.been.called;
  logger.error('Testing 1 2 3');
  expect(console.log).to.have.been.called;
});

