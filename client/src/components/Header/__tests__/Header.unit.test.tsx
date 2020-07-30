import React from 'react';
import {Header} from '../';
import {shallow, ShallowWrapper} from 'enzyme';

describe('Header component', () => {

  it('should display logo', () => {
    const renderer = shallow(<Header/>);
    const img = renderer.find('.header__logo');

    expect(img.exists()).toBeTruthy();
    expect(img.type()).toEqual('img');
    expect(img.props().src).toEqual('pin-logo.png');
  });

  describe('Menu buttons (initial render)', () => {
    let renderer: ShallowWrapper;
    let el: ShallowWrapper;

    beforeAll(() => {
      renderer = shallow(<Header/>);
      el = renderer.find('Link');
    });

    it('should initially render login button', () => {
      expect(el.get(1).props.to).toEqual('/login');
    });

    it('should initally render register button', () => {
      expect(el.get(2).props.to).toEqual('/register');
    })
  });

  describe('Menu buttons (viewer/user props added)',() => {
    let renderer: ShallowWrapper;
    let el: ShallowWrapper;
    const viewer = {
      id: '1',
      email: 'fakeEmail@hotmail.co.uk',
      username: 'fakeEmail'
    }

    beforeAll(() => {
      renderer = shallow(<Header viewer={viewer} />);
      el = renderer.find('Link');
    });

    it('should render profile button', () => {
      expect(el.get(1).props.to).toEqual('/profile');
    });

    it('should initally render logout button', () => {
      expect(el.get(2).props.to).toEqual('/logout');
    })

  })
})