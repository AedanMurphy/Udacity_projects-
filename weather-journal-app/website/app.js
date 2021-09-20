/* Global Variables */
const temp = document.getElementById('temp').value;

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
                postData('http://localhost:8000/addData', {date: newDate, temp: data.main.temp, content: feeling})
                .then(updateUI());
        });
};


/* Function to GET Web API Data*/
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
const postData = async (url = '', data = {}) =>{
        console.log(data)
        const req = await fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json',},
                //body: JSON.stringify(data)
                body: JSON.stringify({
                        date: data.date,
                        temp: data.temp,
                        content: data.content
                })
        })
                try {
                        const newData = await req.json();
                        console.log(newData);
                        return newData;
                } catch(error) { 
                        console.log('error', error);

                }
};

/* Function to GET Project Data */

const updateUI = async() => {
        const req = await fetch('http://localhost:8000/all');
        try{
                const allData = await req.json()
                document.getElementById('date').innerHTML = allData.date;/*`Date: ${allData[0].data}`*/
                document.getElementById('time').innerHTML = allData.temp;/*`Temperature: ${allData[0].temp}`;*/
                document.getElementById('content').innerHTML = allData.feeling;/*`Feeling: ${allData[0].content}`;*/
        }
        catch(error){
                console.log('error', error);
        }
};