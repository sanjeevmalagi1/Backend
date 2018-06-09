const check =   require('express-validator').check;

const Todos  = App.require('models/todo');

function createTodo(values) {
    const newTodo = new Todos();
    
    newTodo.title = values.title;
    newTodo.description = values.description;
    newTodo.dueDate = values.dueDate;
    newTodo.tags = values.tags;
    newTodo.createdBy = values.createdBy;
    newTodo.assignedTo = values.assignTo;
    
    newTodo.save();

    return newTodo.populate('assignedTo',['username']);
}

module.exports = async function(req,res){
    try {
        const params = {
            title : req.body.title,
            description : req.body.description,
            dueDate : req.body.dueDate,
            tags : req.body.tags,
            assignTo : req.body.assignTo,
            createdBy : req.params.authData._id
        };

        function validate(){
            req.checkBody('title').notEmpty().withMessage('Should Not Be Empty');
            req.checkBody('description').notEmpty().withMessage('Should Not Be Empty');
            req.checkBody('dueDate').notEmpty().withMessage('Should Not Be Empty');
            req.checkBody('assignTo').notEmpty().withMessage('Should Not Be Empty');
            
            return req.validationErrors();
        }

        const errors = await validate();
        if(errors){
            throw errors
        }
        else{
            const newTodo = await createTodo(params);
            res.send(newTodo);
        }
        
    } catch (error) {
        console.error(error);
        res.status(504).send("Somethins went wrong")
    }
    
}