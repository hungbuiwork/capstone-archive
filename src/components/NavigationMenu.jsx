import React from "react";
import { Link } from 'react-router-dom';
import './NavigationMenu'



const SideMenu = () => {
    return (
        <div className="side-menu">
            <h2>Menu</h2>
            <ul>
                <li>
                    <Link to="/">View Users</Link>
                </li>
                <li>
                    <Link to="/">View Projects</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;
