import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/index';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="departments" element={<DashboardLayout children={<Departments />} />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </Provider>
    <Toaster />
  </React.StrictMode>
  </React.StrictMode>
)
