import React, { useEffect, useState } from "react";
import Square from "./Square";

// 0 = empty
// 1 = part of a ship
// 2 = a sunken part of a ship
// 3 = a missed shot

const Board = ({ squares, onClick }) => {

    return (
        <div className="board">
            {squares.map((row, rowIndex) => ( 
                
                <div key={rowIndex} className="board-row"> 
                    {row.map((square, colIndex) => ( 
                        
                        <Square
                            key={`${rowIndex}-${colIndex}`}
                            value={square}
                            onClick={() => onClick(rowIndex, colIndex)} // Manejo del clic en la celda
                        />

                    ))}
                </div>
            ))}
        </div>
    )
}


export default Board;