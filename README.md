# React Weather Widget

Simple weather widget.
~~Working Not working demo: [Weather Widget](http://nabi.pl/test/weather-widget/)

Widget uses Dark Sky API for weather forecast and Google Maps API for geocoding.
Connections to APIs are proxied by php scripts working on the server to protect API keys.

In the 'design' folder you can find a Affinity Designer file with the widget layout.

Not working demo used to be working before my Google API key was deleted with the old account. There is no point in creating the new one because DarkSky API will stop working at the end of March 2023 and the widget will be useless again. I'm leaving it here as a proof there was a time I was working with React. And you can still see how the widget looks.

## Installation and configuration

Proxy scripts are located in '/proxy' directory.\
Rename darksky-sample.php and geocode-sample.php to darksky.php and geocode.php.\
In both files enter valid API keys in line 9.\
Upload both files to your server.\
Rename /src/weather-widget/config/config-sample.js to config.js.\
Enter valid urls to your proxy files in config.js.\
Build.\
Enjoy.

## Resources used

Icons: [Dripicons - Weather Set by Amit Jakhu](https://github.com/amitjakhu/dripicons-weather)
Fonts: [Montserrat](https://fonts.google.com/specimen/Montserrat)

## Default React readme

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
