const check =   require('express-validator').check,
      bcrypt =  require('bcryptjs'),
      jwt =     require('jsonwebtoken')

const JWTSecret = App.JWTSecret;      

const User = App.require('models/user')

module.exports = async function(req,res){
    try {
    
        const params = {
            username : req.body.username,
            password : req.body.password
        };

        async function validate(){
            req.checkBody('username').notEmpty().withMessage('Should Not Be Empty');
            req.checkBody('password').notEmpty().withMessage('Should Not Be Empty');

            return req.validationErrors();
            
        }

        function getUser() {
            return User.findOne({username:params.username})
                    .exec()
                    .then(function(user){
                        if(user) return user;
                        return false;
                    })
                    .catch(function(e){
                        return e;
                    })
        }

        function checkPassword(user) {
            if(bcrypt.compareSync(params.password, user.password)) {
            // Passwords match
                return true;
            } else {
            // Passwords don't match
                return false;
            }
        }

        const errors = await validate();
        if(errors){
            throw errors
        }
        const user = await getUser();

        if(user){
            if(checkPassword(user)){
                const token = jwt.sign({ _id : user._id }, JWTSecret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.send({
                    token,
                    id : user._id,
                    username : user.username
                });
            }
            else{
                throw new Error("Password does not match")
            }
        }
        else{
            throw new Error("User does not exists")
        }
        
    } catch (error) {
        console.error(error);
        res.status(504).send({message: error.message})
        // res.status(504).send(error)
    }
    
}