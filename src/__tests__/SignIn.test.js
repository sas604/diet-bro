/**
 * @jest-environment jsdom
 */

import { expect, test } from '@jest/globals';
import { render } from '@testing-library/react';
import SignInPage from '../components/SignIn';
import { BrowserRouter as Router } from 'react-router-dom';

import React from 'react';
import { useSelector } from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
test('displays  a signin form', async () => {
  useSelector.mockImplementation((selectorFn) =>
    selectorFn({
      authState: {},
    })
  );
  const signIn = render(
    <Router>
      <SignInPage />
    </Router>
  );

  const form = await signIn.findByTestId('signinform');
  expect(form).toBeTruthy();
});
