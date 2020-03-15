import React from 'react';
import logo from '../../images/logo.png'
import './Header.css';

const Header = () => {
    return (
        <div className="Header">
           
            <img src={logo} alt=""/>

            <nav>
                <a href="/shop">shop</a>
                <a href="/review">review</a>
                <a href="/inventory">Inventory</a>
            </nav>
            
        </div>
    );
};

export default Header;