import React from 'react';

import styles from './App.module.css';
import WeatherWidget from './weather-widget/WeatherWidget';


function App() {
  return (
    <div className={ styles.App }>
      <WeatherWidget default="Warsaw, Poland"/>
    </div>
  );
}

export default App;
