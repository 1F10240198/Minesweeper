import Board from "./Board";
import { useState } from "react";

const Difficulty = () => {

    const [level, setLevel] = useState(null);

    const levels = {
        easy: {GAME_ROW: 10, GAME_COL: 10, MINES: 15},
        normal: {GAME_ROW: 15, GAME_COL: 15, MINES: 20},
        hard: {GAME_ROW: 20, GAME_COL: 20, MINES: 30},
    }

    if (!level) {
        return (
            <div>
                <h1>難易度選択</h1>
                <button onClick={() => setLevel("easy")}>簡単</button>
                <button onClick={() => setLevel("normal")}>普通</button>
                <button onClick={() => setLevel("hard")}>難しい</button>
            </div>
        );
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center'
    }
    return (
        <div style={containerStyle}>
            <Board key={level} row={levels[level].GAME_ROW} col={levels[level].GAME_COL} mines={levels[level].MINES} onBack={() => setLevel(null)} />
        </div>
    )
}

export default Difficulty;