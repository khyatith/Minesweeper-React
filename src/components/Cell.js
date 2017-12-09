import React from 'react';

const Cell = ({ cell, open }) => {

    const _open = () => {
        open(cell);
    }

    const { isOpen, count, containsMine } = cell;
    const cellMineCount = count > 0 ? count : '';

    return (
        <td className="Cell" onClick={ _open }>
            {
                isOpen ?
                <div className="Cell__cover Cell__cover--opened" >
                    {
                        containsMine ?
                        <span className="Cell_cover--mine"><i className="fa fa-certificate" aria-hidden="true"></i></span>
                        :
                        <span className={"Cell__number"+cellMineCount}>{cellMineCount}</span>
                    }
                </div>
                :
                <div className="Cell__cover--unopened"></div>
            }
        </td>
    );
}

export default Cell;
