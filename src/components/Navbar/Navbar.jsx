import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser, logoutUser } from '../../states/auth/authSlice';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import {
  Header, Inner, Brand, Nav, NavItem, Actions, UserInfo, Username,
} from './Navbar.styles';

function Navbar() {
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push('/');
  };

  return (
    <Header>
      <Inner>
        <Brand href="/">Ruang Diskusi</Brand>

        <Nav>
          <NavItem href="/" $active={router.pathname === '/'}>Thread</NavItem>
          <NavItem href="/leaderboards" $active={router.pathname === '/leaderboards'}>
            Leaderboard
          </NavItem>
        </Nav>

        <Actions>
          {authUser ? (
            <>
              <Link href="/threads/new">
                <Button variant="accent">Buat Thread</Button>
              </Link>
              <UserInfo>
                <Avatar name={authUser.name} src={authUser.avatar} size="sm" />
                <Username>{authUser.name}</Username>
              </UserInfo>
              <Button variant="secondary" onClick={handleLogout}>Keluar</Button>
            </>
          ) : (
            <>
              <NavItem href="/login" $active={router.pathname === '/login'}>Masuk</NavItem>
              <Link href="/register">
                <Button variant="primary">Daftar</Button>
              </Link>
            </>
          )}
        </Actions>
      </Inner>
    </Header>
  );
}

export default Navbar;
