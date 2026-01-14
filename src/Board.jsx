import { useState, useEffect } from "react";
import createBoard from "./creatBoard";
import Cell from "./Cell";

const Board = ({row, col, mines}) => {
    const [gameData, setGameData] = useState({});

    useEffect(() => {
        const newBoard = createBoard(row, col, mines);
        console.log(newBoard);
        setGameData({
            board: newBoard,
            gameStatus: 'Game in Progress',
            cellsWithoutMines: row * col - mines,
            numOfMines: mines
        });
    }, []);

    const handleUpdateFlag = (e, x, y) => {
        e.preventDefault();
        if(gameData.gameStatus === 'You Lost' ||
            gameData.gameStatus === 'You Win') {return ;}
        if(gameData.board[x][y].revealed) {return ;}

        setGameData((prev) => {
            const newBoard = [...prev.board];
            const newFlag = !newBoard[x][y].flagged;
            let newNumOfMines = prev.numOfMines;
            newFlag ? (newNumOfMines -= 1) : (newNumOfMines += 1);
            newBoard[x][y].flagged = newFlag;

            return {
                ...prev,
                numOfMines: newNumOfMines,
                board: newBoard
            }
        });
    }

    if(!gameData.board) {return <div>Loading...</div>}

    return(
        <div>
            <div>残りの地雷数:{gameData.numOfMines}</div>
            <div>Game Status:{gameData.gameStatus}</div>
            <div>
                {gameData.board.map((singleRow, index1) => {
                    return (
                        <div style={{display:'flex'}} key={index1}>
                            {
                                singleRow.map((singleCell, index2) => {
                                    return <Cell details={singleCell} onUpdateFlag={handleUpdateFlag} key={index2} />
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