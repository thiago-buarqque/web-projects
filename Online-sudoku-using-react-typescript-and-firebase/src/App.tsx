import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithRedirect, User } from "firebase/auth";

import "./styles/App.scss";

import HomePage from "./pages/Home";
import SinglePlayerMatchPage from "./pages/Match/SinglePlayer";
import MultiPlayerMatchPage from "./pages/Match/MultiPlayer";

const MIN_DIFFICULTY_LEVEL = 0;
const MAX_DIFFICULTY_LEVEL = 4;

if (window.localStorage.getItem("dark-mode") === "true") document.documentElement.setAttribute("data-theme", "dark");

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);

export const fireAuth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const usersRef = collection(firestoreDB, "users");
export const matchesRef = collection(firestoreDB, "matches");

const App: React.FC = () => {
    // 0 Beginner
    // 1 Easy
    // 2 Normal
    // 3 Hard
    // 4 Expert
    const [gameDifficultyLevel, setGameDifficultyLevel] = useState(
        Number(window.localStorage.getItem("game-difficulty-level") || "0")
    );
    const [isDarkModeOn, setIsDarkModeOn] = useState(window.localStorage.getItem("dark-mode") === "true");

    const [user, setUser] = useState<User | null>(null);

    const incrementGameDifficulty = () => {
        if (gameDifficultyLevel + 1 <= MAX_DIFFICULTY_LEVEL) {
            setGameDifficultyLevel(gameDifficultyLevel + 1);
        }
    };

    const decrementGameDifficulty = () => {
        if (gameDifficultyLevel - 1 >= MIN_DIFFICULTY_LEVEL) setGameDifficultyLevel(gameDifficultyLevel - 1);
    };

    const toggleDarkMode = () => {
        if (!document.documentElement.getAttribute("data-theme")) {
            document.documentElement.setAttribute("data-theme", "dark");
            window.localStorage.setItem("dark-mode", "true");
            setIsDarkModeOn(true);
        } else {
            document.documentElement.removeAttribute("data-theme");
            setIsDarkModeOn(false);
            window.localStorage.setItem("dark-mode", "false");
        }
    };

    const signInWithGoogle = () => {
        signInWithRedirect(fireAuth, googleProvider);
    };

    const handleAuthStateChange = async (userData: User | null) => {
        if (userData) {
            const userQueryRef = query(usersRef, where("userId", "==", userData.uid));

            const usersSnapshot = await getDocs(userQueryRef);
            if (usersSnapshot.size === 1) setUser(userData);
            else {
                await setDoc(doc(usersRef), {
                    userId: userData.uid,
                    score: {
                        beginner: [],
                        easy: [],
                        medium: [],
                        hard: [],
                        master: [],
                    },
                });
            }
        }
    };

    useEffect(() => {
        fireAuth.onAuthStateChanged(handleAuthStateChange);
        document.title = "Sudoku | by: Thiago Buarque";
    }, []);

    useEffect(() => {
        window.localStorage.setItem("game-difficulty-level", "" + gameDifficultyLevel);
    }, [gameDifficultyLevel]);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            gameDifficultyLevel={gameDifficultyLevel}
                            incrementGameDifficulty={incrementGameDifficulty}
                            decrementGameDifficulty={decrementGameDifficulty}
                            toggleDarkMode={toggleDarkMode}
                            isDarkModeOn={isDarkModeOn}
                            signInWithGoogle={signInWithGoogle}
                            userName={user?.displayName?.split(" ")[0]}
                        />
                    }
                />
                <Route
                    path="/play"
                    element={
                        <SinglePlayerMatchPage
                            isDarkModeOn={isDarkModeOn}
                            toggleDarkMode={toggleDarkMode}
                            gameDifficultyLevel={gameDifficultyLevel}
                            incrementGameDifficulty={incrementGameDifficulty}
                            decrementGameDifficulty={decrementGameDifficulty}
                        />
                    }
                />

                <Route
                    path="/play/:matchId"
                    element={
                        <MultiPlayerMatchPage
                            isDarkModeOn={isDarkModeOn}
                            toggleDarkMode={toggleDarkMode}
                            gameDifficultyLevel={gameDifficultyLevel}
                            incrementGameDifficulty={incrementGameDifficulty}
                            decrementGameDifficulty={decrementGameDifficulty}
                            signInWithGoogle={signInWithGoogle}
                        />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
