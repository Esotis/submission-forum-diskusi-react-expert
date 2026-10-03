import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};

  label, span {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  input,
  textarea {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.95rem;
    padding: 0.7rem 0.9rem;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.15s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.accent};
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
    font-family: inherit;
  }
`;

export const FieldHint = styled.span`
  font-size: 0.8rem;
  font-weight: 400 !important;
  color: ${({ theme }) => theme.colors.textFaint};
`;

export const AuthCard = styled.div`
  max-width: 420px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.space[7]} ${({ theme }) => theme.space[6]};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  h1 {
    text-align: center;
  }
`;

export const AuthCardFooter = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.space[5]};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CommentFormWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};

  textarea {
    width: 100%;
  }
`;

export const CommentLoginPrompt = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

export const CommentFormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space[3]};
`;
