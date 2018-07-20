/**
 * Created by David Im on 2018-07-20.
 * 셀레니움 GET 테스트 API
 */
'use strict';
const webdriverio = require('webdriverio');

module.exports = {
    path: '/test',
    method: 'get',
    service: service,
    validator: validator,
    errorHandler: errorHandler
};

function service(_request, _response, next) {

    // 도커로 selenium-chrome 컨테이너를 띄워 127.0.0.1:4444 로 사용할때 코드
    const options = {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    };
    const client = webdriverio.remote(options);

    client
        .init()
        .url('https://learn.visualregressiontesting.com/')
        .setValue('#mce-EMAIL', 'test@test.com')
        .submitForm('#mc-embedded-subscribe-form')
        .getUrl()
        .then(url => {
            console.log('URL is: ' + url);
            _response.json({
                url: url
            })
        })
        .catch(error => next(error))
        .end();
}

function validator(_request, _response, next) {

    next();
}

function errorHandler(_error, _request, _response, next) {
    console.error(_error);

    _response.error.unknown(_error);
    next(_error);
}