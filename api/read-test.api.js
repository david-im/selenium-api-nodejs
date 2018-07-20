/**
 * Created by David Im on 2018-07-20.
 * 셀레니움 GET 테스트 API
 */
'use strict';
const selenium = require('../middleware/selenium');
const driver = selenium.findReadyDriver();
const { Builder, By, Key, promise, until } = require('selenium-webdriver');

module.exports = {
    path: '/test',
    method: 'get',
    service: service,
    validator: validator,
    errorHandler: errorHandler
};

function service(_request, _response, next) {

    if(!driver) {
        throw 'NOT_EXIST_READY_DRIVER';
    }

    console.log(selenium.readyDrivers().map(driver => driver.id));

    driver.isReady = false;
    console.log(`Driver ID: ${driver.id}`);

    driver.get('http://www.bsidesoft.com/hika/wp/2196/test1.html').then(() => {

        return driver.findElement(By.id('test1')).getText()
    }).then(result => {

        console.log(result);

        _response.json({
            driverId: driver.id,
            result: result
        });

        driver.isReady = true;
    }).catch(error => {
        next(error);
    });
}

function validator(_request, _response, next) {

    next();
}

function errorHandler(_error, _request, _response, next) {
    console.error(_error);

    if (_error === 'NOT_EXIST_READY_DRIVER') {
        _response.error.notFound(_error, '쉬고있는 드라이버가 없습니다. 잠시 후 다시 요청해주십시오');
        return;
    }

    _response.error.unknown(_error);
    next(_error);
}