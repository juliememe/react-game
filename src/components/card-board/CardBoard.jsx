import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import './cardBoard.scss';

export default function CardBoard({guessed, disabled, cards, flipped, handleClick}){
    return(
        <div className ='card-board'>
            {
                cards.map(card => <Card 
                    key={card.id}
                    id = {card.id}
                    type={card.type}
                    width={150}
                    height={220}
                    flipped={flipped.includes(card.id)}
                    handleClick={handleClick}
                    guessed={guessed.includes(card.id)}
                    className = "card"
                    disabled ={disabled || guessed.includes(card.id)}
                    />)
            }
        </div>
    )
}


CardBoard.propTypes = {
    disabled: PropTypes.bool.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({})),
    flipped: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleClick: PropTypes.func.isRequired,
    guessed: PropTypes.arrayOf(PropTypes.number).isRequired,
}