const createBoard = (row, col, mine) => {
    let board = [];
    for (let x=0; x<row; x++){
        let r = [];
        for (let y=0; y<col; y++){
            r.push({
                value: 0, //周辺の地雷数
                revealed: false, //マスが開いているか
                x: x, //x座標
                y: y, //y座標
                flagged: false //mine旗があるか
            });
        }
        board.push(r);
    }

    let mineCount = 0;
    while(mineCount < mines){
        const x = Math.floor(Math.random() * row);
        const y = Math.floor(Math.random() * col);
        if(board[x][y].value === 0) {
            board[x][y].value = 'X';
            mineCount++;
        }
    }

    for (let x=0; x < row; x++){
        for (let y=0; y<col; y++){
            if(board[x][y].value !== 'X'){
                let count =0;
                for (let y2 = Math.max(y-1, 0); y2<Math.min(y+2, col); y2++){
                    for(let x2 = Math.max(x-1, 0); x2<Math.min(x+2, row); x2++){
                        if(board[x2][y2].value === 'X') {count++;}
                    }
                }
                board[x][y].value = count;
            }
        }
    }

    return board;
}

export default createBoard;