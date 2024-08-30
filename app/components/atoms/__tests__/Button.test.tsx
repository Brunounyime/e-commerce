// app/components/atoms/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from '../button';

test('renders the Button component', () => {
  render(<Button>Click Me</Button>);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument(); 
});
