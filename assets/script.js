// help from faran
$(function () {
    // Selectors
    var searchBtn = $('#search-btn')
    var apiKey = '4002166d0bd05a797585e40fd9241a1b'
    var clearBtn = $('#clear-btn')

    // get city name from user
    searchBtn.on('click', function () {
        var cityName = $('#search-input').val().trim();
        startSearch(cityName);
    })

    function startSearch(incCity) {
        searchWeather(incCity);
        getForecast(incCity);
        pushSearches();
        $('#search-input').val("");
        if (!incCity) {
            alert("Please enter a city");
          }
    }

    clearBtn.on('click', function () {
        localStorage.clear();
        $('#search-list').hide();
    })

    // Search weather & console.log data
    function searchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                $("#city").empty();
                $("#temp").empty();
                $("#wind-speed").empty();
                $("#humidity").empty();
                $("#icon").empty();
                var city = data.city.name;
                var date = data.list[0].dt_txt;
                var temp = data.list[0].main.temp;
                var wind = data.list[0].wind.speed;
                var humidity = data.list[0].main.humidity;
                var icon = data.list[0].weather[0].icon;
                $("<h1>" + city + " " + date + "</h1>").appendTo("#city");
                $("<h2> Temp: " + temp + "°F" + "</h2>").appendTo("#temp");
                $("<h2> Wind Speed: " + wind + "MPH" + "</h2>").appendTo("#wind-speed");
                $("<h2> Humidity: " + humidity + "%" + "</h2>").appendTo("#humidity");
                $("<img src='https://openweathermap.org/img/wn/" + icon + ".png" + "' />" ).appendTo("#icon");
            });
    }
    
    // Five day forecast, help from Bard
    function getForecast(city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $("#five-day-forecast").empty();
                $("#forecastIcon").empty();
                var icon = data.list[0].weather[0].icon;
                var dataList = data.list;
                for (var i = 0; i < dataList.length; i += 8) {
                    $("<li>").text(`${dataList[i].dt_txt}: Temp - ${data.list[i].main.temp}°F  Wind Speed - ${data.list[i].wind.speed}MPH  Humidity - ${data.list[i].main.humidity}%`).appendTo("#five-day-forecast");
                    $(`${"<img src='https://openweathermap.org/img/wn/" + icon + ".png" + "' />" }`).appendTo('#forecastIcon');
                }
            });
    }

    // help from Bard
    function pushSearches() {
        var cityName = $('#search-input').val().trim();
        //   check to see if cityName is empty
        if (cityName === '') {
            return;
        } 
        //   get city search list from local storage, convert JSON string to object, if local storage is empty, will set variable to empty array
        var city = JSON.parse(localStorage.getItem("city")) || [];

        // help from Bard, convert object to array in order to push variable to array (you can only push arrays to arrays)
        cityArray = Array.from(city);
        // push new input to local storage
        cityArray.push(cityName);
        localStorage.setItem("city", JSON.stringify(cityArray));
        renderCityBtn();
    }

    function renderCityBtn() {
        $("#search-list").empty();
        for (var i = 0; i < cityArray.length; i++) {
            var cityBtn = $("<button>")
            .text(cityArray[i]);
            cityBtn.click( searchHistory );
            cityBtn.appendTo("#search-list");
        }
    }
 
    function searchHistory(event) {
        //console.log(event.target.textContent)
        startSearch(event.target.textContent)
    }

    // $("#search-list").on('click', function(event) {
    //     var cityBtn = $("<button>");
    //     var innerHTML = cityBtn.html()
    //     console.log(innerHTML);
    // })

});
// console.log($("#search-list").innerHTML);
// var cityBtn = $("#search-list");
        // var btnText = cityBtn.text();
        // searchWeather(btnText);
        // getForecast(btnText);
        
            // cityBtn.on('click', function() {
            //     $("#city").empty();
            //     $("#temp").empty();
            //     $("#wind-speed").empty();
            //     $("#humidity").empty();
            //     $("#five-day-forecast").empty();
                
            //     // searchWeather(cityArray[i]);
            // }
            // )