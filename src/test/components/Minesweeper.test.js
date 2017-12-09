import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Minesweeper from '../../components/Minesweeper.js';
import Menu from '../../components/Menu.js';
import Table from '../../components/Table.js';
import Sound from 'react-sound';

configure({ adapter: new Adapter() });

describe('Minesweeper', () => {

    let wrapper;

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('renders a Menu component always', () => {
        wrapper = mount(<Minesweeper />);
        expect(wrapper.find(Menu).length).toBeGreaterThan(0);
    });

    it('renders the Table component when the level state is set', () => {
        wrapper = mount(<Minesweeper />);
        wrapper.setState({ level: '1' });
        expect(wrapper.find(Table).length).toBeGreaterThan(0);
    });

    it('renders the Sound component when status is end', () => {
        wrapper = mount(<Minesweeper />);
        wrapper.setState({ status: 'end' });
        expect(wrapper.find(Sound).length).toBeGreaterThan(0);
    });
});