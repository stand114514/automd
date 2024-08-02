<script lang="ts" setup>
import {Tabs} from 'wxt/browser';

// 获取网站地址
let currentUrl: string;
let currentTab: Tabs.Tab;
let tabId: number;
const title = ref("loading");
onMounted(async () => {
  // ;
  let tabs = await browser.tabs.query({active: true, currentWindow: true});
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

// csdn
const isCSDN = ref(false);
const getCSDN = async () => {
  isLoading.value = true;
  // 通信注入脚本
  let content = await browser.scripting.executeScript({
    target: {tabId},
    files: ['content-scripts/csdn.js']
  })
  const result = content[0].result;
  download(result.title, result.content);
  isLoading.value = false;
}

// 知乎专栏
const isZhihuArticle = ref(false);
const getZhihuArticle = async () => {
  isLoading.value = true;
  // 通信注入脚本
  let content = await browser.scripting.executeScript({
    target: {tabId},
    // files: ['content-scripts/zhihu.js']
    files: ['content-scripts/zhihu_article.js']
  })
  const result = content[0].result;
  download(result.title, result.content);
  isLoading.value = false;
}

// 知乎回答
const isZhihuAnswer = ref(false);
const getZhihuAnswer = async () => {
  isLoading.value = true;
  // 通信注入脚本
  let content = await browser.scripting.executeScript({
    target: {tabId},
    files: ['content-scripts/zhihu_answer.js']
  })
  const result = content[0].result;
  download(result.title, result.content);
  isLoading.value = false;
}

// 博客园
const isCnBlogs = ref(false);
const getCnBlogs = async () => {
  isLoading.value = true;
  // 通信注入脚本
  let content = await browser.scripting.executeScript({
    target: {tabId},
    files: ['content-scripts/cnblogs.js']
  })
  const result = content[0].result;
  download(result.title, result.content);
  isLoading.value = false;
}

// 其他
const getOther = async () => {
  isLoading.value = true;
  // 通信注入脚本
  let content = await browser.scripting.executeScript({
    target: {tabId},
    files: ['content-scripts/other.js']
  })
  const result = content[0].result;
  download(result.title, result.content);
  isLoading.value = false;
}

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
      <span>目前适配：CSDN、知乎专栏</span>
    </div>
    <!-- 需要根据网站的不同来显示 -->
    <span class="current-title">当前为<b>{{ title }}</b></span>
    <div class="target" v-show="isCSDN">
      <button @click="getCSDN" :disabled="isLoading">下载CSDN文章Markdown</button>
      <div class="or">or</div>
    </div>
    <div class="target" v-show="isZhihuArticle">
      <button @click="getZhihuArticle" :disabled="isLoading">下载知乎专栏Markdown</button>
      <div class="or">or</div>
    </div>
    <div class="target" v-show="isZhihuAnswer">
      <button @click="getZhihuAnswer" :disabled="isLoading">下载知乎回答Markdown</button>
      <div class="or">or</div>
    </div>
    <div class="target" v-show="isCnBlogs">
      <button @click="getCnBlogs" :disabled="isLoading">下载博客园文章Markdown</button>
      <div class="or">or</div>
    </div>
    <button @click="getOther" :disabled="isLoading">下载整个网页</button>
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
  /* text-align: center; */

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
