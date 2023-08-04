const {Schema, model} = require('mongoose')

const groupSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    students:{
        type: Array,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = model('user', userSchema);