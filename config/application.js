var env =               process.env.NODE_ENV || 'development',
    mongoURL =          process.env.MONGO_URL || 'mongodb://sanjeev:sanjeevpassword1*@ds247290.mlab.com:47290/scripbox'
    JWTSecret =         process.env.JWT_SECRET || 'dummysecret',
    packageJSON =       require('../package.json'),
    path =              require('path'),
    express =           require('express'),
    bodyParser =        require('body-parser'),
    mongoose =          require('mongoose'),
    cors =              require('cors'),
    expressValidator =  require('express-validator'),
    compression =       require('compression'),
    public =            __dirname + '/../public';

console.log(`Loading App in ${env} mode.`);

global.App = {
    app : express(),
    port : process.env.PORT || 8080,
    version : packageJSON.version,
    root : path.join(__dirname,'..'),
    env,
    JWTSecret,
    appPath : function(path){
        return `${this.root}/${path}`
    },
    require : function(path){
       return require(this.appPath(path))
    },
    connectMongoDB : ()=>{
            mongoose.connect(mongoURL);
            // Get Mongoose to use the global promise library
            mongoose.Promise = global.Promise;
            //Get the default connection
            var db = mongoose.connection;

            //Bind connection to error event (to get notification of connection errors)
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
            db.once('open', function() {
                console.log('Now we are connected with mongoDB');
            });
    },
    start : function(){
        
        if(!this.started){
            this.started = true;

            this.connectMongoDB();
            this.app.listen(this.port)
            console.log(`Running App Version : ${App.version} on port : ${App.port}`)
        }
        else{
            console.log("App is Already Running");
        }
    }
}

var APIs =      App.require('api'),
    logger =    App.require('api/log')

//Middlewares 
App.app.use(bodyParser.json({ extended: false }))
App.app.use(cors())
App.app.use(expressValidator())
App.app.use(compression())

//Routes
App.app.use('/',express.static(public))
App.app.use('/api',logger.logRequest,APIs);
