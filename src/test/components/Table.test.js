import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from '../../components/Table.js';
import Row from '../../components/Row.js';
import * as helpers from '../../helper/helper.js';

configure({ adapter: new Adapter() });

describe('Table', () => {
    let props, wrapper;

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('renders a table as soon as it loads', () => {
        props = {
            rowCount: 16,
            colCount: 16,
            mineCount: 10
        };
        const spy = jest.spyOn(Table.prototype, 'createTable');
        wrapper = mount(<Table {...props} />);
        expect(spy).toHaveBeenCalled();
        expect(wrapper.find('table').length).toBeGreaterThan(0);
        expect(wrapper.find(Row).length).toEqual(props.rowCount+1);
        spy.mockReset();
        spy.mockRestore();
    });

    it('ends game when cell containing a mine is clicked', () => {
        props = {
            rowCount: 16,
            colCount: 16,
            mineCount: 10,
            addOpenNum(){},
            gameOver(){}
        };
        const cell = {
            x: 0,
            y: 0,
            count: 0,
            containsMine: true,
            isOpen: false
        };
        props.gameOver = jest.fn();
        wrapper = mount(<Table {...props} />);
        wrapper.instance().openCell(cell);
        expect(props.gameOver).toHaveBeenCalled();
    });

    it('sets isOpen to true of the cell', () => {
        props = {
            rowCount: 16,
            colCount: 16,
            mineCount: 10,
            addOpenNum(){},
            gameOver(){}
        };
        let cell = {
            x: 0,
            y: 0,
            count: 2,
            containsMine: false,
            isOpen: false
        };
        props.addOpenNum = jest.fn();
        Table.openCell = jest.fn(Table.openCell);
        helpers.getMineCount = jest.fn(helpers.getMineCount);
        helpers.hasWon = jest.fn(helpers.hasWon);
        helpers.traverseBoard = jest.fn(helpers.traverseBoard);
        wrapper = mount(<Table {...props} />);
        wrapper.instance().openCell(cell);
        //Case 2 is satisfied
        expect(props.addOpenNum).toHaveBeenCalled();
        expect(helpers.getMineCount).toHaveBeenCalled();
        expect(helpers.hasWon).toHaveBeenCalled();
        expect(helpers.traverseBoard).toHaveBeenCalled();
    });

    it('sets has won when all the cells without mines have been opened', () => {
        props = {
            rowCount: 16,
            colCount: 16,
            mineCount: 10,
            addOpenNum(){},
            gameOver(){},
            setWon(){}
        };
        let cell = {
            x: 0,
            y: 0,
            count: 2,
            containsMine: false,
            isOpen: false
        };
        helpers.hasWon = jest.fn(helpers.hasWon).mockReturnValue(true);
        props.setWon = jest.fn(props.setWon);
        wrapper = mount(<Table {...props} />);
        wrapper.instance().openCell(cell);
        expect(props.setWon).toHaveBeenCalled();
    });
})