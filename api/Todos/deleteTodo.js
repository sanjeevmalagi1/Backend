const check =   require('express-validator').check;

const Todos  = App.require('models/todo');

function deleteTodo(todoId,userId) {
    const condition = {
        "_id" : todoId,
        "createdBy" : userId
    };

    return Todos.findOneAndDelete(condition)
            .then(function(result){
                if(!result){
                    throw Error("Not Authorised");
                }
                return result;
            })
            .catch(function(e){
                throw e;
            })
}

module.exports = async function(req,res){
    try {
        
        const params = {
            id : req.params.todoId,
            userId : req.params.authData._id
        };

        function validate(){
            req.checkParams('todoId').notEmpty().withMessage('Should Not Be Empty');
            return req.validationErrors();
        }

        const errors = await validate();
        if(errors){
            throw errors
        }
        else{
            const result = await deleteTodo(params.id,params.userId);
            res.send(result);
        }
        
    } catch (error) {
        console.error(error);
        res.status(504).send({ message: error.message})
    }
    
}