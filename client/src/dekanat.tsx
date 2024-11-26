import React from 'react';

import Header from './components/header/header'; 
import ScrollBar from './components/scrollbar/scrollbar';
import Container from './components/container/container';

import MainMenu from './components/ui/main_menu';
import DekanatTable from './components/ui/dekanat_table';

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
                    <DekanatTable>
                        {children}
                    </DekanatTable>
                </Container>
            </div>
        </div>
    );
};

export default Dekanat;
