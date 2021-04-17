/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2021-01-30 13:12:01
 * @LastEditors: Rainy
 * @LastEditTime: 2021-01-31 14:12:41
 */
const YRequest = require('../module/y-axios');
const URequest = require('../module/URequest');
const { commonParams } = require('../module/config');
const moment = require('moment');
const { handleXml } = require('../util/xml');

const singerParams = Object.assign(commonParams, {
  g_tk: 1290642389,
  sign: 'zzafsjavizx8rzd4m36c2a7e17c9f884980ef9092cb8809e415',
  format: 'json',
});

// /singe/similar?singermid=0025NhlN2yWrP4
const similarOld = async (ctx, next) => {
  const { singermid: singer_mid } = ctx.query;
  const options = {
    params: {
      format: 'json',
      outCharset: 'utf-8',
      utf8: 1,
      start: 0,
      num: 5,
      singer_mid,
    },
  };

  return await YRequest({
    url: '/v8/fcg-bin/fcg_v8_simsinger.fcg',
    method: 'get',
    options,
    thenable: res => {
      if (!singer_mid) {
        ctx.status = 400;
        ctx.body = {
          message: 'no singermid',
        };
        return;
      }
      Object.assign(ctx, {
        status: 200,
        body: {
          data: res.data,
        },
      });
    },
    catcher: error => {
      console.log('error', error);
      ctx.status = 400;
      ctx.body = { error };
    },
  });
};

// 周杰伦 /singe/similar?id=4558&singermid=0025NhlN2yWrP4
const similar = async (ctx, next) => {
  const { id: singerId, singermid: singerMid, pageSize: num = 5 } = ctx.query;
  console.log('similar error: not support pageSize');
  const data = {
    comm: {
      ct: 24,
      cv: 10000,
    },
    similarSingerList: {
      method: 'GetSimilarSingerList',
      param: {
        singerId: parseInt(singerId, 10),
        singerMid,
        // TODO: QQ 貌似不支持
        num: 5,
      },
      module: 'music.SimilarSingerSvr',
    },
  };

  const params = Object.assign(singerParams, {
    '-': 'getSimilarSingerList1112654390871275',
    data: JSON.stringify(data),
  });

  return await URequest({
    method: 'get',
    params,
    thenable: res => {
      if (!singerMid) {
        ctx.status = 400;
        ctx.body = {
          message: 'no singermid',
        };
        return;
      }
      Object.assign(ctx, {
        status: 200,
        body: {
          data: res.data,
        },
      });
    },
    catcher: error => {
      console.log('error', error);
      ctx.status = 400;
      ctx.body = { error };
    },
  });
};

// /singe/desc?singermid=0025NhlN2yWrP4
const desc = async (ctx, next) => {
  const { singermid } = ctx.query;
  const options = {
    params: {
      format: 'xml',
      outCharset: 'utf-8',
      utf8: 1,
      r: moment().valueOf(),
      singermid,
    },
  };

  return await YRequest({
    url: '/splcloud/fcgi-bin/fcg_get_singer_desc.fcg',
    method: 'get',
    options,
    thenable: async res => {
      if (!singermid) {
        ctx.status = 400;
        ctx.body = {
          message: 'no singermid',
        };
        return;
      }
      const result = await handleXml(res.data.replace(/(<!--)|(-->)/g, ''));
      Object.assign(ctx, {
        status: 200,
        body: {
          data: {
            result,
            xml: res.data,
          },
        },
      });
    },
    catcher: error => {
      console.log('error', error);
      ctx.status = 400;
      ctx.body = { error };
    },
  });
};

module.exports = {
  getSimilarSingerOld: similarOld,
  getSimilarSinger: similar,
  getSingerDesc: desc,
};
