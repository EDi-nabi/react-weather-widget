import React, { Component } from 'react';

import styles from './WeatherCity.module.css';

export class WeatherCity extends Component {

  state = {
    locationInput: '',
  };

  setLocationInput = (event) => {
    this.setState({ locationInput: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.getWeather(this.state.locationInput);
  }

  render() {
    return (
      <div className={styles.WeatherCity}>
        <form>
          <input type="text" placeholder="Enter location" onChange={this.setLocationInput} value={this.state.locationInput} />
          <button type="submit" onClick={this.onSubmit}>OK</button>
        </form>
      </div>
    );
  }
}

export default WeatherCity;
