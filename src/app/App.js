import './App.css';
import Grafica from '../modules/grafica';
import Menu from '../modules/menu/menu';
import Membrana from '../modules/membrana'
import React from 'react';

const inicio = () => {
  return (
    <div className="App">
      <div className="container">
        {Menu()}
      </div>
      <div>
        {Grafica()}
      </div>
      <div>
        {Membrana()}
      </div>
    </div>
  );
}

export default inicio;
