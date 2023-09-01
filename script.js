//your JS code here. If required.

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit");
    const startDiv = document.getElementById("start");
    const gameDiv = document.getElementById("game");
    const messageDiv = document.querySelector(".message");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;

    submitButton.addEventListener("click", startGame);

    function startGame() {
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();

        if (player1Name !== "" && player2Name !== "") {
            startDiv.style.display = "none";
            gameDiv.style.display = "block";
            messageDiv.textContent = `${player1Name}, you're up!`;

            cells.forEach(cell => {
                cell.addEventListener("click", cellClick);
            });
        } else {
            alert("Please enter names for both players.");
        }
    }

    function cellClick(event) {
        const cell = event.target;
        const cellIndex = cell.id - 1;

        if (gameBoard[cellIndex] === "" && !gameOver) {
            cell.textContent = currentPlayer;
            gameBoard[cellIndex] = currentPlayer;
            checkWin();
            togglePlayer();
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        messageDiv.textContent = `${currentPlayer === "X" ? player1Input.value : player2Input.value}, you're up!`;
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                messageDiv.textContent = `${currentPlayer === "X" ? player1Input.value : player2Input.value}, congratulations, you won!`;
                gameOver = true;
            }
        }

        if (!gameBoard.includes("") && !gameOver) {
            messageDiv.textContent = "It's a draw!";
            gameOver = true;
        }
    }
});
