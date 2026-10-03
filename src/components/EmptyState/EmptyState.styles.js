import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space[8]} ${({ theme }) => theme.space[5]};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textMuted};

  h3 {
    margin-bottom: ${({ theme }) => theme.space[2]};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
  }
`;
