const webServerConfig = require('../config/webserver.js');
const unirest = require('unirest');

exports.loginWeb2 = async (request, response) => {
    await doLoginWeb2(
        request.body.username,
        request.body.password,
        request.body.tahunAnggaran,
        request.body.timestamp,
        request.body.clientId
    ).then((body) => {
        response.status(200).send(body);
    }).catch((error) => {
        response.status(500).send({
            message:
                error.message || "Some error occurred while call loginWeb2.",
        });
    });
}

function doLoginWeb2(username, password, tahunAnggaran, timestamp, clientId) {
    return new Promise((resolve, reject) => {
        console.log(username, password, tahunAnggaran, timestamp, clientId)
        unirest.post(webServerConfig.hotfix1Url + '/sakti/backend/login/loginWeb2')
            .headers({ Accept: 'application/json', 'Content-Type': 'application/json' })
            .send({
                username: username,
                password: password,
                tahunAnggaran: tahunAnggaran,
                timestamp: timestamp,
                clientId: clientId
            })
            .end(function (response) {
                if (response.error) {
                    return reject(response.error)
                }
                return resolve(response.body);
            });
    })
}