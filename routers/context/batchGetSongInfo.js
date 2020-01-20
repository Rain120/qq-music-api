const {
  UCommon,
} = require('../../module');
const {
  commonParams
} = require('../../module/config');
/**
 * @description: 2, 3
 * @param songs 歌曲信息 [[songmid, songid]]
 * @return: 
 */
module.exports = async (ctx, next) => {
  const {
    songs
  } = ctx.request.body;

  const params = Object.assign(commonParams, {
    format: "json",
    inCharset: "utf8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 0,
  });

  const props = {
    method: 'get',
    option: {},
    params,
  }
  
  const data = await Promise.all(
    (songs || []).map(
      async song => {
        const [song_mid, song_id = ''] = song;
        console.log(song_mid, song_id)
        return await UCommon({
          ...props,
          params: {
            ...params,
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
          }
        }).then(res => res.data);
      }
    )
  );
  Object.assign(ctx, {
    body: {
      status: 200,
      data,
    },
  });
}
