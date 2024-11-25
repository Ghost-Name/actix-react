import React from 'react';

import Header from './components/header/header'; 
import ScrollBar from './components/scrollbar/scrollbar';
import Container from './components/container/container';
import ThreeScene from './components/threejs/ThreeScene';

import NavigationUI from './components/ui/navigation_ui'


import './style/pageContainer.css'

const RoutePage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <Header>
                {children}  
            </Header>
            
            <div className='page-container'>
                <ScrollBar>
                    
                    <NavigationUI>
                        {children}
                    </NavigationUI>

                </ScrollBar>
                
                <Container>
                    <ThreeScene />
                </Container>
            </div>
        </div>
    );
};

export default RoutePage;
