import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Board from "../../components/Board";
import SinglePlayerGameEndPopUp from "../../components/Board/SinglePlayerGameEndPopUp";

import { ReactComponent as ArrowBackIcon } from "../../media/icons/arrow_back.svg";

import { fireAuth } from "../../App";

import { formatTime, MatchPageProps } from "./matchUtils";
import { addGameScore } from "../../scoreboard";

const SinglePlayerMatchPage: React.FC<MatchPageProps> = ({
    isDarkModeOn,
    toggleDarkMode,
    gameDifficultyLevel,
    incrementGameDifficulty,
    decrementGameDifficulty,
}) => {
    let navigator = useNavigate();

    const [isGameFinished, setIsGameFinished] = useState(false);
    const [isFinishedGameValid, setIsFinishedGameValid] = useState(false);
    const [createNewGame, setCreateNewGame] = useState(true);
    const [timer, setTimer] = useState(0);

    const hasToStoreGameTime = useRef(true);
    const timerTimeoutId = useRef<NodeJS.Timeout | null>(null);

    const newGame = () => {
        setCreateNewGame(true);
        setIsGameFinished(false);

        if (timerTimeoutId.current) clearTimeout(timerTimeoutId.current);
        setTimer(0);
    };

    useEffect(() => {
        if (!isGameFinished)
            timerTimeoutId.current = setTimeout(() => {
                setTimer(timer + 1000);
            }, 1000);
    }, [timer, isGameFinished]);

    useEffect(() => {
        if (isGameFinished) {
            if (hasToStoreGameTime.current) {
                addGameScore(timer, gameDifficultyLevel);
                hasToStoreGameTime.current = false;
            }
            if (timerTimeoutId.current) clearTimeout(timerTimeoutId.current);
        } else if (!isGameFinished && !hasToStoreGameTime.current) hasToStoreGameTime.current = true;
    }, [isGameFinished, gameDifficultyLevel, timer]);

    useEffect(() => {
        document.title = "Sudoku | Singleplayer";
    }, []);

    return (
        <div id="match_page" className="__fade_in_page">
            <SinglePlayerGameEndPopUp
                gameDifficultyLevel={gameDifficultyLevel}
                incrementGameDifficulty={incrementGameDifficulty}
                decrementGameDifficulty={decrementGameDifficulty}
                newGame={newGame}
                isGameFinished={isGameFinished}
                isFinishedGameValid={isFinishedGameValid}
                matchTime={formatTime(timer)}
            />
            <div id="match_header">
                <button id="__back_btn" onClick={() => navigator("/")}>
                    <ArrowBackIcon />
                </button>
                <span id="__timer">{formatTime(timer)}</span>
                <div id="__match_info">
                    <span>
                        {fireAuth.currentUser?.displayName
                            ? fireAuth.currentUser?.displayName.split(" ")[0]
                            : `Singleplayer`}
                    </span>
                </div>
            </div>
            <Board
                isDarkModeOn={isDarkModeOn}
                toggleDarkMode={toggleDarkMode}
                gameDifficultyLevel={gameDifficultyLevel}
                handleGameEnd={() => setIsGameFinished(true)}
                setIsFinishedGameValid={setIsFinishedGameValid}
                createNewGame={createNewGame}
                setCreateNewGame={setCreateNewGame}
            />
        </div>
    );
};

export default SinglePlayerMatchPage;
