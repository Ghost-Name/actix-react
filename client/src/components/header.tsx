import React from 'react';
import './header.css'; 

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="header-header-empty">

            <div className="header-sidebar">
                <div className="sidebar-content">
                    <img className="logo" src={`${process.env.PUBLIC_URL}/logo.svg`} alt=""/>
                </div>
            </div>

            <div className="header-content">
                <div className="wrapper">
                    <div className="container-fluid">
                        <a className="logout-hidden-xs" href={`${process.env.PUBLIC_URL}/icon-login.svg`} data-method="post">
                            <img src={`${process.env.PUBLIC_URL}/icon-login.svg`} alt="Иконка выхода" className="logout__icon" />
                            <span className="logout__text">Выход</span>
                        </a>
                    </div>
                </div>
            </div>
            

        </div>
    );
};

export default Header;
