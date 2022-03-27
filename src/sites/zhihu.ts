import { addStyle, removeStyle } from './util.js';

function banMain (ban: boolean) {
  if (ban)
  addStyle(
    'zhihu.Main',
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
  else removeStyle('zhihu.Main');
}

function banAdCard (ban: boolean) {
  if (ban)
  addStyle(
    'zhihu.AdCard',
    `
    .MCNLinkCard,
    .ecommerce-ad-box
    {
      display: none;
    }
    `
  );
  else removeStyle('zhihu.AdCard');
}

function hideVideoTab (ban: boolean) {
  if (ban)
  addStyle(
    'zhihu.VideoTab',
    `
    .Topstory-tabsLink[aria-controls="Topstory-zvideo"]
    {
      display: none;
    }
    `
  );
  else removeStyle('zhihu.VideoTab');
}

function hideFooter (ban: boolean) {
  if (ban)
  addStyle(
    'zhihu.Footer',
    `
    .Footer
    {
      display: none;
    }
    `
  );
  else removeStyle('zhihu.Footer');
}

interface ZhihuConfig {
  home_page: {
    banMain: boolean;
    banAdCard: boolean;
    banVideoTab: boolean;
    banFooter: boolean;
  }
}

export const config: ZhihuConfig = {
  home_page: {
    banMain: true,
    banAdCard: true,
    banVideoTab: true,
    banFooter: true,
  },
};

export default function (href: string, conf: ZhihuConfig = config) {
  if (!href.includes('zhihu.com')) {
    return;
  }
  banMain(conf.home_page.banMain);
  banAdCard(conf.home_page.banMain);
  hideVideoTab(conf.home_page.banMain);
  hideFooter(conf.home_page.banMain);
}