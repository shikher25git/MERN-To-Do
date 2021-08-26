const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: String,
    desc: String,
    reminder: Boolean
});

module.exports = mongoose.model('Tasks', taskSchema);