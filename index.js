/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Root} from 'native-base';
import App from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';

const store = configureStore();

const ReduxNativeApp = () => (
  <Provider store={store}>
    <Root>
      <App />
    </Root>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxNativeApp);
