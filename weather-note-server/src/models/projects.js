const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        require: true,
    }
})

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;