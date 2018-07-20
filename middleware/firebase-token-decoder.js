/**
 * Created by David Im on 20118-04-18.
 * Firebase Token Decoder
 */
'use strict';

const firebaseInstance = require('./firebase-instance');

module.exports = (isCheckToken) => {
    return (_request, _response, next) => {

        const token = _request.header('Authorization') || _request.query.token;
        if(token) {
            firebaseInstance.auth().verifyIdToken(token).then(decodedToken => {
                _request.user = decodedToken;
                next();
            }).catch(error => {
                _response.error.unauthorization('UNAUTHORIZED_FIREBASE_TOKEN', 'Firebase Auth Token에 해당 에러가 발생하였습니다.: ' + error);
            })
        } else {

            // 토큰이용을 제외한 API를 호출한 사용자를 담기 위한 객체 생성
            _request.user = {
                uid: _request.query.uid
            };

            if (!isCheckToken) {
                next();
                return;
            }

            _response.error.notFound(
                'NOT_EXIST_FIREBASE_TOKEN',
                'Firebase용 Authorization Token값을 찾을 수 없습니다. header에 "Authorization" Key값으로. 또는, query파라메터는 "token" Key값으로 전달바랍니다.');
        }
    };
};