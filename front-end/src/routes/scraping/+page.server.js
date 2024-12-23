import puppeteer from 'puppeteer' ;
export async function load() {

async function scrape() {
   const browser = await puppeteer.launch({})
   const page = await browser.newPage()

   await page.goto('https://www.thesaurus.com/browse/smart')
//    var element = await page.waitFor("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(1) > a")
//    var text = await page.evaluate(element => element.textContent, element)
   console.log('page', page)
   browser.close()
}
const run_script = await scrape();
return await run_script;
};