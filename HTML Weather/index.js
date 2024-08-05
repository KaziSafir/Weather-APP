let apikey = '759384e42b957eb7c95da46dd5a6bfad';

document.querySelector(".zipandcountry").addEventListener('submit', e => {
    e.preventDefault();
    let zipcode = document.querySelector(".zipinput").value;
    getWeather(zipcode);
    document.querySelector(".zipinput").value = "";
});

function dateTime(timestamp, timezone){
    const convertTimezone = timezone / 3600;
    const date = new Date(timestamp * 1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
}

function time(timestamp, timezone){
    const convertTimezone = timezone / 3600;
    const date = new Date(timestamp * 1000);
    const options = {
        hour: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
}


function getWeather(zipcode){
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apikey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            console.log('current weather forecast', data);
            currentweather(data);
        });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${apikey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            console.log('five day forecast', data);
            updateWeeklyForecast(data);
        });
}

function currentweather(data){
    document.querySelector('.town').innerHTML = `Town: ${data.name}`;
    document.querySelector('.country').innerHTML = `Country: ${data.sys.country}`;
    document.querySelector('.currtemp').innerHTML = `Current temp: ${data.main.temp.toFixed()}°F`;
    document.querySelector('.feelslike').innerHTML = `Feels Like: ${data.main.feels_like.toFixed()}°F`;
    document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity.toFixed()}%`;
    document.querySelector('.wind').innerHTML = `Winds: ${data.wind.speed.toFixed()} mph`;
    document.querySelector('.Weather').innerHTML = `Weather: ${data.weather[0].main}`;
    document.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;
    document.querySelector('.date').innerHTML = dateTime(data.dt, data.timezone);
    document.querySelector('.currhigh').innerHTML = `High: ${data.main.temp_max.toFixed()}°F`;
    document.querySelector('.currlow').innerHTML = `Low: ${data.main.temp_min.toFixed()}°F`;
}


function updateWeeklyForecast(data) {
    document.querySelector('.time0').innerHTML = time(data.list[0].dt, data.city.timezone);
    document.querySelector('.hourlyviewicon0').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" />`;
    document.querySelector('.hourlyviewtemp0').innerHTML = `${data.list[0].main.temp.toFixed()}°F`;

    document.querySelector('.time1').innerHTML = time(data.list[1].dt, data.city.timezone);
    document.querySelector('.hourlyviewicon1').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png" />`;
    document.querySelector('.hourlyviewtemp1').innerHTML = `${data.list[1].main.temp.toFixed()}°F`;

    document.querySelector('.time2').innerHTML = time(data.list[2].dt, data.city.timezone);
    document.querySelector('.hourlyviewicon2').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png" />`;
    document.querySelector('.hourlyviewtemp2').innerHTML = `${data.list[2].main.temp.toFixed()}°F`;

    document.querySelector('.time3').innerHTML = time(data.list[3].dt, data.city.timezone);
    document.querySelector('.hourlyviewicon3').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png" />`;
    document.querySelector('.hourlyviewtemp3').innerHTML = `${data.list[3].main.temp.toFixed()}°F`;

    document.querySelector('.time4').innerHTML = time(data.list[4].dt, data.city.timezone);
    document.querySelector('.hourlyviewicon4').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png" />`;
    document.querySelector('.hourlyviewtemp4').innerHTML = `${data.list[4].main.temp.toFixed()}°F`;
    };

document.addEventListener('DOMContentLoaded', () => {
    getWeather('07203');
});
