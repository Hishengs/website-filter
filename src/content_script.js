import banZhihu from './sites/zhihu.js';
import banBaidu from './sites/baidu.js';

document.addEventListener('DOMContentLoaded', function () {
  banZhihu(location.href);
  banBaidu(location.href);
});
