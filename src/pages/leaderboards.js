import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboards, selectLeaderboards } from '../states/leaderboards/leaderboardsSlice';
import LeaderboardItem from '../components/LeaderboardItem/LeaderboardItem';
import Spinner from '../components/Spinner/Spinner';
import EmptyState from '../components/EmptyState/EmptyState';
import { PageContainer, PageHeading } from '../styles/shared';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector(selectLeaderboards);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboards() {
      try {
        await dispatch(fetchLeaderboards()).unwrap();
      } catch (error) {
        // Pesan kegagalan sudah ditangani secara global lewat message banner.
      } finally {
        setIsInitialLoading(false);
      }
    }

    loadLeaderboards();
  }, [dispatch]);

  let content;
  if (isInitialLoading) {
    content = <Spinner label="Memuat leaderboard..." />;
  } else if (leaderboards.length === 0) {
    content = <EmptyState title="Leaderboard belum tersedia" />;
  } else {
    content = (
      <ul>
        {leaderboards.map((entry, index) => (
          <LeaderboardItem key={entry.user.id} rank={index + 1} entry={entry} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <Head>
        <title>Leaderboard — Ruang Diskusi</title>
      </Head>
      <PageContainer>
        <PageHeading>
          <h1>Leaderboard</h1>
          <p>Pengguna paling aktif berdasarkan skor kontribusi.</p>
        </PageHeading>

        {content}
      </PageContainer>
    </>
  );
}

export default LeaderboardPage;
