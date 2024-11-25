import React from 'react';
import './container.css';


const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="page-content"> {/* отображение картинки (карты) */}
                <div className="wrapper-page">
                    {/* <img src={`${process.env.PUBLIC_URL}/images/screenshot-2.png`} alt="" /> */}
                    {/* Отображение карты */}
                    {children}
                </div>
        </div>
    );
};

export default Container;
