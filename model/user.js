const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    email: {
        type: String,
        sparse: true,
        unique: true
    },
    nickname: {
        type: String,
        sparse: true,
        unique: true
    }
});

userSchema.statics.findAndValidate = async function (id, pwd) {
    const user = await this.findOne({id: id});
    const validPwd = await bcrypt.compare(pwd, user.pwd);
    return validPwd ? user : false;
}

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);