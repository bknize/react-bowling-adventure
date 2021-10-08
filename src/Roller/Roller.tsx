import React, { useState } from 'react';
import { Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import { GameState, RollNumberEvent } from '../App';

function Roller(props: { state: GameState, onroll: (e: RollNumberEvent) => void}) {
    const [rollNumber, setRollNumber] = useState('0');

    function RNG(): number {
        return Math.floor( Math.random() * (props.state.pinsRemaining +1) )
    }

    function roll(number?: number) {
        props.onroll({ rollNumber: number || parseInt(rollNumber) || 0})
    }

    function isNumberPositive(): boolean {
        return parseInt(rollNumber) < 0   
    }
    function isNumberValid(): boolean {
        return parseInt(rollNumber) >= 0 && parseInt(rollNumber) <= props.state.pinsRemaining
    }
    function isNumberHigherThanPins(): boolean {
        return parseInt(rollNumber) > props.state.pinsRemaining
    }
    function isRollButtonDisabled(): boolean {
        return parseInt(rollNumber) < 0 || props.state.gameOver || parseInt(rollNumber) > props.state.pinsRemaining
    }
    function isRandomButtonDisabled(): boolean {
        return props.state.gameOver
    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <InputGroup className="">
                        <FormControl id="number" size="lg" type="number" placeholder="Number of Pins to Hit"
                        value={ rollNumber } onChange={(event) => setRollNumber(event.target.value)} />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    { isNumberPositive() &&
                        <span className="text-danger">
                            Okay, no negative pins, please.
                        </span>
                    }
                    { isNumberValid() &&
                        <span className="text-muted">
                            Set this manually or hit random, to simulate the excitement of real bowling!
                        </span>
                    }
                    { isNumberHigherThanPins() &&
                        <span className="text-danger">
                            Let's keep this reasonable, there are only {props.state.pinsRemaining} up.
                        </span>
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                <button className="btn btn-primary" 
                    disabled={ isRandomButtonDisabled() }
                    onClick={ () => roll(RNG())}>Randomize!</button>
                <button className="btn btn-default"
                    disabled={ isRollButtonDisabled() }
                    onClick={ () => roll()}>
                    Roll the number I picked.
                </button>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Roller;