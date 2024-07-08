const { getGtk, getGuid } = require('../../../util/loginUtils');
const { refreshData } = require('../../../config/user-info');

module.exports = async ({ method = 'get', params = {}, option = {} }) => {
  const { ptqrtoken, qrsig } = params;
  if (!ptqrtoken || !qrsig) return { body: '参数错误' };
  const url = `https://ssl.ptlogin2.qq.com/ptqrlogin?u1=https%3A%2F%2Fgraph.qq.com%2Foauth2.0%2Flogin_jump&ptqrtoken=${ptqrtoken}&ptredirect=0&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=0-0-1711022193435&js_ver=23111510&js_type=1&login_sig=du-YS1h8*0GqVqcrru0pXkpwVg2DYw-DtbFulJ62IgPf6vfiJe*4ONVrYc5hMUNE&pt_uistyle=40&aid=716027609&daid=383&pt_3rd_aid=100497308&&o1vId=3674fc47871e9c407d8838690b355408&pt_js_version=v1.48.1`;
  const response = await fetch(url, { headers: { Cookie: `qrsig=${qrsig}` }});
  const { data = '' } = await response.text();
  let allCookie = [];
  const setCookie = cookies => {
    allCookie = [...allCookie, ...cookies.map(i => i.split(';')[0]).filter(i => i.split('=')[1])];
  };
  const refresh = data.includes('已失效')
  if (!data.includes('登录成功')) return { status: 200, isOk: false, refresh, message: refresh && '二维码已失效' || '未扫描二维码' };

  // 获取p_skey 与gtk
  const checkSigUrl = data.match(/(?:'((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*)')/g)[0].replaceAll('\'', '');
  const checkSigRes = await fetch(checkSigUrl, { redirect: 'manual', headers: { Cookie: allCookie.join('; ') } });
  const p_skey = checkSigRes.headers.get('Set-Cookie').match(/p_skey=([^;]+)/)[1];
  const gtk = getGtk(p_skey);
  setCookie(checkSigRes.headers.get('Set-Cookie').split(';, '));

  // authorize
  const authorizeUrl = 'https://graph.qq.com/oauth2.0/authorize';
  const getAuthorizeData = (gtk) => {
    let data = new FormData()
    data.append('response_type', 'code')
    data.append('client_id', 100497308)
    data.append('redirect_uri', 'https://y.qq.com/portal/wx_redirect.html?login_type=1&surl=https://y.qq.com/')
    data.append('scope', 'get_user_info,get_app_friends')
    data.append('state', 'state')
    data.append('switch', '')
    data.append('from_ptlogin', 1)
    data.append('src', 1)
    data.append('update_auth', 1)
    data.append('openapi', '1010_1030')
    data.append('g_tk', gtk)
    data.append('auth_time', new Date)
    data.append('ui', getGuid())
    return data
  };

  const authorizeRes = await fetch(authorizeUrl, {
    redirect: 'manual',
    method: 'POST',
    body: getAuthorizeData(gtk),
    headers: {
      Cookie: allCookie.join('; ')
    }
  });
  const code = authorizeRes.headers.get('Location').match(/[?&]code=([^&]+)/)[1];

  // login
  const getFcgReqData = (g_tk, code) => {
    const data = {
      comm: {
        "g_tk":g_tk,
        "platform":"yqq",
        "ct":24,
        "cv":0
      }, req: {
        "module":"QQConnectLogin.LoginServer",
        "method":"QQLogin",
        "param": {
          "code":code
        }
      }
    }
    return JSON.stringify(data)
  };

  const loginUrl = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const loginRes = await fetch(loginUrl, {
    method: 'POST',
    body: getFcgReqData(gtk, code),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: allCookie.join('; ')
    }
  });
  setCookie(loginRes.headers.get('Set-Cookie').split(';, '));
  global.userInfo = { ...refreshData(allCookie.join('; ')) }
  
  return { status: 200, isOk: true, message: '登录成功' };
};
