import './App.css';
import Membrana from '../modules/membrana';
import Cuerda from '../modules/cuerda';
import React from 'react';

const inicio = () => {
  return (
    <div className="App">
      <div className='Header'>
        <h1 className='Title'>
          Simulacion de vibraciones en cuerpos solidos
        </h1>
      </div>
      <div className='Cuerda'>
        {Cuerda()}
      </div>
      <div className='Membrana'>
        {Membrana()}
      </div>
    </div>
  );
}

export default inicio;
