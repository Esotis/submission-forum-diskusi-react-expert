import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test-utils';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  it('should render nothing when categories is empty', () => {
    const { container } = renderWithTheme(
      <CategoryFilter
        categories={[]}
        selectedCategory={null}
        onSelect={() => {}}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render an "Semua" button plus one button per category', () => {
    renderWithTheme(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory={null}
        onSelect={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'Semua' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#react' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#redux' })).toBeInTheDocument();
  });

  it('should call onSelect(null) when the "Semua" button is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    renderWithTheme(
      <CategoryFilter
        categories={['react']}
        selectedCategory="react"
        onSelect={handleSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Semua' }));

    expect(handleSelect).toHaveBeenCalledWith(null);
  });

  it('should call onSelect with the category name when a category chip is clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    renderWithTheme(
      <CategoryFilter
        categories={['react', 'redux']}
        selectedCategory={null}
        onSelect={handleSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: '#redux' }));

    expect(handleSelect).toHaveBeenCalledWith('redux');
  });
});
