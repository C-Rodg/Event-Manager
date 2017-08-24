import React from 'react';

const Header = ({ eventTitle }) => {
    return (
        <div className="header">
            <div className="event-title">{eventTitle}</div>            
        </div>
    );
};

export default Header;