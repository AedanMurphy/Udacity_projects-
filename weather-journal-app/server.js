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

// Post Route

const data = []

app.post('/addData', addData);

function addData(req, res) {
    let data = req.body;
    console.log('Server side Data', data);
    const newEntryHolder = {
        date: data.date,
        temp: data.temp,
        content: data.content,
    }
    projectData = newEntryHolder;
    console.log(projectData);
    res.send(projectData);
};


// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
    console.log(projectData);
    res.send(projectData);
};
