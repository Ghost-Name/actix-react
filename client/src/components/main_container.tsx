import React from 'react';
import './main_container.css'; 

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="header-header-empty">

<div className="header-content">
                <div className="wrapper">
                    <a className="logout-hodden-xs" href={`${process.env.PUBLIC_URL}/logout.png`} data-mehod="post" >
                        Выход
                    </a>
                </div>
            </div>

        </div>
    );
};

export default MainContainer;
