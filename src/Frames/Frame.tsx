import React from 'react';

export interface FrameModel {
    rolls: number[],
    maxRolls: number,
    isStrike: boolean,
    isSpare: boolean,
    totalScore: number
  }

export interface FrameUpdate {
    model: FrameModel
}

function Frame(props: { model: FrameModel, index: number }) {

    return (
        <div>
            { props.index+1 } { props.model.rolls } { props.model.maxRolls } total: { props.model.rolls.reduce((prev, curr) => prev + curr, 0) }
            { props.model.isStrike ? 'Strike' : '' } { props.model.isSpare ? 'Spare' : ''}
            {/* <button onClick={ () =>  }>Test</button> */}
        </div>
    )
}

export default Frame;