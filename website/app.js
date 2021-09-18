/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL ='https://api.openweathermap.org/data/2.5/weather?zip=';
const APIkey = '&appid=a7df853ffcfbd84c5237c6692376db71';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', processData);

/* Function called by event listener */

function processData(e) {
        const inputZIP = document.getElementById('zip').value;
        const feeling = document.getElementById('feelings').value;
       
        getWeatherAPI(baseURL, inputZIP, APIkey)
        .then(function(data) {
                console.log(data);
                postData('/add,', {Date: newDate, Temp: data.main.temp, Feeling: feeling})
                .then(updateUI);
        });
        
};


/* Function to GET Web API Data*/
const getWeatherAPI = async (baseURL, inputZIP, APIkey) =>{
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
const postData = async (url = '', data = {}) =>{
        console.log(data)
        const resp = await fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(data)
                // body data type must match "Content-Type" header 
        })
                try {
                        const newData = await resp.json();
                        console.log(data);
                        return newData
                } catch(error) { 
                        console.log('error', error);

                }
};

/* Function to GET Project Data */

const updateUI = async() => {
        const request = await fetch('/all');
        try{
                const allData = await request.json()
                document.getElementById('date').innerHTML = `Date: ${allData[0].data}`
                document.getElementById('time').innerHTML = `Temperature: ${allData[0].temp}`;
                document.getElementById('content').innerHTML = `Feeling: ${allData[0].content}`;
        }
        catch(error){
                console.log('error', error);
        }
};