import './App.css';
import Membrana from '../modules/membrana';
import Cuerda from '../modules/cuerda';
import React from 'react';
import Header from './Header'; // import the Header component

const inicio = () => {
  return (
    <div className="App">
      <Header />
      <div id="simulacion-cuerda">
        {Cuerda()}
      </div>
      <div id="simulacion-membrana">
        {Membrana()}
      </div>
    </div>
  );
}

export default inicio;