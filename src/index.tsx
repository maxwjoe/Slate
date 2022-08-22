import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './redux/store';
import {Provider} from 'react-redux';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className='w-100vw h-100vh overflow-hidden'>
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);
