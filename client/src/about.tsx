import React from 'react';

import Header from './components/header/header'; 
import ScrollBar from './components/scrollbar/scrollbar';
import Container from './components/container/container';

import MainMenu from './components/ui/main_menu';
import AboutUI from './components/ui/about_ui/about_ui';

const About: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
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
                    <AboutUI>
                        {children}
                    </AboutUI>
                </Container>
            </div>
        </div>
    );
};

export default About;
