import React from 'react';
import './line_box.css'; 

const LineBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="line-box-container">
            <div className="line-box">
                <img className="line-box-logo" src={`${process.env.PUBLIC_URL}/logo.svg`} alt=""/>
            </div>
            <div className="buttons">
                {/*{children} */}
            </div>
        </div>
    );
};

export default LineBox;
