'use strict';
const express = require('express');
const compression = require('compression'); // gzip 미들웨어
const bodyParser = require('body-parser'); // BODY Payload Parser 미들웨어
const cors = require('cors'); // CORS 필터 미들웨어

const PORT = process.env.PORT || 8080;

const app = express();
app.set('trust proxy', true);
app.set('etag', false); // turn off
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const errorResponseExtender = require('./middleware/error.extender');
app.use(errorResponseExtender);

const apiRouterRegister = require('./middleware/router-register')('./api', '.js');
app.use(apiRouterRegister);

// Start the server
app.listen(PORT, () => {
    console.log(`앱이 열려있는 포트는 다음과 같습니다. : ${PORT}`);
    console.log('종료하시려면 Ctrl+C 를 눌러 주십시오.');
});