<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import storage from './utils/storage'
import { config as defaultBaiduConfig } from './sites/baidu'
import { config as defaultZhihuConfig } from './sites/zhihu'

// ================ data ================
const activeTab = ref('zhihu')
const config = reactive({
  baidu: JSON.parse(JSON.stringify(defaultBaiduConfig)),
  zhihu: JSON.parse(JSON.stringify(defaultZhihuConfig))
})

// ================ methods ================
async function fetchStoredConfig () {
  const baiduConfig = await storage.getItem('baiduConfig');
  if (baiduConfig) {
    config.baidu = JSON.parse(baiduConfig)
  } else await storage.setItem('baiduConfig', JSON.stringify(defaultBaiduConfig));
  const zhihuConfig = await storage.getItem('zhihuConfig');
  if (zhihuConfig) {
    config.zhihu = JSON.parse(zhihuConfig)
  } else await storage.setItem('zhihuConfig', JSON.stringify(defaultZhihuConfig));
}

async function setConfig (config: any) {
  await storage.setItem('baiduConfig', JSON.stringify(config.baidu));
  await storage.setItem('zhihuConfig', JSON.stringify(config.zhihu));
}

const ports: any = {};

function sendMessageToTabs (data: any) {
  // @ts-ignore
  const browser = chrome;
  if (typeof browser === 'undefined' || !browser.tabs) return;
  browser.tabs.query({ active: true }, function(tabs: any) {
    // debugger;
    for (const tab of tabs) {
      let port = ports[tab.id];
      if (!port) {
        port = ports[tab.id] = browser.tabs.connect(tab.id, { name: 'website-filter' })
      }
      port.onDisconnect.addListener(() => {
        ports[tab.id] = null;
      });
      port && port.postMessage(data);
      // browser.tabs.sendMessage(tab.id, data, () => {});
    }
  });
}

// ================ main ================

fetchStoredConfig();

setTimeout(() => {
  watch(
    () => config,
    (newConfig) => {
      setConfig(newConfig);
      sendMessageToTabs({ event: 'config-change', config: newConfig })
    },
    { deep: true }
  );
}, 500);
</script>

<template>
  <div class="main">
    <h1 class="title">Website Filter</h1>
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
    >
      <el-tab-pane label="知乎" name="zhihu">
        <p>屏蔽知乎推荐视频 <el-switch v-model="config.zhihu.home_page.banMain" /></p>
        <p>屏蔽知乎广告卡片 <el-switch v-model="config.zhihu.home_page.banAdCard" /></p>
        <p>屏蔽知乎视频 Tab <el-switch v-model="config.zhihu.home_page.banVideoTab" /></p>
        <p>屏蔽知乎尾部广告 <el-switch v-model="config.zhihu.home_page.banFooter" /></p>
      </el-tab-pane>
      <el-tab-pane label="百度" name="baidu">
        <p>屏蔽百度首页广告 <el-switch v-model="config.baidu.home_page.ban" /></p>
        <p>屏蔽百度结果页广告 <el-switch v-model="config.baidu.search_page.ban" /></p>
      </el-tab-pane>
      <el-tab-pane label="关于" name="about">
        项目地址：<el-link href="https://github.com/Hishengs/website-filter">website-filter</el-link>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
  width: 400px;
  min-height: 300px;
}
.title {
  font-size: 24px;
  color: #1890ff;
}
</style>
