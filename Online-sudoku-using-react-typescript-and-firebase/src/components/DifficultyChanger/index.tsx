import React from "react";

import { ReactComponent as IconLeftArrow } from "../../media/icons/left_arrow.svg";
import { ReactComponent as IconRightArrow } from "../../media/icons/right_arrow.svg";

interface props {
    decrementGameDifficulty: () => void;
    incrementGameDifficulty: () => void;
    gameDifficultyLevel: number
}

const DifficultyChanger: React.FC<props> = ({
    gameDifficultyLevel,
    incrementGameDifficulty,
    decrementGameDifficulty,
}) => {
    return (
        <div id="__difficulty_changer">
            <button id="__prev_diff" className="__btn_difficulty_changer" onClick={decrementGameDifficulty}>
                <IconLeftArrow />
            </button>
            <div id="__difficulty" style={{ transform: `translateX(-${gameDifficultyLevel * 100}%)` }}>
                <span className="__difficulty">Iniciante</span>
                <span className="__difficulty">Fácil</span>
                <span className="__difficulty">Médio</span>
                <span className="__difficulty">Difícil</span>
                <span className="__difficulty">Mestre</span>
            </div>
            <button id="__next_diff" className="__btn_difficulty_changer" onClick={incrementGameDifficulty}>
                <IconRightArrow />
            </button>
        </div>
    );
};

export default DifficultyChanger;
