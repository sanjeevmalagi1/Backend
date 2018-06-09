const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    status : {
        type: String,
        enum: ['tobedone','doing','done'],
        default : 'tobedone'
    },
    dueDate : {
        type : Date,
        required : true
    },
    tags : [
        {
            type : String
        }
    ],
    createdBy : {
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    assignedTo : {
        type: Schema.Types.ObjectId, 
        ref: 'users'
    },
    createdAt : {
        type : Date,
        default : Date.now,
        required : true
    }
})

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;