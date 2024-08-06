export default defineBackground(() => {
  // background.js
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    let content;
    const tabId = (await browser.tabs.query({ active: true, currentWindow: true }))[0]?.id || 0;
    if (tabId == 0) return false;
    try {
      switch (message) {
        case 'csdn':
          content = await browser.scripting.executeScript({
            target: { tabId },
            files: ['content-scripts/csdn.js']
          });
          break;
        case 'zhihu-article':
          content = await browser.scripting.executeScript({
            target: { tabId },
            files: ['content-scripts/zhihu_article.js']
          });
          break;
        case 'zhihu-answer':
          content = await browser.scripting.executeScript({
            target: { tabId },
            files: ['content-scripts/zhihu_answer.js']
          });
          break;
        case 'cnblogs':
          content = await browser.scripting.executeScript({
            target: { tabId },
            files: ['content-scripts/cnblogs.js']
          });
          break;
        case 'chatgpt':
            content = await browser.scripting.executeScript({
                target: { tabId },
                files: ['content-scripts/chat_gpt.js']
            });
            break;
        case 'other':
        default:
          content = await browser.scripting.executeScript({
            target: { tabId },
            files: ['content-scripts/other.js']
          });
          break;
      }

      const result = content[0].result;
      console.log(result);
      // sendResponse(result);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  });
});
