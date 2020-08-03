import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from 'react-dom';
import { wait, act } from '@testing-library/react';
import { App } from '../App';
import { loginUserQuery } from '../lib/graphql';

const mocks = [
  {
    request: {
      query: loginUserQuery,
      variables: {
        input: {
          email: 'test123@test.com',
          password: 'test123',
        },
      },
    },
    result: {
      data: {
        login: {
          email: 'test101@email.com', username: 'test101', token: 'testtoken',
        },
      },
    },
  },
];

describe('App component (integration)', () => {
  let el: HTMLDivElement;

  it('should attempt to fetch signed in users details upon render', async () => {
    el = document.createElement('div');

    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>,
        el,
      );
    });

    await wait();

    expect(el.querySelectorAll('.header__menu-item')[0].textContent).toEqual('Profile');
    expect(el.querySelectorAll('.header__menu-item')[1].textContent).toEqual('Logout');
  });

  // session storage token tests

  describe('When user is signed in', () => {
    it.todo('should pass user details to "viewer" state');
    it.todo('should pass user details as "viewer" prop to the "Header" component');
  });

  describe('When user in not signed in', () => {
    it.todo('fetch should return empty object');
    it.todo('should not change "viewer" state');
    it.todo('should pass "null" value as "viewer" prop to the "Header" component');
  });
});
