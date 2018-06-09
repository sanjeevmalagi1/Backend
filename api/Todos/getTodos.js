const check =   require('express-validator').check;

const Todos  = App.require('models/todo');

function getTodos() {
    return Todos.find()
            // .skip(params.offset)
             .populate("createdBy",["username"])
             .populate("assignedTo",["username"])
            // .exec()
            .then(function(footballers){
                return footballers;
            })
            .catch(function(e){
                return e;
            })
}

module.exports = async function(req,res){
    try {
    
        // const params = {
        //     limit : parseInt(req.query.limit),
        //     offset : parseInt(req.query.offset)
        // };
        const todos = await getTodos();
        res.send(todos);
        
    } catch (error) {
        console.error(error);
        res.status(504).send("Somethins went wrong")
    }
    
}