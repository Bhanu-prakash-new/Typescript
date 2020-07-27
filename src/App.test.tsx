import * as React from 'react';
import Enzyme, { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";

import App, { propsInt, stateInt } from './App';
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe('AppInput', () => {

  let component: ShallowWrapper | ReactWrapper;

  const createShallowWrapper = (props?: propsInt) =>
    shallow(<App  {...props} />);

  const createMountWrapper = (props?: propsInt) =>
    mount(<App {...props} />);

  const createProps = (props?: any) => {
    return {

    } as propsInt;
  };
  const componentFinder = {
    getContainerDiv: () => component.find('div').at(0),
    getHaccess: () => component.find('h'),
    findSecondDiv: () => component.find('div').at(1)
  }
  describe('when rendering with properties', () => {

    beforeEach(() => {
      component = createShallowWrapper(createProps());
    });

    it('should render without errors', () => {
      expect(component.exists()).toBe(true);
    });

    it('should render a container div', () => {
      expect(componentFinder.getContainerDiv().length).toBe(1);
    });

    test('should display text hi', () => {
      expect(componentFinder.getContainerDiv().find('h1').text()).toBe('Hi another');
    });

    test('should display another div', () => {
      expect(componentFinder.findSecondDiv().text()).toBe('this');
    });

    test('class name find', () => {
      expect(componentFinder.findSecondDiv().props().className).toBe('testclass');
    });
  });

});