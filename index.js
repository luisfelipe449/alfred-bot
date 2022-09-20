const puppeteer = require("puppeteer");

(async function main() {
  try {
    //config
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"
    );

    //Navigates to WhatsApp Web
    await page.goto("https://web.whatsapp.com/");
    await page.waitForSelector("._2UwZ_");
    await delay(5000);

    //Change to contact you want to send message to
    const contactName = "Alfred bot";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector(".i0jNr");

    //Finds the message bar and focuses on it
    const editor = await page.$(".p3_M1");
    console.log("editor: ", editor);
    await editor.focus();

    //Amount of messages to send
    const amount = 3;

    //Loops through cycle of sending message
    for (let i = 0; i < amount; i++) {
      await page.evaluate(() => {
        const message = "Coé Patifes!! Afredão na área";
        document.execCommand("insertText", false, message);
      });
      await page.click('span[data-testid="send"]');
      await delay(500);
    }
  } catch (e) {
    console.log("error", e);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
