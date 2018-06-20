import React from 'react';
import { shallow } from 'enzyme';
import { NotFoundPage } from '../../components/static/NotFoundPage';

test('should correctly render NotFoundPage', () => {
    const wrapper = shallow(<NotFoundPage/>);
    expect(wrapper).toMatchSnapshot();
});
