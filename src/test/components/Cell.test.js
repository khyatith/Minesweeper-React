import React from 'react';
import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cell from '../../components/Cell.js';

configure({ adapter: new Adapter() });

describe('Cell', () => {

    let props, wrapper;

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('contains unopened div when no cell is opened', () => {
        props = {
            cell: {
                isOpen: false,
                count: 2,
                containsMine: false
            }
        };
        wrapper = mount(<Cell {...props} />);
        const div = wrapper.find('.Cell__cover--unopened');
        expect(div.length).toBeGreaterThan(0);
    });

    it('renders a cell with mineCount if isOpen props is true and cell does not contain mine', () => {

        props = {
            cell: {
                isOpen: true,
                count: 2,
                containsMine: false
            }
        };
        wrapper = mount(<Cell {...props} />);
        const div = wrapper.find('.Cell__number2');
        expect(div.length).toBeGreaterThan(0);
    });

    it('renders a cell with mine when containsMine prop is true', () => {
        props = {
            cell: {
                isOpen: true,
                count: '',
                containsMine: true
            }
        };
        wrapper = mount(<Cell {...props} />);
        const div = wrapper.find('.Cell_cover--mine');
        expect(div.length).toBeGreaterThan(0);
    });

    it('calls opens a cell on click', () => {
        props = {
            cell: {
                isOpen: false,
                count: 2,
                containsMine: false
            },
            open(){}
        };
        props.open = jest.fn();
        wrapper = mount(<Cell {...props} />);
        wrapper.find('.Cell').simulate('click');
        expect(props.open).toHaveBeenCalled();
    });
});