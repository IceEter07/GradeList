const {Schema, model} = require('mongoose'),
    group = require('./group')

const schoolSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    group:[{
        type: Schema.ObjectId,
        ref: "group"
    }],
}, {
    timestamps: true
});

module.exports = model('school', schoolSchema);