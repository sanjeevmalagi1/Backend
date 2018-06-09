const check =   require('express-validator').check;

const Todos  = App.require('models/todo');

function updateTodo(todoId,userId,values) {
    const condition = {
        "_id" : todoId,
        "$or" : [
            {
                'createdBy' : userId
            },
            {
                'assignedTo' : userId
            }
        ]
    };
    const updation = {
        $set : values
    }
    const config = {
        new: true
    }
    return Todos.findOneAndUpdate(condition,updation,config)
            .populate("createdBy",["username"])
            .populate("assignedTo",["username"])
            .then(function(todo){
                if(!todo){
                   throw Error("You are not authorised");
                }
                return todo;
            })
            .catch(function(e){
                throw e;
            })
}

module.exports = async function(req,res){
    try {
        
        const params = {
            id : req.params.todoId,
            updation : req.body,
            userId : req.params.authData._id
        };

        function validate(){
            req.checkParams('id').notEmpty().withMessage('Should Not Be Empty');
            req.checkBody('updation').notEmpty().withMessage('Should Not Be Empty');
            
            return req.validationErrors();
        }

        const errors = await validate();
        if(errors){
            throw errors
        }
        else{
            const todo = await updateTodo(params.id,params.userId,params.updation);
            res.send(todo);
        }
        
    } catch (error) {
        console.error(error);
        res.status(504).send({ message: error.message})
    }
    
}