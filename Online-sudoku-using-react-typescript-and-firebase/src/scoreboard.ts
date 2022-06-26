const MAX_SCOREBOARD_SIZE = 10;

export type TScore = {
    gameDate: string;
    gameTime: number;
};

export const addGameScore = (time: number, difficultyLevel: number) => {
    const gameDate = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" })
        .format(new Date())
        .split(" de ")
        .join(" ");

    let gameScore: TScore = { gameDate: gameDate, gameTime: time };

    let scoreboardStorageName = getScoreboardStorageName(difficultyLevel);

    let strOldScoreboard = window.localStorage.getItem(scoreboardStorageName);
    if (strOldScoreboard) {
        let newScoreboard: TScore[] = JSON.parse(strOldScoreboard);
        newScoreboard.push(gameScore);
        sortScoreboardByAscendingOrder(newScoreboard);

        if (newScoreboard.length > MAX_SCOREBOARD_SIZE) newScoreboard = newScoreboard.slice(0, -1);
        window.localStorage.setItem(scoreboardStorageName, JSON.stringify(newScoreboard));
    } else {
        window.localStorage.setItem(scoreboardStorageName, JSON.stringify([gameScore]));
    }
};

export const getLevelScoreboard = (difficultyLevel: number) => {
    let scoreboardStorageName = getScoreboardStorageName(difficultyLevel);
    let data = window.localStorage.getItem(scoreboardStorageName);
    if (data) {
        const scoreboard: TScore[] = JSON.parse(data);
        return scoreboard;
    }
    return null;
};

const getScoreboardStorageName = (difficultyLevel: number) => {
    let scoreboardStorageName = "";
    switch (difficultyLevel) {
        case 0:
            scoreboardStorageName = "scoreboard-beginner";
            break;
        case 1:
            scoreboardStorageName = "scoreboard-easy";
            break;
        case 2:
            scoreboardStorageName = "scoreboard-medium";
            break;
        case 3:
            scoreboardStorageName = "scoreboard-hard";
            break;
        case 4:
            scoreboardStorageName = "scoreboard-master";
            break;
    }
    return scoreboardStorageName;
};

const sortScoreboardByAscendingOrder = (scoreboard: TScore[]) => {
    scoreboard.sort((a, b) => a.gameTime - b.gameTime);
};
