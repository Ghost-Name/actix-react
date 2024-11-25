import React from 'react';

import Header from './components/header/header'; 
import ScrollBar from './components/scrollbar/scrollbar';
import Container from './components/container/container';


const Dekanat: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header>
                {children}  
            </Header>
            
            <div className='page-container'>
                <ScrollBar>
                    {children}
                </ScrollBar>
                
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    );
};

export default Dekanat;
