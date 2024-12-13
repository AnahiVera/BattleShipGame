import React from "react";

//status -> turn, game over, winner

const GameControls = ({status, onRestart}) =>{
    return (
        <div className="game-controls">
          <h2>{status}</h2> 
          <button onClick={onRestart}>Reiniciar Juego</button> 
        </div>
      );

}

export default GameControls