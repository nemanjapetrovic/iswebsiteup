const db = require('../config/db');

exports.addCheck = async function (url, status) {
    return new Promise((resolve, reject) => {
        db('check')
            .insert({
                url: url,
                time_stamp: Date.now(),
                status: status
            })
            .then(async (result) => {
                if (result == undefined || result.length == 0) {
                    resolve(null);
                }
                resolve(result[0]);
            })
            .catch((err) => {
                reject(err);
            });
    });
};