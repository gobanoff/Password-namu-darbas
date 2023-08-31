import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState();
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);

  const [data, setData] = useState([]);

  const lowLetters = "abcdefghijklmnopqrstuvwxyz";
  const upLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numb = "0123456789";
  const symb = "!@#$%^&*()-_+=<>?";

  useEffect(() => {
    const savedPasswords =
      JSON.parse(localStorage.getItem("savedPasswords")) || [];
    setData(savedPasswords);
  }, []);

  const genPassword = (length, number, symbol) => {
    let valChar = lowLetters + upLetters;
    if (number) {
      valChar += numb;
    }
    if (symbol) {
      valChar += symb;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const ranIndex = Math.floor(Math.random() * valChar.length);
      password += valChar[ranIndex];
    }

    return password;
  };

  const handPassword = () => {
    const newPassword = genPassword(length, number, symbol);
    const updatedPasswords = [...data, newPassword];
    setData(updatedPasswords);
    localStorage.setItem("savedPasswords", JSON.stringify(updatedPasswords));
    console.log(newPassword);
    setPassword(newPassword);
  };

  return (
    <div className="App">
      <h1>
        Need a password? Try the 1Password Strong <br />
        Password Generator.
      </h1>

      <div className="control" value={password}>
        {password.split("").map((char) => {
          return symb.includes(char) ? (
            <span className="red">{char}</span>
          ) : char && numb.includes(char) ? (
            <span className="blue">{char}</span>
          ) : char && upLetters.includes(char) ? (
            <span className="green">{char}</span>
          ) : char && lowLetters.includes(char) ? (
            <span className="yellow">{char}</span>
          ) : (
            char
          );
        })}
      </div>
      <input
        className="nr"
        type="number"
        min="6"
        max="20"
        value={length}
        onChange={(e) => setLength(parseInt(e.target.value))}
      />
      <label className="pass"> Password length</label>
      <input
        className="numb"
        type="checkbox"
        checked={number}
        onChange={() => setNumber(!number)}
      />
      <label> Numbers</label>
      <input
        className="symb"
        type="checkbox"
        checked={symbol}
        onChange={() => setSymbol(!symbol)}
      />
      <label> Symbols</label>
      <button className="gen" onClick={handPassword}>
        Generate Password
      </button>
      <p className="rez">
        {data.map((password, index) => (
          <p key={index}>
            {password.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className={symb.includes(char) ? "symbol" : ""}
              >
                {char}
              </span>
            ))}
          </p>
        ))}
      </p>
    </div>
  );
}

export default App;
