import React from "react";

// 0 = empty
// 1 = part of a ship
// 2 = a sunken part of a ship
// 3 = a missed shot

const Square = ({value, onClick}) => {

    const squareState = () =>{ //cambiar el estado a colores
        switch (value) {
            case 1:
                return "square ship"
            case 2:
                return "sunken ship"
            case 3:
                return "Shot missed"
            default:
                return "square"
        }
    }

    return (
        <button className={squareState()} onClick={onClick}>{value}</button>
    )
}

export default Square;