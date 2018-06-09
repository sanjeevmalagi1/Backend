const logRequest = (req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(`Request : ${req.method} : ${req.ip} : ${fullUrl}: ${new Date}`);
    next()
}

module.exports = { 
    logRequest 
}