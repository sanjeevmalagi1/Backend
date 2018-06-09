const check =   require('express-validator').check;

var User = App.require('models/user');

function getUsers(userId) {
    const projection = {
        username : 1
    };
    return User.find({},projection)
            .then(function(users){
                return users;
            })
            .catch(function(e){
                return e;
            })
}

module.exports = async function(req,res){
    try {
        
        const users = await getUsers();
        res.send(users);
        
    } catch (error) {
        console.error(error);
        res.status(504).send("Somethins went wrong")
    }
    
}