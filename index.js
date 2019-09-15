// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
//Import Morgan
let morgan = require('morgan');

// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./routes/api-routes");
// Configure bodyparser to handle post requests

//Use Morgan
app.use(morgan('dev'));
//Use body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Handling Cors Error Started
app.use((req, res, next) => {
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

//Handling Cors Error Ended


// Connect to Mongoose and set connection variable

// mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW +'@node-rest-shop-ucqf6.mongodb.net/test?retryWrites=true&w=majority',
 { 
	useNewUrlParser: true
 });

var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res, next) => {
    res.status(200).json({
        status: '200',
        message: 'APIs root url is working perfectly'
    });
    console.log("APIs root url is working perfectly");
});

// Use Api routes in the App
app.use('/api', apiRoutes);

app.use((req, res, next) => {
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
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
