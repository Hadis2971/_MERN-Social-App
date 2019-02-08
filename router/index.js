const authRouter   = require("./auth");
const apiRouter    = require("./api");
const mainRouter   = require("./main");
const friendRouter = require("./friends");

module.exports = {
    authRouter: authRouter(),
    apiRouter:  apiRouter(),
    mainRouter: mainRouter(),
    friendRouter: friendRouter()
};