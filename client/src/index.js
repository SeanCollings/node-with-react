// Data layer control (Redux)
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import reducers from './reducers';

// Development only axios helpers! To debug from browser
/*import axios from 'axios';
window.axios = axios;*/

// Only allow Redux dev tools if in development mode
const compose =
  process.env.NODE_ENV === 'development' ? composeWithDevTools : f => f;

const store = createStore(reducers, {}, compose(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'));
