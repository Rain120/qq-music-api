const mockYCommon = jest.fn();

jest.mock('../src/services/y_common', () => ({
  __esModule: true,
  default: mockYCommon,
}));

jest.mock('../src/util/logger', () => ({
  __esModule: true,
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

import getSearchByKey from '../src/services/search/getSearchByKey';
import { logger } from '../src/util/logger';

const mockedLogger = logger as jest.Mocked<typeof logger>;

describe('services/getSearchByKey', () => {
  beforeEach(() => {
    mockYCommon.mockReset();
    jest.clearAllMocks();
  });

  it('应在成功时返回标准响应并合并默认参数', async () => {
    mockYCommon.mockResolvedValue({
      data: {
        code: 0,
        data: { list: ['jay'] },
      },
    });

    const option = {
      headers: {
        'x-trace-id': 'trace-1',
      },
    };

    const result = await getSearchByKey({
      method: 'post',
      params: {
        w: '周杰伦',
        remoteplace: 'txt.yqq.custom',
      },
      option,
    });

    expect(mockYCommon).toHaveBeenCalledWith({
      url: '/soso/fcgi-bin/client_search_cp',
      method: 'post',
      options: {
        headers: {
          'x-trace-id': 'trace-1',
        },
        params: {
          w: '周杰伦',
          format: 'json',
          outCharset: 'utf-8',
          ct: 24,
          qqmusic_ver: 1298,
          remoteplace: 'txt.yqq.song',
          t: 0,
          aggr: 1,
          cr: 1,
          lossless: 0,
          flag_qc: 0,
          platform: 'yqq.json',
        },
      },
    });
    expect(result).toEqual({
      status: 200,
      body: {
        response: {
          code: 0,
          data: { list: ['jay'] },
        },
      },
    });
    expect(mockedLogger.info).toHaveBeenCalledWith(
      'service.requesting',
      expect.objectContaining({
        service: 'getSearchByKey',
      }),
    );
    expect(mockedLogger.info).toHaveBeenCalledWith(
      'service.succeeded',
      expect.objectContaining({
        service: 'getSearchByKey',
        keyword: '周杰伦',
      }),
    );
  });

  it('应在未传入参数时使用默认值', async () => {
    mockYCommon.mockResolvedValue({
      data: {
        code: 0,
      },
    });

    await getSearchByKey({});

    expect(mockYCommon).toHaveBeenCalledWith({
      url: '/soso/fcgi-bin/client_search_cp',
      method: 'get',
      options: {
        params: {
          format: 'json',
          outCharset: 'utf-8',
          ct: 24,
          qqmusic_ver: 1298,
          remoteplace: 'txt.yqq.song',
          t: 0,
          aggr: 1,
          cr: 1,
          lossless: 0,
          flag_qc: 0,
          platform: 'yqq.json',
        },
      },
    });
  });

  it('应在底层请求失败时返回 500', async () => {
    const error = new Error('network failed');
    mockYCommon.mockRejectedValue(error);

    const result = await getSearchByKey({
      params: {
        w: 'test',
      },
    });

    expect(result).toEqual({
      status: 500,
      body: {
        error,
      },
    });
    expect(mockedLogger.error).toHaveBeenCalledWith(
      'service.failed',
      expect.objectContaining({
        service: 'getSearchByKey',
        error: {
          name: 'Error',
          message: 'network failed',
        },
      }),
    );
  });
});
