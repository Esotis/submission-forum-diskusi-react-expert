import Head from 'next/head';
import ThreadForm from '../../components/ThreadForm/ThreadForm';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { PageContainer, PageHeading } from '../../styles/shared';

function CreateThreadPage() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Buat Thread Baru — Ruang Diskusi</title>
      </Head>
      <PageContainer>
        <PageHeading>
          <h1>Buat Thread Baru</h1>
          <p>Mulai diskusi baru dan ajak komunitas untuk berpartisipasi.</p>
        </PageHeading>
        <ThreadForm />
      </PageContainer>
    </ProtectedRoute>
  );
}

export default CreateThreadPage;
