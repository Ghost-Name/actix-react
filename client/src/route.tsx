import React from 'react';
import Header from './components/header'; 
import MainContainer from './components/main_container';

const RoutePage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header>
                {children}  
            </Header>
            <MainContainer>
                {children}  
            </MainContainer>
        </div>
    );
};

export default RoutePage;
