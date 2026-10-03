import styled from 'styled-components';
import Link from 'next/link';

export const Card = styled.article`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.space[5]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  transition: box-shadow 0.15s ease, border-color 0.15s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.sm};
    border-color: #d9cfba;
  }
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  font-size: 0.85rem;
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

export const OwnerName = styled.span`
  font-weight: 600;
`;

export const CategoryBadge = styled.span`
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accentStrong};
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
`;

export const Title = styled.h3`
  margin-bottom: ${({ theme }) => theme.space[2]};
  font-size: 1.25rem;

  a {
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      color: ${({ theme }) => theme.colors.accentStrong};
      text-decoration: none;
    }
  }
`;

export const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[5]};
`;

export const CommentsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
  }
`;
