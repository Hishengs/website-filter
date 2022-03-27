import { addStyle, removeStyle } from './util.js';

function banHomePage (ban: boolean) {
  if (ban)
  addStyle(
    'baidu.HomePage',
    `
    #s_top_wrap,
    #s_wrap,
    #s-top-left,
    #bottom_layer,
    .s-top-left,
    .s-top-right
    {
      display: none;
    }
  `);
  else removeStyle('baidu.HomePage');
}

function banSearchPage (ban: boolean) {
  if (ban)
  addStyle(
    'baidu.SearchPage',
    `
    #content_right
    {
      display: none;
    }
    #content_left > div:not([data-click*="rsv_bdr"])
    {
      display: none !important;
    }
    #content_left > div:not([class^="result"])
    {
      display: none !important;
    }
    `
  );
  else removeStyle('baidu.SearchPage');
}

interface BaiduConfig {
  home_page: {
    ban: boolean;
  }
  search_page: {
    ban: boolean;
  }
}

export const config: BaiduConfig = {
  home_page: {
    ban: true,
  },
  search_page: {
    ban: true,
  },
};

export default function (href: string, conf: BaiduConfig = config) {
  if (!href.includes('baidu.com')) {
    return;
  }
  banHomePage(conf.home_page.ban);
  banSearchPage(conf.search_page.ban);
  // console.log('>>> 命中百度');
}
