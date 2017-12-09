import React, { Component } from 'react';
import MinesweeperStore from '../store/MinesweeperStore';
import Row from './Row';
import { getMineCount, traverseBoard, getRandomNumber, hasWon } from '../helper/helper';

class Table extends Component {

    constructor() {
        super();
        this.state = MinesweeperStore.getState();
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        this.createTable(this.props);
    }

    componentDidMount() {
        MinesweeperStore.addChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(MinesweeperStore.getState());
    }

    componentWillUnmount() {
        MinesweeperStore.removeChangeListener(this._onChange);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.openNum > nextProps.openNum || this.props.colCount !== nextProps.colCount){
            this.createTable(nextProps);
        }
    }

    //Create the table with some random number of mines setup
    createTable(props){
        const { rowCount, colCount, mineCount } = props;
        const table = [];
        //create table with rows and cols
        for(let row=0; row <= rowCount; row++) {
            table.push([]);
            //Add the cell data with each cell
            for(let col=0; col <= colCount; col++) {
                table[row].push({
                    x: row,
                    y: col,
                    count: 0,
                    containsMine: false,
                    isOpen: false
                });
            }
        }
        //add random mines in mineCount number of cells
        for(let i=0; i < mineCount; i++ ) {
            let randomRow = getRandomNumber(rowCount);
            let randomCol = getRandomNumber(colCount);
            let current = table[randomRow][randomCol];
            if (!current.containsMine) {
                current.containsMine = true;
            }
        }
        this.setState({ rows: table });
    }

    /*@param Cell
    * Open cell and process the cell based on if it contains mine not   
    */
    openCell = (cell) => {
        const { rowCount, colCount, addOpenNum, mineCount } = this.props;
        const { rows } = this.state;
        if(!rows[cell.x][cell.y].isOpen){
            addOpenNum();
        }
        //Case 1 : If clicked cell has mine, then end game and reveal board
        if(cell.containsMine) {
            this.revealBoard(cell);
            this.props.gameOver();
        } else {
            //Case 2 : Get mine count of all the cells
            getMineCount(rows, rowCount, colCount);
            rows[cell.x][cell.y].isOpen = true;
            if(!hasWon(rows,rowCount,colCount, mineCount)) {
                this.setState({ rows });
                //Traverse board and open adjacent cells
                const aroundCell = traverseBoard(cell, null, rows, rowCount, colCount );
                for(let i =0; i < 2; i++) {
                    if(!aroundCell[i].containsMine && !aroundCell[i].isOpen) {
                        this.openCell(aroundCell[i]);
                    }
                }
            } else {
                this.props.setWon();
                this.revealBoard(cell);
            }
        }
    }

    /*@param fromCell
    * If user clicks on a cell that has mine, the entire board is revealed
    */
    revealBoard = (fromCell) => {
        const { rows, rowCount, colCount } = this.state;
        for(let i=0; i <= rowCount; i++) {
            for(let j=0; j <= colCount; j++) {
                if(!rows[i][j].isOpen) {
                    rows[i][j].isOpen = true;
                }
            }
        }
        rows[fromCell.x][fromCell.y].isOpen = true;
        this.setState({ rows });
    }

    render() {
        const { rows } = this.state;
        return (
            <div>
                <table className="Table" style={tableStyle}>
                    <tbody>
                        {
                            rows.map( (row, i) => {
                                return (
                                    <Row cells={row} key={i} open={this.openCell} />
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}

const tableStyle = {
    border: '1px solid #ccc',
    margin: '0 auto',
    width: '100%',
    height: '500px'
}

export default Table;
