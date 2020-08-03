import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import { Header } from '../components/Header';

describe('App component (unit)', () => {
  it('should render the header component', () => {
    const renderer = shallow(<App />);
    expect(renderer.props().children.type).toEqual(Header);
  });

  it('should pass "viewer" props to "Header" component', () => {
    const renderer = shallow(<App />);
    expect(renderer.find(Header).props()).toHaveProperty('viewer');
  });
});
