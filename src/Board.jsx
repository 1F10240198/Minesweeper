import { useState, useEffect } from "react";
import createBoard from "./creatBoard";
import Cell from "./Cell";

const Board = ({row, col, mines, onBack}) => {
    const [gameData, setGameData] = useState({});
    const [resetGame, setResetGame] = useState(true);
    const [count, setCount] = useState(0);
    const [startCount, setStartCount] = useState(false)

    useEffect(() => {
        let interval;
        if(!startCount) {return;}
        interval = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [startCount]);

    useEffect(() => {
        if (!resetGame) {return ;}

        const newBoard = createBoard(row, col, mines);
        setGameData({
            board: newBoard,
            gameStatus: 'Game in Progress',
            cellsWithoutMines: row * col - mines,
            numOfMines: mines
        });

        setCount(0);
        setStartCount(false);
        setResetGame(false);
        
    }, [resetGame, row, col, mines]);

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

    const handleRevealCell = (x, y) => {

        if(gameData.gameStatus === 'You Lost' ||
            gameData.gameStatus === 'You Win') {return ;}
        if(gameData.board[x][y].revealed ||
            gameData.board[x][y].flagged) {return ;}

        // タイマー始動
        if (!startCount) {
            setStartCount(true);
        }

        const newBoard = gameData.board.map(row => 
            row.map(cell => ({...cell}))
        );
        const newGameData = {
            ...gameData,
            board: newBoard
        };

        if(newGameData.board[x][y].value === 'X'){
            //クリックしたマスが地雷だった場合
            //すべての地雷マスをオープンする
            for (let y2 = 0; y2 < col; y2++){
                for(let x2 = 0; x2 < row; x2++){
                    if(newGameData.board[x2][y2].value === 'X'){
                        newGameData.board[x2][y2].revealed = true;
                    }
                }
            }
            newGameData.gameStatus = 'You Lost';
            setStartCount(false);
        }else if(newGameData.board[x][y].value === 0) {
            //クリックしたマスの周辺に地雷がない場合
            const newRevealedData = revealEmpty(x, y, newGameData);
        }else{
            //クリックしたマスの周辺に1個以上の地雷がある場合
            newGameData.board[x][y].revealed = true;
            newGameData.cellsWithoutMines--;
            if(newGameData.cellsWithoutMines === 0){
                newGameData.gameStatus = 'You Win';
                setStartCount(false);
            }
        }
        setGameData(newGameData);
    }

    const revealEmpty = (x, y, data) => {
        if (x < 0 || x >= row || y < 0 || y >= col) {return ;}
        if(data.board[x][y].revealed || data.board[x][y].flagged) {return ;}

        data.board[x][y].revealed = true;
        data.cellsWithoutMines--;
        if(data.cellsWithoutMines === 0){
            data.gameStatus = 'You Win';
            setStartCount(false);
        }

        if(data.board[x][y].value === 0){
            for(let y2 = Math.max(y-1, 0); y2 < Math.min(y+2, col); y2++){
                for(let x2 = Math.max(x-1, 0); x2 < Math.min(x+2, row); x2++){
                    if(x2 != x || y2 != y){ revealEmpty(x2, y2, data);}
                }
            }
        }
        return data;
    }

    if(!gameData.board) {return <div>Loading...</div>}

    return(
        <div>
            <button onClick={onBack}>難易度選択</button>
            <div>🚩{gameData.numOfMines} &nbsp;&nbsp; ⏱️ {Math.floor(count/60)}:{String(count%60).padStart(2,'0')} &nbsp;&nbsp;
                <button onClick={()=>{setResetGame(true);}}>Reset</button>
            </div>
            <div>Game Status:{gameData.gameStatus}</div>
            <div>
                {gameData.board.map((singleRow, index1) => {
                    return (
                        <div style={{display:'flex'}} key={index1}>
                            {
                                singleRow.map((singleCell, index2) => {
                                    return <Cell details={singleCell} onUpdateFlag={handleUpdateFlag} onRevealCell={handleRevealCell} key={index2} />
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