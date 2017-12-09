import React from 'react';

const Menu = ({ setLevel }) => {

    const _handleOnChange = (e) => {
        setLevel(e.target.value);
    }

    return (
        <div className="Minesweeper-header form-group" style={ selectStyle }>
            <select id="gridSizeSelect" className="form-control" onChange={ _handleOnChange }>
                <option>--Select Grid Size--</option>
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
            </select>
        </div>
    );
}

const selectStyle = {
    position: 'relative',
    margin: '2%'
}

export default Menu;