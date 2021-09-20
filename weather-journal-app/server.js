// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes (downloaded off internet)

const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
// why is the bodyParser crossed out.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Setup Server
const server = app.listen(port, listening);
    
// Callback to debug
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData(req, res) {
    console.log('retrieve projectData');
    res.sent(projectdata);
}

// Post Route

const data = []

app.post('/addData', addData);

function addData(req, res) {
    data.push(req.body);
    console.log('POST data: ' + req.body);
    //research exactly what you're doing
    newEntryHolder = {
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.content,
    }
    //what is exactly happening here? 
    projectData.push(newEntryHolder)
    res.send(projectData)
};

