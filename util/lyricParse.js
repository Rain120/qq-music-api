// [01:27.96]
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g

const TAGREGMAP = {
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by'
}

class Lyric {
  constructor(lyric) {
    this.lyric = lyric;
    this.tags = {};
    this.lines = [];

    this._init();
  }

  _init() {
    this._initTag();

    this._initLines();
  }

  _initTag() {
    for (let tag in TAGREGMAP) {
      const matches = this.lyric.match(new RegExp(`\\[${TAGREGMAP[tag]}:([^\\]]*)]`, 'i'));
      this.tags[tag] = matches && matches[1] || '';
    }
  }

  _initLines() {
    const lines = this.lyric.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let result = timeExp.exec(line);
      if (result) {
        const txt = line.replace(timeExp, '').trim();
        const time = result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10;
        if (txt) {
          this.lines.push({
            time,
            txt,
          })
        }
      }
    }

    this.lines.sort((a, b) => {
      return a.time - b.time;
    })
  }
}

function lyricParse(lyricString) {
  return new Lyric(lyricString);
}

module.exports = {
  Lyric,
  lyricParse,
};