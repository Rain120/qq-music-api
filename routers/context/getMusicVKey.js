const {
  UCommon,
} = require('../../module');
const { _guid, } = require('../../module/config');

// songmid=003rJSwm3TechU
module.exports = async (ctx, next) => {
  const songmid = ctx.query.songmid + '';
  const guid = _guid ? _guid + '' : '1429839143';
  const data = {
    req: {
      module: "CDN.SrfCdnDispatchServer",
      method: "GetCdnDispatch",
      param: {
        guid,
        calltype: 0,
        userip: ""
      }
    },
    req_0: {
      module: "vkey.GetVkeyServer",
      method: "CgiGetVkey",
      param: {
        guid,
        songmid: [songmid],
        songtype: [0],
        uin: "0",
        loginflag: 1,
        platform: "20"
      }
    },
    comm: {
      uin: 0,
      format: "json",
      ct: 24,
      cv: 0
    }
  }
  const params = Object.assign({
    format: 'json',
    data: JSON.stringify(data),
  });
  const props = {
    method: 'get',
    params,
    option: {},
  };
  if (songmid) {
    await UCommon(props).then((res) => {
      const response = res.data;
      let playLists = [];
      const req_0 = response.req_0.data;
      req_0.sip.map(sipURL => {
        const purl = req_0.midurlinfo[0].purl;
        const URI = `${sipURL}${purl}`
        playLists.push(URI);
      });
      response.playLists = playLists;
      ctx.body = {
        response,
      }
    }).catch(error => {
      console.log(`error`, error);
    });
  } else {
    ctx.status = 400;
    ctx.body = {
      response: 'no songmid',
    }
  }
};
