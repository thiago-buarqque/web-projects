import React from "react";
import { useNavigate } from "react-router-dom";

import DifficultyChanger from "../../DifficultyChanger";

import { ReactComponent as ConfettiIcon } from "../../../media/icons/confetti.svg";
import { ReactComponent as SadIcon } from "../../../media/icons/sad.svg";
import { ReactComponent as ArrowBackIcon } from "../../../media/icons/arrow_back.svg";
interface props {
    decrementGameDifficulty: () => void;
    incrementGameDifficulty: () => void;
    gameDifficultyLevel: number;
    newGame: () => void;
    isFinishedGameValid: boolean;
    matchTime: string;
    isGameFinished: boolean;
}

const SinglePlayerGameEndPopUp: React.FC<props> = ({
    gameDifficultyLevel,
    incrementGameDifficulty,
    decrementGameDifficulty,
    newGame,
    isFinishedGameValid,
    matchTime,
    isGameFinished,
}) => {
    let navigator = useNavigate();

    return (
        <div id="game_finish" className={`${!isGameFinished ? `__hide_game_end_screen` : `__show_game_end_screen`}`}>
            <div id="__content">
                <div id="__congrats">
                    {isFinishedGameValid ? <ConfettiIcon id="confetti" /> : <SadIcon id="sad" />}

                    <p id="__congrats_title">{isFinishedGameValid ? `Parabéns` : `Poxa...`}</p>
                    <span id="__congrats_msg">
                        {isFinishedGameValid ? `Você completou o Sudoku.` : `Você preencheu o Sudoku incorretamente.`}
                    </span>
                    <span id="__match_time">{`Tempo: ${matchTime}`}</span>
                </div>
                <div id="__options">
                    <button className="__menu_option main_option" onClick={newGame}>
                        <span>Novo jogo</span>
                    </button>
                    <DifficultyChanger
                        gameDifficultyLevel={gameDifficultyLevel}
                        incrementGameDifficulty={incrementGameDifficulty}
                        decrementGameDifficulty={decrementGameDifficulty}
                    />
                    <button id="__return_to_menu" onClick={() => navigator("/")}>
                        <ArrowBackIcon />
                        Menu principal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SinglePlayerGameEndPopUp;
