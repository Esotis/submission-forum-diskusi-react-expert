import styled from 'styled-components';
import Link from 'next/link';

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 900;
  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};
  max-width: 1080px;
  margin: 0 auto;
  padding-left: ${({ theme }) => theme.space[5]};
  padding-right: ${({ theme }) => theme.space[5]};

  @media (max-width: 720px) {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space[3]};
  }
`;

export const Brand = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.01em;

  &:hover {
    text-decoration: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.space[5]};
  flex: 1;

  @media (max-width: 720px) {
    order: 3;
    width: 100%;
  }
`;

export const NavItem = styled(Link)`
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  font-weight: 500;
  font-size: 0.95rem;
  padding: ${({ theme }) => theme.space[2]} 0;
  border-bottom: 2px solid ${({ $active, theme }) => ($active ? theme.colors.accent : 'transparent')};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Username = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 720px) {
    display: none;
  }
`;
