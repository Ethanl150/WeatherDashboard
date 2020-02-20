var cityArray = [];
var storedCities = JSON.parse(localStorage.getItem("cities"));

if (storedCities != null) {
    cityArray = storedCities;
}

var time = new Date();
var month = time.getMonth() + 1;
var day = time.getDate();
var year = time.getFullYear();
var today = month + '/' + day + '/' + year;

if (storedCities != null) {
    for (i = 0; i < cityArray.length; i++) {
        var newBtn = $("<button>" + cityArray[i] + "</button>");
        newBtn.addClass("btn btn-light text-left cityBtn");
        newBtn.attr("data-name", cityArray[i]);
        $("#search-card").append(newBtn);
    }

}

$(document).ready(function () {

    $("#search-button").on("click", function (event) {
        event.preventDefault();
        $("#weather-display").empty();
        $("#five-day-container").empty();
        $("#main-card").css("display", "flex");
        $("h3").css("display", "block");
        var city = $("#input").val();
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a56db781820753124e9c7d3e82f6c972";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a56db781820753124e9c7d3e82f6c972";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var fahrenheit = response.main.temp * 9 / 5 - 459.67;
            var displayHeader = $("<h1>" + response.name + " (" + today + ")" + "</h1>");
            var temp = $("<p>Temperature: " + fahrenheit.toFixed() + "&deg;F</p>");
            var humidity = $("<p>Humidity: " + response.main.humidity + "%</p>");
            var windSpeed = $("<p>Wind speed: " + response.wind.speed + " MPH</p>");
            if (response.weather[0].main == "Clouds") {
                var cloudIcon = $("<i class='fas fa-cloud'></i>");
            } else if (response.weather[0].main == "Clear") {
                var cloudIcon = $("<i class='fas fa-sun'></i>");
            } else if (response.weather[0].main == "Rain") {
                var cloudIcon = $("<i class='fas fa-cloud-rain'></i>");
            } else if (response.weather[0].main == "Snow") {
                var cloudIcon = $("<i class='far fa-snowflake'></i>")
            } else if (response.weather[0].main == "Haze") {
                var cloudIcon = $("<i class='fas fa-smog'></i>")
            }

            $("#weather-display").append(displayHeader, cloudIcon, temp, humidity, windSpeed);

            if (!cityArray.includes(response.name)) {
                var newBtn = $("<button>" + response.name + "</button>");
                newBtn.addClass("btn btn-light text-left cityBtn");
                newBtn.attr("data-name", response.name);
                cityArray.push(response.name);
                localStorage.setItem("cities", JSON.stringify(cityArray));
                $("#search-card").append(newBtn);
            }
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=a56db781820753124e9c7d3e82f6c972";
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {
                var uvIndex = $("<p>UV Index: <span id='uv-index'>" + response2.value + "</span></p>");
                $("#weather-display").append(uvIndex);
                if (response2.value >= 8) {
                    $("#uv-index").css("background-color", "red");
                } else if (response2.value >= 6) {
                    $("#uv-index").css("background-color", "orange");
                } else if (response2.value >= 3) {
                    $("#uv-index").css("background-color", "yellow");
                } else if (response2.value < 3) {
                    $("#uv-index").css("background-color", "green");
                }
            })
        })
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 4, j = 1; i < 37; i += 8, j++) {
                var date = $("<h5>" + month + '/' + (day + j) + '/' + year + "</h5>");
                var fahrenheit = response.list[i].main.temp * 9 / 5 - 459.67;
                var newCard = $("<div class='card bg-primary five-day'>");
                if (response.list[i].weather[0].main == "Clouds") {
                    var cloudIcon = $("<i class='fas fa-cloud'></i>");
                } else if (response.list[i].weather[0].main == "Clear") {
                    var cloudIcon = $("<i class='fas fa-sun'></i>");
                } else if (response.list[i].weather[0].main == "Rain") {
                    var cloudIcon = $("<i class='fas fa-cloud-rain'></i>");
                } else if (response.list[i].weather[0].main == "Snow") {
                    var cloudIcon = $("<i class='far fa-snowflake'></i>");
                } else if (response.list[i].weather[0].main == "Haze") {
                    var cloudIcon = $("<i class='fas fa-smog'></i>")
                }
                var temp = $("<p>Temp: " + fahrenheit.toFixed() + "&deg;F</p>");
                var humidity = $("<p>Humidity: " + response.list[i].main.humidity + "%</p>");
                newCard.append(date, cloudIcon, temp, humidity);
                $("#five-day-container").append(newCard);
            }
        })
        $("#input").val("");
    })

    $("#search-card").on("click", ".cityBtn", function (event) {
        event.preventDefault();
        $("#weather-display").empty();
        $("#five-day-container").empty();
        $("#main-card").css("display", "flex");
        $("h3").css("display", "block");
        var city = $(this).attr("data-name");
        var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=a56db781820753124e9c7d3e82f6c972";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a56db781820753124e9c7d3e82f6c972";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var fahrenheit = response.main.temp * 9 / 5 - 459.67;
            var displayHeader = $("<h1>" + response.name + " (" + today + ")" + "</h1>");
            var temp = $("<p>Temperature: " + fahrenheit.toFixed() + "&deg;F</p>");
            var humidity = $("<p>Humidity: " + response.main.humidity + "%</p>");
            var windSpeed = $("<p>Wind speed: " + response.wind.speed + " MPH</p>");

            if (response.weather[0].main == "Clouds") {
                var cloudIcon = $("<i class='fas fa-cloud'></i>")
            } else if (response.weather[0].main == "Clear") {
                var cloudIcon = $("<i class='fas fa-sun'></i>")
            } else if (response.weather[0].main == "Rain") {
                var cloudIcon = $("<i class='fas fa-cloud-rain'></i>")
            } else if (response.weather[0].main == "Snow") {
                var cloudIcon = $("<i class='far fa-snowflake'></i>")
            } else if (response.weather[0].main == "Haze") {
                var cloudIcon = $("<i class='fas fa-smog'></i>")
            }

            $("#weather-display").append(displayHeader, cloudIcon, temp, humidity, windSpeed);
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=a56db781820753124e9c7d3e82f6c972";
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {
                var uvIndex = $("<p>UV Index: <span id='uv-index'>" + response2.value + "</span></p>")
                $("#weather-display").append(uvIndex);
                if (response2.value >= 8) {
                    $("#uv-index").css("background-color", "red");
                } else if (response2.value >= 6) {
                    $("#uv-index").css("background-color", "orange");
                } else if (response2.value >= 3) {
                    $("#uv-index").css("background-color", "yellow");
                } else if (response2.value < 3) {
                    $("#uv-index").css("background-color", "green");
                } 
            })
        })
        $.ajax({
            url: fiveDayURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 4, j = 1; i < 37; i += 8, j++) {
                var date = $("<h5>" + month + '/' + (day + j) + '/' + year + "</h5>");
                var fahrenheit = response.list[i].main.temp * 9 / 5 - 459.67;
                var newCard = $("<div class='card bg-primary five-day'>");
                if (response.list[i].weather[0].main == "Clouds") {
                    var cloudIcon = $("<i class='fas fa-cloud'></i>")
                } else if (response.list[i].weather[0].main == "Clear") {
                    var cloudIcon = $("<i class='fas fa-sun'></i>")
                } else if (response.list[i].weather[0].main == "Rain") {
                    var cloudIcon = $("<i class='fas fa-cloud-rain'></i>")
                } else if (response.list[i].weather[0].main == "Snow") {
                    var cloudIcon = $("<i class='far fa-snowflake'></i>")
                } else if (response.list[i].weather[0].main == "Haze") {
                    var cloudIcon = $("<i class='fas fa-smog'></i>")
                }
                var temp = $("<p>Temp: " + fahrenheit.toFixed() + "&deg;F</p>");
                var humidity = $("<p>Humidity: " + response.list[i].main.humidity + "%</p>");
                newCard.append(date, cloudIcon, temp, humidity);
                $("#five-day-container").append(newCard);
            }
        })
    })
})