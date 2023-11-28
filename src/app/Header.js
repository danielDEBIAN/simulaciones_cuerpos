import React from 'react';
import './Header.css'; // import the CSS file
import logo from '../images/icono.ico'; // import the local image

const Header = () => {
    return (
        <div className='Header'>
            <img src={logo} alt='logo' />
            <h1 className='Title'>
                Simulacion de vibraciones en cuerpos solidos
            </h1>
        </div>
    );
}

export default Header;