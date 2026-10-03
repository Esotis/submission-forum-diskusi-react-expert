import styled from 'styled-components';

export const ThreadDetailCard = styled.article`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[7]};
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const OwnerName = styled.div`
  font-weight: 600;
`;

export const Title = styled.h1`
  font-size: 1.9rem;
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const Body = styled.div`
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
  margin-bottom: ${({ theme }) => theme.space[5]};
  font-size: 1.02rem;

  p {
    margin: 0 0 ${({ theme }) => theme.space[3]};
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    margin: ${({ theme }) => theme.space[5]} 0 ${({ theme }) => theme.space[2]};
  }

  ul, ol {
    margin: 0 0 ${({ theme }) => theme.space[3]};
    padding-left: 1.4em;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  blockquote {
    margin: ${({ theme }) => theme.space[4]} 0;
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
    border-left: 3px solid ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textMuted};
    font-style: italic;
  }

  a {
    color: ${({ theme }) => theme.colors.accentStrong};
    text-decoration: underline;
  }

  code {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
    padding: 0.1em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
  }
`;

export const CommentsSection = styled.section`
  h2 {
    font-size: 1.3rem;
    margin-bottom: ${({ theme }) => theme.space[5]};
  }
`;

export const CommentListWrapper = styled.ul`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0 ${({ theme }) => theme.space[5]};
`;
