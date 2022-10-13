import { render, screen } from '@testing-library/react';
import Header from '../components/header/header';

test('renders header', () => {
  render(<Header />);
  expect(screen.getByRole('heading')).toHaveTextContent(/Welcome Priya!/);
  const image = screen.getByAltText('Blackbullion logo');
  expect(image.src).toContain('/images/blackbullion-white-logo.svg');
});
