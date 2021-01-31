/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2021-01-31 11:21:45
 * @LastEditors: Rainy
 * @LastEditTime: 2021-01-31 11:32:06
 */
const isObject = value => Object.prototype.toString.call(value) === '[object Object]';

const isArray = value =>
  Array.isArray
    ? Array.isArray(value)
    : Object.prototype.toString.call(value) === '[object isArray]';

module.exports = {
  isObject,
  isArray,
};
