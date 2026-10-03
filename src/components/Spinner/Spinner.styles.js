import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to { transform: rotate(360deg); }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[7]} 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
`;

export const Circle = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2.5px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  animation: ${rotate} 0.7s linear infinite;
`;
