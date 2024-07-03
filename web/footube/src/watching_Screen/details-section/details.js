import React, { useState, useEffect } from 'react';
import './details.css';

function Details({ details, viewsNum, uploadDate }) {
    const [isActive, setIsActive] = useState(false);
    const [timePassed, setTimePassed] = useState('');

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    //calculate time has passed since the uploadDate
    useEffect(() => {
        const calculateTimePassed = (date) => {
            const uploadDate = new Date(date);
            const now = new Date();
            const diff = now - uploadDate;

            const minutes = Math.floor(diff / (1000 * 60));
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

            if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
            if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
            if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
            if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        };

        setTimePassed(calculateTimePassed(uploadDate));
    }, [uploadDate]);

    return (
        <div className='block'>
            <div className="accordion">
                <div className="accordion-item">
                    <button className={`accordion-header ${isActive ? 'active' : ''}`} onClick={toggleAccordion}>
                        {viewsNum}, {timePassed}
                    </button>
                    <div className="accordion-content" style={{ maxHeight: isActive ? '200px' : '0' }}>
                        <p>{details}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
