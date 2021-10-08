import React, { useState } from 'react';
import './App.scss'
import Roller from './Roller/Roller';
import Frame, { FrameModel } from './Frames/Frame';
import { Col, Container, Row } from 'react-bootstrap';
import { updateGameData } from './State';
import { perfectGameInit, randomGameInit, stateInit, testDataInit } from './Data';

export interface RollNumberEvent {
  rollNumber: number
}

export interface GameState {
  frameIndex: number,
  gameOver: boolean,
  pinsRemaining: number,
  frames: FrameModel[],
  totalScore: number
}


function App() {
  const [state, setState] = useState(stateInit())

  function handleRoll(e: RollNumberEvent) {
    setState({
      ...updateGameData(state, e)
    })
  }

  function reset() {
    setState(stateInit())
  }
  function perfectGame() {
    setState(perfectGameInit())
  }
  function randomGame() {
    setState(randomGameInit())
  }
  function testDataGame() {
    setState(testDataInit())
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
        <button className="btn btn-default" onClick={ () => testDataGame() }>Test Data</button>
        <button className="btn btn-default" onClick={ () => perfectGame() }>Perfect Game!</button>
        <button className="btn btn-default" onClick={ () => randomGame() }>Random Data</button>
        {
          state.totalScore
        }
        
      </div>
    </Container>
  );

}

export default App;
