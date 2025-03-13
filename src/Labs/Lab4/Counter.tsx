import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(7);
    console.log(count);

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button
                onClick={() => setCount(count + 1)}
                style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    margin: "5px",
                    borderRadius: "5px"
                }}
            >
                Up
            </button>
            <button
                onClick={() => setCount(count - 1)}
                style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    margin: "5px",
                    borderRadius: "5px"
                }}
            >
                Down
            </button>
            <hr />
        </div>
    );
}
