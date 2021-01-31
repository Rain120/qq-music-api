/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2021-01-31 11:18:17
 * @LastEditors: Rainy
 * @LastEditTime: 2021-01-31 11:31:13
 */
const parseString = require('xml2js').parseString;
const { isObject, isArray } = require('./utils');

function handleXml(data) {
  return new Promise((resolve, reject) => {
    const handleObj = obj => {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (isObject(value) && isArray(value) && value.length === 1) {
          obj[key] = value[0];
        }

        if (isObject(value)) {
          handleObj(obj[key]);
        }
      });
    };

    parseString(data, (err, result) => {
      if (err) {
        reject(err);
      }
      handleObj(result);
      resolve(result);
    });
  });
}

module.exports = {
  handleXml,
};
