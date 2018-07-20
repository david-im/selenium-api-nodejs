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

    // 사용할 수 없는 드라이버가 없으면 throw하여 에러 Response 출력
    if(!driver) {
        throw 'NOT_EXIST_READY_DRIVER';
    }

    console.log(selenium.readyDrivers().map(driver => driver.id)); // 남아있는 드라이버 id 출력

    driver.isReady = false; // 드라이브 사용중으로 변경
    console.log(`Driver ID: ${driver.id}`); // 현재 사용되고 있는 드라이버 id출력

    // 크롤링 처리 시작
    driver.get('http://www.bsidesoft.com/hika/wp/2196/test1.html').then(() => {

        return driver.findElement(By.id('test1')).getText()
    }).then(result => {
        
        //결과 출력
        console.log(result);

        // 결과를 JSON으로 Response 전달
        _response.json({
            driverId: driver.id,
            result: result
        });

        //현재 사용한 드라이버를 준비상태로 변경
        driver.isReady = true;
    }).catch(error => {
        
        next(error); // throw되거나 error가 나면 아래있는 errorHander로 전달
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