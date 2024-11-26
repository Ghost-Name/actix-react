import React from 'react';
import './main_menu.css';



const MainMenu: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const links = [
        { name: "О проекте", href: "http://localhost:3000/about" },
        { name: "Информация о деканатах", href: "http://localhost:3000/zo/contacts" },
        { name: "Информация о корпусах", href: "http://localhost:3000/contacts" },
        { name: "Проложить маршрут", href: "http://localhost:3000/navigation" },
        ]
    return (
        <div className="main-menu">
                {links.map((link) => (
                <ul className="main-menu--item"> {/* в этот контейнер нужно добавлять новые кнопки, поля и тд */}
                    <a className="main-menu--link" href={link.href}>
                        <img className="main-menu--icon" src={`${process.env.PUBLIC_URL}/svg/icon-menu.svg`} alt=""/>
                        <span className="main-menu--item-name">{link.name}</span>
                    </a>
                </ul>
                ))}
         
        </div>
    );
};

export default MainMenu;
