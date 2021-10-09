import React, { useState } from 'react';
import { Alert, Col, FormControl, InputGroup, Row, Button } from 'react-bootstrap';
import { GameState, RollNumberEvent } from '../App';
import './Roller.scss'
import Pin from './pin.svg'
import Ball from './ball.svg'

function Roller(props: { state: GameState, onroll: (e: RollNumberEvent) => void}) {
    const [rollInputValue, setRollInputValue] = useState('0');
    const [rolling, setRolling] = useState(false);

    function RNG(): number {
        return Math.floor( Math.random() * (props.state.pinsRemaining +1) )
    }

    function roll(number?: number) {
        setRolling(true)
        setTimeout(() => {
            props.onroll({ rollNumber: number || parseInt(rollInputValue) || 0})
            setRolling(false)
        }, 1000)
    }

    function isRollButtonDisabled(): boolean {
        return parseInt(rollInputValue) < 0 ||
            props.state.gameOver ||
            parseInt(rollInputValue) > props.state.pinsRemaining ||
            rolling
    }
    function isRandomButtonDisabled(): boolean {
        return props.state.gameOver || rolling
    }

    return (
        <React.Fragment>
            <Row>
                <Col md={{ offset: 1, span: 10 }} xs={12}>
                    <InputGroup>
                        <FormControl id="number" size="lg" type="number" placeholder="Number of Pins to Hit"
                        value={ rollInputValue } onChange={(event) => setRollInputValue(event.target.value)} />
                    </InputGroup>
                    <div className="button-container">
                        <Button variant="primary" size="lg" disabled={ isRollButtonDisabled() } onClick={ () => roll()}>Roll the number I picked.</Button>
                        <Button variant="secondary" size="lg" disabled={ isRandomButtonDisabled() } onClick={ () => roll(RNG())}>I'm feeling lucky!</Button>
                    </div>
                    <ValidationMessage rollInputValue={ rollInputValue } pinsRemaining={ props.state.pinsRemaining } />
                </Col>
            </Row>
            <Row>
                <PinGraphic pinsRemaining={ props.state.pinsRemaining } rolling={ rolling } />
            </Row>
        </React.Fragment>
    )
}

function PinGraphic(props: { pinsRemaining: number, rolling: boolean }) {

    function getPins() {
        return new Array(props.pinsRemaining).fill(<img className="pin-image" src={ Pin } alt="Bowling pin" />)
    }
    function getBallPosition() {
        if (props.rolling) {
            return "ball__rolling"
        }
        return ""
    }

    return (
        <div className="pin-container">
            <img className={["ball-image", "rotating", getBallPosition()].join(" ")} src={ Ball } alt="Bowling ball" />
            {
                getPins()
            }
        </div>
    )
}

function ValidationMessage(props: { rollInputValue: string, pinsRemaining: number }) {
    const rollNumber: number = parseInt(props.rollInputValue)
    const defaultMessage = "Set this manually or hit random, to simulate the excitement of real bowling!"

    function inputIsNegative(): string | null {
        if (rollNumber < 0) {
            return `Okay, no negative pins, please.`
        }
        return null
    }
    function inputExceedsPins(): string | null {
        if (rollNumber > props.pinsRemaining) {
            return `Let's keep this reasonable, there are only ${props.pinsRemaining} up.`
        }
        return null
    }
    function findVariant() {
        if (inputExceedsPins() || inputIsNegative()) {
            return 'danger'
        }
        else {
            return 'light'
        }
    }

    return (
        <Alert variant={ findVariant() }>
            { inputIsNegative() || inputExceedsPins() || defaultMessage }
        </Alert>
    )
}

export default Roller;