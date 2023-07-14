import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import Header from './components/header';
import MainMtg from './components/MainMtg';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
      <Header />
      <div style={{ height: '100px', background: '#d5efff' }} />
      <MainMtg />
  </Provider>
);
