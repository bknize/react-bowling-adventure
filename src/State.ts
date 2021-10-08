import { RollNumberEvent, GameState } from './App';
import { FrameModel } from './Frames/Frame';

export function updateFrameData(state: GameState, e: RollNumberEvent): FrameModel[] {
    return state.frames.map((frame, index) => {
        if (index === state.frameIndex) {
            let rolls: number[] = [...frame.rolls, e.rollNumber];
            let numberOfRolls = rolls.length
            let maxRolls = frame.maxRolls;
            let total = rolls.reduce((prev, curr) => prev + curr, 0)
            let frameNumber = state.frameIndex +1
            let isStrike = false;
            let isSpare = false;
            if (total === 10) {
                if (numberOfRolls === 1) {
                    isStrike = true;
                }
                if (numberOfRolls === 2) {
                    isSpare = true
                }
                if (frameNumber === 10) {
                    maxRolls = 3
                }

            }
            return {
                ...frame,
                rolls,
                maxRolls,
                isStrike,
                isSpare
            }
        }
        return frame;
    })
}

export function scoreFrames(state: GameState) {
    return state.frames
}