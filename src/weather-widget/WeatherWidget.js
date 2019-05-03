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
    locations: [],
  };

  constructor() {
    super();
    if (!this.state.currentLocation) {
      this.getWeather(config.defaultLocation);
    }
  }

  getWeather = async (location) => {
    const cachedLocationIndex = this.state.locations.findIndex(item => item.name === location);
    let cachedLocationExpired, tmpLocation, response = undefined;
    // if location not expired, show weather
    if (cachedLocationIndex >= 0) {
      cachedLocationExpired = !moment.unix(this.state.locations[cachedLocationIndex].timestamp).add(30, 'm').isSameOrAfter(moment())
      if (!cachedLocationExpired) {
        this.setState({ currentLocation: this.state.locations[cachedLocationIndex]});
        return;
      }
    }
    // else, get weather form the internets
    try {
      cachedLocationIndex >= 0
      ? response = { cachedLocationIndex }
      : response = await axios.get(config.geocodeUrl + '?location=' + encodeURIComponent(location));
      if (response.cachedLocationIndex >= 0) {
        tmpLocation = {
          name: this.state.locations[cachedLocationIndex].name,
          lat: this.state.locations[cachedLocationIndex].lat,
          lng: this.state.locations[cachedLocationIndex].lng,
        };
      } else {
        tmpLocation = {
          name: response.data.results[0].formatted_address,
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        };
      }
      response = await axios.get(config.darkskyUrl + '?lat=' + tmpLocation.lat + '&lng=' + tmpLocation.lng);
      const currentLocation = {
        id: cachedLocationIndex >= 0 ? cachedLocationIndex : this.state.locations.length,
        ...tmpLocation,
        timestamp: response.data.currently.time,
        date: moment.unix(response.data.currently.time).format('DD.MM.YYYY'),
        temperature: response.data.currently.temperature,
        icon: response.data.currently.icon,
        summary: response.data.currently.summary,
      };
      this.setState({ currentLocation });
      const newLocations = [...this.state.locations];
      (cachedLocationIndex >= 0)
      ? newLocations[cachedLocationIndex] = currentLocation
      : newLocations.push(currentLocation)
      this.setState({ locations: [...newLocations] });
    }
    catch {
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
      this.setState({ currentLocation });
    }
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
          <WeatherCity getWeather={this.getWeather} locations={this.state.locations} />
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
