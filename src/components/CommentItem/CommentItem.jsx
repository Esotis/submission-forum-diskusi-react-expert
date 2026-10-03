import { useDispatch } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import VoteButton from '../VoteButton/VoteButton';
import { voteComment } from '../../states/threadDetail/threadDetailSlice';
import { postedAt } from '../../utils/time';
import { TextMuted, DotSeparator } from '../../styles/shared';
import {
  Item, Body, Meta, OwnerName, Content,
} from './CommentItem.styles';

function CommentItem({ comment, threadId }) {
  const dispatch = useDispatch();

  return (
    <Item>
      <Avatar name={comment.owner?.name} src={comment.owner?.avatar} size="sm" />
      <Body>
        <Meta>
          <OwnerName>{comment.owner?.name}</OwnerName>
          <DotSeparator />
          <TextMuted as="time" dateTime={comment.createdAt}>
            {postedAt(comment.createdAt)}
          </TextMuted>
        </Meta>
        <Content>{comment.content}</Content>
        <VoteButton
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          onVote={(voteType) => dispatch(
            voteComment({ threadId, commentId: comment.id, voteType }),
          )}
        />
      </Body>
    </Item>
  );
}

export default CommentItem;
