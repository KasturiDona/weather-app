$(document).ready(function() {

  var appId = "5a394bbb9845fa2ba72a3c1757daec54";
  getLocation();

  function getLocation() {
    $.get("http://ipinfo.io", function(response) {

      $('.location')
        .append(response.city + ", ")
        .append(response.region);
        // .append(response.country);

      var unit = getUnit(response.country);
      getWeather(response.loc, unit);

    }, "jsonp");

  };

  function getUnit(country) {
    var unit;
    var farenheitCountries = ['BS', 'BZ', 'KY', 'PW', 'US']; // Bahamas, Belizie, Cayman Islands, Palau, United States

    if (farenheitCountries.indexOf(country) === -1) {
      unit = "metric";
    } else {
      unit = "imperial";
    }

    return unit;
  };

  function getWeather(location, unit) {
    lat = location.split(",")[0];
    lon = location.split(",")[1];

    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + unit + "&APPID=" + appId;

    $.get(weatherApiUrl, function(weather) {
      var windDirection = convWindDir(weather.wind.deg);
      var temp = weather.main.temp;
      // var minTemp = weather.main.temp_min;
      // var maxTemp = weather.main.temp_max;
      var humidity = weather.main.humidity;

      myDate = moment().format('MMMM Do YYYY, h:mm:ss a');
      console.log(myDate);

      var labelUnit;
      // var city = weather.name;
      // console.log(city);

      if (unit === "imperial") {
        labelUnit = "F";
      } else {
        labelUnit = "C";
      }

      temp = parseFloat((temp).toFixed(1));
      // minTemp = parseFloat((minTemp).toFixed(1));
      // maxTemp = parseFloat((maxTemp).toFixed(1));

      $('#icon').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png' style='height: 100px; width: 100px;'>");

      // $('#back').append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");

      $('#temp').append(temp + " " + labelUnit);
      // $('#mintemp').append(minTemp + " " + labelUnit);
      // $('#maxtemp').append(maxTemp + " " + labelUnit);
      $('#humidity').append(humidity + " " + "%");
      $('#date').append(myDate);
      $('#condition').append(weather.weather[0].description);
      $('#wind').append(windDirection + " " + weather.wind.speed + " knots");

    }, "jsonp");

  };

  function convWindDir(direction) {
    var dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var point = Math.floor(direction / 45);
    return dirs[point];
  };

});