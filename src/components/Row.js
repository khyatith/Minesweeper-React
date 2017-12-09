import React from 'react';
import Cell from './Cell';

const Row = ({ cells, open }) => {

    return (
        <tr>
            {
                cells.map((cell, i) => {
                    return (
                        <Cell cell={cell} key={i} open={open} />
                    );
                })
            }
        </tr>
    );
}

export default Row;
