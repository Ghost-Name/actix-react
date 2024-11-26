import React from 'react';
import './about_ui.css'; 

const AboutUI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="">
            <div className="breadcrumbers--about">
                <div className="breadcrumbers--about-container">
                    <span className="breadcrumbers--about-name">Система 3D-визуализации и навигации по Самаре для студента СамГТУ</span>
                </div>
            </div>
            <div className="about--container">
                <span className="about--description">
                    Проектом является разработка и внедрение системы 3D-визуализации и навигации по территории Самарского государственного 
                    технического университета (СамГТУ), а также прилегающих районов города Самара.
                    <br/>
                    Данная система предназначена для студентов и преподавателей университета и будет включать в себя интерактивную карту, 
                    позволяющую пользователям легко находить нужные аудитории, кафе и столовые, а также строить маршруты между корпусами и 
                    другими значимыми объектами. Система будет доступна через веб-интерфейс, обеспечивая удобство и доступность в любое время.
                </span>
            </div>
        </div>
    );
};

export default AboutUI;