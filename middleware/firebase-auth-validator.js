/**
 * Created by David Im on 2018-04-02.
 * Firebase Authentication Token Validator
 */
'use strict';
const firebaseInstance = require('./firebase-instance');

module.exports = (_request, _response, next) => {

    const token = _request.header('Authorization') || _request.query.token;

    if (token === undefined || token === "") {
        _response.error.notFound('NOT_EXIST_FIREBASE_TOKEN', 'Firebase용 Authorization Token값을 찾을 수 없습니다. header에 "Authorization" Key값으로. 또는, query파라메터는 "token" Key값으로 전달바랍니다.');
        return;
    }

    // Firebase Token Validation Check
    firebaseInstance.auth().verifyIdToken(token)
        .then((decodedToken) => {
            _request.user = decodedToken;
            next();
        })
        .catch((error) => {
            _response.error.unauthorization('UNAUTHORIZED_FIREBASE_TOKEN', 'Firebase Auth Token에 해당 에러가 발생하였습니다.: ' + error);
        });
};