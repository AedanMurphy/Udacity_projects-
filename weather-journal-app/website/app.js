/* Global Variables */
//const temp = document.getElementById('temp').value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.'+ d.getDate()+'.'+ d.getFullYear();
console.log('The date is ' + newDate);

// Personal API Key for OpenWeatherMap API
const baseURL ='https://api.openweathermap.org/data/2.5/weather?zip=';
const APIkey = '&appid=a7df853ffcfbd84c5237c6692376db71&units=metric';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', processData);

/* Function called by event listener */

function processData(e) {
        e.preventDefault();
        const inputZIP = document.getElementById('zip').value;
        const feeling = document.getElementById('feelings').value;

       
        getWeatherAPI(baseURL, inputZIP, APIkey)
        .then(function(data) {
                console.log(data);
                const temperature = data.main.temp;
                const feeling = feelings;
                postData('http://localhost:8000/addData', 
                {date: newDate, temp: temperature, content: feeling})
                .then(function() {
                        updateUI()
        });
        });
};

const getWeatherAPI = async(baseURL, inputZIP, APIkey) =>{
        const res = await fetch(baseURL+inputZIP+APIkey)
        try {
                const newData = await res.json();
                console.log(newData)
                console.log('Retrieved')
                return newData;
        } catch(error) {
                console.log("error :(", error);
        }
}; 


/* Function to POST data */
const postData = async (url = '', data = {}) => {
        const req = await fetch(url, {
            //boilerplate
            method: 'POST',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json',
            },
            //Body data type must match Content-Type
            body: JSON.stringify(data),
    });
        try {
            const newWeatherData = await req.json();
            console.log(newWeatherData);
            return newWeatherData;
        } catch(error) {
            console.log('error', error);
        };
    }




/* Function to GET Web API Data*/

const getData = async (url='') =>{
        const request = await fetch(url);
        try {
            const getData = await request.json()
        }
        catch(error){
            console.log('error', error);
        }
    };

/* Function to GET Project Data */

const updateUI = async() => {
        const req = await fetch('http://localhost:8000/all');
        try{
                const allData = await req.json()
                document.getElementById('date').innerHTML = `Date: ${allData.newDate}`; 
                document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
                document.getElementById('content').innerHTML = `Content: ${allData.content}`;
        } 
        catch(error){
                console.log('error', error);
        }
};