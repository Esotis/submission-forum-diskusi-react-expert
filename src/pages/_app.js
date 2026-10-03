import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import store from '../states/store';
import { preloadAuthUser, selectIsPreloading } from '../states/auth/authSlice';
import theme from '../styles/theme';
import GlobalStyle from '../styles/GlobalStyle';
import Navbar from '../components/Navbar/Navbar';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import MessageBanner from '../components/MessageBanner/MessageBanner';

function AppShell({ Component, pageProps }) {
  const dispatch = useDispatch();
  const isPreloading = useSelector(selectIsPreloading);

  useEffect(() => {
    dispatch(preloadAuthUser());
  }, [dispatch]);

  if (isPreloading) {
    return <LoadingBar />;
  }

  return (
    <>
      <LoadingBar />
      <MessageBanner />
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppShell Component={Component} pageProps={pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
