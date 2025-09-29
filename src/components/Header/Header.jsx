import { useState } from 'react'
import './Header.css';
import revoxLogo from '../../assets/revox-text-logo.png';

function Header() {

    const [searchTerm, setSearchTerm] = useState('');

    //TODO: create handler functions for onChange and onEnter (??) when user enters a search term or hits enter.

    return (
        <div className='header'>
            <div className='logo-container'>
                <img src={revoxLogo} />
            </div>
            <div className='search-container'>
                <form>
                    <input type='text' id='search-bar' name='search-bar' placeholder='Search for posts' />
                </form>
            </div>
            <div className='right-container'></div>
        </div>
    );
}

export default Header;