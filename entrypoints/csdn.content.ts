import TurndownService from "turndown";

export default defineContentScript({
  matches: ['https://blog.csdn.net/*'],
  main() {
    // 获取文档的高度
    const docHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    // 滚动到文档的最底部
    window.scrollTo(0, docHeight);
    window.scrollTo(0, 0);

    let title = document.getElementById("articleContentId")?.outerHTML;
    let titleText = document.getElementById("articleContentId")?.innerText;
    let content = document.getElementById("article_content")?.outerHTML;
    
    var turndownService = new TurndownService()
    var markdown = turndownService.turndown(`${title}\n${content}`)
    return {'title': titleText, 'content':markdown};
  },
});
