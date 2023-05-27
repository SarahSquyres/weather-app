// help from faran
$(function () {
    // Selectors
    var searchBtn = $('#search-btn')
    var apiKey = '4002166d0bd05a797585e40fd9241a1b'
    
    // get city name from user
    searchBtn.on('click', function () {
        var cityName = $('#search-input').val().trim();
        searchWeather(cityName);
        getForecast(cityName);
        saveCity(cityName);
    })

    // Search weather & console.log data
    function searchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var city = data.city.name;
                var date = data.list[0].dt_txt;
                var temp = data.list[0].main.temp;
                var wind = data.list[0].wind.speed;
                var humidity = data.list[0].main.humidity;
                $("<h1>" + city + " " + date + "</h1>").appendTo("#city");
                $("<h2> Temp: "  + temp + "°F" + "</h2>").appendTo("#temp");
                $("<h2> Wind Speed: " + wind + "MPH" +"</h2>").appendTo("#wind-speed");
                $("<h2> Humidity: " + humidity + "%" +"</h2>").appendTo("#humidity");
            });
    }

    // Five day forecast
    function getForecast(city) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var dataList = data.list;
            for (var i = 0; i < dataList.length; i+=8) {
              $("<li>").text(`${dataList[i].dt_txt}: Temp - ${data.list[i].main.temp}°F  Wind Speed - ${data.list[i].wind.speed}MPH  Humidity - ${data.list[i].main.humidity}%`).appendTo("#five-day-forecast");
            }
          });
      }

    // Save searches
    function saveCity (city) {
        localStorage.setItem(city, $('#search-input').val().trim())
    }


});

