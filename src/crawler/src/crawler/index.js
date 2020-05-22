const puppeteer = require('puppeteer')

async function getTextBySelector({ url, selector }) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const element = await page.waitForSelector(selector)
  const text = await element.evaluate((element) => element.innerText)

  await browser.close()

  return text
}

module.exports = { getTextBySelector }
