const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    ap1:{
        type: String,
        required: true,
    },
    ap2:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.encryptPassword = async password => {
    console.log(password);    
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = model('user', UserSchema);