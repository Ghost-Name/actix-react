import React from 'react';
import './main_container.css'; 

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="page-container">
            <div className="sidebar" id="scrollbar-menu">
                <div className="sidebar-content">
                    <ul className="main-menu">

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
