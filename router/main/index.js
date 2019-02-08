const routes  = require("./routes");
const routing = require("../../helpers").routing;

module.exports = () => {
    return routing(routes);
}