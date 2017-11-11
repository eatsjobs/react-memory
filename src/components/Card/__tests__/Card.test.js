import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

import Card from '../Card';

describe('<Card />', () => {
    it('should render correctly', () => {
        const onSelect = jest.fn();
        const wrapper = shallow(
            <Card type='sun' index={0} onSelect={onSelect} flipped={false} matched={false} />
        );

        expect(wrapper).toMatchSnapshot();
    });

    it('should call callback', () => {
        const onSelect = jest.fn();
        const wrapper = shallow(
            <Card type='sun' index={0} onSelect={onSelect} flipped={false} matched={false} />
        );

        expect(wrapper).toMatchSnapshot();
        wrapper.simulate('click');
        expect(onSelect.mock.calls.length).toEqual(1);
        expect(onSelect).toBeCalledWith(0, 'sun');
    });
})