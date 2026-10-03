export const VOTE_TYPE = {
  UP: 'up-vote',
  DOWN: 'down-vote',
  NEUTRAL: 'neutral-vote',
};

export function computeOptimisticVote({
  upVotesBy = [],
  downVotesBy = [],
  userId,
  voteType,
}) {
  const alreadyUpVoted = upVotesBy.includes(userId);
  const alreadyDownVoted = downVotesBy.includes(userId);

  let nextUpVotesBy = upVotesBy.filter((id) => id !== userId);
  let nextDownVotesBy = downVotesBy.filter((id) => id !== userId);
  let apiVoteType = VOTE_TYPE.NEUTRAL;

  if (voteType === VOTE_TYPE.UP && !alreadyUpVoted) {
    nextUpVotesBy = nextUpVotesBy.concat(userId);
    apiVoteType = VOTE_TYPE.UP;
  } else if (voteType === VOTE_TYPE.DOWN && !alreadyDownVoted) {
    nextDownVotesBy = nextDownVotesBy.concat(userId);
    apiVoteType = VOTE_TYPE.DOWN;
  }

  return {
    upVotesBy: nextUpVotesBy,
    downVotesBy: nextDownVotesBy,
    apiVoteType,
  };
}

export default { computeOptimisticVote, VOTE_TYPE };
