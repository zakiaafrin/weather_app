// select the elements and create variables
// I want you to select the following elements using queryselector
// Get the title
var cityTitle = document.querySelector(".cityTitle")
// Get the input bar
var input = document.querySelector("input")
// get the div that will contain the weather
var weather = document.querySelector(".weather") 
//the img tag that will hold the icon
var image = document.querySelector(".icon")
//the span that holds the temp
var temp = document.querySelector(".temp")
//the span that holds the humidity
var humid = document.querySelector(".humid")
//the span that holds the degree symbol
var degree = document.querySelector(".deg")
var API_KEY = "8d2e0e15d05c8ed4b15d89c7888771a0"
var url = "http://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}"
var kelvin
var convert = document.querySelector(".convert")
var icons = {
    "Clouds": "img/cloudy.png",
    "Partly Clouds": "img/partly-cloudy.png",
    "Rainy": "img/rain.png",
    "Snowy": "img/snow.png",
    "Clear": "img/sun.png",
    "Sunny": "img/sun.png",
    "Storm": "img/thunderstorm.png",
       
}

//define function
function getWeather(zipcode){
    //console.log("Pressed Enter and now running getWeather")
$.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${API_KEY}`,
    type: "GET",
    dataType: "json",
    success: function(data){
        console.log(data)
        cityTitle.textContent = data.name
        //weather[""0""].main
        weather.textContent = data.weather[0].main
        kelvin = data.main.temp
        temp.textContent = kelvinToFarenheit()
        humid.textContent = data.main.humidity
        image.src = icons[data.weather[0].main]
     },
    error: function(error){
        console.log("There was an error")
     }
    })
}

function kelvinToFarenheit(){
    return  Math.round((9/5) * kelvinToCelsius()) + 32
}
function kelvinToCelsius(){
    return Math.round(kelvin - 273)
}

//add event addEventListener and call the function
input.addEventListener('keypress',function(e){
    if(e.key == "Enter"){
        getWeather(input.value)
    }
})

convert.addEventListener('click',function(e){
 //   console.log("clicked convert button")
    if(convert.textContent == "Convert to C"){
        //Convert to C
        temp.textContent = kelvinToCelsius()
        degree.innerHTML = "&deg;C"
        convert.textContent = "Convert to F"
    }else{
        //Convert to F
        temp.textContent = kelvinToFarenheit()
        degree.innerHTML = "&deg;F"
        convert.textContent = "Convert to C"
    }
})
getWeather('33149')