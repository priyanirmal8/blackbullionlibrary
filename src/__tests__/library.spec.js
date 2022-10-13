import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Library from '../components/library/library';
import mockData from './mockData.json';

let originalFetch;

beforeEach(() => {
  originalFetch = global.fetch;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
});

afterEach(() => {
  global.fetch = originalFetch;
});

test('Should load library items', async () => {
  render(<Library />);
  const items = await screen.findAllByTestId('card-item');
  expect(items).toHaveLength(5);
});

test('Should filter library items by quick reads', async () => {
  render(<Library />);
  const items = await screen.findAllByTestId('card-item');
  expect(items).toHaveLength(5);

  fireEvent.click(screen.getByTestId('quick-reads-filter'));
  const newItems = await screen.findAllByTestId('card-item');

  expect(newItems).toHaveLength(1);
});

test('Should filter library items by newest first', async () => {
  render(<Library />);
  const items = await screen.findAllByTestId('card-item');
  expect(items).toHaveLength(5);

  const oldestFirst = screen.getAllByRole('heading', { level: 3 });
  expect(oldestFirst[0]).toHaveTextContent(/Investing Basics/);

  const select = screen.getByTestId('sort-filter');
  fireEvent.change(select, { target: { value: 'Sort by newest first' } });

  const newestFirst = screen.getAllByRole('heading', { level: 3 });
  expect(newestFirst[0]).toHaveTextContent(/Why University?/);
});
