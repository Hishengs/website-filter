(function(o){typeof define=="function"&&define.amd?define(o):o()})(function(){"use strict";const o=chrome;var u={async setItem(e,n){return new Promise((t,s)=>{o.storage.sync.set({[e]:n},()=>{o.runtime.lastError?s(o.runtime.lastError):t(void 0)})})},async getItem(e){return new Promise((n,t)=>{o.storage.sync.get(e,s=>{if(o.runtime.lastError)t(o.runtime.lastError);else{const C=s&&s[e];n(C)}})})},async removeItem(e){return new Promise((n,t)=>{o.storage.sync.remove(e,()=>{o.runtime.lastError?t(o.runtime.lastError):n(void 0)})})}};const i={};function a(e,n){i[e]=i[e]||[];const t=document.createElement("style");t.innerHTML=n,document.head.appendChild(t),i[e].push(t)}function r(e){i[e]&&i[e].length&&i[e].forEach(n=>{n.parentElement&&n.parentElement.removeChild(n)})}function c(e){e?a("zhihu.Main",`
    .Topstory-recommend .ZVideoItem,
    .VideoAnswerPlayer,
    .Topstory > :not(.Topstory-container)
    {
      display: none;
    }
    .Topstory-mainColumn {
      flex-grow: 1;
    }
    .GlobalSideBar {
      display: none;
    }
    `):r("zhihu.Main")}function l(e){e?a("zhihu.AdCard",`
    .MCNLinkCard,
    .ecommerce-ad-box
    {
      display: none;
    }
    `):r("zhihu.AdCard")}function h(e){e?a("zhihu.VideoTab",`
    .Topstory-tabsLink[aria-controls="Topstory-zvideo"]
    {
      display: none;
    }
    `):r("zhihu.VideoTab")}function m(e){e?a("zhihu.Footer",`
    .Footer
    {
      display: none;
    }
    `):r("zhihu.Footer")}const f={home_page:{banMain:!0,banAdCard:!0,banVideoTab:!0,banFooter:!0}};function b(e,n=f){!e.includes("zhihu.com")||(c(n.home_page.banMain),l(n.home_page.banMain),h(n.home_page.banMain),m(n.home_page.banMain))}function g(e){e?a("baidu.HomePage",`
    #s_top_wrap,
    #s_wrap,
    #s-top-left,
    #bottom_layer,
    .s-top-left,
    .s-top-right
    {
      display: none;
    }
  `):r("baidu.HomePage")}function p(e){e?a("baidu.SearchPage",`
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
    `):r("baidu.SearchPage")}const y={home_page:{ban:!0},search_page:{ban:!0}};function _(e,n=y){!e.includes("baidu.com")||(g(n.home_page.ban),p(n.search_page.ban))}function d(e={}){b(location.href,e.zhihu),_(location.href,e.baidu)}document.addEventListener("DOMContentLoaded",async function(){const e=await u.getItem("baiduConfig"),n=await u.getItem("zhihuConfig");d({baidu:e?JSON.parse(e):null,zhihu:n?JSON.parse(n):null})}),chrome.runtime.onConnect.addListener(function(e){e.name==="website-filter"&&e.onMessage.addListener(function(n){switch(console.log(">>> got msg:",n),n.event){case"config-change":d(n.config);break}return!0})})});
