import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Frame.scss';

export interface FrameModel {
    rolls: number[],
    maxRolls: number,
    isStrike: boolean,
    isSpare: boolean,
    totalScore: number,
    bonusScore: number
  }

export interface FrameUpdate {
    model: FrameModel
}

function Frame(props: { model: FrameModel, index: number, currentIndex: number }) {
    function frameOffset(index: number, offset: number) {
        let gridCols = 12/offset -1
        if (index % gridCols === 0 && index !== 0) {
            return offset
        }
        return 0
    }
    function frameSpan(span: number) {
        return { span, offset: frameOffset(props.index, span) }
    }
    function isCurrentFrame() {
        if (props.index === props.currentIndex) {
            return 'frame__current'
        }
        return '';
    }
    return (
        <Col xs={ frameSpan(4) } sm={ frameSpan(3) } md={ frameSpan(2) } xl={ frameSpan(1) } className="frame-container" >
            <div className={ ["frame-header", isCurrentFrame()].join(" ") }>
                { props.index+1 }
            </div>
            <div className="frame-body">
                {
                    props.index === 9 && (
                        <div className="frame-roll-container">
                            { props.model.rolls[2] }
                        </div>
                    )
                }
                <div className="frame-roll-container">
                    { props.model.rolls[1] }
                </div>
                <div className="frame-roll-container">
                    { props.model.rolls[0] }
                </div>
                
                <span className="frame-score">{ props.model.totalScore + props.model.bonusScore }</span>
            </div>
        </Col>
    )
}

function FrameGrid(props: { frames: FrameModel[], player: string, frameIndex: number }) {
    return (
        <Row>
            <Col xs={ 4 } sm={ 3 } md={ 2 } lg={ 2 } className="frame-container">
                <div className="frame-header"> Player </div>
                <div className="frame-body">
                    <span className="player-name">{ props.player }</span>
                </div>
            </Col>
            {
                props.frames.map((model, index) => <Frame key={'frame-'+index } model={ model } index={ index } currentIndex={ props.frameIndex }/>)
            }
        </Row>
    )
}

export default FrameGrid;