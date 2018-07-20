/**
 * Created by David Im on 2018-05-02.
 * Response에 Error Response를 담당할 확장모듈
 */
module.exports = (_request, _response, next) => {
    _response.error = {
        /**
         *
         * @param {String}  errorCode
         * @param {String}  message
         * @param {Object}  [options] Option Object
         * @param {Array}   [options.incorrect] List of INCORRECT_ANSWER_ERROR_CODE
         * @param {Array}   [options.objects] error object by request
         */
        notFound: (errorCode, message, options = {}) => {
            const status = 404;
            _response.status(status).json({
                status: status,
                errorCode: errorCode,
                message: message,
                objects: options.objects ? options.objects : undefined
            }).end();
        },
        /**
         *
         * @param {String}  errorCode
         * @param {String}  message
         * @param {Object}  [options] Option Object
         * @param {Array}   [options.incorrect] List of INCORRECT_ANSWER_ERROR_CODE
         * @param {Array}   [options.objects] error object by request
         */
        badRequest: (errorCode, message, options = {}) => {
            const status = 400;
            _response.status(status).json({
                status: status,
                errorCode: errorCode,
                message: message,
                incorrect: options.incorrect ? options.incorrect : undefined,
                objects: options.objects ? options.objects : undefined
            }).end();
        },
        /**
         *
         * @param {String}  errorCode
         * @param {String}  message
         */
        unauthorization: (errorCode, message) => {
            const status = 401;
            _response.status(status).json({
                status: status,
                errorCode: errorCode,
                message: message,
            }).end();
        },
        /**
         *
         * @param {String}  errorCode
         * @param {String}  message
         */
        forbidden: (errorCode, message) => {
            const status = 403;
            _response.status(status).json({
                status: status,
                errorCode: errorCode,
                message: message,
            }).end();
        },
        /**
         *
         * @param {Error}  _error
         */
        unknown: (_error) => {
            const status = 400;
            _response.status(status).json({
                status: status,
                errorCode: "UNKNOWN_ERROR",
                message: JSON.stringify(_error, null, 2)
            }).end();
        }
    };

    next();
};