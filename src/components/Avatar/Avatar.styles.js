import styled, { css } from 'styled-components';

const sizeStyles = {
  sm: css`
    width: 28px;
    height: 28px;
    font-size: 0.7rem;
  `,
  md: css`
    width: 40px;
    height: 40px;
    font-size: 0.85rem;
  `,
  lg: css`
    width: 56px;
    height: 56px;
    font-size: 1.1rem;
  `,
};

export const AvatarWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;

  ${({ $size }) => sizeStyles[$size] || sizeStyles.md}
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
