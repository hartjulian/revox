import { useState } from 'react'
import './Header.css';
import Logout from '../Logout/Logout';
import revoxTextLogo from '../../assets/revox-text-logo.png';
import revoxIconLogo from '../../assets/revox-logo.png';
import Menu from '../Menu/Menu';

function Header ( {loggedIn, logoutClick, menuClick} ) {

    return (
        <div className='header'>
            <div className='left-container' >
                <Menu onClick={menuClick} />
            </div>
            <div className='logo-container'>
                <img src={revoxTextLogo} alt='Revox logo' className='text-logo'/>
                <img src={revoxIconLogo} alt='Revox logo' className='icon-logo'/>
            </div>
            <div className='right-container'>
                {loggedIn && <Logout onClick={logoutClick}/>}
            </div>
        </div>
    );
}

export default Header;