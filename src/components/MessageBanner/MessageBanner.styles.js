import styled, { css, keyframes } from 'styled-components';

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const typeStyles = {
  error: css`
    background-color: ${({ theme }) => theme.colors.errorSoft};
    color: ${({ theme }) => theme.colors.error};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.successSoft};
    color: ${({ theme }) => theme.colors.success};
  `,
};

export const Banner = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.space[5]};
  right: ${({ theme }) => theme.space[5]};
  z-index: 1100;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  max-width: 360px;
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[5]};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  font-size: 0.9rem;
  font-weight: 500;
  animation: ${slideIn} 0.2s ease;

  ${({ $type }) => typeStyles[$type] || typeStyles.error}

  @media (max-width: 480px) {
    left: ${({ theme }) => theme.space[4]};
    right: ${({ theme }) => theme.space[4]};
    max-width: none;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;
