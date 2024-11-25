import React, { useState } from 'react';
import './navigation_ui.css';

//перенести сущности в домен
interface InputField {
    id: number;
    value: string;
}

const NavigationUI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [redInputs, setRedInputs] = useState<InputField[]>([{ id: 1, value: '' }]); // Массив для красных полей
    const [blueInputs, setBlueInputs] = useState<InputField[]>([{ id: 1, value: '' }]); // Массив для синих полей

    const handleChange = (id: number, event: React.ChangeEvent<HTMLInputElement>, color: string) => {
        if (color === "red") {
            const newInputs = redInputs.map(input =>
                input.id === id ? { ...input, value: event.target.value } : input
            );
            setRedInputs(newInputs);
        } else {
            const newInputs = blueInputs.map(input =>
                input.id === id ? { ...input, value: event.target.value } : input
            );
            setBlueInputs(newInputs);
        }
    };

    const handleClearInput = (id: number, color: string) => {
        if (color === "red") {
            const newInputs = redInputs.map(input =>
                input.id === id ? { ...input, value: '' } : input
            );
            setRedInputs(newInputs);
        } else {
            const newInputs = blueInputs.map(input =>
                input.id === id ? { ...input, value: '' } : input
            );
            setBlueInputs(newInputs);
        }
    };

    return (
        <div className="input-box">
            <div className="button-container">
                <span>Маршрут</span> 
                <button>Готово</button> 
            </div>

            {/* Красные поля ввода */}
            {redInputs.map(input => (
                <div key={input.id} className="input-item">
                    <img src={`${process.env.PUBLIC_URL}/icons/red-icon.png`} alt=''/> 
                    <input 
                        type="text" 
                        value={input.value} 
                        onChange={(event) => handleChange(input.id, event, "red")} 
                    />
                    <button onClick={() => handleClearInput(input.id, "red")}>✖</button> 
                </div>
            ))}

            {/* Синие поля ввода */}
            {blueInputs.map(input => (
                <div key={input.id} className="input-item">
                    <img src={`${process.env.PUBLIC_URL}/icons/blue-icon.png`} alt=''/> 
                    <input 
                        type="text" 
                        value={input.value} 
                        onChange={(event) => handleChange(input.id, event, "blue")} 
                        />
                        <button onClick={() => handleClearInput(input.id, "blue")}>✖</button> 
                </div>
            ))}
        </div>
    );
};

export default NavigationUI;
