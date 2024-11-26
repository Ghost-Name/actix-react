import React from 'react';

import Header from './components/header/header'; 
import ScrollBar from './components/scrollbar/scrollbar';
import Container from './components/container/container';

import MainMenu from './components/ui/main_menu';

const Dekanat: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header>
                {children}  
            </Header>
            
            <div className='page-container'>
                <ScrollBar>
                    <MainMenu>
                        {children}
                    </MainMenu>
                </ScrollBar>
                
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    );
};

export default Dekanat;
