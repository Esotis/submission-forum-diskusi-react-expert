import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthUser } from '../../states/auth/authSlice';
import { setErrorMessage } from '../../states/message/messageSlice';
import { VOTE_TYPE } from '../../states/voteHelper';
import { Wrapper, VoteBtn } from './VoteButton.styles';

function VoteButton({ upVotesBy = [], downVotesBy = [], onVote }) {
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleVote = (voteType) => {
    if (!authUser) {
      dispatch(setErrorMessage('Silakan masuk terlebih dahulu untuk memberi vote.'));
      router.push('/login');
      return;
    }

    onVote(voteType);
  };

  return (
    <Wrapper>
      <VoteBtn
        type="button"
        $kind="up"
        $active={isUpVoted}
        onClick={() => handleVote(VOTE_TYPE.UP)}
        aria-pressed={isUpVoted}
        aria-label="Upvote"
      >
        <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
          <path d="M10 3l7 8h-4.5v6h-5v-6H3z" fill="currentColor" />
        </svg>
        <span>{upVotesBy.length}</span>
      </VoteBtn>
      <VoteBtn
        type="button"
        $kind="down"
        $active={isDownVoted}
        onClick={() => handleVote(VOTE_TYPE.DOWN)}
        aria-pressed={isDownVoted}
        aria-label="Downvote"
      >
        <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
          <path d="M10 17l-7-8h4.5V3h5v6H17z" fill="currentColor" />
        </svg>
        <span>{downVotesBy.length}</span>
      </VoteBtn>
    </Wrapper>
  );
}

export default VoteButton;
