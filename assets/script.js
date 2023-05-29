// help from faran
$(function () {
    // Selectors
    var searchBtn = $('#search-btn')
    var apiKey = '4002166d0bd05a797585e40fd9241a1b'
    var clearBtn = $('#clear-btn')

    // get city name from user
    searchBtn.on('click', function () {
        var cityName = $('#search-input').val().trim();
        searchWeather(cityName);
        getForecast(cityName);
        pushSearches();
        $('#search-input').val("");
        if (!cityName) {
            alert("Please enter a city");
          }
    })

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
                var city = data.city.name;
                var date = data.list[0].dt_txt;
                var temp = data.list[0].main.temp;
                var wind = data.list[0].wind.speed;
                var humidity = data.list[0].main.humidity;
                $("<h1>" + city + " " + date + "</h1>").appendTo("#city");
                $("<h2> Temp: " + temp + "°F" + "</h2>").appendTo("#temp");
                $("<h2> Wind Speed: " + wind + "MPH" + "</h2>").appendTo("#wind-speed");
                $("<h2> Humidity: " + humidity + "%" + "</h2>").appendTo("#humidity");
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
                var dataList = data.list;
                for (var i = 0; i < dataList.length; i += 8) {
                    $("<li>").text(`${dataList[i].dt_txt}: Temp - ${data.list[i].main.temp}°F  Wind Speed - ${data.list[i].wind.speed}MPH  Humidity - ${data.list[i].main.humidity}%`).appendTo("#five-day-forecast");
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
            var cityBtn = $("<button>");
            cityBtn.text(cityArray[i]);
            cityBtn.appendTo("#search-list");
        }
    }

});

