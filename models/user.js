var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    account: String,
    pass: String,
});

module.exports = mongoose.model('User', UserSchema);
