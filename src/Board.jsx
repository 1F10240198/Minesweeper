import { useState, useEffect } from "react";
import createBoard from "./creatBoard";

const Board = ({row, col, mines}) => {
    const [gameData, setGameData] = useState({});

    useEffect(() => {
        const newBoard = createBoard(row, col, mines);
        console.log(newBoard);
        setGameData({
            board: newBoard,
            gameState: 'Game in Progress',
            cellsWithoutMines: row * col - mines,
            numOfMines: mines
        });
    }, []);

    if(!gameData.board) {return <div>Loading...</div>}

    return(
        <div>
            <div>
                {gameData.board.map((singleRow, index1) => {
                    return (
                        <div style={{display:'flex'}} key={index1}>
                            {
                                singleRow.map((singleCell, index2) => {
                                    return <div key={index2}>{singleCell.value}</div>
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Board;