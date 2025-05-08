// Számológép (Calculator) alkalmazás
function Calculator() {
    const [input, setInput] = React.useState("");

    const handleClick = (value) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput("");
    };

    const handleCalculate = () => {
        try {
            setInput(eval(input));
        } catch (error) {
            setInput("Hiba");
        }
    };

    return (
        <div>
            <h2>Számológép</h2>
            <div>
                <input type="text" value={input} readOnly />
            </div>
            <div>
                <button onClick={() => handleClick("1")}>1</button>
                <button onClick={() => handleClick("2")}>2</button>
                <button onClick={() => handleClick("3")}>3</button>
                <button onClick={() => handleClick("+")}>+</button>
            </div>
            <div>
                <button onClick={() => handleClick("4")}>4</button>
                <button onClick={() => handleClick("5")}>5</button>
                <button onClick={() => handleClick("6")}>6</button>
                <button onClick={() => handleClick("-")}>-</button>
            </div>
            <div>
                <button onClick={() => handleClick("7")}>7</button>
                <button onClick={() => handleClick("8")}>8</button>
                <button onClick={() => handleClick("9")}>9</button>
                <button onClick={() => handleClick("*")}>*</button>
            </div>
            <div>
                <button onClick={() => handleClick("0")}>0</button>
                <button onClick={handleClear}>C</button>
                <button onClick={handleCalculate}>=</button>
                <button onClick={() => handleClick("/")}>/</button>
            </div>
        </div>
    );
}

// Tic-Tac-Toe játék alkalmazás
function TicTacToe() {
    const [board, setBoard] = React.useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = React.useState(true);

    const handleClick = (index) => {
        const newBoard = board.slice();
        if (newBoard[index] || calculateWinner(board)) return; // Ha már van jel a mezőben, ne csinálj semmit
        newBoard[index] = isXNext ? "X" : "O";
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const renderSquare = (index) => (
        <button onClick={() => handleClick(index)}>{board[index]}</button>
    );

    const winner = calculateWinner(board);

    const status = winner ? `Győztes: ${winner}` : `Következő lépés: ${isXNext ? "X" : "O"}`;

    return (
        <div>
            <h2>Tic-Tac-Toe</h2>
            <div>{status}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                {board.map((_, index) => renderSquare(index))}
            </div>
        </div>
    );

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
}

// Fő alkalmazás komponens
function App() {
    return (
        <div>
            <h1>React SPA</h1>
            <nav>
                <a href="#calculator">Számológép</a> | 
                <a href="#tic-tac-toe">Tic-Tac-Toe</a>
            </nav>
            <section id="calculator">
                <Calculator />
            </section>
            <section id="tic-tac-toe">
                <TicTacToe />
            </section>
        </div>
    );
}

// Alkalmazás renderelése a DOM-ba
ReactDOM.render(<App />, document.getElementById("root"));
