import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import styles from './WeatherWidget.module.css';
import config from './config/config';
import WeatherIcon from './weather-icon/WeatherIcon';
import WeatherCity from './weather-city/WeatherCity';

export class WeatherWidget extends Component {

  state = {
    currentLocation: undefined,
    tmpLocation: undefined,
    locations: [],
  };

  constructor() {
    super();
    if (!this.state.currentLocation) {
      this.getWeather(config.defaultLocation);
    }
  }

  getWeather = (location) => {
    const url = config.geocodeUrl + '?location=' + encodeURIComponent(location);
    axios.get(url)
      .then(response => {
        this.setState({
          tmpLocation: {
            name: response.data.results[0].formatted_address,
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng,
          }
        });
        return axios.get(config.darkskyUrl + '?lat=' + this.state.tmpLocation.lat + '&lng=' + this.state.tmpLocation.lng);
      })
      .then(response => {
        const currentLocation = {
          ...this.state.tmpLocation,
          timestamp: response.data.currently.time,
          date: moment.unix(response.data.currently.time).format('DD.MM.YYYY'),
          temperature: response.data.currently.temperature,
          icon: response.data.currently.icon,
          summary: response.data.currently.summary,
        };
        this.setState({
          currentLocation
        });
        // TODO cache locations
        // if (!this.state.locations.find(location => location.name === currentLocation.name)) {
        //   this.setState({
        //     locations: [
        //       ...this.state.locations,
        //       currentLocation,
        //     ],
        //   });
        // }
      })
      .catch(error => {
        const currentLocation = {
          name: 'No data',
          lat: 0,
          lng: 0,
          timestamp: 0,
          date: '---',
          temperature: 0,
          icon: 'no-data',
          summary: 'Try again',
        };
        this.setState({
          currentLocation
        });
      });
  }

  render() {
    if (this.state.currentLocation) {
      return (
        <div className={[styles.WeatherWidget, styles[this.state.currentLocation.icon]].join(' ')}>
          <section className={styles.weather}>
            <WeatherIcon icon={this.state.currentLocation.icon} />
            <section className={styles.desc}>
              <time dateTime={this.state.currentLocation.date}>{this.state.currentLocation.date}</time>
              <p>{this.state.currentLocation.name}</p>
              <h2>{Math.round(this.state.currentLocation.temperature)}°C</h2>
              <p>{this.state.currentLocation.summary}</p>
            </section>
          </section>
          <WeatherCity getWeather={this.getWeather} />
        </div>
      );
    } else {
      return (
        <div className={ styles.WeatherWidget }>
        </div>
      );
    }
  }
}

export default WeatherWidget;
