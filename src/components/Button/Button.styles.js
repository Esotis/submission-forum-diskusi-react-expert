import styled, { css } from 'styled-components';

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.bg};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.accentStrong};
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.text};
    }
  `,
  accent: css`
    background-color: ${({ theme }) => theme.colors.accent};
    color: #fff;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.accentStrong};
    }
  `,
  text: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.accentStrong};
    padding: 0.3rem 0.4rem;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
};

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  padding: 0.7rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  ${({ $variant }) => variantStyles[$variant] || variantStyles.primary}
`;

export default StyledButton;
