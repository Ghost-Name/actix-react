import React from 'react';
import './scrollbar.css';


const ScrollBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="sidebar" id="scrollbar-menu"> {/* в этот контейнер нужно добавлять новые кнопки, поля и тд */}
                <div className="scrollbar-content">
                    {/* навигация по сайту */}
                    {children}
                </div>
        </div>
    );
};

export default ScrollBar;
