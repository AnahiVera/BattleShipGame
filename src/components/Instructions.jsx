import React from 'react';



const Instructions = () => {

    return (
        <div className='game-options'>
            <p className="d-inline-flex gap-1">

                <p className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Click for Instructions
                </p>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    Ships are positioned at random in the boards, you cannot see the CPU's.<br></br>
                    Click on the Cpu's Board to play, each click is a torpedo. <br></br>
                    The positions on the map are marked with colors. <br></br>
                    <p className='bg-primary'>Blue = Water</p>
                    <p className='bg-primary bg-secondary'>Gray = Ships </p>
                    <p className='bg-primary bg-dark text-white'> Black = Missed Torpedo </p>
                    <p className='bg-primary bg-warning'>Yellow = Hit on ship </p>

                </div>
            </div>
        </div>

    )
}

export default Instructions;
