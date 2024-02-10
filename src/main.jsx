import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css'

import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux';
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme='dark'>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
)
