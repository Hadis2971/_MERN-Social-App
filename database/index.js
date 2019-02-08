const mongoose = require("mongoose");
const mongoURI = require("../config").mongoURI;

module.exports = {
    setConnection: () => mongoose.connect(mongoURI, {useNewUrlParser: true}),
    getConnection: () => mongoose.connection
};