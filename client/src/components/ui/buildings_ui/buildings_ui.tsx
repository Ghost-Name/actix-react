import React from 'react';
import './buildings_ui.css'; 

const BuildingsUI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    /* с обработчиком событий OnClick*/
    const handleRouteClick = () => {
        window.location.href = 'https://samgtu.ru/contacts';
    };

    return (
        <div className="buildings--container">
            <div className="buildings--header">
                <div className="buildings--header-container">
                    <span className="buildings--header-name">
                        УЧЕБНЫЕ КОРПУСА В САМАРЕ
                    </span>
                </div>
            </div>
            <ul className="buildings--list">
                <li>
                    <article className="building--item">
                        <img className="img-building" src={`${process.env.PUBLIC_URL}/images/buildings/main-build.png`}/>
                        <span className="building--item-desc">Главный корпус
                            <br/>
                            Молодогвардейская, 
                            <br/>
                            д.244
                            <br/>
                            <div className="building--button-container">
                                <button onClick={handleRouteClick} className="buiilding--route-button">Маршрут</button>
                            </div>
                        </span>
                    </article>
                </li>

                <li>
                    <article className="building--item">
                        <img className="img-building" src={`${process.env.PUBLIC_URL}/images/buildings/1-build.png`}/>
                        <span className="building--item-desc">Корпус № 1
                            <br/>
                            Первомайская, 
                            <br/>
                            д.18
                            <br/>
                            <div className="building--button-container">
                                <button onClick={handleRouteClick} className="buiilding--route-button">Маршрут</button>
                            </div>
                        </span>
                    </article>
                </li>

                <li>
                    <article className="building--item">
                        <img className="img-building" src={`${process.env.PUBLIC_URL}/images/buildings/8-build.png`}/>
                        <span className="building--item-desc">Корпус № 8
                            <br/>
                            Молодогвардейская,  
                            <br/>
                            д.244
                            <br/>
                            <div className="building--button-container">
                                <button onClick={handleRouteClick} className="buiilding--route-button">Маршрут</button>
                            </div>
                        </span>
                    </article>
                </li>
            </ul>

        </div>
    );
};

export default BuildingsUI;