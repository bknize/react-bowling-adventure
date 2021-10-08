import { RollNumberEvent, GameState } from './App';
import { calculateBonusScore, calculateTotalScore } from './Calculate';
import { FrameModel } from './Frames/Frame';

function updateFrameData(state: GameState, e: RollNumberEvent): FrameModel[] {
    return state.frames.map((frame: FrameModel, index) => {
        if (index === state.frameIndex) {
            let rolls: number[] = [...frame.rolls, e.rollNumber];
            let numberOfRolls = rolls.length
            let maxRolls = frame.maxRolls;
            let totalScore = rolls.reduce((prev, curr) => prev + curr, 0)
            let frameNumber = state.frameIndex +1
            let isStrike = frame.isStrike;
            let isSpare = frame.isSpare;
            let bonusScore = frame.bonusScore;

            if (totalScore === 10) {
                if (numberOfRolls === 1 && !isStrike) {
                    isStrike = true;
                    
                    maxRolls = 1;
                    if (frameNumber === 10) {
                        maxRolls = 3
                    }
                }
                if (numberOfRolls === 2) {
                    isSpare = true
                    if (frameNumber === 10) {
                        maxRolls = 3
                    }
                }
            }
            return {
                ...frame,
                rolls,
                maxRolls,
                isStrike,
                isSpare,
                totalScore,
                bonusScore
            }
        }
        return {
            ...frame
        };
    })
}

export function updateGameData(state: GameState, e: RollNumberEvent): GameState {
    let newState = {...state}
    let frames = updateFrameData(newState, e);
    let currentFrame: FrameModel = frames[state.frameIndex]
    let knockDownPins = () => {
        newState.pinsRemaining -= e.rollNumber;
    }
    let resetPins = () => {
        newState.pinsRemaining = 10;
    }

    if (newState.frameIndex+1 < 10) {
      knockDownPins()
    } else {
        let numberOfRolls = currentFrame.rolls.length
        if (currentFrame.isStrike) {
            let previousRoll = currentFrame.rolls[numberOfRolls -1] || null
            if (numberOfRolls > 0 && previousRoll === 10) {
                resetPins()
            } else {
                knockDownPins()
            }
        } else {
            if (currentFrame.isSpare) {
                if (numberOfRolls === 2) {
                    resetPins()
                }
            } else {
                knockDownPins()
            }
        }
    }

    if (currentFrame.rolls.length >= currentFrame.maxRolls) {
      newState.frameIndex += 1
      newState.pinsRemaining = 10
      if (newState.frameIndex === 10) {
        newState.gameOver = true;
      }
    }

    frames = calculateBonusScore(frames)

    return {
        ...newState,
        frames,
        totalScore: calculateTotalScore(frames)
    }
}

