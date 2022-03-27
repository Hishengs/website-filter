// @ts-ignore
const browser = chrome;

export default {
  async setItem (key: string, value: any) {
    return new Promise((resolve, reject) => {
      browser.storage.sync.set({
        [key]: value
      }, () =>{
        if (browser.runtime.lastError) {
          reject(browser.runtime.lastError);
        } else {
          resolve(void 0);
        }
      });
    });
  },
  async getItem (key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      browser.storage.sync.get(key, (res: any) => {
        if (browser.runtime.lastError) {
          reject(browser.runtime.lastError);
        } else {
          const result = res && res[key];
          resolve(result);
        }
      });
    })
  },
  async removeItem (key: string) {
    return new Promise((resolve, reject) => {
      browser.storage.sync.remove(key, () =>{
        if (browser.runtime.lastError) {
          reject(browser.runtime.lastError);
        } else {
          resolve(void 0);
        }
      });
    });
  },
};