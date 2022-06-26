import React, { useCallback, useEffect, useRef, useState } from "react";

import { Sudoku } from "../../game";
import BoardControls from "../BoardControls";

const emptyBoardMatrix: number[][] = [];
for (let i = 0; i < 9; i += 1) emptyBoardMatrix.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);

const emptyBoardNotesMatrix: number[][][] = [];
for (let i = 0; i < 9; i += 1) emptyBoardNotesMatrix.push([[], [], [], [], [], [], [], [], []]);

const sudoku = new Sudoku();
interface props {
    isDarkModeOn: boolean;
    toggleDarkMode: () => void;
    gameDifficultyLevel: number;
    handleGameEnd: () => void;
    setIsFinishedGameValid: (state: boolean) => void;
    createNewGame?: boolean;
    setCreateNewGame?: React.Dispatch<React.SetStateAction<boolean>>;
    matchInitialBoard?: number[][];
}

const Board: React.FC<props> = ({
    isDarkModeOn,
    toggleDarkMode,
    gameDifficultyLevel,
    handleGameEnd,
    setIsFinishedGameValid,
    createNewGame,
    setCreateNewGame,
    matchInitialBoard,
}) => {
    const [boardMatrix, setBoardMatrix] = useState<number[][]>(
        JSON.parse(JSON.stringify(matchInitialBoard || emptyBoardMatrix))
    );
    const [userNotes, setUserNotes] = useState<number[][][]>(JSON.parse(JSON.stringify(emptyBoardNotesMatrix)));
    const [isSettingNotes, setIsSettingNotes] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const initialBoard = useRef<number[][]>(
        matchInitialBoard ? JSON.parse(JSON.stringify(matchInitialBoard)) : emptyBoardMatrix
    );

    // Initial game digits that can't be replaced
    const invalidPositions = useRef<number[][]>([]);
    const secondaryCellsMaxDelay = useRef(0);
    const currentCell = useRef<{ x: number; y: number } | null>(null);
    const currentSelectedDigit = useRef(-1);
    const matchStack = useRef<number[][][]>([initialBoard.current]);

    const isInvalidPosition = (x: number, y: number) => {
        return invalidPositions.current.some((coords) => coords[0] === x && coords[1] === y);
    };

    const removeHighlightedSecondaryCells = () => {
        const secondaryCells = document.querySelectorAll(".__secondary_selected_cell");
        if (secondaryCells) {
            for (let i = 0; i < secondaryCells.length; i += 1) {
                secondaryCells[i].classList.remove("__secondary_selected_cell");
            }
        }
    };

    const highlightSecondaryCells = useCallback(
        (value: number, applyDelay = true) => {
            const MAX_DELAY = 350;
            for (let i = 0; i < boardMatrix.length; i += 1) {
                for (let j = 0; j < boardMatrix[0].length; j += 1) {
                    if (boardMatrix[i][j] === value) {
                        const secondaryCell = document.querySelector(`.__cell#cell_${i}_${j}`);

                        if (applyDelay) {
                            let delay = Math.random() * 1000;
                            if (delay > MAX_DELAY) delay = MAX_DELAY;
                            if (delay > secondaryCellsMaxDelay.current) secondaryCellsMaxDelay.current = delay;
                            setTimeout(
                                () => {
                                    if (delay === secondaryCellsMaxDelay.current) secondaryCellsMaxDelay.current = 0;

                                    if (!secondaryCell?.classList.contains("__selected_cell"))
                                        secondaryCell?.classList.add("__secondary_selected_cell");
                                },
                                delay > MAX_DELAY ? MAX_DELAY : delay
                            );
                        } else if (currentCell.current && (currentCell.current.x !== i || currentCell.current.y !== j))
                            secondaryCell?.classList.add("__secondary_selected_cell");
                    }
                }
            }
        },
        [boardMatrix]
    );

    const removeSelectedCell = () => {
        const currentSelectedCell = document.getElementsByClassName("__selected_cell");
        if (currentSelectedCell) {
            for (let i = 0; i < currentSelectedCell.length; i++)
                currentSelectedCell[i].classList.remove("__selected_cell");
        }
    };

    const stackCurrentMatrix = useCallback(
        () => matchStack.current.push(JSON.parse(JSON.stringify(boardMatrix))),
        [boardMatrix]
    );

    const restorePreviousMatrixState = () => {
        const currState = boardMatrix;
        const prevState = matchStack.current.pop();
        if (prevState) {
            setBoardMatrix(prevState);

            // Remove invalid cell highlight in case the prev state doesn't have it
            currState.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (!sudoku.isCellValid(currState, i, j, cell) && prevState[i][j] !== cell) {
                        const cell = document.getElementById(`cell_${i}_${j}`);
                        cell?.classList.remove("__invalid_cell");
                    }
                });
            });
        }
    };

    const checkGameFinish = useCallback(
        (boardMatrix: number[][]) => {
            let matrixFilled = !boardMatrix.some((row) => row.some((col) => col === 0));

            if (matrixFilled && !createNewGame && !isGameFinished) {
                handleGameEnd();
                if (sudoku.isSudokuValid(boardMatrix)) {
                    setIsFinishedGameValid(true);
                } else {
                    setIsFinishedGameValid(false);
                }
                setIsGameFinished(true);
            }
        },
        [createNewGame, handleGameEnd, isGameFinished, setIsFinishedGameValid]
    );

    const restartGame = () => {
        if (initialBoard.current) {
            setBoardMatrix(initialBoard.current);
            matchStack.current = [initialBoard.current];
        }
    };

    const toggleCellNote = (digit: number) => {
        if (currentCell.current && boardMatrix[currentCell.current.x][currentCell.current.y] === 0) {
            const auxUserNotes: number[][][] = JSON.parse(JSON.stringify(userNotes));
            const cellNotes = auxUserNotes[currentCell.current.x][currentCell.current.y];

            if (!cellNotes.includes(digit)) {
                cellNotes.push(digit);
            } else {
                cellNotes.splice(cellNotes.indexOf(digit), 1);
            }

            // Sort numbers by asceding order
            cellNotes.sort(function (a, b) {
                return a - b;
            });

            setUserNotes(auxUserNotes);
        }
    };

    const handleCellClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (secondaryCellsMaxDelay.current > 0) return; // Prevent new cell selection before cells secondary animations end

        removeSelectedCell();

        e.currentTarget.classList.remove("__secondary_selected_cell");
        e.currentTarget.classList.add("__selected_cell");

        const cellCoordX = e.currentTarget.getAttribute("cell-coord-x");
        const cellCoordY = e.currentTarget.getAttribute("cell-coord-y");
        if (cellCoordX && cellCoordY) {
            currentCell.current = { x: Number(cellCoordX), y: Number(cellCoordY) };
            const actualValue = boardMatrix[Number(cellCoordX)][Number(cellCoordY)];

            if (actualValue !== 0 && currentSelectedDigit.current !== actualValue) {
                removeHighlightedSecondaryCells();
                highlightSecondaryCells(actualValue);
                currentSelectedDigit.current = actualValue;
            } else if (actualValue !== 0 && currentSelectedDigit.current === actualValue) {
                highlightSecondaryCells(actualValue, false);
            } else if (currentSelectedDigit.current !== -1) {
                highlightSecondaryCells(currentSelectedDigit.current, false);
            }
        }
    };

    const handleKeyPress = useCallback(
        (e: KeyboardEvent | number) => {
            if (isSettingNotes && e !== 0) return;

            try {
                let pressedDigit;
                if (typeof e !== "number") pressedDigit = Number(e.key);
                else pressedDigit = e;

                const selectedCell = document.querySelector(".__selected_cell");
                const selectedCellSpan = document.querySelector(".__selected_cell span");
                if (selectedCell && selectedCellSpan) {
                    let cellCoordX = selectedCell.getAttribute("cell-coord-x");
                    let cellCoordY = selectedCell.getAttribute("cell-coord-y");

                    if (cellCoordX && cellCoordY) {
                        let boardAux = JSON.parse(JSON.stringify(boardMatrix));
                        if (isInvalidPosition(Number(cellCoordX), Number(cellCoordY))) return;
                        else if (pressedDigit >= 1 && pressedDigit <= 9) {
                            if (
                                !sudoku.isCellValid(boardMatrix, Number(cellCoordX), Number(cellCoordY), pressedDigit)
                            ) {
                                if (pressedDigit !== currentSelectedDigit.current) {
                                    removeHighlightedSecondaryCells();
                                    highlightSecondaryCells(pressedDigit);
                                    currentSelectedDigit.current = pressedDigit;
                                }

                                selectedCell.classList.add("__invalid_cell");
                            } else {
                                if (pressedDigit !== currentSelectedDigit.current) {
                                    removeHighlightedSecondaryCells();
                                    highlightSecondaryCells(pressedDigit);
                                    currentSelectedDigit.current = pressedDigit;
                                }
                                selectedCell.classList.remove("__invalid_cell");
                            }
                            stackCurrentMatrix();
                            boardAux[Number(cellCoordX)][Number(cellCoordY)] = pressedDigit;
                        } else if (pressedDigit === 0) {
                            stackCurrentMatrix();
                            boardAux[Number(cellCoordX)][Number(cellCoordY)] = 0;
                            const auxUserNotes = JSON.parse(JSON.stringify(userNotes));
                            auxUserNotes[Number(cellCoordX)][Number(cellCoordY)] = [];

                            setUserNotes(auxUserNotes);
                            selectedCell.classList.remove("__invalid_cell");
                        }
                        const auxUserNotes = JSON.parse(JSON.stringify(userNotes));
                        auxUserNotes[Number(cellCoordX)][Number(cellCoordY)] = [];
                        setUserNotes(auxUserNotes);

                        setBoardMatrix(boardAux);
                    }
                }
            } catch (error) {}
        },
        [boardMatrix, highlightSecondaryCells, isSettingNotes, stackCurrentMatrix, userNotes]
    );

    const removeCellsHighlight = useCallback((e: any | undefined) => {
        if (
            e === undefined ||
            (!e.target.classList.contains("__cell") &&
                !e.target.classList.contains("__keypad_cell") &&
                !e.target.classList.contains("__control") &&
                !e.target.classList.contains("__block") &&
                e.target.getAttribute("id") !== "board")
        ) {
            removeSelectedCell();
            removeHighlightedSecondaryCells();
            currentSelectedDigit.current = -1;
            currentCell.current = null;
        }
    }, []);

    const setInvalidPositions = (matrix: number[][]) => {
        invalidPositions.current = [];
        matrix.forEach((row, i) =>
            row.forEach((value, j) => {
                if (value !== 0) invalidPositions.current.push([i, j]);
            })
        );
    };

    const newGame = useCallback(() => {
        if (!matchInitialBoard) {
            const matrix = sudoku.generateSolvedSudoku(gameDifficultyLevel);
            initialBoard.current = matrix;
            setBoardMatrix(matrix);
            removeCellsHighlight(undefined);

            setInvalidPositions(matrix);
            if (createNewGame && setCreateNewGame) setCreateNewGame(false);
        } else if (boardMatrix.length > 0) setInvalidPositions(boardMatrix);
        setIsGameFinished(false);
    }, [boardMatrix, createNewGame, gameDifficultyLevel, matchInitialBoard, removeCellsHighlight, setCreateNewGame]);

    const checkBoardErrors = useCallback((board: number[][]) => {
        board.forEach((row, i) =>
            row.forEach((cell, j) => {
                if (cell === 0) return;
                const domCell = document.querySelector(`#cell_${i}_${j}`);

                if (!sudoku.isCellValid(board, i, j, cell) && !domCell?.classList.contains("__invalid_cel"))
                    domCell?.classList.add("__invalid_cell");
                else if (domCell?.classList.contains("__invalid_cell")) domCell?.classList.remove("__invalid_cell");
            })
        );
    }, []);

    useEffect(() => {
        if (createNewGame) newGame();

        window.onclick = removeCellsHighlight;
    }, [createNewGame, newGame, removeCellsHighlight]);

    useEffect(() => {
        if (matchInitialBoard) {
            setBoardMatrix(matchInitialBoard);
            initialBoard.current = matchInitialBoard;
            setInvalidPositions(matchInitialBoard);
            setIsGameFinished(false);
        }
    }, [matchInitialBoard]);

    useEffect(() => {
        window.onkeyup = null;
        window.onkeyup = handleKeyPress;
    }, [handleKeyPress]);

    useEffect(() => {
        checkGameFinish(boardMatrix);
        checkBoardErrors(JSON.parse(JSON.stringify(boardMatrix)));
    }, [boardMatrix, checkBoardErrors, checkGameFinish]);

    return (
        <div id="board_parent">
            <div id="board">
                <div id="__horizontal_line_1" className="board_line horizontal_line" style={{ gridArea: "hl1" }}></div>
                <div id="__horizontal_line_2" className="board_line horizontal_line" style={{ gridArea: "hl2" }}></div>

                <div id="__vertical_line_11" className="board_line" style={{ gridArea: "vl11" }}></div>
                <div id="__vertical_line_12" className="board_line middle_line" style={{ gridArea: "vl12" }}></div>
                <div id="__vertical_line_13" className="board_line" style={{ gridArea: "vl13" }}></div>

                <div id="__vertical_line_21" className="board_line" style={{ gridArea: "vl21" }}></div>
                <div id="__vertical_line_22" className="board_line middle_line" style={{ gridArea: "vl22" }}></div>
                <div id="__vertical_line_23" className="board_line" style={{ gridArea: "vl23" }}></div>

                {boardMatrix.map((r, i) => {
                    let blockInitialColumn = 0;
                    let blockInitialRow = 0;
                    if (i >= 3 && i <= 5) blockInitialRow = 3;
                    else if (i >= 6 && i <= 8) blockInitialRow = 6;

                    if (i === 1 || i === 4 || i === 7) blockInitialColumn = 3;
                    if (i === 2 || i === 5 || i === 8) blockInitialColumn = 6;

                    return (
                        <div
                            key={i}
                            id={`block_${i + 1}`}
                            className="__block"
                            // style={{ gridArea: `"b${i + 1}"` }}
                        >
                            {boardMatrix.map((c, j) => {
                                let row = blockInitialRow;
                                if (j >= 3 && j <= 5) row = row + 1;
                                else if (j >= 6 && j <= 8) row = row + 2;

                                if (row > 8) row = 8;

                                let column = blockInitialColumn + (j % 3);

                                return (
                                    <div
                                        key={j}
                                        id={`cell_${row}_${column}`}
                                        className="__cell"
                                        // style={{ gridArea: `"c${j + 1}"` }}
                                        cell-value={boardMatrix[row][column]}
                                        cell-coord-x={`${row}`}
                                        cell-coord-y={`${column}`}
                                        onClick={handleCellClick}
                                    >
                                        <div className="__cell_notes">
                                            {userNotes[row][column].length > 0
                                                ? userNotes[row][column].map((note, i) => <span key={i}>{note}</span>)
                                                : ``}
                                        </div>
                                        <span>{boardMatrix[row][column] !== 0 ? boardMatrix[row][column] : ` `}</span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <BoardControls
                isDarkModeOn={isDarkModeOn}
                toggleDarkMode={toggleDarkMode}
                handleKeyPress={handleKeyPress}
                boardMatrix={boardMatrix}
                restorePreviousMatrixState={restorePreviousMatrixState}
                restartGame={restartGame}
                isSettingNotes={isSettingNotes}
                setIsSettingNotes={setIsSettingNotes}
                toggleCellNote={toggleCellNote}
            />
        </div>
    );
};

export default Board;
