import React, { Component } from 'react';
import './WeatherApp.css'; // Import the CSS file for styling

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: null,
      city: '',
      country: '',
      loading: true,
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeatherData, this.handleGeolocationError);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  handleGeolocationError = (error) => {
    console.error('Error getting geolocation:', error);
  };

  getWeatherData = async (position) => {
    const { latitude, longitude } = position.coords;

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

    try {
      const response = await fetch(apiURL);
      if (response.ok) {
        const data = await response.json();
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          loading: false,
        });
      } else {
        console.error('Failed to fetch weather data.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  render() {
    const { temperature, city, country, loading } = this.state;

    return (
      <div className="weather-container"> {/* Apply CSS class to the container */}
        {loading ? (
          <p>Loading weather data...</p>
        ) : (
          <div>
            <h6> {city}, {country}</h6>
            <p> {temperature}°C</p>
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/10d@2x.png`}
              alt="Weather Icon"
            />
          </div>
        )}
      </div>
    );
  }
}

export default WeatherApp;
