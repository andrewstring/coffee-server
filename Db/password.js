const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password) => bcrypt.hashSync(password, saltRounds);

module.exports = hashPassword;
