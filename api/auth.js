var jwt = require('jsonwebtoken');
const { JWTSecret } = App;

const checkAuth = (req, res, next) => {
    var token = req.headers.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, JWTSecret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Not Authorized' })
        else {
            req.params.authData = decoded;
            next();
        }
    });
}

module.exports = { 
    checkAuth 
}