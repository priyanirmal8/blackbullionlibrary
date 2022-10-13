import { render, screen } from '@testing-library/react';
import Card from '../components/card/card';

const item = {
  id: 90,
  title: 'Investing Basics',
  internal_title: 'Investing Basics - ZA',
  url: 'https://www.blackbullion.com/pathways/investing-basics-za',
  intro: 'Learn the fundamental concepts, and terminology, around investing.',
  duration: '19 min',
  image: 'https://prodcontent.blackbullion.com/images/pathways/90/thumb',
  type: 'pathway',
  has_summative_assessment: true,
};

test('renders card with item details', () => {
  render(<Card item={item} />);
  expect(screen.getByText(item.intro)).toBeInTheDocument();

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
    item.title
  );
  const image = screen.getByAltText('Library item');
  expect(image.src).toContain(item.image);

  expect(screen.getByText('pathway•19 min')).toBeInTheDocument();

  const link = screen.getByTestId('card-link');
  expect(link.href).toBe(item.url);
});
