import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads, selectThreads } from '../states/threads/threadsSlice';
import { fetchUsers } from '../states/users/usersSlice';
import ThreadList from '../components/ThreadList/ThreadList';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import Spinner from '../components/Spinner/Spinner';
import { PageContainer, PageHeading } from '../styles/shared';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector(selectThreads);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        await Promise.all([
          dispatch(fetchThreads()).unwrap(),
          dispatch(fetchUsers()).unwrap(),
        ]);
      } catch (error) {
        // Pesan kegagalan sudah ditangani secara global lewat message banner.
      } finally {
        setIsInitialLoading(false);
      }
    }

    loadInitialData();
  }, [dispatch]);

  const categories = useMemo(
    () => [...new Set(threads.map((thread) => thread.category).filter(Boolean))],
    [threads],
  );

  const filteredThreads = useMemo(() => {
    if (!selectedCategory) return threads;
    return threads.filter((thread) => thread.category === selectedCategory);
  }, [threads, selectedCategory]);

  return (
    <>
      <Head>
        <title>Ruang Diskusi — Diskusi Terbaru</title>
      </Head>
      <PageContainer>
        <PageHeading>
          <h1>Diskusi Terbaru</h1>
          <p>Jelajahi dan ikut berdiskusi dengan komunitas.</p>
        </PageHeading>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {isInitialLoading ? (
          <Spinner label="Memuat daftar thread..." />
        ) : (
          <ThreadList threads={filteredThreads} />
        )}
      </PageContainer>
    </>
  );
}

export default HomePage;
