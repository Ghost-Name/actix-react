import React from 'react';
import './buildings_ui.css'; 

const BuildingsUI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="buildings--container">
            <ul className="buildings--list">
                <li>
                    <article className="building--item">
                        {/* впихнуть фотку корпуса СамГТУ */}
                        <article className="img-building">🍪 </article>
                        <span>Главный корпус</span>
                    </article>
                </li>

                <li>
                    <article className="building--item">
                        {/* впихнуть фотку корпуса СамГТУ */}
                        <article className="img-building">🍪 </article>
                        <span>Главный корпус</span>
                    </article>
                </li>

                <li>
                    <article className="building--item">
                        {/* впихнуть фотку корпуса СамГТУ */}
                        <article className="img-building">🍪 </article>
                        <span>Главный корпус</span>
                    </article>
                </li>
            </ul>

        </div>
    );
};

export default BuildingsUI;