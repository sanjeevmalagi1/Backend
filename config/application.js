var env =           process.env.NODE_ENV || 'development',
    mongoURL =      process.env.MONGO_URL || 'mongodb://sanjeev:sanjeev1234@ds131800.mlab.com:31800/assignment',
    packageJSON =   require('../package.json'),
    path =          require('path'),
    express =       require('express'),
    bodyParser =    require('body-parser'),
    mongoose =      require('mongoose')

console.log(`Loading App in ${env} mode.`);

global.App = {
    app : express(),
    port : process.env.PORT || 8080,
    version : packageJSON.version,
    root : path.join(__dirname,'..'),
    env,
    appPath : path => `${this.root}/${path}`,
    require : path => require(this.appPath(path)),
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

//Middlewares 
App.app.use(bodyParser.urlencoded({ extended: false }))
App.app.get('/',(req,res,next)=>{
    res.send('Hare Srinivasa!!');
})
