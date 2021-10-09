import { FrameModel } from './Frames/Frame';

export function calculateBonusScore(frames: FrameModel[]): FrameModel[] {
    return frames.map((frame, index) => {
        let bonusRolls: number[] = []
        let bonusDepth = 0;
        if (index < 9) {
            if (frame.isStrike) {
                bonusDepth = 2;
            }
            if (frame.isSpare) {
                bonusDepth = 1;
            }
        }
        if (bonusDepth) {
            bonusRolls = frames
                .map((frame: FrameModel) => frame.rolls)
                .slice(index+1)
                .flat()
                .slice(0, bonusDepth)
        }
        return {
            ...frame,
            bonusScore: bonusRolls.reduce((prev, curr) => prev + curr, 0)
        }
    })
}

export function calculateTotalScore(frames: FrameModel[]): number {
    return frames.map((frame: FrameModel) => {
        return frame.totalScore + frame.bonusScore
    }).reduce((prev, curr) => prev + curr, 0)
}