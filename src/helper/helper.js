/* @param board, rowCount, colCount
* traverses the board and finds out the mines in adjacent cells
* Sets the mine count of each cell
*/
export const getMineCount = (board, rowCount, colCount) => {
    for (let i =0; i < rowCount; i++) {
        for (let j =0; j < colCount; j++) {
            let cell = board[i][j];
            if(!cell.containsMine) {
                const mines = traverseBoard(cell, 'mines', board, rowCount, colCount);
                if(mines.length > 0) {
                    cell.count = mines.length;
                }
            }
        }
    }
}

/* @param fromCell, condition, table, rowCount, colCount
* @return [] -> contains the neighboring cell of fromCell
* traversing the board and returning the cell adjacent to fromCell and that satifies the 'condition' 
*/
export const traverseBoard = (fromCell, condition, table, rowCount, colCount) => {
    const result = [];
    //traverse up
    if (fromCell.x > 0) {
        result.push(table[fromCell.x - 1][fromCell.y]);
    }
    //traverse down
    if (fromCell.x < rowCount-1) {
        result.push(table[fromCell.x + 1][fromCell.y]);
    }
    //traverse left
    if (fromCell.y > 0) {
        result.push(table[fromCell.x][fromCell.y - 1]);
    }
    //traverse right
    if (fromCell.y < colCount - 1) {
        result.push(table[fromCell.x][fromCell.y + 1]);
    }

    if(condition === 'mines') {
        return result.filter(r => r.containsMine);
    }
    return result;
}


    //Checks if the user has won the game
export const hasWon = (rows, rowCount, colCount, mineCount) => {
    let openedCellsCount = 0;
    const totalCells = rowCount * colCount;
    for(let i=0; i <= rowCount; i++) {
        for(let j=0; j <= colCount; j++) {
            if(rows[i][j].isOpen) {
                openedCellsCount++;
            }
        }
    }
    //user has won if all the cells not having mines are opened
    if (totalCells - openedCellsCount === mineCount) {
        return true;
    }
    return false;
}

export const getRandomNumber = (max) => {
    return Math.floor((Math.random() * max));
}