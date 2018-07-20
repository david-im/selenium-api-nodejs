/**
 * Created by David Im on 2018-07-20.
 * 셀레니움 GET 테스트 API
 */
'use strict';
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Builder, By, Key, promise, until } = require('selenium-webdriver');

module.exports = {
    path: '/test',
    method: 'get',
    service: service,
    validator: validator,
    errorHandler: errorHandler
};

function service(_request, _response, next) {

    const driver = new webdriver.Builder()
        .forBrowser('chrome')
        // .setChromeOptions(new chrome.Options().addArguments('--headless')) //실제 GUI 브라우저를 안쓰고 처리
        .build();

    driver.get('http://www.bsidesoft.com/hika/wp/2196/test1.html').then(() => {

        return driver.findElement(By.id('test1')).getText()
    }).then(result => {
        console.log(result);
        _response.json({
            result: result
        });

        driver.close();
    }).catch(error => {
        next(error);
    });
}

function validator(_request, _response, next) {

    next();
}

function errorHandler(_error, _request, _response, next) {
    console.error(_error);

    _response.error.unknown(_error);
    next(_error);
}