const {Schema, model} = require('mongoose')

const groupSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    student:[{
        type: Schema.ObjectId,
        ref: "student"
    }],
}, {
    timestamps: true
});

module.exports = model('group', groupSchema);