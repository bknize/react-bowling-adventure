import { FrameModel } from './Frames/Frame';
import { GameState } from './App';
import { updateGameData } from './State';

export function stateInit(init = framesInit): GameState {
    return {
      frameIndex: 0,
      gameOver: false,
      pinsRemaining: 10,
      frames: init(),
      totalScore: 0
    }
  }
  
function framesInit(): FrameModel[] {
    return new Array(10).fill({
            rolls: [],
            maxRolls: 2,
            isStrike: false,
            isSpare: false,
            totalScore: 0,
            bonusScore: 0
        })
}

export function perfectGameInit(): GameState {
    let state = stateInit()

    while (!state.gameOver) {
        state = updateGameData(state, { rollNumber: 10 })
    }

    return state
}

export function randomGameInit(): GameState {
    let state = stateInit()

    while (!state.gameOver) {
        let rollNumber = Math.floor( Math.random() * (state.pinsRemaining +1) )
        state = updateGameData(state, { rollNumber })
    }

    return state
}

export function testDataInit(): GameState {
    let state = stateInit()

    const testData = [
        4, 3,
        7, 3,
        5, 2,
        8, 1,
        4, 6,
        2, 4,
        8, 0,
        8, 0,
        8, 2,
        10, 1, 7
    ]
    testData.forEach(rollNumber => {
        state = updateGameData(state, { rollNumber }) 
    });

    return state
}