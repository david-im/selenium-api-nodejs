'use strict';
const driverCount = process.env.DRIVER_COUNT || 5; // 이 서비스가 가질 driver개수를 환경변수에서 가져옴(default : 5)
const isHeadless = (process.env.HEADLESS === 'true') || true; // 이 서비스에서 사용되는 driver가 headless로 동작할지의 여부를 환경변수에서 가져옴(default : true)

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const drivers = [];

// driverCount만큼 driver생성
for (let i = 0; i < driverCount; i++) {
    const driver = new webdriver.Builder().forBrowser('chrome');

    if(isHeadless) {
        driver.setChromeOptions(new chrome.Options().addArguments('--headless')) //실제 GUI 브라우저를 안쓰고 처리
    }
    const driverInstance = driver.build();

    driverInstance.id = i + 1;
    driverInstance.isReady = true; // 이 드라이버가 쉬고있는지 isReady라는 변수 설정
    drivers.push(driverInstance);
}

module.exports = {
    readyDrivers: () => drivers.filter(driver => driver.isReady), // isReady가 true인 Array return
    findReadyDriver: () => drivers.find(driver => driver.isReady) // isReady가 true인 것 중 맨앞에 하나 return
};