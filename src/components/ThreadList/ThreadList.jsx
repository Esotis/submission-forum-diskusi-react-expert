import styled from 'styled-components';
import ThreadItem from '../ThreadItem/ThreadItem';
import EmptyState from '../EmptyState/EmptyState';

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

function ThreadList({ threads }) {
  if (threads.length === 0) {
    return (
      <EmptyState
        title="Belum ada thread"
        description="Jadilah yang pertama memulai diskusi pada kategori ini."
      />
    );
  }

  return (
    <List>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </List>
  );
}

export default ThreadList;
