module.exports = app => {
    const loginWeb = require("../controllers/loginweb.controllers.js");

    app.post("/loginWeb2", loginWeb.loginWeb2);
};