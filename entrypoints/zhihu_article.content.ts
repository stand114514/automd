import TurndownService from "turndown";

export default defineContentScript({
    matches: ['https://zhuanlan.zhihu.com/*'],
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

        document.querySelectorAll(".RichText-MCNLinkCardContainer").forEach((ad) => {
            ad.parentNode?.removeChild(ad);
        });

        document.querySelectorAll(".RichText-EduCardContainer").forEach((ad) => {
            ad.parentNode?.removeChild(ad);
        });

        document.querySelectorAll(".RichText-LinkCardContainer").forEach((link) => {
            let a = link.querySelector("a");
            let targetUrl = a?.getAttribute("href");
            let targetText = a?.querySelector("span")?.querySelector("span")?.innerText;
            if (targetUrl && targetText) {
                let a = document.createElement("a");
                a.href = targetUrl;
                a.innerText = targetText;
                link.parentNode?.replaceChild(a, link);
            }
        });

        let title = document.querySelector(".Post-Title")?.outerHTML;
        let titleText = document.title;
        let content = document.querySelector(".Post-RichTextContainer")?.outerHTML;

        var turndownService = new TurndownService()
        var markdown = turndownService.turndown(`${title}\n${content}`);
        return {'title': titleText, 'content': markdown};
    },
});