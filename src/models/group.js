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
    user:{
        type: String,
        required: true
    },
    school:{
        type: String,
        // required: true
    }
}, {
    timestamps: true
});

module.exports = model('group', groupSchema);