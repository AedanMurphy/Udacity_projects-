// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes 

const express = require('express');

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// module.export = app?

// Start up an instance of app
const app = express();

//Here we are configuring express to use body-parser as middle-ware.
// why is the bodyParser crossed out.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static(__dirname + 'dist/index.html'));

const port = 8000;

// Setup Server
const server = app.listen(port, listening);

    
// Callback to debug
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};


// Initialize all route with a callback function
// Callback function to complete POST '/addApiData'

const data = [];

app.post('http://localhost:8080/addApiData', (req, res) => {
    let data = req.body;
    console.log('Server side Data', data);
    projectData = req.body;
    res.send(projectData);
});


// Initialize all route with a callback function
// Callback function to complete GET '/getData'

app.get('http://localhost:8000/all', (req, res) => {
    res.send(projectData);
    console.log('ProjectData retrieved', projectData);
});

/*app.post('/addData', addData);

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
};*/



