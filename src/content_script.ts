import storage from './utils/storage';
import banZhihu from './sites/zhihu.js';
import banBaidu from './sites/baidu.js';

function init (config: any = {}) {
  banZhihu(location.href, config.zhihu);
  banBaidu(location.href, config.baidu);
}

document.addEventListener('DOMContentLoaded', async function () {
  const baiduConfig = await storage.getItem('baiduConfig');
  const zhihuConfig = await storage.getItem('zhihuConfig');
  init({
    baidu: baiduConfig ? JSON.parse(baiduConfig) : null,
    zhihu: zhihuConfig ? JSON.parse(zhihuConfig) : null,
  });
});

// @ts-ignore
/* chrome.runtime.onMessage.addListener((request) => {
  switch (request.event) {
    case 'config-change':
      // console.log('>>> got msg: config-change', request);
      init(request.config);
      break;
  }
  return true;
}); */

// @ts-ignore
chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "website-filter") {
    port.onMessage.addListener(function(msg: any) {
      console.log('>>> got msg:', msg);
      switch (msg.event) {
        case 'config-change':
          init(msg.config);
          break;
      }
      return true;
    });
  }
});