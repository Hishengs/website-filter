const styles: Record<string, any> = {};

export function addStyle (type: string, styleStr: string) {
  styles[type] = styles[type] || [];
  const style = document.createElement('style');
  style.innerHTML = styleStr;
  // style.type = 'text/css';
  document.head.appendChild(style);
  styles[type].push(style);
}

export function removeStyle (type: string) {
  if (styles[type] && styles[type].length) {
    styles[type].forEach((style: HTMLStyleElement) => {
      style.parentElement && style.parentElement.removeChild(style);
    });
  }
}