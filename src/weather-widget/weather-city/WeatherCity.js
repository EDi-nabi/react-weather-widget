import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete';

import styles from './WeatherCity.module.css';

export class WeatherCity extends Component {

  state = {
    locationInput: '',
  };

  onChange = (event) => {
    this.setState({ locationInput: event.target.value });
  }

  onSelect = (value) => {
    this.setState({ locationInput: value }, this.getWeather);
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.getWeather();
  }

  getWeather = () => {
    this.props.getWeather(this.state.locationInput);
    this.setState({ locationInput: '' });
  }

  shouldItemRender = (item, value) => {
    return value ? item.name.toLowerCase().includes(value.toLowerCase()) : false;
  }

  renderItem = (item, isHighlighted) => {
    return (
      <div key={item.id} className={[styles.hint, isHighlighted ? styles.selected : ''].join(' ')}>
        {item.name}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.WeatherCity}>
        <form>
          <ReactAutocomplete
            getItemValue={(item) => item.name}
            items={this.props.locations}
            inputProps={{ placeholder: 'Enter location' }}
            menuStyle={{}}
            wrapperStyle={{}}
            renderItem={this.renderItem}
            shouldItemRender={this.shouldItemRender}
            value={this.state.locationInput}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
          <button type="submit" onClick={this.onSubmit}>OK</button>
        </form>
      </div>
    );
  }
}

export default WeatherCity;
