import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../../test-utils';
import EmptyState from './EmptyState';

describe('EmptyState component', () => {
  it('should render the given title', () => {
    renderWithTheme(<EmptyState title="Belum ada thread" />);
    expect(
      screen.getByRole('heading', { name: 'Belum ada thread' }),
    ).toBeInTheDocument();
  });

  it('should render the description when provided', () => {
    renderWithTheme(
      <EmptyState
        title="Belum ada komentar"
        description="Jadilah yang pertama berkomentar."
      />,
    );
    expect(
      screen.getByText('Jadilah yang pertama berkomentar.'),
    ).toBeInTheDocument();
  });

  it('should not render a description paragraph when none is provided', () => {
    const { container } = renderWithTheme(
      <EmptyState title="Belum ada thread" />,
    );
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });
});
