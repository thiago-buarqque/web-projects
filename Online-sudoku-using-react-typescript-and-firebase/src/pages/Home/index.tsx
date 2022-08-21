import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as IconTrophy } from "../../media/icons/trophy.svg";
import { ReactComponent as IconMoon } from "../../media/icons/moon.svg";
import { ReactComponent as IconSun } from "../../media/icons/sun.svg";
import { ReactComponent as IconUser } from "../../media/icons/user.svg";

import DifficultyChanger from "../../components/DifficultyChanger";
import { getLevelScoreboard, TScore } from "../../scoreboard";
import { formatTime } from "../Match/matchUtils";

export const generateMatchId = (length = 32) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

interface props {
    gameDifficultyLevel: number;
    incrementGameDifficulty: () => void;
    decrementGameDifficulty: () => void;
    toggleDarkMode: () => void;
    isDarkModeOn: boolean;
    signInWithGoogle: () => void;
    userName: string | undefined;
}

const HomePage: React.FC<props> = ({
    gameDifficultyLevel,
    incrementGameDifficulty,
    decrementGameDifficulty,
    toggleDarkMode,
    isDarkModeOn,
    signInWithGoogle,
    userName,
}) => {
    const main = useRef<HTMLElement | null>(null);
    const mainContent = useRef<HTMLDivElement | null>(null);
    const userScoreContainer = useRef<HTMLDivElement | null>(null);
    const btnUserScoreBoard = useRef<HTMLButtonElement | null>(null);
    const gameDifficultyContainer = useRef<HTMLDivElement | null>(null);
    const bestDifficultyScore = useRef<HTMLSpanElement | null>(null);

    const [scoreboard, setScoreboard] = useState<TScore[] | null>(null);

    const navigator = useNavigate();

    const openUserScoreBoard = useCallback(() => {
        if (
            main.current &&
            mainContent.current &&
            userScoreContainer.current &&
            gameDifficultyContainer.current &&
            bestDifficultyScore.current
        ) {
            // Set mainContent marginTop
            const mainHeight = main.current.offsetHeight;
            const mainContentHeight = mainContent.current.offsetHeight;
            const userScoreBoardHeight = userScoreContainer.current.offsetHeight;
            const bestDifficultyScoreHeight = bestDifficultyScore.current.offsetHeight;

            userScoreContainer.current.style.marginTop = `-${bestDifficultyScoreHeight}px`;

            mainContent.current.style.marginTop = `${
                (mainHeight - (mainContentHeight + userScoreBoardHeight - bestDifficultyScoreHeight)) / 2
            }px`;

            if (btnUserScoreBoard.current) {
                btnUserScoreBoard.current.onclick = null;
                btnUserScoreBoard.current.onclick = closeUserScoreBoard;

                btnUserScoreBoard.current.classList.add("__trophy_filled");
            }
        }
    }, []);

    const closeUserScoreBoard = useCallback(() => {
        setMainContentInitialMarginTop();
        setUserScoreBoardInitialMarginTop();

        if (btnUserScoreBoard.current) {
            btnUserScoreBoard.current.onclick = null;
            btnUserScoreBoard.current.onclick = openUserScoreBoard;

            btnUserScoreBoard.current.classList.remove("__trophy_filled");
        }
    }, []);

    const setMainContentInitialMarginTop = () => {
        const mainHeight = main.current?.offsetHeight;
        const mainContentHeight = mainContent.current?.offsetHeight;

        if (mainHeight && mainContentHeight && mainContent.current) {
            mainContent.current.style.marginTop = `${(mainHeight - mainContentHeight) / 2}px`;
            // Delay to implement mainContent transition so it doesn't animate when setting margin top
            // on page init
            setTimeout(
                () => (mainContent.current ? (mainContent.current.style.transition = "all 0.3s ease-in-out") : null),
                50
            );
        }
    };

    const setUserScoreBoardInitialMarginTop = () => {
        if (userScoreContainer.current && main.current) {
            userScoreContainer.current.style.marginTop = `${main.current.offsetHeight / 2}px`;
        }
    };

    const redirectToMultiplayerMatch = () => {
        const matchId = generateMatchId();
        navigator(`/play/${matchId}`);
    };

    useEffect(() => {
        setMainContentInitialMarginTop();
        setUserScoreBoardInitialMarginTop();

        if (btnUserScoreBoard.current) btnUserScoreBoard.current.onclick = openUserScoreBoard;

        window.onresize = () => {
            setMainContentInitialMarginTop();
            setUserScoreBoardInitialMarginTop();
        };
    }, []);

    useEffect(() => {
        setScoreboard(getLevelScoreboard(gameDifficultyLevel));
    }, [gameDifficultyLevel]);

    return (
        <div id="home_page" className="__fade_in_page">
            <header>
                <div id="__options">
                    <button ref={btnUserScoreBoard}>
                        <IconTrophy />
                    </button>
                    <button onClick={toggleDarkMode}>{isDarkModeOn ? <IconSun /> : <IconMoon />}</button>
                </div>
                <div id="__login">
                    <button onClick={!userName ? signInWithGoogle : undefined}>
                        <span>{!userName ? `Entrar` : userName}</span>
                        <IconUser />
                    </button>
                </div>
            </header>

            <main ref={main}>
                <div ref={mainContent} id="__main_content">
                    <p id="game_title">Sudoku</p>
                    <div id="__game_menu">
                        <button className="__menu_option main_option" onClick={() => navigator("/play")}>
                            Novo jogo
                        </button>
                        <button className="__menu_option" onClick={redirectToMultiplayerMatch}>
                            Multijogador
                        </button>
                    </div>

                    <div ref={gameDifficultyContainer} id="__game_difficulty">
                        <DifficultyChanger
                            gameDifficultyLevel={gameDifficultyLevel}
                            decrementGameDifficulty={decrementGameDifficulty}
                            incrementGameDifficulty={incrementGameDifficulty}
                        />

                        <span ref={bestDifficultyScore} id="__best_difficulty_score">
                            {scoreboard ? `Melhor tempo: ${formatTime(scoreboard[0].gameTime)}` : `Sem pontuação`}
                        </span>

                        <div ref={userScoreContainer} id="__user_score_container">
                            <span>{scoreboard ? `Sua pontuação` : `Sem pontuação`}</span>
                            <ul>
                                {scoreboard
                                    ? scoreboard.map((score, i) => (
                                          <li key={i}>
                                              <span>{`${i+1}. ${score.gameDate}`}</span> <span>{formatTime(score.gameTime)}</span>
                                          </li>
                                      ))
                                    : ``}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
