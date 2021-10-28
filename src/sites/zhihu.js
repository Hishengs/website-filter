import { addStyle } from './util.js';

function banAll () {
  addStyle(
    `
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
    `
  );
}

function banAdCard () {
  addStyle(
    `
    .MCNLinkCard,
    .ecommerce-ad-box
    {
      display: none;
    }
    `
  );
}

function hideVideoTab () {
  addStyle(
    `
    .Topstory-tabsLink[aria-controls="Topstory-zvideo"]
    {
      display: none;
    }
    `
  );
}

function hideFooter () {
  addStyle(
    `
    .Footer
    {
      display: none;
    }
    `
  );
}

let isZhihu = true;

export default function (href) {
  if (!href.includes('zhihu.com')) {
    isZhihu = false;
    return;
  }
  banAll();
  banAdCard();
  hideVideoTab();
  hideFooter();
}