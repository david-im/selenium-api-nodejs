'use strict';

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const driver = new webdriver.Builder().forBrowser('chrome').build();
// const driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(new chrome.chrome.Options().addArguments('--headless')).build();

module.exports = driver;