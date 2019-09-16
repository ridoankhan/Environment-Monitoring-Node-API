let express = require('express');               // Import express
let bodyParser = require('body-parser');        // Import Body parser
let mongoose = require('mongoose');             //Import Mongoose
let morgan = require('morgan');                 //Import Morgan
let app = express();                            //Initilize the App

let apiRoutes = require("./routes/api-routes"); //Import api-routes

mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW +'@node-rest-shop-ucqf6.mongodb.net/test?retryWrites=true&w=majority',
 {                                            
    useNewUrlParser: true,
    useUnifiedTopology: true 
 });
let db = mongoose.connection;

if(!db)                                         // Added Check for DB Connection
    console.log("Error Connecting Db");
else
    console.log("Db Connected Successfully");

app.use(morgan('dev'));                         //Use Morgan

app.use(bodyParser.urlencoded({
    extended: false
}));                                            // Using Body-Parser to Handle Post Requests

app.use(bodyParser.json());                     // Configuring Body-Parser to Send JSON Data

app.use((req, res, next) => {                   //Handling Cors Error Started
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});                     

app.get('/', (req, res, next) => {              // Send message for default URL
    res.status(200).json({
        status: '200',
        message: 'APIs root url is working perfectly'
    });
    console.log("APIs root url is working perfectly");
});

app.use('/api', apiRoutes);                     //Using apiRoutes variables in application

app.use((req, res, next) => {                   //Handling Error for wrong URL request
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

