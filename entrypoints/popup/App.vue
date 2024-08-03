<script lang="ts" setup>
import {Tabs} from 'wxt/browser';

// 获取网站地址
let currentUrl: string;
let currentTab: Tabs.Tab;
let tabId: number;
const title = ref("loading");
onMounted(async () => {
  let tabs = await browser.tabs.query({ active: true, currentWindow: true });

  if (tabs.length > 0) {
    currentTab = tabs[0];
    currentUrl = currentTab.url || "loading";
    tabId = currentTab.id || 0;
    title.value = currentTab.title || "loading";
  }

  isCSDN.value = currentUrl.includes("https://blog.csdn.net");
  isZhihuArticle.value = currentUrl.includes("https://zhuanlan.zhihu.com");
  isZhihuAnswer.value = currentUrl.includes("https://www.zhihu.com/question");
  isCnBlogs.value = currentUrl.includes("https://www.cnblogs.com");
})

// 发消息
const isError = ref(false);
const sendMessageAndDownload = async (site: string) => {
  isLoading.value = true;
  const response = await browser.runtime.sendMessage(site);
  if (response) {
    download(response.title, response.content);
    isError.value = false;
  }
  else isError.value = true;
  isLoading.value = false;
};
// 控制显示
const isCSDN = ref(false);
const isZhihuArticle = ref(false);
const isZhihuAnswer = ref(false);
const isCnBlogs = ref(false);

// 下载
const isLoading = ref(false);
const download = (title: string, content: string) => {
  // 创建一个 Blob 对象，并使用 URL.createObjectURL 创建一个临时链接
  const blob = new Blob([content], {type: 'text/markdown'});
  const url = URL.createObjectURL(blob);

  // 创建一个隐藏的 <a> 元素，并设置 href 和 download 属性
  const link = document.createElement('a');
  link.href = url;
  link.download = `${title}.md`;
  link.style.display = 'none';
  document.body.appendChild(link);

  // 触发下载
  link.click();

  // 清理临时链接
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="app">
    <div class="title"><img src="@/assets/32.png">AutoMd</div>
    <div class="briefly">
      <span>目前适配：CSDN、知乎专栏、知乎问答、博客园</span>
    </div>
    <!-- 需要根据网站的不同来显示 -->
    <span class="current-title">当前为<b>{{ title }}</b></span>
    <div class="target" v-show="isCSDN">
      <button @click="sendMessageAndDownload('csdn')" :disabled="isLoading">下载CSDN文章Markdown</button>
      <div class="or">or</div>
    </div>
    <div class="target" v-show="isZhihuArticle">
      <button @click="sendMessageAndDownload('zhihu-article')" :disabled="isLoading">下载知乎专栏Markdown</button>
      <div class="or">or</div>
    </div>
    <div class="target" v-show="isZhihuAnswer">
      <button @click="sendMessageAndDownload('zhihu-answer')" :disabled="isLoading">下载知乎回答Markdown</button>
      <div class="or">or</div>
    </div>
    <div class="target" v-show="isCnBlogs">
      <button @click="sendMessageAndDownload('cnblogs')" :disabled="isLoading">下载博客园文章Markdown</button>
      <div class="or">or</div>
    </div>
    <button @click="sendMessageAndDownload('other');" :disabled="isLoading">下载整个网页</button>
    <span class="error-message" v-show="isError">出现错误，请重试或刷新后重试。</span>
    <div class="build">本扩展基于<a href="https://wxt.dev/"><span>wxt</span><img src="@/assets/wxt.svg"></a>构建</div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  font-size: 20px;
  display: flex;
  align-items: center;
  color: #4b92d9;
  font-weight: bold;
}

.current-title {
  b {
    margin-left: 5px;
  }
}

.error-message{ color: rgb(225, 67, 67); }

.briefly {
  color: rgb(176, 176, 176);
  font-size: 12px;
  margin-bottom: 10px;
}

.target {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
}

.build {
  a {
    margin: 0 3px;
    border-bottom: 1px solid rgb(103, 213, 94);
  }

  span {
    color: rgb(103, 213, 94);
    font-size: 20px;
  }

  img {
    margin-left: 3px;
    width: 16px;
    height: 16px;
  }
}
</style>
