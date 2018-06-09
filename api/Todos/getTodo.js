const check =   require('express-validator').check;

const Todos  = App.require('models/todo');

function getTodo(todoId) {
    return Todos.findOne({
                "_id" : todoId
            })
            // .skip(params.offset)
             .populate("createdBy",["username"])
             .populate("assignedTo",["username"])
            // .limit(params.limit)
            // .exec()
            .then(function(todo){
                return todo;
            })
            .catch(function(e){
                return e;
            })
}

module.exports = async function(req,res){
    try {
    
        const params = {
            id : req.params.todoId
        };

        const todos = await getTodo(params.id);
        res.send(todos);
        
    } catch (error) {
        console.error(error);
        res.status(504).send("Somethins went wrong")
    }
    
}