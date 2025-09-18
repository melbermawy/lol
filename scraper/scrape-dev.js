const puppeteer = require("puppeteer");   // add semicolon

; (async () => {                          // leading ; guards against ASI issues
  // Step 1 - define your browser (headless or headful)
  const browser = await puppeteer.launch({ headless: false });

  // step 2 - define using your browser to navigate a new page (better to capture DOM in a single page)
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 }); // correct API name

  // Step 3 - navigate to the page and waiting till it settles network-wise
  await page.goto("https://www.imdb.com/search/title/?groups=top_100&sort=user_rating,desc", {
    waitUntil: "networkidle2",
    timeout: 60_000
  });

  // Step 4 - wait for the card container you already validated in DevTools
  await page.waitForSelector(".ipc-metadata-list-summary-item__tc", { timeout: 15_000 });

  // Step 5 - as a sanity check: count the cards in the DOM
  const cardCount = await page.$$eval(".ipc-metadata-list-summary-item__tc", els => els.length);
  console.log({ cardCount });

  console.log('⏱ about to count title anchors…');

  const titleAnchorCount = await page.$$eval('a.ipc-title-link-wrapper', els => els.length);
  console.log('titleAnchorCount =', titleAnchorCount);

  const sampleTitles = await page.$$eval(".ipc-metadata-list-summary-item__tc a.ipc-title-link-wrapper", 
    as => as.slice(0, 3).map(a => a.textContent.trim())
  );
  console.log(sampleTitles)

  await browser.close();
})();                                      // actually invoke the IIFE