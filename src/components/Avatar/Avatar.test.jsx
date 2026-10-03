import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test-utils';
import Avatar from './Avatar';

describe('Avatar component', () => {
  it('should render an image with the correct alt text when src is provided', () => {
    renderWithTheme(
      <Avatar name="Dimas Saputra" src="https://example.com/avatar.jpg" />,
    );

    const image = screen.getByRole('img', { name: 'Dimas Saputra' });
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('should render initials as a fallback when src is not provided', () => {
    renderWithTheme(<Avatar name="Dimas Saputra" />);
    expect(screen.getByText('DS')).toBeInTheDocument();
  });

  it('should only use the first two words for initials on long names', () => {
    renderWithTheme(<Avatar name="Dimas Adi Saputra Pratama" />);
    expect(screen.getByText('DA')).toBeInTheDocument();
  });

  it('should render "?" when there is no name and no src', () => {
    renderWithTheme(<Avatar name="" />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});
