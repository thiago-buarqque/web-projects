// Code made based on https://medium.com/analytics-vidhya/sudoku-backtracking-algorithm-and-visualization-75adec8e860c
export class Sudoku {
    solutionsCounter: number;
    constructor() {
        this.solutionsCounter = 0;
    }

    validateBlock = (matrix: number[][], i: number, j: number, num: number) => {
        let initialLine = i;
        while (initialLine % 3 > 0) {
            initialLine -= 1;
        }

        let initialColumn = j;
        while (initialColumn % 3 > 0) {
            initialColumn -= 1;
        }

        for (let line = initialLine; line <= initialLine + 2; line += 1) {
            for (let column = initialColumn; column <= initialColumn + 2; column += 1) {
                if (matrix[line][column] === num && line !== i && column !== j) {
                    return false;
                }
            }
        }

        return true;
    };

    validateRow = (matrix: number[][], i: number, j: number, num: number) => {
        for (let column = 0; column < matrix[i].length; column += 1)
            if (matrix[i][column] === num && column !== j) {
                return false;
            }

        return true;
    };

    validateColumn = (matrix: number[][], i: number, j: number, num: number) => {
        for (let row = 0; row < matrix.length; row += 1)
            if (matrix[row][j] === num && row !== i) {
                return false;
            }

        return true;
    };

    isCellValid = (matrix: number[][], i: number, j: number, num: number) => {
        const isBlockValid = this.validateBlock(matrix, i, j, num);
        const isRowValid = this.validateRow(matrix, i, j, num);
        const isColumnValid = this.validateColumn(matrix, i, j, num);

        return isBlockValid && isRowValid && isColumnValid;
    };

    isSudokuValid = (matrix: number[][]) => {
        for (let i = 0; i < matrix.length; i += 1) {
            for (let j = 0; j < matrix[i].length; j += 1) {
                if (!this.isCellValid(matrix, i, j, matrix[i][j])) return false;
            }
        }
        return true;
    };

    countSolutions = (matrix: number[][], i: number, j: number) => {
        const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (j > 8) {
            j = 0;
            i += 1;
            if (i > 8) {
                this.solutionsCounter += 1;
                return;
            }
        }

        // Skips cell if the cell already has a number
        if (matrix[i][j] !== 0) {
            this.countSolutions(matrix, i, j + 1);
        } else {
            // Solving for the cell if the cell is empty
            for (let k = 0; k < NUMBERS.length; k += 1) {
                const num = NUMBERS[k];
                if (this.isCellValid(matrix, i, j, num)) {
                    matrix[i][j] = num;
                    // Moving to next cell
                    this.countSolutions(matrix, i, j + 1);

                    // If the current validated number fails reset the cell
                    matrix[i][j] = 0;
                    if (this.solutionsCounter > 1) return;
                }
            }
        }
        return false;
    };

    generateSudoku = (matrix: number[][], i: number, j: number) => {
        const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (j > 8) {
            j = 0;
            i += 1;
            if (i > 8) return true;
        }

        // Skips cell if the cell has already a number
        if (matrix[i][j] !== 0) {
            if (this.generateSudoku(matrix, i, j + 1)) return true;
        } else {
            // Solving for the cell if the cell is empty
            this.shuffleArray(NUMBERS);
            for (let k = 0; k < NUMBERS.length; k += 1) {
                const num = NUMBERS[k];
                if (this.isCellValid(matrix, i, j, num)) {
                    matrix[i][j] = num;
                    // Moving to next cell
                    if (this.generateSudoku(matrix, i, j + 1)) return true;

                    // If the current validated number fails reset the cell
                    matrix[i][j] = 0;
                }
            }
        }
        return false;
    };

    generateSolvedSudoku = (difficulty = 0) => {
        const matrix: number[][] = [];
        for (let i = 0; i < 9; i += 1) matrix.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);

        this.generateSudoku(matrix, 0, 0);

        let elementsToBeRemoved = 0;
        switch (difficulty) {
            case 0:
                elementsToBeRemoved = Math.floor(Math.random() * (28 - 24 + 1) + 24);
                break;
            case 1:
                elementsToBeRemoved = Math.floor(Math.random() * (30 - 27 + 1) + 27);
                break;
            case 2:
                elementsToBeRemoved = Math.floor(Math.random() * (40 - 32 + 1) + 32);
                break;
            case 3:
                elementsToBeRemoved = Math.floor(Math.random() * (49 - 42 + 1) + 42);
                break;
            case 4:
                elementsToBeRemoved = Math.floor(Math.random() * (50 - 50 + 1) + 50);
                break;
            default:
                elementsToBeRemoved = 30;
                break;
        }
        while (elementsToBeRemoved > 0) {
            const row = Math.floor(Math.random() * matrix.length);
            const column = Math.floor(Math.random() * matrix[0].length);

            if (matrix[row][column] !== 0) {
                const backupValue = matrix[row][column];
                matrix[row][column] = 0;

                this.countSolutions(JSON.parse(JSON.stringify(matrix)), 0, 0);
                if (this.solutionsCounter > 1) matrix[row][column] = backupValue;
                else elementsToBeRemoved -= 1;
                this.solutionsCounter = 0;
            }
        }

        return matrix;
    };

    shuffleArray = (array: number[]) => {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    };
}
