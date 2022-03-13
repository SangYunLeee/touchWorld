const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    pwd: {
        type: String,
        require: true
    }
});

userSchema.statics.findAndValidate = async function (id, pwd) {
    const user = await this.findOne({id: id});
    const validPwd = await bcrypt.compare(pwd, user.pwd);
    return validPwd ? user : false;
}

userSchema.pre('save', async function (next) {
    this.pwd = await bcrypt.hash(this.pwd, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);