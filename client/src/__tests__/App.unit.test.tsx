import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import { Header } from '../components/Header';
import { StateProvider } from '../lib/utils/context';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn().mockImplementation(() => ({ viewerDispatch: jest.fn(), viewerState: {} })),
}));

describe('App component (unit)', () => {
  it('should render the header component', () => {
    const renderer = shallow(
      <App />,
    );
    expect(renderer.props().children.type).toEqual(Header);
  });

  it.skip('should pass "viewer" props to "Header" component', () => {
    const renderer = shallow(
      <StateProvider>
        <App />
      </StateProvider>,
    );

    renderer.update();
    expect(renderer.find(Header).props()).toHaveProperty('viewer');
  });
});
