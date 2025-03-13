import { useState } from "react";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);

    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };

    const deleteElement = (index:number) => {
        setArray(array.filter((_, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>

            <button
                onClick={addElement}
                style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = "darkgreen"}
                onMouseOut={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = "green"}

            >
                Add Element
            </button>

            <ul style={{ listStyleType: "none", padding: 0 }}>
                {array.map((item, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ marginRight: "10px", fontSize: "18px" }}>{item}</span>
                        <button
                            onClick={() => deleteElement(index)}
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "5px 10px",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "14px",
                                borderRadius: "5px",
                                transition: "background-color 0.3s ease"
                            }}
                            onMouseOver={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = "darkred"}
                            onMouseOut={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = "red"}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            <hr />
        </div>
    );
}


