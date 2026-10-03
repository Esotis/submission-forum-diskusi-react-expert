import styled from 'styled-components';

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

export const Rank = styled.span`
  width: 28px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accentStrong};
`;

export const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-weight: 600;
`;

export const Email = styled.span`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Score = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentStrong};
  white-space: nowrap;
`;
