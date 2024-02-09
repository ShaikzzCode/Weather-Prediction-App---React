import React, { useState,useEffect } from "react";
import "../App.css";
// Import images
import w_img1 from "../assets/card_images/w_img1.png";
import w_img2 from "../assets/card_images/w_img2.png";
import w_img3 from "../assets/card_images/w_img3.png";
import w_img4 from "../assets/card_images/w_img4.png";
import w_img5 from "../assets/card_images/w_img5.png";
import cloudy from "../assets/card_images/cloudy.webp";

// Import background images
import partly_cloudy_day from "../assets/bg_images/partly-cloudy-day.webp";
import partly_cloudy_night from "../assets/bg_images/partly-cloudy-night.jpg";
import rain from "../assets/bg_images/rain.webp";
import clear_day from "../assets/bg_images/clear-day.jpg";
import clear_night from "../assets/bg_images/clear-night.jpg";

// Import icons
import searchImgIcon from "../assets/icons/search_img.png";
import cloud_img from "../assets/icons/cloud_img.png";
import water_drop from "../assets/icons/water_drop_img.png";
import location_img from "../assets/icons/location_img.png";

function MainSection() {
  useEffect(() => {
    searchWeather();
  }, []);

  const [celBtnActive, setCelBtnActive] = useState(true);
  const [farBtnActive, setFarBtnActive] = useState(false);
  const [farBtnDisabled, setFarBtnDisabled] = useState(false);
  const [celBtnDisabled, setCelBtnDisabled] = useState(true);

  const [tempBtnsVisible, setTempBtnsVisible] = useState(false);
  const [tabsBtnsVisible, setTabsBtnsVisible] = useState(false);

  const [bgImgSrc, setBgImgSrc] = useState('https://i.ibb.co/qNv7NxZ/pc.webp');


  function searchWeather() {
    const city = document.getElementById("cityInput").value;
    // https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Anantapur?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`
    )
      // fetch(DummyData)
      .then((response) => response.json())
      .then((data) => {
        representingData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        document.getElementById("no_data").style.display = "inline-block";
        document.getElementById("no_data").textContent = error;
      });
  };


  function representingData(data){
    // Reading Data
    const weatherData = data.days[0];
    const hours = data.days[0].hours;
    const days = data.days;

    const city = data.resolvedAddress;
    const prec = data.days[0].precip;
    const currentTemp = data.currentConditions.temp;
    const currentcondition = data.currentConditions.conditions;
    const currentImage = data.currentConditions.icon;
    const todayHighlight_UV = data.days[0].uvindex;
    const todayHighlight_WindStatus = data.days[0].windspeed;
    const todayHighlight_SunRise = data.days[0].sunrise;
    const todayHighlight_SunSet = data.days[0].sunset;
    const todayHighlight_Humidity = data.days[0].humidity;
    const todayHighlight_Visisbility = data.days[0].visibility;
    const todayHighlight_AirQuality = data.days[0].feelslike;
    // Writing Data
    document.getElementById("addressCard").textContent = city;
    document.getElementById("left_temparature").textContent = currentTemp;
    document.getElementById("left_sec_precip").textContent = `Prec - ${prec}%`;
    document.getElementById("left_sec_condition").textContent = currentcondition;
    document.getElementById("weatherIcon_main").src = getWeatherIconUrl(currentImage);
    document.getElementById("weatherIcon_main").alt = currentImage;
    document.getElementById("uvIndexCard").textContent = todayHighlight_UV;
    document.getElementById("windStatusCard").textContent = todayHighlight_WindStatus;
    document.getElementById("sunriseSunsetCard").textContent = todayHighlight_SunRise;
    document.getElementById("sunsetCard_data").textContent = todayHighlight_SunSet;
    document.getElementById("humidityCard").textContent = todayHighlight_Humidity;
    document.getElementById("visibilityCard").textContent = todayHighlight_Visisbility;
    document.getElementById("airQualityCard").textContent = todayHighlight_AirQuality;



    document.getElementById("temp_btns_holder").style.display =
    "inline-block";
    document.getElementById("no_data").style.display = "none";
    // Today's Weather Cards
    let hourlyData = document.getElementById("weather_holder_today");
    hourlyData.innerHTML = "";
    hours.forEach((hour) => {
      const time = hour.datetime;
      const temp = hour.temp;
      const icon = hour.icon;
      hourlyData.innerHTML += `
        <div class="small_weather_card">
          <h2>${time}</h2>
          <img src="${getWeatherIconUrl(icon)}" alt="weather_card">
          <p class="temp_value">${temp}°C</p>
        </div>`;
    });

    // Today's Weather Cards
    let weeklyData = document.getElementById("weather_holder_week");
    weeklyData.innerHTML = "";
    days.forEach((day) => {
      const time = day.datetime;
      const temp = day.temp;
      const icon = day.icon;
      weeklyData.innerHTML += `
        <div class="small_weather_card">
          <h2>${time}</h2>
          <img src="${getWeatherIconUrl(icon)}" alt="weather_card">
          <p class="temp_value">${temp}°C</p>
        </div>`;
    });


    showToday();
    settingBG(currentImage);

    setCelBtnActive(true);
    setFarBtnActive(false);
    setCelBtnDisabled(true);
    setFarBtnDisabled(false)
    showTodayHighlights(weatherData);
    setTempBtnsVisible(true);
    setTabsBtnsVisible(true);
    // END
  }

  function showToday() {
    document.getElementById("weather_holder_today").style.display = "flex";
    document.getElementById("weather_holder_week").style.display = "none";

    document.getElementById("btn_today").classList.add("activeTab");
    document.getElementById("btn_week").classList.remove("activeTab");
  }

  function showWeek() {
    document.getElementById("weather_holder_week").style.display = "flex";
    document.getElementById("weather_holder_today").style.display = "none";

    document.getElementById("btn_week").classList.add("activeTab");
    document.getElementById("btn_today").classList.remove("activeTab");
  }

  function getWeatherIconUrl(condition) {
    let imagePath;
    if (condition === "partly-cloudy-day") {
        imagePath = "https://i.ibb.co/PZQXH8V/27.png";
    } else if (condition === "partly-cloudy-night") {
        imagePath = "https://i.ibb.co/Kzkk59k/15.png";
    } else if (condition === "rain") {
        imagePath = "https://i.ibb.co/kBd2NTS/39.png";
    } else if (condition === "clear-day") {
        imagePath = "https://i.ibb.co/rb4rrJL/26.png";
    } else if (condition === "clear-night") {
        imagePath = "https://i.ibb.co/1nxNGHL/10.png";
    } else {
        imagePath = "https://i.ibb.co/PZQXH8V/27.png";
    }
    return imagePath;
}

function settingBG(condition) {
  let imagePath;

  if (condition === 'partly-cloudy-day') {
    imagePath = "https://i.ibb.co/qNv7NxZ/pc.webp";
  } else if (condition === 'partly-cloudy-night') {
    imagePath = "https://i.ibb.co/RDfPqXz/pcn.jpg";
  } else if (condition === 'rain') {
    imagePath = "https://i.ibb.co/h2p6Yhd/rain.webp";
  } else if (condition === 'clear-day') {
    imagePath = "https://i.ibb.co/WGry01m/cd.jpg";
  } else if (condition === 'clear-night') {
    imagePath = "https://i.ibb.co/kqtZ1Gx/cn.jpg";
  } else {
    imagePath = 'https://i.ibb.co/qNv7NxZ/pc.webp';
  }

  setBgImgSrc(imagePath); // Update the background image source
  return imagePath;
}


  function getCurrentTime() {
    var now = new Date();
    var dayOfMonth = now.getDate();
    var monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var monthIndex = now.getMonth();
    var year = now.getFullYear();
    var dayOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ][now.getDay()];
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var dateString = dayOfMonth + getOrdinalSuffix(dayOfMonth) + " " +
        monthNames[monthIndex] + " " +
        year;
    var timeString = dayOfWeek + ", " +
        hours + ":" + minutes + " " + ampm;

        return (
          <>
              <span className="dateLeftFirst">{dayOfMonth}{getOrdinalSuffix(dayOfMonth)} {monthNames[monthIndex]} {year}</span><br/>
              <span>{dayOfWeek}, {hours}:{minutes} {ampm}</span>
          </>
      );
}

// Function to get the ordinal suffix for the day of the month
function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

function showTodayHighlights(weatherData) {
  //UV Index
  document.getElementById(
    "uvIndexCard"
  ).innerText = `${weatherData.uvindex}`;
  let uvIndexValue = weatherData.uvindex;
  if (uvIndexValue === 1 || uvIndexValue === 2) {
    document.getElementById("uvIndexCard_data").innerHTML = "Low";
  } else if (uvIndexValue >= 3 && uvIndexValue <= 5) {
    document.getElementById("uvIndexCard_data").innerHTML = "Moderate";
  } else if (uvIndexValue >= 6 && uvIndexValue <= 7) {
    document.getElementById("uvIndexCard_data").innerHTML = "High";
  } else if (uvIndexValue >= 8 && uvIndexValue <= 10) {
    document.getElementById("uvIndexCard_data").innerHTML = "Very High";
  } else if (uvIndexValue >= 11) {
    document.getElementById("uvIndexCard_data").innerHTML = "Extreme";
  } else {
    document.getElementById("uvIndexCard_data").innerHTML = "Unknown";
  }

  //Weather Status
  document.getElementById(
    "windStatusCard"
  ).innerText = `${weatherData.windspeed}`;

  //Sunrise and Sunset
  document.getElementById(
    "sunriseSunsetCard"
  ).innerText = `${weatherData.sunrise}`;
  document.getElementById(
    "sunsetCard_data"
  ).innerText = `${weatherData.sunset}`;

  //Humidity card
  document.getElementById(
    "humidityCard"
  ).innerText = `${weatherData.humidity}`;

  let humidityCardValue = weatherData.humidity;
  if (humidityCardValue >= 93.8 && humidityCardValue <= 96.9) {
    document.getElementById("humidityCard_data").innerHTML = "Good";
  } else if (humidityCardValue >= 82.2 && humidityCardValue <= 87.9) {
    document.getElementById("humidityCard_data").innerHTML = "Tolerable";
  } else if (humidityCardValue >= 70.3 && humidityCardValue <= 81.7) {
    document.getElementById("humidityCard_data").innerHTML = "Better";
  } else if (humidityCardValue >= 1 && humidityCardValue <= 69.6) {
    document.getElementById("humidityCard_data").innerHTML = "Worst";
  } else {
    document.getElementById("humidityCard_data").innerHTML = "Unknown";
  }

  //Visibility Card
  document.getElementById(
    "visibilityCard"
  ).innerText = `${weatherData.visibility}`;

  let visibilityCardValue = weatherData.visibility;
  if (visibilityCardValue === 0.03) {
    document.getElementById("visibilityCard_data").innerHTML = "Good";
  } else if (visibilityCardValue === 0.16) {
    document.getElementById("visibilityCard_data").innerHTML =
      "Moderate Fog";
  } else if (visibilityCardValue === 0.35) {
    document.getElementById("visibilityCard_data").innerHTML =
      "Light Fog";
  } else if (visibilityCardValue >= 0.54 && visibilityCardValue <= 1.03) {
    document.getElementById("visibilityCard_data").innerHTML =
      "Very Light Fog";
  } else if (visibilityCardValue >= 1.08 && visibilityCardValue <= 2.15) {
    document.getElementById("visibilityCard_data").innerHTML =
      "Light Mist";
  } else if (visibilityCardValue >= 2.16 && visibilityCardValue <= 5.3) {
    document.getElementById("visibilityCard_data").innerHTML =
      "Very Light Mist";
  } else if (visibilityCardValue >= 5.4 && visibilityCardValue <= 10.7) {
    document.getElementById("visibilityCard_data").innerHTML =
      "Clear Air";
  } else if (visibilityCardValue >= 10.8 && visibilityCardValue <= 27.0) {
    document.getElementById("visibilityCard_data").innerHTML =
      "Very Clear Air";
  } else {
    document.getElementById("visibilityCard_data").innerHTML = "Unknown";
  }

  //Air Quality Card
  document.getElementById(
    "airQualityCard"
  ).innerText = `${weatherData.feelslike}`;
}




const handleCelBtnClick = () => {
  // Convert Fahrenheit to Celsius for all temperature cards
  var currentTempF = parseFloat(
    document.getElementById("left_temparature").innerText
  );
  var currentTempC = ((currentTempF - 32) * 5) / 9;

  // Update temperature display to Celsius
  document.getElementById("left_temparature").innerText =
    currentTempC.toFixed(1) + "°C";

  var tempElements = document.getElementsByClassName("temp_value");
  for (var i = 0; i < tempElements.length; i++) {
    var currentTempF = parseFloat(tempElements[i].innerText);
    var currentTempC = ((currentTempF - 32) * 5) / 9;
    tempElements[i].innerText = currentTempC.toFixed(1) + "°C";
  }

  // Update button styles
  setFarBtnActive(false);
  setCelBtnActive(true);
  setFarBtnDisabled(false);
  setCelBtnDisabled(true);
};



const handleFarBtnClick = () => {
  // Convert Celsius to Fahrenheit for all temperature cards
  var currentTempC = parseFloat(
    document.getElementById("left_temparature").innerText
  );
  var currentTempF = (currentTempC * 9) / 5 + 32;

  // Update temperature display to Fahrenheit
  document.getElementById("left_temparature").innerText =
    currentTempF.toFixed(1) + "°F";

  var tempElements = document.getElementsByClassName("temp_value");
  for (var i = 0; i < tempElements.length; i++) {
    var currentTempC = parseFloat(tempElements[i].innerText);
    var currentTempF = (currentTempC * 9) / 5 + 32;
    tempElements[i].innerText = currentTempF.toFixed(1) + "°F";
  }

  setCelBtnActive(false);
  setFarBtnActive(true);
  setFarBtnDisabled(true);
  setCelBtnDisabled(false);
};








  return (
    <>
      <div className="fixedBg">
        <div className="bg_overlay"></div>
        <img
          src={bgImgSrc}
          alt="backgroundImg"
          id="bgImg"
          className="bgImg"
        />
      </div>
      <section className="main_section">
        <section className="sec_left">
          <div className="left_first_div">
            <div id="search-form" className="inputDiv">
              <input
                type="text"
                id="cityInput"
                placeholder="Search... "
                defaultValue="Bangalore,Marthahalli"
              />
              <img
                src={searchImgIcon}
                alt="search_btn"
                onClick={searchWeather}
              />
            </div>
            <img
              id="weatherIcon_main"
              className="weatherIcon_main"
              src={w_img1}
              alt="Weather Icon"
            />
            <div className="left_info">
              <h1 id="left_temparature" className="left_temparature">
                27&deg;C
              </h1>
              <p
                id="left_currentTime"
                className="left_currentTime responsive_small_font"
              >
                {/* Saturday, 11:09 PM */}
                {getCurrentTime()}
              </p>
              <div>
                <img src={cloud_img} alt="icons" className="left_icons" />
                <span id="left_sec_condition" className="responsive_small_font">
                  Clear
                </span>
              </div>
              <div>
                <img src={water_drop} alt="icons" className="left_icons" />
                <span id="left_sec_precip" className="responsive_small_font">
                  Prec - 0%
                </span>
              </div>
            </div>
          </div>
          <div className="left_bottom_address">
            <img
              src={location_img}
              alt="icons"
              className="left_icons locationIcon"
            />
            <div
              className="left_highlight_card responsive_small_font"
              id="addressCard"
            >
              Anantapur, Ap, India
            </div>
          </div>
        </section>

        <section className="sec_right">
          <div className="sec_right_tabs_holder">
            <div className="right_tab_btns_holder" style={{ display: tabsBtnsVisible ? "inline-block" : "none" }} id="right_tab_btns_holder">
              <span
                 onClick={showToday}
                className="right_tab_btns todayTab"
                id="btn_today"
              >
                Today
              </span>
              <span
                 onClick={showWeek}
                className="right_tab_btns"
                id="btn_week"
              >
                Week
              </span>
            </div>
            <div className="temp_btns_holder" style={{ display: tempBtnsVisible ? "inline-block" : "none" }} id="temp_btns_holder">
              <button
                onClick={handleCelBtnClick}
                // className="temp_btns"
                className={celBtnActive ? "active temp_btns" : "temp_btns"}
                id="cen_btn"
                disabled={celBtnDisabled}
              >
                °C
              </button>
              <button
                onClick={handleFarBtnClick}
                // className="temp_btns"
                className={farBtnActive ? "active temp_btns" : "temp_btns"}
                id="far_btn"
                disabled={farBtnDisabled}
              >
                °F
              </button>
            </div>
          </div>

          <section className="sec_right_weather_holder">
            <p className="no_data" id="no_data">
              NO DATA
            </p>
            <div
              className="weather_holder_today"
              id="weather_holder_today"
            ></div>
            <div className="weather_holder_week" id="weather_holder_week"></div>
          </section>

          <div id="highlightSection">
            <h2 className="heading_todays_highlight">Today's Highlights</h2>
            <section className="highlight_card_section">
              <div className="highlight_card">
                <h2>UV Index</h2>
                <h1 id="uvIndexCard">0</h1>
                <span id="uvIndexCard_data">Low</span>
              </div>
              <div className="highlight_card">
                <h2>Wind Status</h2>
                <h1 id="windStatusCard">0</h1>
                <span>Km/h</span>
              </div>
              <div className="highlight_card">
                <h2>Sunrise & Sunset</h2>
                <h1 id="sunriseSunsetCard">0</h1>
                <span id="sunsetCard_data">04:46 PM</span>
              </div>
              <div className="highlight_card">
                <h2>Humidity</h2>
                <h1 id="humidityCard">0</h1>
                <span id="humidityCard_data">High</span>
              </div>
              <div className="highlight_card">
                <h2>Visibility</h2>
                <h1 id="visibilityCard">0</h1>
                <span id="visibilityCard_data">Clear Air</span>
              </div>
              <div className="highlight_card">
                <h2>Air Quality</h2>
                <h1 id="airQualityCard">0</h1>
                <span>Very Unhealthy</span>
              </div>
            </section>
          </div>
          <p className="my_info">
            Weather Prediction App by <b>Fizal Shaik</b>
          </p>
        </section>
      </section>
    </>
  );
}

export default MainSection;
