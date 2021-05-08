/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let m = d.getMonth() + 1
let newDate =  d.getDate() + '/' + m + '/' + d.getFullYear();


// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '<keyholder>';
let unit = '&units=metric'

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){

    const city =  document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    weather(baseURL,city, apiKey, unit)
        .then(function(data){

            // Add data
            postData('/weather', {temperature:data.main.temp, date: newDate, mood:feeling} );

        })
        .then(function(){
            // Call UI updating functions
            updateUI();

        })
}

/* Function to GET Web API Data*/
const weather = async (baseURL, city, key, unit)=>{

    // Wait data from API
    const res = await fetch(baseURL + city + key + unit);

    try {

        // Formating data to json.
        const data = await res.json();
        console.log('weather');
        console.log(data);
        return data;

    }  catch(error) {

        console.log("error", error);
        // appropriately handle the error

    }
}

/* Function to POST data */
const postData = async ( url = '', data = {}) => {

    // Grabbing data from server
    const req = await fetch(url, {

        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });

    try {
        
        // Making sure data is formated in json.
        const newData = await req.json();
        console.log('postData');
        console.log(newData);
        return newData;

    }catch(error) {

        console.log("error", error);
        // appropriately handle the error

    }
};

const updateUI = async () => {

    // waiting data from server to be used in updating elements.
    const req = await fetch('/all');

    try{

        // Making sure data is formated in json.
        const allData = await req.json();
        console.log('updateUI');
        console.log(allData);

        // Change values of elements.
        document.getElementById('date').innerHTML = "Date: " + allData.date;
        document.getElementById('temp').innerHTML = "Temperature: " + allData.temperature + " °C";
        document.getElementById('content').innerHTML = "Mood: " + allData.mood;

    }catch(error){

        console.log("error", error);

    }
};