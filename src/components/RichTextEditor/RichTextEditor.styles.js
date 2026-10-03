import styled from 'styled-components';

export const EditorWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.surface};
  overflow: hidden;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: ${({ theme }) => theme.space[2]};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ToolbarButton = styled.button`
  min-width: 30px;
  height: 30px;
  padding: 0 8px;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const EditableContent = styled.div`
  min-height: 180px;
  padding: ${({ theme }) => theme.space[4]};
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.textFaint};
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.display};
    margin: ${({ theme }) => theme.space[4]} 0 ${({ theme }) => theme.space[2]};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.space[3]};
  }

  ul, ol {
    margin: 0 0 ${({ theme }) => theme.space[3]};
    padding-left: 1.4em;
    list-style-position: outside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  blockquote {
    margin: ${({ theme }) => theme.space[3]} 0;
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
    border-left: 3px solid ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textMuted};
    font-style: italic;
  }
`;
