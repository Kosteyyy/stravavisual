import React from 'react';

export default function TypePicker({ type, onChangeType }) {
    return (
        <div className="typeInput">
            <label htmlFor="typeSelect" className="label">вид</label>                    
            <select id="typeSelect" onChange={onChangeType} value={type}>
                <option value="">(Все)</option>
                <option value="Бег">Бег</option>
                <option value="Лыжи">Лыжи</option>
                <option value="Велосипед">Велосипед</option>
                <option value="Плавание">Плавание</option>
            </select>
        </div>
    )
}

