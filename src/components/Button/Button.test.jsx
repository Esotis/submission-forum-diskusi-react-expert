import {
  describe, it, expect, vi,
} from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from '../../test-utils';
import Button from './Button';

describe('Button component', () => {
  it('should render its children text', () => {
    renderWithTheme(<Button>Kirim Komentar</Button>);
    expect(
      screen.getByRole('button', { name: 'Kirim Komentar' }),
    ).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Klik Saya</Button>);

    await user.click(screen.getByRole('button', { name: 'Klik Saya' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    renderWithTheme(
      <Button onClick={handleClick} disabled>
        Tidak Aktif
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: 'Tidak Aktif' }));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should use the provided type attribute', () => {
    renderWithTheme(<Button type="submit">Daftar</Button>);
    expect(screen.getByRole('button', { name: 'Daftar' })).toHaveAttribute(
      'type',
      'submit',
    );
  });
});
