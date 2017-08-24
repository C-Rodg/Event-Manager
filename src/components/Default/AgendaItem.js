import React from 'react';

const AgendaItem = ({title, location, time, color}) => {
    return (
        <li className="agenda-item">
            <div className="item-icon" style={{background: color}}></div>
            <div className="item-info">
                <div className="item-time">{time}</div>
                <div className="item-card" style={{borderLeftColor: color}}>
                    <div className="item-card-title">{title}</div>
                    <div className="item-card-location">{location}</div>
                </div>
            </div>
        </li>
    );
};

export default AgendaItem;