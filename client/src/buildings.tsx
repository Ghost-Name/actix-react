import React from 'react';

import Header from './components/header/header'; 
import ScrollBar from './components/scrollbar/scrollbar';
import Container from './components/container/container';

import MainMenu from './components/ui/main_menu';
import BuildingsUI from './components/ui/buildings_ui/buildings_ui';

const Buildings: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
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
                    <BuildingsUI>
                        {children}
                    </BuildingsUI>
                </Container>
            </div>
        </div>
    );
};

export default Buildings;
