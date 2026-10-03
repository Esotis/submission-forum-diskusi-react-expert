import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import VoteButton from '../VoteButton/VoteButton';
import { voteThread } from '../../states/threads/threadsSlice';
import { selectUserById } from '../../states/users/usersSlice';
import { postedAt } from '../../utils/time';
import { htmlToPlainText } from '../../utils/sanitizeHtml';
import { TextMuted, DotSeparator } from '../../styles/shared';
import {
  Card, Meta, OwnerName, CategoryBadge, Title, Excerpt, Footer, CommentsLink,
} from './ThreadItem.styles';

function ThreadItem({ thread }) {
  const dispatch = useDispatch();
  const owner = useSelector((state) => selectUserById(state, thread.ownerId));

  const excerpt = htmlToPlainText(thread.body).slice(0, 160);
  const ownerName = owner?.name || 'Pengguna';

  return (
    <Card>
      <Meta>
        <Avatar name={ownerName} src={owner?.avatar} size="sm" />
        <OwnerName>{ownerName}</OwnerName>
        <DotSeparator />
        <TextMuted as="time" dateTime={thread.createdAt}>
          {postedAt(thread.createdAt)}
        </TextMuted>
        {thread.category && (
          <CategoryBadge>
            #
            {thread.category}
          </CategoryBadge>
        )}
      </Meta>

      <Title>
        <Link href={`/threads/${thread.id}`}>{thread.title}</Link>
      </Title>

      {excerpt && (
        <Excerpt>
          {excerpt}
          &hellip;
        </Excerpt>
      )}

      <Footer>
        <VoteButton
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          onVote={(voteType) => dispatch(voteThread({ threadId: thread.id, voteType }))}
        />
        <CommentsLink href={`/threads/${thread.id}`}>
          <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
            <path
              fill="currentColor"
              d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H8l-4.5 4v-4H4a2 2 0 01-2-2z"
            />
          </svg>
          {thread.totalComments}
          {' '}
          komentar
        </CommentsLink>
      </Footer>
    </Card>
  );
}

export default ThreadItem;
