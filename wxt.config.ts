import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    "name": "Auto Md",
    "permissions": ["tabs", "scripting"], // API 权限
    "host_permissions": ["*://*/*"], // 允许访问所有网站
    "content_scripts": [
      {
        "matches": ["*://*/*"],
        "js": ["content-scripts/other.js"]
      }
    ],
  }
});
