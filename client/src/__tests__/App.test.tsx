import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import {
  RenderResult, render, act, wait,
} from '@testing-library/react';
import { App } from '../App';
import { loginUserQuery } from '../lib/graphql';
import { StateProvider } from '../lib/utils/context';

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
  it('should render the header component', async () => {
    comp = render(
      <StateProvider>
        <MockedProvider mocks={mockSuccess} addTypename={false}>
          <App />
        </MockedProvider>
      </StateProvider>,
    );

    await wait();

    const { getByTestId } = comp;

    expect(getByTestId('header')).toBeInTheDocument();
  });

  describe('When user is authenticated', () => {
    it('Profile & Logout buttons should render in header', async () => {
      comp = render(
        <StateProvider>
          <MockedProvider mocks={mockSuccess} addTypename={false}>
            <App />
          </MockedProvider>
        </StateProvider>,
      );
      // await act(async () => await wait());
      await wait();
      // await act(async () => await waitForDomChange());
      const { getAllByTestId } = comp;
      const headerButtons = getAllByTestId('header__menu-item');

      expect(headerButtons[0].textContent).toEqual('Profile');
      expect(headerButtons[1].textContent).toEqual('Logout');
    });
  });

  describe('When user in not authenticated', () => {
    it('Login & Register buttons should render in header', async () => {
      act(() => {
        comp = render(
          <StateProvider>
            <MockedProvider mocks={mockFailure} addTypename={false}>
              <App />
            </MockedProvider>
          </StateProvider>,
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
