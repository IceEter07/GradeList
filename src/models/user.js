const {Schema, model} = require('mongoose')

const userSchema = new Schema({
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

module.exports = model('user', userSchema);