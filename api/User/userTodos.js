const check =   require('express-validator').check;

const Todos  = App.require('models/todo');

function getTodos(userId) {
    return Todos.find({
                "assignedTo" : userId
            })
            // .skip(params.offset)
            // .limit(params.limit)
            // .exec()
            .then(function(todos){
                return todos;
            })
            .catch(function(e){
                return e;
            })
}

module.exports = async function(req,res){
    try {
        
        const params = {
            userId : req.params.userId
        };
        const todos = await getTodos(params.userId);
        res.send(todos);
        
    } catch (error) {
        console.error(error);
        res.status(504).send("Somethins went wrong")
    }
    
}