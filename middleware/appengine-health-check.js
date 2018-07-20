const express = require('express');
const router = express.Router();

router.get('/_ah/health', (_request, _response, next) => {
    _response.json({});
});

module.exports = router;