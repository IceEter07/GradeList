const {Schema, model} = require('mongoose');

const studentSchema = new Schema({
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
    calification: {
        type: Number,
        required: true
    },
    average: {
        type: Number,
        required: true
    },
    groups:[{
        type: Schema.ObjectId,
        ref: "group"
    }],
}, {
    timestamps: true
})

module.exports = model('student', studentSchema);