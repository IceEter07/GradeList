const {Schema, model} = require('mongoose')

const schoolSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    schools:{
        type: Array,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = model('user', userSchema);