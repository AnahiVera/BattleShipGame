import React from 'react'
import Modal from './Modal'


const GameControls = ({ status, gameOver, onRestart, modalMessage }) => {
    return (
        <>
            {gameOver ? (
                <Modal show={true} message={modalMessage} onRestart={onRestart} />
            ) : (
                <div className="game-options">
                    <p onClick={onRestart} className="btn">
                        Restart Game
                    </p>
                    <h4>{status}</h4>
                </div>
            )}
        </>
    );
};

export default GameControls