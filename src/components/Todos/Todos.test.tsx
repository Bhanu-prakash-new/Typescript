import * as React from 'react';
import { shallow } from 'enzyme';
import Todos from './Todos';

describe('Todos', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Todos />);
    expect(wrapper).toMatchSnapshot();
  });
});
