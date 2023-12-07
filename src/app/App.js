import './App.css';
import Membrana from '../modules/membrana';
import Cuerda from '../modules/cuerda';
import Pendulo from '../modules/pendulo';
import Resorte from '../modules/resorte';
import React from 'react';
import Header from './Header'; // import the Header component

const inicio = () => {
  return (
    <div className="App">
      <Header />
      <h1>Resorte</h1>
      <div className='resorte-div'>
        <div className='scrollable-div'>
          <button>Option 1</button>
          <button>Option 2</button>
          <button>Option 3</button>
          <button>Option 4</button>
          <button>Option 5</button>
        </div>
        <div className='botones-resorte'>
          <button>Hello</button>
          <button>World</button>
        </div>
        {Resorte()}
      </div>
      <h1>Pendulo</h1>
      <div className='pendulo-div'>
        <div className='scrollable-div'>
          <button>Option 1</button>
          <button>Option 2</button>
          <button>Option 3</button>
          <button>Option 4</button>
          <button>Option 5</button>
        </div>
        <div className='botones-pendulo'>
          <button>Hello</button>
          <button>World</button>
        </div>
        {Pendulo()}
      </div>
      <h1>Membrana</h1>
      <div className='membrana-div'>
        <div className='scrollable-div'>
          <button>Option 1</button>
          <button>Option 2</button>
          <button>Option 3</button>
          <button>Option 4</button>
          <button>Option 5</button>
        </div>
        <div className='botones-membrana'>
          <button>Hello</button>
          <button>World</button>
        </div>
        {Membrana()}
      </div>
      <h1>Cuerda</h1>
      <div className='cuerda-div'>
        <div className='scrollable-div'>
          <button>Option 1</button>
          <button>Option 2</button>
          <button>Option 3</button>
          <button>Option 4</button>
          <button>Option 5</button>
        </div>
        <div className='botones-cuerda'>
          <button>Hello</button>
          <button>World</button>
        </div>
        {Cuerda()}
      </div>
    </div>
  );
}

export default inicio;