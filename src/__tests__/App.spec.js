import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders homepage', () => {
  render(<App />);
  expect(screen.getByRole('heading')).toHaveTextContent(/Welcome Priya!/);
  expect(screen.getAllByRole('img')).toHaveLength(1);
});
