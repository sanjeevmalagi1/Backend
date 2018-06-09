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

        function isAailable() {
            return User.find({username:params.username})
                    .exec()
                    .then(function(users){
                        if(users.length) return false;
                        return true;
                    })
                    .catch(function(e){
                        return e;
                    })
        }

        function createUser() {
            const newUser = new User();
            
            newUser.username = params.username;
            newUser.password = bcrypt.hashSync(params.password, 8);
            newUser.save();

            const token = jwt.sign({ _id : newUser._id }, JWTSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
        
            return {token , user : newUser} ;
        }

        const errors = await validate();
        if(errors){
            throw errors
        } 
        if(! await isAailable()) {
            throw new Error("User Already Exists");
        }
        else {
            const userInfo = await createUser();
            res.send({
                token : userInfo.token,
                id : userInfo._id,
                username : userInfo.username
            });
        }
        
    } catch (error) {
        console.error(error);
        res.status(504).send({ message: error.message})
    }
    
}