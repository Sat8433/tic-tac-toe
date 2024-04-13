document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restart-btn');
    const result = document.getElementById('result');
    const showResultsBtn = document.getElementById('show-results-btn');
    const resultsContainer = document.getElementById('results-container');

    let currentPlayer = 'X';
    let cells = Array.from({ length: 9 }).map(() => '');

    function renderBoard() {
        board.innerHTML = '';
        cells.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value;
            cell.addEventListener('click', () => {
                if (!value && !result.textContent) {
                    cells[index] = currentPlayer;
                    renderBoard();
                    checkWinner();
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            });
            board.appendChild(cell);
        });
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                result.textContent = `${cells[a]} wins!`;
                addResult(`${cells[a]} wins!`);
                return;
            }
        }

        if (!cells.includes('')) {
            result.textContent = "It's a draw!";
            addResult("It's a draw!");
        }
    }

    restartBtn.addEventListener('click', () => {
        cells = Array.from({ length: 9 }).map(() => '');
        currentPlayer = 'X';
        result.textContent = '';
        renderBoard();
    });

    showResultsBtn.addEventListener('click', () => {
        showResults();
    });

    function showResults() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'results.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const results = JSON.parse(xhr.responseText);
                renderResults(results);
            }
        };
        xhr.send();
    }

    function renderResults(results) {
        resultsContainer.innerHTML = '';
        results.forEach((result, index) => {
            const resultElement = document.createElement('div');
            resultElement.textContent = `${index + 1}. ${result}`;
            resultsContainer.appendChild(resultElement);
        });
    }

    renderBoard();

    function addResult(result) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'results.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Result added successfully');
            }
        };
        xhr.send(`result=${result}`);
    }
});
