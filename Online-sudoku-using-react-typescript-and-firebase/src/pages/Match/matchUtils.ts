export const formatTime = (time: number) => {
    time /= 1000;
    const minutes = parseInt(`${time / 60}`);
    let seconds = time - 60 * minutes;
    return `${minutes > 0 ? `${parseInt(""+minutes)}M ` : ""}${parseInt(""+seconds)}S`;
};

type TPlayer = {
    id: string;
    readyToPlay: boolean;
    displayName: string;
}


export type TMatch = {
    matchId: string;
    player1: TPlayer;
    player2: TPlayer;
    initialBoard: string;
    matchHappening: boolean;
    matchFinished: boolean;
    winner: {
        id: string;
        displayName: string;
    },
    matchTime: number
};

export interface MatchPageProps {
    decrementGameDifficulty: () => void;
    incrementGameDifficulty: () => void;
    isDarkModeOn: boolean;
    toggleDarkMode: () => void;
    gameDifficultyLevel: number;
}