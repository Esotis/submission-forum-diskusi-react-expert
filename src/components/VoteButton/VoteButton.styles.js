import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border-radius: 999px;
  padding: 4px;
`;

export const VoteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textFaint};
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  ${({ $active, $kind, theme }) => $active && `
    background-color: ${$kind === 'down' ? theme.colors.downvote : theme.colors.accent};
    color: #fff;
  `}
`;
