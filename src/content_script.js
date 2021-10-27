let isZhihu = false;

document.addEventListener('DOMContentLoaded', function () {
	if (location.href.includes('zhihu.com')) {
    isZhihu = true;
    banAll();
    banAdCard();
    hideVideoTab();
    hideFooter();
  }
});

function addStyle (styleStr) {
  const style = document.createElement('style');
  style.innerHTML = styleStr;
  document.head.appendChild(style);
}

function banAll () {
  addStyle(
    `
    .Topstory-recommend .ZVideoItem,
    .VideoAnswerPlayer,
    .Topstory > :not(.Topstory-container),
    .GlobalSideBar-category > :not(ul)
    {
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