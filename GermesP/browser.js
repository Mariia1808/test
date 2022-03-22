const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const stealth = StealthPlugin();
stealth.enabledEvasions.delete('chrome.runtime')
stealth.enabledEvasions.delete('iframe.contentWindow')
puppeteer.use(StealthPlugin())

async function startBrowser(){
    let browser;
    const args = [
        '--start-maximized',
        '--Access-Control-Allow-Origin=*',
        '--disable-site-isolation-trials'
    ];
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: false,
            args: args,
            defaultViewport: null,
            ignoreDefaultArgs: ['--enable-automation'],
            ignoreHTTPSErrors: true,
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};