import React from 'react';
import './bestScore.scss';
import '../settings/settings.scss';

export default function BestScore(){


    return(
        <div className="best-score__wrapper">
            <h1>Best Score Ever</h1>
            <div className="date"></div>
            <div className="score"></div>
            <div className="movements"></div>
        </div>
    )
}