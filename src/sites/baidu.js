import { addStyle } from './util.js';

function banAll () {
  addStyle(
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
}

let isBaidu = true;

export default function (href) {
  if (!href.includes('baidu.com')) {
    isBaidu = false;
    return;
  }
  console.log('>>> 命中百度');
  banAll();
}