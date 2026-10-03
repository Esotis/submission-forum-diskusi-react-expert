import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  0% { left: -40%; }
  100% { left: 100%; }
`;

export const BarTrack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 1000;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.accentSoft};
`;

export const BarFill = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 40%;
  background-color: ${({ theme }) => theme.colors.accent};
  animation: ${slide} 1.1s ease-in-out infinite;
`;
