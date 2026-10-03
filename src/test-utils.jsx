import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

export function renderWithTheme(ui, options) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  });
}

export { theme };
