
import fetch from 'node-fetch';
/* Global Variables */

// API Key for Geonames API
const geonames_baseURL = 'http://api.geonames.org/searchJSON?';
const GEONAMES_API_Username = 'aedanmurphy'; //maybe AedanMurphy
//http://www.geonames.org/export/web-services.html

// API key for Weatherbit API 
const weather_API_key = '002d9ab1e2424e2cb26921ca35c2fa55';
const weatherbit_CurrentURL = 'http://api.weatherbit.io/v2.0/current?';
const weatherbit_ForecastURL = ' http://api.weatherbit.io/v2.0/forecast/daily?';
let weatherbit_URL = '';
//https://www.weatherbit.io/account/dashboard
// furture forcast, current forecast
// did have to activate? 

// API key for pixabay 
const pixabay_baseURL = 'https://pixabay.com/api/?';
const pixabay_API_KEY = '23884301-b79d6a18a2fcc277f3e4b83d4'
//https://pixabay.com/api/docs/
//?key ???

// Event listener to add function to existing HTML DOM element
document.getElementById('search').addEventListener('click', genCoordinates); 



// genCoordinates function that will call API global variables in accordance to what value was inputted

export async function genCoordinates(e) {
        e.preventDefault();
        const destination = document.getElementById("input-destination").value;
        const departure = document.getElementById("input-departure").valueAsDate; 
        const arrival = document.getElementById("input-arrival").valueAsDate;

         //time between dates 
         const countdownDays = getCount(arrival);
         const holidayLength = getHolidayLength(arrival, departure);
 
         if (countdownDays <= 7) {
         let weatherbitURL = weatherbit_CurrentURL;
         } else {
         let weatherbitURL = weatherbit_ForecastURL;
         }


        //API calls to get Coordinates
        //GEOnames
        const geonamesReponse = await genCoordinates (
                geonames_baseURL, GEONAMES_API_Username, destination);
        //Weatherbit API 
        const weatherBitReponse = await getWeatherBitAPI (
                weather_API_key, weatherbit_URL, geonamesReponse.geonames[0].lat, geonamesReponse.geonames[0].lng);
        //pixabay API 
        const genPicData = await getPictureAPI (
                pixabay_baseURL, pixabay_API_KEY, destination)
        //postAllData 
               /* .then(function(data) {
                        console.log(data);
                        //const temperture = data.main.temp;*/
        await postAllData('http://localhost:8000/addApiData', {
                                weather_data: weatherBitReponse,
                                city: destination,
                                flight_until: countdownDays,
                                holiday_length: holidayLength,
                                departure_date: departure,
                                arrival_date: arrival,
                                Picture: genPicData
                        });
                UIupdate(genPicData.hits[0].webformatURL);
};


// Time between dates function
// getCount function

function getCount(arrival) {
        const currentData = new Date().getTime();
        const arrivalDate = new Date(arrival).getTime();
        const difference = arrivalDate - currentData;
        const days = Math.floor(difference / (1000 * 3600 * 24));
        return days;
}

//  getHolidayLength fucntion 
function getHolidayLength(arrival, departure) {
        const seconds = departure.getTime() - arrival.getTime();
        const days = seconds / (1000 * 3600 * 24);
        return days;
}


/* Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.'+ d.getDate()+'.'+ d.getFullYear();
console.log('The date is ' + newDate);
*/




// countdown api, getholidayurl functions 

//GET routes of the three API

// Geonames GET route
genCoordinates = async (geonames_baseURL, GEONAMES_API_Username, destination) => {
        const res = await fetch(geonames_baseURL, GEONAMES_API_Username, destination
                );
        console.log(res)

        try {
                const data = await res.json();
                console.log(data);
                return data;
        } catch (error) {
                console.log('error', error);
                console.log('Cannot get a  coordinates');
        }
};

// WeatherBIT GET route

/* Had to remove geonames.geoname[0] maybe because it was local
        geonamesReponse.geonames[0].lat, 
        geonamesReponse.geonames[0].lng */
export const getWeatherBitAPI = async ( 
        weather_API_key, 
        weatherbit_URL, 
        lat, 
        lng ) => { 
                
        const res = await fetch(
        weather_API_key, 
        weatherbit_URL, 
        geonamesReponse.geonames[0].lat, 
        geonamesReponse.geonames[0].lng
        //lat, lon
        );
        console.log(res)

        try { const data = await res.json();
                console.log(data);
                return data;
        } catch (error) { 
                console.log('error', error);
                console.log('Cannot get Weather Data');
        }        
}; 
        
//Pixabay GET route

const getPictureAPI = async (pixabay_baseURL, pixabay_API_KEY, destination) => {
        const res = await fetch(pixabay_baseURL, pixabay_API_KEY, destination
        );
        console.log(res);

        try { 
                const data = await res.json();
                console.log(data);
                return data;
        } catch (error) {
                console.log('error', error);
                console.log('Cannot get a destination picture');
        }
};


//postAllData post of collective data 
export const postAllData = async (URL = '', data = {}) => {
        console.log('', data);
                const req = await fetch(URL, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                        'Content-Type': 'application/json',
                },
      
                body: JSON.stringify(data),

        });
        try {
                const newWeatherData = await req.json();
                console.log(newWeatherData);
                return newWeatherData;
        } catch (error) {
                console.log('error', error);
        };
}

        // postData update UI .webformatURL usage

const UIupdate = async (webformatURL) => {
        const request = await fetch('http://localhost:8000/all')
        const reqAllData = await request.json()
        document.getElementById('Picture').src = webformatURL;
        document.getElementById('city').innerHTML = ' City Destination: ' + reqAllData.city;
        document.getElementById('days_until_departure').innerHTML = 'Days until departure: ' + reqAllData.flight_until;
        document.getElementById('holiday_length').innerHTML = 'Length_of_stay: ' + reqAllData.holiday_length;
        document.getElementById('weather_data').innerHTML = 'Weather: ' + reqAllData.weather_data;
        
     
};



// REMEMBER TO EXPORT  
// export {genCoordinates, getWeatherBitAPI, postAllData};
