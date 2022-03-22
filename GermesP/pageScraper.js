const fakeProfile = () => {
    const overridePropInGet = (obj, name, f, attrs) => {
        let getter = function () {
            return f;
        };
        Object.defineProperty(getter, "name", { value: "get " + name });
        let tostr2 = getter.toString = function () {
            return "function get " + name + '() { [native code] }';
        };
        let maxcnt = 101;
        for (let i = 0; i < maxcnt; i++) {
            tostr2.toString = function () {
                return 'function toString() { [native code] }';
            }
            Object.defineProperty(tostr2, "name", { value: "toString" });

            tostr2 = tostr2.toString;
        }


        let attributes = { get: getter, enumerable: true, configurable: true, };
        if (attrs) {
            attributes.__proto__ = attrs.__proto__;
        }
        Object.defineProperty(obj, name,
            attributes
        );
        if (!!obj[name] && typeof obj[name] === 'function') {

            let tostr = obj[name].toString = function () {
                return "function " + name + '() { [native code] }';
            }
            Object.defineProperty(tostr, "name", { value: "toString" });

            for (let i = 0; i < maxcnt; i++) {
                tostr.toString = function () {
                    return 'function toString() { [native code] }';
                }
                Object.defineProperty(tostr, "name", { value: "toString" });

                tostr = tostr.toString;
            }
        }
        let gettostr = getter.toString = function () {
            return "function get " + name + "() { [native code] }";
        };
        Object.defineProperty(gettostr, "name", { value: "toString" });

        for (let i = 0; i < maxcnt; i++) {

            Object.defineProperty(gettostr, "name", { value: "toString" });

            gettostr.toString = function () {
                return 'function toString() { [native code] }';
            }
            gettostr = gettostr.toString;
        }
    }
    overridePropInGet(navigator,'languages',['es-Es', 'es', 'en-US', 'en'])
    overridePropInGet(navigator,'language','es-Es')
    overridePropInGet(navigator, 'doNotTrack', 1);
    overridePropInGet(Navigator.prototype, 'deviceMemory', 32);
    overridePropInGet(Navigator.prototype, 'hardwareConcurrency', 8);
}

const scraperObject = {
    url: 'https://bet365.ru',

    async scraper(browser){
        let page = await browser.newPage();
        await page.evaluateOnNewDocument(fakeProfile);
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url, {waitUntil: "load"});

    }
}

module.exports = scraperObject;
