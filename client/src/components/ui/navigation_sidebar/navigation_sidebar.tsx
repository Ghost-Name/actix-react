import React, { useState } from 'react';
import './navigation_sidebar.css';

const NavigationSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar--navigation ${isOpen ? '' : 'closed'}`}>
            <div className="sidebar--navigation-content">
                {children}
            </div>
            <div className="sidebar--close-open" onClick={toggleSidebar}>
                <img className="sidebar--co-icon" src={`${process.env.PUBLIC_URL}/svg/icon-arrow.svg`} alt="Toggle Sidebar"/>
            </div>
        </div>
    );
}

export default NavigationSidebar;
