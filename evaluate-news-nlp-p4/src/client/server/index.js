var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');

//API reference
dotenv.config();

const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKey = process.env.API_KEY;
const query = '&lang=en&url=';
let inputURL = [];

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
    console.log('Example app listening on port 8080!')
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
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apikey}&url=${req.body.formText}&lang=en`);
    try {
        const data = await response.json();
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log('error :(', error);
    }
});