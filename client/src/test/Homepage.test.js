import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Homepage from '../components/Homepage.jsx';

test('renders content', () => {
  render(<Homepage />);

  const element = screen.getByText('Homepage');
  expect(element).toBeDefined();
});