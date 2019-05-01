import React, { Component } from 'react';

import styles from './WeatherWidget.module.css';
import WeatherIcon from './weather-icon/WeatherIcon';

export class WeatherWidget extends Component {
  render() {
    return (
      <div className={ styles.WeatherWidget }>
        <WeatherIcon icon="clear-day" />
      </div>
    );
  }
}

export default WeatherWidget;
