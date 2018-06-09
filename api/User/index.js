var express =       require('express'),
    bcrypt =        require('bcryptjs'),
    jwt =           require('jsonwebtoken'),
    router =        express.Router();


const getUserTodos = require('./userTodos');    
var auth = App.require('api/auth');

const JWRSecret = App.JWTSecret;

const signup = App.require('api/User/signup')
const login = App.require('api/User/login')
const getUsers = require('./getUsers');

router.post('/signup',signup)
router.post('/login',login)

router.get('/:userId/Todos',getUserTodos)


router.get('/',getUsers);

    

module.exports = router;