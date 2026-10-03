import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { PageContainer } from '../styles/shared';

const NotFoundWrapper = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.space[8]};

  h1 {
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 — Halaman Tidak Ditemukan</title>
      </Head>
      <PageContainer>
        <NotFoundWrapper>
          <h1>404</h1>
          <p>Halaman yang Anda cari tidak ditemukan.</p>
          <Link href="/">Kembali ke beranda</Link>
        </NotFoundWrapper>
      </PageContainer>
    </>
  );
}

export default NotFoundPage;
