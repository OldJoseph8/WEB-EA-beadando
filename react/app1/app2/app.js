// Calculator.js
function Calculator() {
    const [input, setInput] = React.useState("");

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleResult = () => {
        try {
            setInput(eval(input)); // A 'eval' egy egyszerű módszer a kifejezések kiszámítására
        } catch (error) {
            setInput("Hiba!");
        }
    };

    const handleClear = () => {
        setInput("");
    };

    return (
        <div>
            <h2>Kalkulátor</h2>
            <input type="text" value={input} readOnly />
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
                <button onClick={handleResult}>=</button>
                <button onClick={() => handleClick("/")}>/</button>
            </div>
        </div>
    );
}
