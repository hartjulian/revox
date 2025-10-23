import React from "react";
import './Menu.css';

function Menu( {onClick} ) {
    return (
        <div className="dropdown-container">
            <div className="dropdown-menu" onClick={onClick}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
    );
};

export default Menu;