// @flow
import moment from 'moment';
import { reduce } from 'lodash';

/**
 * Log to console
 * @param category
 * @param level
 * @param args
 * @private
 */
function _log(category: string, level: string, ...args: Array<any>) {
  const now = moment().format();
  console.log(`${now} ${level} [${category}]`, ...args); // eslint-disable-line no-console
}

/**
 * Create a map of logger functions bound to category
 * @param category
 * @returns {*}
 */
function createLoggerMap(category) {
  const levels = [
    'TRACE',
    'INFO',
    'WARN',
    'ERROR'
  ];

  return reduce(levels, (memo, currentVal) => {
    const logger = {
      [currentVal.toLowerCase()]: (...args: Array<any>) => {
        return _log(category, currentVal, ...args);
      }
    };

    return { ...memo, ...logger };
  }, {});
}

/**
 * Instantiate a Logger
 * @param category
 * @returns {*}
 * @constructor
 */
export default function Logger(category: string) {
  return createLoggerMap(category);
}
