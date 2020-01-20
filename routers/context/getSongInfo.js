const {
  UCommon,
} = require('../../module');
const {
  commonParams
} = require('../../module/config');

// songmid=001CLC7W2Gpz4J
module.exports = async (ctx, next) => {
  const song_mid = ctx.query.songmid;
  const song_id = ctx.query.songid || '';

  const params = Object.assign(commonParams, {
    format: "json",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 0,
    data: {
        comm: {
            ct: 24,
            cv: 0
        },
        songinfo: {
            method: "get_song_detail_yqq",
            param: {
                song_type: 0,
                song_mid,
                song_id,
            },
            module: "music.pf_song_detail_svr"
        }
    }
  });
  const props = {
    method: 'get',
    params,
    option: {}
  };

  await UCommon(props).then(res => {
    const response = res.data;
    ctx.status = 200;
    ctx.body = {
      response,
    }
  }).catch(error => {
    console.log(`error`, error);
  });
};
