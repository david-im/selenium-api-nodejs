/**
 * Created by David Im on 2017-11-20.
 * Root API Router Finder
 */
const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');
const rootPath = path.dirname(require.main.filename || process.mainModule.filename);

module.exports = (startPath, routerFileFilter) => {
    console.log('API Router Module Load...', '\n');
    fromDir(startPath, routerFileFilter);
    console.log('\nAPI Router Module Loaded', '\n');
    return router;
};

function fromDir(apiPath, filter) {

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(apiPath)) {
        return;
    }

    const files = fs.readdirSync(apiPath);

    for (let i = 0; i < files.length; i++) {

        const filename = path.join(apiPath, files[i]);

        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            const apiDirPath = rootPath + '/' + filename;
            console.log(filename);
            const api = require(apiDirPath);
            routerRegister(api);
        }
    }
}

function routerRegister(api) {
    switch (api.method.toUpperCase()) {
        case 'GET':
            router.get(api.path, api.validator, api.service, api.errorHandler);
            break;
        case'POST':
            if(api.multer) {
                router.post(api.path, api.validator, api.multer, api.service, api.errorHandler);
                break;
            }
            router.post(api.path, api.validator, api.service, api.errorHandler);
            break;
        case'PUT':
            if(api.multer) {
                router.put(api.path, api.validator, api.multer, api.service, api.errorHandler);
            }
            router.put(api.path, api.validator, api.service, api.errorHandler);
            break;
        case'DELETE':
            router.delete(api.path, api.validator, api.service, api.errorHandler);
            break;
        case'PATCH':
            router.patch(api.path, api.validator, api.service, api.errorHandler);
            break;
    }
}