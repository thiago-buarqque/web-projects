import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

import MultiPlayerGameEndPopUp from "../../components/Board/MultiPlayerGameEndPopUp";

import {
    doc,
    DocumentData,
    DocumentReference,
    getDocs,
    onSnapshot,
    query,
    QuerySnapshot,
    setDoc,
    Unsubscribe,
    updateDoc,
    where,
} from "firebase/firestore";

import { fireAuth, matchesRef } from "../../App";

import Board from "../../components/Board";

import { ReactComponent as ArrowBackIcon } from "../../media/icons/arrow_back.svg";

import { Sudoku } from "../../game";
import { formatTime, MatchPageProps, TMatch } from "./matchUtils";

interface props extends MatchPageProps {
    signInWithGoogle: () => void;
}

const MultiPlayerMatchPage: React.FC<props> = ({
    isDarkModeOn,
    toggleDarkMode,
    gameDifficultyLevel,
    incrementGameDifficulty,
    decrementGameDifficulty,
    signInWithGoogle,
}) => {
    const navigator = useNavigate();
    const routerMatch = useMatch("/play/:matchId");

    const [isMatchFinished, setIsMatchFinished] = useState(false);
    const [isMatchHappening, setIsMatchHappening] = useState(false);
    const [isWaitingForRematch, setIsWaitingForRematch] = useState(false);
    const [isUserPlayer1, setIsUserPlayer1] = useState(false);
    const [isOtherPlayerWaitingForRematch, setIsOtherPlayerWaitingForRematch] = useState(false);

    const [otherPlayerName, setOtherPlayerName] = useState(``);
    const [winnerName, setWinnerName] = useState(``);
    
    const [initialBoard, setInitialBoard] = useState<number[][] | undefined>();

    const [timer, setTimer] = useState(-1);
    const timerTimeoutId = useRef<NodeJS.Timeout | null>(null);
    
    const docSnapshotRef = useRef<Unsubscribe | undefined>();
    const matchesQuery = useRef(query(matchesRef, where("matchId", "==", routerMatch?.params.matchId)));
    const isFinishedGameValid = useRef(true);

    const resetTimer = () => {
        if (timerTimeoutId.current) clearTimeout(timerTimeoutId.current);
        timerTimeoutId.current = setTimeout(() => {
            setTimer(0);
        }, 1000);
    };

    const startMatch = useCallback(
        (matchData: TMatch) => {
            setIsMatchFinished(false);
            setIsMatchHappening(true);

            resetTimer();
            if (!initialBoard && matchData.initialBoard !== "") setInitialBoard(JSON.parse(matchData.initialBoard));
        },
        [initialBoard]
    );

    const restartMatch = useCallback((matchData: TMatch) => {
        setIsMatchFinished(false);
        isFinishedGameValid.current = false;
        // Prevent changing popup text to "revanche" before transition has finished
        setTimeout(() => setIsWaitingForRematch(false), 1000);
        setTimeout(() => setIsOtherPlayerWaitingForRematch(false), 1000);

        setInitialBoard(JSON.parse(matchData.initialBoard));
        resetTimer();
    }, []);

    const createMatch = useCallback(() => {
        if (!fireAuth.currentUser || !routerMatch?.params.matchId || !fireAuth.currentUser.displayName) return;

        const data: TMatch = {
            matchId: routerMatch.params.matchId,
            player1: {
                id: fireAuth.currentUser.uid,
                readyToPlay: true,
                displayName: fireAuth.currentUser.displayName,
            },
            player2: {
                id: "",
                readyToPlay: true,
                displayName: "",
            },
            initialBoard: JSON.stringify(new Sudoku().generateSolvedSudoku(gameDifficultyLevel)),
            matchHappening: false,
            matchFinished: false,
            winner: {
                displayName: "",
                id: "",
            },
            matchTime: 0,
        };
        setDoc(doc(matchesRef), data);
    }, [gameDifficultyLevel, routerMatch?.params.matchId]);

    const addPlayer2ToMatch = (docRef: DocumentReference<DocumentData>, matchData: TMatch) => {
        if (!fireAuth.currentUser) return;

        updateDoc(docRef, {
            player1: {
                id: matchData.player1.id,
                readyToPlay: false,
                displayName: matchData.player1.displayName,
            },
            player2: {
                id: fireAuth.currentUser.uid,
                readyToPlay: false,
                displayName: fireAuth.currentUser.displayName,
            },
            matchHappening: true,
        });
    };

    const verifyMatchStatus = useCallback(async () => {
        if (!fireAuth.currentUser) signInWithGoogle();

        const matchesSnapshot = await getDocs(matchesQuery.current);

        if (matchesSnapshot.size === 0) createMatch();
        else {
            matchesSnapshot.forEach(async (match) => {
                if (!fireAuth.currentUser) return;

                const matchData: TMatch = JSON.parse(JSON.stringify(match.data()));

                // Update match status with player2 that just joined
                if (matchData.player2.id === "" && fireAuth.currentUser.uid !== matchData.player1.id) {
                    addPlayer2ToMatch(match.ref, matchData);
                } else if (matchData.matchFinished && matchData.player1.id !== "" && matchData.player2.id !== "") {
                    setIsMatchFinished(true);

                    setInitialBoard(undefined);
                    setInitialBoard(JSON.parse(matchData.initialBoard));
                    setTimer(matchData.matchTime);
                }
            });
        }
    }, [createMatch, signInWithGoogle]);

    const finishMatch = useCallback(async () => {
        const matches = await getDocs(matchesQuery.current);

        matches.forEach((match) => {
            if (!fireAuth.currentUser?.displayName) return;

            const matchData: TMatch = JSON.parse(JSON.stringify(match.data()));
            if (matchData.winner.id === "" && isFinishedGameValid.current) {
                setWinnerName(fireAuth.currentUser.displayName);
                updateDoc(match.ref, {
                    winner: {
                        id: fireAuth.currentUser.uid,
                        displayName: fireAuth.currentUser.displayName,
                    },
                    matchHappening: false,
                    matchFinished: true,
                    matchTime: timer,
                });
            }
        });
    }, [timer]);

    const handleRematch = useCallback(
        (docRef: DocumentReference<DocumentData>, matchData: TMatch) => {
            if (matchData.player1.id === fireAuth.currentUser?.uid) {
                updateDoc(docRef, {
                    player1: {
                        id: matchData.player1.id,
                        readyToPlay: false,
                        displayName: matchData.player1.displayName,
                    },
                    player2: {
                        id: matchData.player2.id,
                        readyToPlay: false,
                        displayName: matchData.player2.displayName,
                    },
                    initialBoard: JSON.stringify(new Sudoku().generateSolvedSudoku(gameDifficultyLevel)),
                    matchHappening: true,
                    matchFinished: false,
                    winner: {
                        id: "",
                        displayName: "",
                    },
                });
            }
        },
        [gameDifficultyLevel]
    );

    const handleGameEnd = useCallback(() => {
        setIsMatchFinished(true);
        finishMatch();
    }, [finishMatch]);

    const handleMatchFinish = useCallback(
        (matchData: TMatch) => {
            if (matchData.winner.id !== "") {
                handleGameEnd();
                if (matchData.winner.id && matchData.winner.id !== fireAuth.currentUser?.uid) {
                    isFinishedGameValid.current = false;
                    setWinnerName(matchData.winner.displayName.split(" ")[0]);
                }
            }
        },
        [handleGameEnd]
    );

    const handleOtherPlayerName = useCallback(
        (matchData: TMatch) => {
            if (matchData.player1.id !== "" && matchData.player2.id !== "" && otherPlayerName === "") {
                if (matchData.player1.id === fireAuth.currentUser?.uid)
                    setOtherPlayerName(matchData.player2.displayName.split(" ")[0]);
                else if (matchData.player2.id === fireAuth.currentUser?.uid)
                    setOtherPlayerName(matchData.player1.displayName.split(" ")[0]);
            }
        },
        [otherPlayerName]
    );

    const handleIsOtherPlayerWaitingForRematch = useCallback(
        (matchData: TMatch) => {
            if (matchData.player1.id === fireAuth.currentUser?.uid) {
                if (matchData.player2.readyToPlay) {
                    setIsOtherPlayerWaitingForRematch(true);
                } else if (isOtherPlayerWaitingForRematch)
                    setTimeout(() => setIsOtherPlayerWaitingForRematch(false), 1000);
            }

            if (matchData.player2.id === fireAuth.currentUser?.uid) {
                if (matchData.player1.readyToPlay) setIsOtherPlayerWaitingForRematch(true);
                else if (isOtherPlayerWaitingForRematch)
                    setTimeout(() => setIsOtherPlayerWaitingForRematch(false), 1000);
            }
        },
        [isOtherPlayerWaitingForRematch]
    );

    const handleDocChange = useCallback(
        (doc: QuerySnapshot<DocumentData>) => {
            doc.forEach((d) => {
                const matchData: TMatch = JSON.parse(JSON.stringify(d.data()));
                if (matchData.matchHappening) {
                    if (!isMatchHappening && !isWaitingForRematch) startMatch(matchData);
                    else if (isMatchFinished && isWaitingForRematch) restartMatch(matchData);
                } else if (matchData.matchFinished && matchData.player1.readyToPlay && matchData.player2.readyToPlay) {
                    handleRematch(d.ref, matchData);
                } else if (matchData.matchFinished) {
                    handleMatchFinish(matchData);
                }

                if (matchData.player1.id === fireAuth.currentUser?.uid && !isUserPlayer1) setIsUserPlayer1(true);

                handleIsOtherPlayerWaitingForRematch(matchData);
                handleOtherPlayerName(matchData);
            });
        },
        [
            handleIsOtherPlayerWaitingForRematch,
            handleMatchFinish,
            handleOtherPlayerName,
            handleRematch,
            isMatchFinished,
            isMatchHappening,
            isUserPlayer1,
            isWaitingForRematch,
            restartMatch,
            startMatch,
        ]
    );

    const askForRematch = async () => {
        const matchesSnapshot = await getDocs(matchesQuery.current);

        matchesSnapshot.forEach((match) => {
            if (!fireAuth.currentUser) return;

            const matchData: TMatch = JSON.parse(JSON.stringify(match.data()));

            if (matchData.player1.id === fireAuth.currentUser.uid)
                updateDoc(match.ref, {
                    player1: {
                        id: matchData.player1.id,
                        readyToPlay: true,
                        displayName: matchData.player1.displayName,
                    },
                });
            else if (matchData.player2.id === fireAuth.currentUser.uid)
                updateDoc(match.ref, {
                    player2: {
                        id: matchData.player2.id,
                        readyToPlay: true,
                        displayName: matchData.player2.displayName,
                    },
                });

            if (!isWaitingForRematch) setIsWaitingForRematch(true);
        });
    };

    useEffect(() => {
        if (!isMatchFinished)
            timerTimeoutId.current = setTimeout(() => {
                setTimer(timer + 1000);
            }, 1000);
        else if (timerTimeoutId.current) clearTimeout(timerTimeoutId.current);
    }, [timer, isMatchFinished]);

    useEffect(() => {
        fireAuth.onAuthStateChanged(verifyMatchStatus);
    }, [verifyMatchStatus]);

    useEffect(() => {
        if (routerMatch) {
            if (docSnapshotRef.current) docSnapshotRef.current();
            docSnapshotRef.current = onSnapshot(matchesQuery.current, handleDocChange);
        }
    }, [handleDocChange, routerMatch]);

    useEffect(() => {
        document.title = "Sudoku | Multiplayer";
    }, []);

    if (!isMatchFinished && !initialBoard)
        return (
            <div id="match_page" className="__fade_in_page">
                <p style={{ textAlign: "center", fontSize: "18px" }}>Aguardando outro jogador...</p>
                <button onClick={() => navigator("/")} style={{ textDecoration: "underline" }}>
                    Voltar para o menu
                </button>
            </div>
        );

    return (
        <div id="match_page" className="__fade_in_page">
            <MultiPlayerGameEndPopUp
                gameDifficultyLevel={gameDifficultyLevel}
                incrementGameDifficulty={incrementGameDifficulty}
                decrementGameDifficulty={decrementGameDifficulty}
                newGame={askForRematch}
                isFinishedGameValid={isFinishedGameValid.current}
                matchTime={formatTime(timer)}
                isGameFinished={isMatchFinished}
                winnerName={winnerName}
                isWaitingForRematch={isWaitingForRematch}
                isOtherPlayerWaitingForRematch={isOtherPlayerWaitingForRematch}
                otherPlayerName={otherPlayerName}
                isUserPlayer1={isUserPlayer1}
            />
            <div id="match_header">
                <button id="__back_btn" onClick={() => navigator("/")}>
                    <ArrowBackIcon />
                </button>
                <span id="__timer">{formatTime(timer)}</span>
                <div id="__match_info">
                    <span id="multiplayer_flag">Multiplayer</span>
                    <span>{`${fireAuth.currentUser?.displayName?.split(" ")[0]} vs ${otherPlayerName}`}</span>
                </div>
            </div>
            <Board
                isDarkModeOn={isDarkModeOn}
                toggleDarkMode={toggleDarkMode}
                gameDifficultyLevel={gameDifficultyLevel}
                handleGameEnd={handleGameEnd}
                setIsFinishedGameValid={(state: boolean) => (isFinishedGameValid.current = state)}
                matchInitialBoard={initialBoard}
            />
        </div>
    );
};

export default MultiPlayerMatchPage;
