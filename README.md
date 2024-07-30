[English](README_EN.md) | 中文

<div align="center">
    <img src="public/icon/128.png">
    <h1>Auto Md</h1>

[![image](https://img.shields.io/badge/bilibili-stand-orange.svg)](https://space.bilibili.com/382365750)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE) 

</div>

Auto Md 是一个浏览器扩展，可以将网页内容转换为 Markdown 格式并下载。它支持 Chromium 和 Firefox 浏览器，并使用了 Turndown 库来进行 HTML 到 Markdown 的转换。

## 功能

- 将当前网页内容转换为 Markdown 格式。
- 自动下载转换后的 Markdown 文件。
- 支持多种浏览器：Chromium 和 Firefox。
<div align="center">

![image](QQ截图20240730164924.png)

</div>

## 目前适配

- CSDN文章
- 知乎专栏
- 全网页解析

## 技术栈

- **前端**: Vue 3 + TypeScript
- **构建工具**: Vite
- **转换库**: Turndown
- **框架**: WXT

## 安装

### Chrome  / Edge

1. 下载[Releases](https://github.com/stand114514/automd/releases)编译版本并解压
2. 打开开发人员选项
3. 加载已解压的扩展程序

## 许可证

本项目采用 MIT 许可证。

## 致谢

- [Turndown](https://github.com/turndownjs/turndown) - HTML to Markdown converter.
- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework.
- [WXT](https://wxt.dev/) - Next-gen Web Extension Framework.