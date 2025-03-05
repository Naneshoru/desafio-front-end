import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

it('should be in the document', async () => {
  await act(async () => {
    render(<App />);
  });
  const elem = screen.getByTestId('app');
  expect(elem).toBeInTheDocument();
});