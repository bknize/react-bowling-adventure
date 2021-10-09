import React, { useState } from 'react';
import './App.scss'
import Roller from './Roller/Roller';
import { FrameModel } from './Frames/Frame';
import { Col, Container, Row, Button, Modal, InputGroup, FormControl, Form } from 'react-bootstrap';
import { updateGameData } from './State';
import { perfectGameInit, randomGameInit, stateInit, testDataInit } from './Data';
import FrameGrid from './Frames/Frame';
import { FaEdit } from "react-icons/fa";

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
  const [player, setPlayer] = useState('Ben')
  const [isModalShowing, setIsModalShowing] = useState(false)

  function handleRoll(e: RollNumberEvent) {
    setState({
      ...updateGameData(state, e)
    })
  }

  function handleClose(e: string) {
    if (e.length) {
      setPlayer(e)
    }
    setIsModalShowing(false)
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
    <Container>
      <Row>
        <Col>
          <h1>{ player }'s Bowling Adventure <Button variant="link" size="sm" onClick={ () => setIsModalShowing(true) }><FaEdit /></Button></h1>
        </Col>
      </Row>
      <Roller state={ state } onroll={ (e: RollNumberEvent) => handleRoll(e)} />
      <FrameGrid frames={ state.frames } player={ player } frameIndex={ state.frameIndex } />
      <Row>
        <Col>
          <h2>{ state.totalScore }</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="button-container">
            <Button size="lg" variant="outline-primary" onClick={ () => testDataGame() }>Test Data</Button>
            <Button size="lg" variant="outline-primary" onClick={ () => perfectGame() }>Perfect Game!</Button>
            <Button size="lg" variant="outline-primary" onClick={ () => randomGame() }>Random Data</Button>
            {
              state.gameOver === true && <Button size="lg" variant="primary" onClick={ () => reset() }>Reset</Button>
            }
          </div>
        </Col>
      </Row>
      <EditModal player={ player } show={ isModalShowing } onclose={ (e: string ) => handleClose(e) } />
    </Container>
  );

}

function EditModal(props: { player: string, show: boolean, onclose: (e: string ) => void }) {
  const [nameInputValue, setNameInputValue] = useState(props.player);

  function handleClose() {
    props.onclose('')
  }

  function handleSave() {
    props.onclose(nameInputValue)
  }

  return (
    <Modal show={props.show} onHide={ handleClose }>
    <Modal.Header closeButton>
      <Modal.Title>Rename Player</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Label htmlFor="player">Whose Bowling Adventure will it be?</Form.Label>
      <InputGroup>
          <FormControl id="player" size="lg" type="text"
          value={ nameInputValue } onChange={(event) => setNameInputValue(event.target.value)} />
      </InputGroup>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={ handleClose }>
        Close
      </Button>
      <Button variant="primary" onClick={ handleSave }>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default App;
