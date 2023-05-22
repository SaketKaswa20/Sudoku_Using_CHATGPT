// Sudoku board representation
const board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Generate a Sudoku board with input cells
function generateBoard() {
    const table = document.getElementById('sudoku-board');

    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const value = board[i][j];
            cell.textContent = value === 0 ? '' : value;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Clear the Sudoku board
function clearBoard() {
    const table = document.getElementById('sudoku-board');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

// Reset the Sudoku board
function resetBoard() {
    clearBoard();
    generateBoard();
}

// Check if the number is valid in the given row
function isValidInRow(row, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }
    return true;
}

// Check if the number is valid in the given column
function isValidInColumn(col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }
    return true;
}

// Check if the number is valid in the given 3x3 grid
function isValidInGrid(row, col, num) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

// Check if the number is valid at the given position
function isValidMove(row, col, num) {
    return (
        isValidInRow(row, num) &&
        isValidInColumn(col, num) &&
        isValidInGrid(row, col, num)
    );
}

// Handle user input
function handleCellClick(event) {
    const cell = event.target;
    const row = cell.parentNode.rowIndex;
    const col = cell.cellIndex;

    // Get user input
    const userInput = parseInt(prompt('Enter a number (1-9):'));
    if (isNaN(userInput) || userInput < 1 || userInput > 9) {
        alert('Invalid input! Please enter a number from 1 to 9.');
        return;
    }

    // Validate user input
    if (!isValidMove(row, col, userInput)) {
        cell.classList.add('error');
        alert('Invalid move! The number conflicts with the existing board.');
        return;
    }

    // Update the board
    board[row][col] = userInput;
    cell.textContent = userInput;

    // Check if the game is won
    if (isGameWon()) {
        alert('Congratulations! You have solved the puzzle.');
        document.getElementById('new-game-btn').disabled = false;
    }
}

// Check if the game is won
function isGameWon() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

// Initialize the game
function initializeGame() {
    generateBoard();

    // Add event listeners to cells
    const cells = document.getElementsByTagName('td');
    for (const cell of cells) {
        cell.addEventListener('click', handleCellClick);
    }

    // Add event listener to new game button
    const newGameBtn = document.getElementById('new-game-btn');
    newGameBtn.addEventListener('click', resetBoard);
}

// Start the game
initializeGame();
