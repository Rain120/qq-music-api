const { hash33 } = require('../../../util/loginUtils');

module.exports = async ({ method = 'get', params = {}, option = {} }) => {
  const url = 'https://ssl.ptlogin2.qq.com/ptqrshow?appid=716027609&e=2&l=M&s=3&d=72&v=4&t=0.9698127522807933&daid=383&pt_3rd_aid=100497308&u1=https%3A%2F%2Fgraph.qq.com%2Foauth2.0%2Flogin_jump';
  const response = await fetch(url, { responseType: 'arraybuffer' });
  const data = await response.arrayBuffer();
  const img = "data:image/png;base64," + (data && Buffer.from(data).toString('base64'));
  const qrsig = response.headers.get('Set-Cookie')?.match(/qrsig=([^;]+)/)[1];
  
  return {status: 200, body: { img, ptqrtoken: hash33(qrsig), qrsig } };
};
