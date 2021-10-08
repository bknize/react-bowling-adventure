import React, { useState } from 'react';
import './App.scss'
import Roller from './Roller/Roller';
import Frame, { FrameModel } from './Frames/Frame';
import { Col, Container, Row } from 'react-bootstrap';
import { scoreFrames, updateFrameData } from './State';

export interface RollNumberEvent {
  rollNumber: number
}

export interface GameState {
  frameIndex: number,
  gameOver: boolean,
  pinsRemaining: number,
  frames: FrameModel[]
}

function stateInit() {
  return {
    frameIndex: 0,
    gameOver: false,
    pinsRemaining: 10,
    frames: framesInit()
  }
}

function framesInit() {
  return new Array(10).fill({
        rolls: [],
        maxRolls: 2,
        isStrike: false,
        isSpare: false,
        totalScore: 10
      }
    )
}


function App() {
  const [state, setState] = useState(stateInit())

  function handleRoll(e: RollNumberEvent) {
    let newState = { ...state };

    newState.frames = updateFrameData(state, e)
    newState.pinsRemaining -= e.rollNumber;

    let currentFrame: FrameModel = newState.frames[state.frameIndex]

    if (currentFrame.rolls.length >= currentFrame.maxRolls) {
      newState.frameIndex += 1
      newState.pinsRemaining = 10;
    }
    if (currentFrame.isStrike) {
      newState.frameIndex += 1
      newState.pinsRemaining = 10;
    }
    if (newState.frameIndex === 10) {
      newState.gameOver = true;
    }

    newState.frames = scoreFrames(newState)

    setState(newState)
    
  }

  function reset() {
    setState(stateInit())
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Bowling Adventure</h1>
          { state.pinsRemaining }
        </Col>
      </Row>
      <Roller state={ state } onroll={ (e: RollNumberEvent) => handleRoll(e)} />

      
      {/* Frame: { gameState.frameIndex+1 } Roll: { frameList[gameState.frameIndex].rolls.length+1 } */}
      <div>
        {
          state.frames.map((model, index) => <Frame key={'frame-'+index } model={ model } index={ index } />)
        }
        {
          state.gameOver === true && <button className="btn btn-primary" onClick={ () => reset() }>Reset</button>
        }
        
      </div>
    </Container>
  );

}

export default App;
