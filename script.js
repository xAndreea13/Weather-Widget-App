const apiKey = "f043c40fa7a5a7941f4d220f376504fd";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const daysApiKey = "fa8e52f863d2eec0dca82b99c29dac55";
const daysApiURL = "http://api.openweathermap.org/data/2.5/forecast?units=metric&q=";


let buton = document.querySelector(".search button");
let image = document.getElementsByClassName("weather-icon")[0];
let city;

const successCallback = (position) =>
{
    var pos;
    console.log(position.coords.latitude + " :) " + position.coords.longitude);
    pos = position;
    init(pos);
}

const errorCallback = (error) => {
    console.log(error);
}
    
if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
else
    alert("The widget cannot be used! :(");


async function init(position)
{
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + `&appid=${apiKey}`)   // `` =/= '' =/= ""
    var data = await response.json();
    const response1 = await fetch("https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + `&appid=${daysApiKey}`);
    var data1 = await response1.json();

    console.log(data);

    var aux = data.weather[0].main;
    console.log(aux);
    var backgrd = document.querySelector(".card");

    if( aux == "Clear" )
        backgrd.style.background = "-moz-linear-gradient(to right, rgb(55, 210, 238), rgb(0, 110, 255))";
    else
        if( aux == "Rain" )
            backgrd.style.background = "-moz-linear-gradient(to right, rgb(94, 114, 117), rgb(199, 208, 219))";
        else
            if( aux == "Clouds" )
                backgrd.style.background = "-moz-linear-gradient(to right, rgb(94, 114, 117), rgb(199, 208, 219))";
            else
                if( aux == "Mist" )
                     backgrd.style.background = "-moz-linear-gradient(to right, rgb(94, 114, 117), rgb(199, 208, 219))";
    

    image.setAttribute("src", "images/" + aux.toLowerCase() + ".png");

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.ceil(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+ "%";
    document.querySelector(".wind").innerHTML = Math.ceil(data.wind.speed) + "km/h";
    document.querySelector(".feels_like").innerHTML = "Feels like " + Math.ceil(data.main.feels_like) + "°C";
    for(index = 0; index < 4; index ++)
    {
        document.getElementById("temp" + (index+1)).innerHTML = Math.ceil(meanTemperature(index, data1)) + "°C";
        document.getElementById("image" + (index+1)).setAttribute("src", "images/" + dailyIcon(index, data1));
        document.getElementById("day"+ (index+1)).innerHTML = weekDay(index);
    }
}

function meanTemperature(nrDay, data)
{
    var min = Infinity;
    var max = Number.NEGATIVE_INFINITY;

    for(index1 = 8*nrDay; index1 < 8*(nrDay+1) - 1; index1 ++ )
    {
        if(data.list[index1].main.temp_min < min)
            min = data.list[index1].main.temp_min;
        if(data.list[index1].main.temp_max > max)
            max = data.list[index1].main.temp_min;
    }

    return (min + max)/2;
}

function dailyIcon(day, data1)
{
    //cu ajutorul unui vector de pozitie
    // 0 for clear
    // 1 for clouds
    // 2 for drizzle
    // 3 for mist
    // 4 for rain
    // 5 for snow

    let arr = new Array(0,0,0,0,0);

    for(index2 = 8*day; index2 < 8*(day+1) - 1; index2 ++ )
        if(data1.list[index2].weather[0].main == "Clear")
            arr[0] ++;
        else
            if(data1.list[index2].weather[0].main == "Clouds")
                arr[1] ++;
            else
                if(data1.list[index2].weather[0].main == "Drizzle")
                    arr[2] ++;
                else
                    if(data1.list[index2].weather[0].main == "Mist")
                        arr[3] ++;
                    else
                        if(data1.list[index2].weather[0].main == "Rain")
                            arr[4] ++;
                        else
                            arr[5] ++;

    switch(arr.indexOf(Math.max(...arr)))
    {
        case 0:
            console.log(0);
            return "clear.png";
            break;
        case 1:
            console.log(1);
            return "clouds.png";
            break;
        case 2:
            console.log(2);
            return "drizzle.png";
            break;
        case 3:
            console.log(3);
            return "mist.png";
            break;
        case 4:
            console.log(4);
            return "rain.png";
            break;
        case 5:
            console.log(5);
            return "snow.png";
            break;
    }
}

function getPrefix()
{
    var val = "";
    var prefixes = ['-moz-', '-ms-', '-webkit-','-o-'];

    var doc = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++)
    {
        doc.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';
        if (doc.style.background)
        {
            val = prefixes[i];
        }
    }

    doc = null;
    delete doc;
    return val;
}

function weekDay(number)
{
    var day = new Date();
    day.setDate(day.getDate() + number + 1);
    return day.toLocaleString('default', {weekday: 'long'});
}

async function checkWeather(city_name)
{
    const response = await fetch(apiURL + city_name + `&appid=${apiKey}`)   // `` =/= '' =/= ""
    var data = await response.json();
    const response1 = await fetch(daysApiURL + city_name + `&appid=${daysApiKey}`);
    var data1 = await response1.json();

    console.log(data);

    var aux = data.weather[0].main;
    console.log(aux);
    var backgrd = document.querySelector(".card");

    if( aux == "Clear" )
        backgrd.style.background = getPrefix() + "linear-gradient(to right, rgb(55, 210, 238), rgb(0, 110, 255))";
    else
        if( aux == "Rain" )
            backgrd.style.background = getPrefix() + "linear-gradient(to right, rgb(94, 114, 117), rgb(199, 208, 219))";
        else
            if( aux == "Clouds" )
                backgrd.style.background = getPrefix() + "linear-gradient(to right, rgb(94, 114, 117), rgb(199, 208, 219))";
            else
                if( aux == "Mist" )
                     backgrd.style.background = getPrefix() + "linear-gradient(to right, rgb(94, 114, 117), rgb(199, 208, 219))";
    

    image.setAttribute("src", "images/" + aux.toLowerCase() + ".png");

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.ceil(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+ "%";
    document.querySelector(".wind").innerHTML = Math.ceil(data.wind.speed) + "km/h";
    document.querySelector(".feels_like").innerHTML = "Feels like " + Math.ceil(data.main.feels_like) + "°C";
    for(index = 0; index < 4; index ++)
    {
        document.getElementById("temp" + (index+1)).innerHTML = Math.ceil(meanTemperature(index, data1)) + "°C";
        document.getElementById("image" + (index+1)).setAttribute("src", "images/" + dailyIcon(index, data1));
        document.getElementById("day"+ (index+1)).innerHTML = weekDay(index);
    }
}

buton.addEventListener("click", ()=> 
{
    city = document.querySelector(".search input").value; // se ia numele orasului din input
    checkWeather(city);
})