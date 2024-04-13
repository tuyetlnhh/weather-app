/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import styles from './weatherApp.module.css'
import search_icon from '../../assets/search.png'
import clear_icon from '../../assets/clear.png'
import humidity_icon from '../../assets/humidity.png'
import cloud_icon from '../../assets/cloud.png'
import rain_icon from '../../assets/rain.png'
import snow_icon from '../../assets/snow.png'
import drizzle_icon from '../../assets/drizzle.png'
import wind_icon from '../../assets/wind.png'
function WeatherApp () {
    const [wicon, setWicon] = React.useState(clear_icon)
    let api_key = 'dd85c5c4fe4afc8a6ad099c8da75c05e'
    async function searchWeather () {
        let city = document.querySelector(`.${styles.cityInput}`).value;

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
        console.log(city)
        if (city === '') {
            alert('Please enter city name')
            return 0;
        }
        let data;
        try {
          let response = await fetch(url)
          if (response.status !== 200) {
            throw new Error('Please enter a valid city name')
          }
          data = await response.json()
          console.log(data)
        } catch (error) {
          alert('Please enter a valid city name')
        }
        let weather = document.getElementsByClassName(`${styles.weather_temp}`)
        let humidity = document.getElementsByClassName(`humidity_percent`)
        let wind = document.getElementsByClassName(`wind_speed`)
        let location = document.getElementsByClassName(`${styles.weather_location}`)
        console.log(data.main.humidity)
        humidity[0].innerHTML = data.main.humidity
        weather[0].innerHTML = data.main.temp
        wind[0].innerHTML = data.wind.speed
        location[0].innerHTML = city

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear_icon);
          } else if (
            data.weather[0].icon === "02d" ||
            data.weather[0].icon === "02n"
          ) {
            setWicon(cloud_icon);
          } else if (
            data.weather[0].icon === "03d" ||
            data.weather[0].icon === "03n"
          ) {
            setWicon(drizzle_icon);
          } else if (
            data.weather[0].icon === "04d" ||
            data.weather[0].icon === "04n"
          ) {
            setWicon(drizzle_icon);
          } else if (
            data.weather[0].icon === "09d" ||
            data.weather[0].icon === "09n"
          ) {
            setWicon(rain_icon);
          } else if (
            data.weather[0].icon === "10d" ||
            data.weather[0].icon === "10n"
          ) {
            setWicon(rain_icon);
          } else if (
            data.weather[0].icon === "13d" ||
            data.weather[0].icon === "13n"
          ) {
            setWicon(snow_icon);
          } else {
            setWicon(clear_icon);
          }
    }
    function handleSubmit (event) {
        event.preventDefault();
        searchWeather();
    }
    return (
        <div className = {styles.container} id = "container">
            <div className={styles.top_bar}>
            <form onSubmit={handleSubmit}>
                <input type="text" className={styles.cityInput} placeholder="Search"/>
            </form>
                <div className={styles.search_icon} onClick={() => searchWeather()}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className={styles.weather_image}>
                <img src={wicon} alt="" />
            </div>
            <div className={styles.weather_temp}> </div>
            <div className={styles.weather_location}></div>
            <div className={styles.data_container}>
                <div className={styles.element}>
                    <img src={humidity_icon} alt="" className = {styles.icon} />
                    <div className={styles.data}>
                        <div className='humidity_percent'> </div>
                        <div className={styles.text}>Humidity</div>
                    </div>
                </div>
                <div className={styles.element}>
                    <img src={wind_icon} alt="" className = {styles.icon} />
                    <div className={styles.data}>
                        <div className='wind_speed'></div>
                        <div className={styles.text}>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherApp