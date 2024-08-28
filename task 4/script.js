const ROWS = 6;
const COLUMNS = 7;
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');

let board = [];
let currentPlayer = 'red';

function createBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            }
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const col = event.target.dataset.col;
    const row = findEmptyRow(col);
    if (row !== -1) {
        board[row][col] = currentPlayer;
        renderBoard();
        if (checkWin(row, col)) {
            statusElement.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} wins! 🎉`;
            disableBoard();
        } else if (board.flat().every(cell => cell)) {
            statusElement.textContent = "It's a draw! 🤝";
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            statusElement.textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s turn (${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)})`;
        }
    }
}

function findEmptyRow(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            return row;
        }
    }
    return -1;
}

function checkWin(row, col) {
    const directions = [
        { dr: 0, dc: 1 }, // horizontal
        { dr: 1, dc: 0 }, // vertical
        { dr: 1, dc: 1 }, // diagonal down-right
        { dr: 1, dc: -1 } // diagonal down-left
    ];
    const piece = board[row][col];

    for (const { dr, dc } of directions) {
        let count = 1;

        for (let i = 1; i < 4; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            if (r < 0 || r >= ROWS || c < 0 || c >= COLUMNS || board[r][c] !== piece) {
                break;
            }
            count++;
        }

        for (let i = 1; i < 4; i++) {
            const r = row - dr * i;
            const c = col - dc * i;
            if (r < 0 || r >= ROWS || c < 0 || c >= COLUMNS || board[r][c] !== piece) {
                break;
            }
            count++;
        }

        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

resetButton.addEventListener('click', () => {
    createBoard();
    currentPlayer = 'red';
    statusElement.textContent = "Player 1's turn (Red)";
});

createBoard();
