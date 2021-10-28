export function addStyle (styleStr) {
  const style = document.createElement('style');
  style.innerHTML = styleStr;
  style.type = 'text/css';
  document.head.appendChild(style);
}