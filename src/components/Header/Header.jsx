import { useState } from 'react'
import './Header.css';
import Logout from '../Logout/Logout';
import revoxLogo from '../../assets/revox-text-logo.png';

function Header ( {loggedIn, logoutClick} ) {

    return (
        <div className='header'>
            <div className='left-container' />
            <div className='logo-container'>
                <img src={revoxLogo} alt='Revox logo' />
            </div>
            <div className='right-container'>
                {loggedIn && <Logout onClick={logoutClick}/>}
            </div>
        </div>
    );
}

export default Header;