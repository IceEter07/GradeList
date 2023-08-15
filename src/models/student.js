const {Schema, model} = require('mongoose');

const studentSchema = new Schema({
    user: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    ap1: {
        type: String,
        required: true,
    },
    ap2: {
        type: String,
    },
    groups:[{
        type: Schema.ObjectId,
        ref: "group",
        calification:{
            type: String,
        }
    }],
}, {
    timestamps: true
})

module.exports = model('student', studentSchema);