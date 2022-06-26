import React from "react";

import { ReactComponent as Moon } from "../../media/icons/moon.svg";
import { ReactComponent as Sun } from "../../media/icons/sun.svg";
import { ReactComponent as Restart } from "../../media/icons/restart.svg";
import { ReactComponent as Pencil } from "../../media/icons/pencil.svg";
import { ReactComponent as CurvedArrowBack } from "../../media/icons/curved_arrow_back.svg";
import { ReactComponent as Eraser } from "../../media/icons/eraser.svg";

interface props {
    isDarkModeOn: boolean;
    toggleDarkMode: () => void;
    handleKeyPress: (e: KeyboardEvent | number) => void;
    boardMatrix: number[][];
    restorePreviousMatrixState: () => void;
    restartGame: () => void;
    isSettingNotes: boolean;
    setIsSettingNotes: React.Dispatch<React.SetStateAction<boolean>>;
    toggleCellNote: (digit: number) => void;
}

const BoardControls: React.FC<props> = ({
    isDarkModeOn,
    toggleDarkMode,
    handleKeyPress,
    boardMatrix,
    restorePreviousMatrixState,
    restartGame,
    isSettingNotes,
    setIsSettingNotes,
    toggleCellNote,
}) => {
    const countRemainingDigits = (digit: number) => {
        const MAX_QNT_OF_DIGITS = 9;

        let counter = 0;
        boardMatrix.forEach((row) => {
            row.forEach((column) => {
                if (column === digit) counter += 1;
            });
        });

        const result = MAX_QNT_OF_DIGITS - counter;
        if (result < 0) return `+${Math.abs(result)}`;
        else return result;
    };

    return (
        <div id="board_controls">
            <div id="__keypad">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d, i) => (
                    <div
                        key={i}
                        className="__keypad_cell"
                        onClick={isSettingNotes ? () => toggleCellNote(d) : () => handleKeyPress(d)}
                    >
                        <span className="__digit">{d}</span>
                        <span className="__remaining_digit">{countRemainingDigits(d)}</span>
                    </div>
                ))}
                <div className="__keypad_cell" onClick={() => handleKeyPress(0)}>
                    <Eraser />
                </div>
            </div>

            <div id="__controls">
                <button id="dark_mode_switch" onClick={toggleDarkMode} className="__control">
                    {!isDarkModeOn ? <Moon /> : <Sun />}
                </button>
                <div id="__game_controls">
                    <button className="__control" onClick={restartGame}>
                        <Restart />
                    </button>
                    <button className={`__control`} onClick={() => setIsSettingNotes(!isSettingNotes)}>
                        <Pencil className={`${isSettingNotes ? `__setting_user_notes` : ""}`} />
                    </button>
                    <button className="__control" onClick={restorePreviousMatrixState}>
                        <CurvedArrowBack />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoardControls;
