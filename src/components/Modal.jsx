import React from 'react';


const Modal = ({ show, message, onRestart }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{message}</h2>
                <p onClick={onRestart} className="btn btn-primary">
                    Restart Game
                </p>
            </div>
        </div>
    );
};

export default Modal;