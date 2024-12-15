import React from "react";

// 0 = empty
// 1 = part of a ship
// 2 = a sunken part of a ship
// 3 = a missed shot   isCpu ? 'bg-secondary' : squareDefault

const Square = ({ value, onClick, isCpu }) => {

    const squareState = () => {
        const squareDefault = "bg-primary"

        switch (value) {
            case 1:
                return isCpu ? squareDefault : `${squareDefault} bg-secondary`
            case 2:
                return `${squareDefault} bg-warning`
            case 3:
                return `${squareDefault} bg-dark`
            default:
                return squareDefault
        }
    }


    return (
        <button className={squareState()} onClick={onClick}></button>
    )
}

export default Square;