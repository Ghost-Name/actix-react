import React, { useState } from 'react';

import Header from './components/header/header'; 
import ScrollBar from './components/scrollbar/scrollbar';
import Container from './components/container/container';
import ThreeScene from './components/threejs/ThreeScene';

import NavigationUI from './components/ui/navigation_ui'
import MainMenu from './components/ui/main_menu';
import NavigationSidebar from './components/ui/navigation_sidebar/navigation_sidebar';
import './style/pageContainer.css'

const RoutePage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

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
                <NavigationSidebar>
                    <NavigationUI>
                        {children}
                    </NavigationUI>
                </NavigationSidebar>

                <Container>
                    <ThreeScene />
                </Container>
            </div>
        </div>
    );
};

export default RoutePage;
