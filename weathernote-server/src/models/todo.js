const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    project: {
        type: String,
        required: true,
    },
    ts: {
        type: Number,
        required: true,
    },
    doneTs: {
        type: Number,
        default: null,
    }
});

// Creating a table within database with the defined schema
const Todo = mongoose.model('todo', TodoSchema);

// Exporting table for querying and mutating
module.exports = Todo;
