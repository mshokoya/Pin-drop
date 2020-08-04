import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {
  wait, act, RenderResult, render,
} from '@testing-library/react';
import { App } from '../App';
import { loginUserQuery } from '../lib/graphql';

const mockSuccess = [
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

const mockFailure = [
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
    error: new Error('failed to login'),
  },
];

describe('App component (integration)', () => {
  let comp: RenderResult;

  // session storage token tests

  describe('When user is authenticated', () => {
    it('Profile & Logout buttons should render in header', async () => {
      act(() => {
        comp = render(
          <MockedProvider mocks={mockSuccess} addTypename={false}>
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
  });

  describe('When user in not authenticated', () => {
    it('Login & Register buttons should render in header', async () => {
      act(() => {
        comp = render(
          <MockedProvider mocks={mockFailure} addTypename={false}>
            <App />
          </MockedProvider>,
        );
      });

      await wait();

      const { getAllByTestId } = comp!;
      const headerButtons = getAllByTestId('header__menu-item');

      expect(headerButtons[0].textContent).toEqual('Login');
      expect(headerButtons[1].textContent).toEqual('Register');
    });
  });
});
