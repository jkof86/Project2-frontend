import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Game from './components/Game';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Landing from './components/Landing/Landing';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path = "/App" element = {<App />} />
        <Route path = "/game" element = {<Game/>}/>
        <Route path="/" element={<Landing />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
