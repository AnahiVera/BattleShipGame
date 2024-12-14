import React from "react";


const GameControls = ({status, onRestart}) =>{
    return (
        <div className="game-controls">
          <h2>{status}</h2> 
          <button onClick={onRestart}>Reset Game</button> 
        </div>
      );

}

export default GameControls