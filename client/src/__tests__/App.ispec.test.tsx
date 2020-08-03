import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {
  wait, act, RenderResult, render,
} from '@testing-library/react';
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
  it('should attempt to fetch signed in users details upon render', async () => {
    let comp: RenderResult;

    act(() => {
      comp = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>,
      );
    });

    await wait();

    const { getAllByTestId } = comp!;
    const headerButtons = getAllByTestId('header__menu-item');

    expect(headerButtons[0].textContent).toEqual('Profile');
    expect(headerButtons[1].textContent).toEqual('Logout');
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
