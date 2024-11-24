import React from 'react';
import Header from './components/header'; 

const About: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header>
                {children}  
            </Header>
        </div>
    );
};

export default About;
