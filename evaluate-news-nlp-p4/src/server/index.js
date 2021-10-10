var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const axios = require('axios')
// should I even have node-fetch? 
//const fetch = require('node-fetch');

//API reference
dotenv.config();

const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKey = process.env.API_KEY;
const query = '&lang=en&url=';
let inputURL = "";

//empty data object
projectData = {};

// start express
const app = express()


//middleware
//cors
app.use(cors());

//bodyparser
app.use(bodyParser.urlencoded({ 
    extended: false 
}));
app.use(bodyParser.json());


// deployemnet folder
app.use(express.static('dist'))
console.log(__dirname);

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(8080, function () {
    console.log(`Example app listening on port ${port}!`)
})


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


app.post('/formText', async(req, res) => {
    console.log('look at past', req.body)
    const URLresponse = await axios.get(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.body.name}&lang=en`);
    console.log('URLresponse =======++> ', URLresponse)
    try {
        const { data } = URLresponse
        res.send(data);
    } catch (error) {
        console.log('error :(', error);
    }
});