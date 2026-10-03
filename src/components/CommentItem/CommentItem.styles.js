import styled from 'styled-components';

export const Item = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: 0.82rem;
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

export const OwnerName = styled.span`
  font-weight: 600;
`;

export const Content = styled.p`
  margin-bottom: ${({ theme }) => theme.space[3]};
  white-space: pre-wrap;
  word-break: break-word;
`;
