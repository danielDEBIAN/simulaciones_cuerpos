import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/inicio';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWc4bqJbe5piyehsic9ERMIq4pN3JFluU",
  authDomain: "simulacion-cuerpos.firebaseapp.com",
  projectId: "simulacion-cuerpos",
  storageBucket: "simulacion-cuerpos.appspot.com",
  messagingSenderId: "569077076231",
  appId: "1:569077076231:web:9793bc25dad79a26f5b5a2",
  measurementId: "G-VNNJV06634"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
