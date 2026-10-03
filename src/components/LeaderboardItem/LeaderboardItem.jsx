import Avatar from '../Avatar/Avatar';
import {
  Item, Rank, Info, Name, Email, Score,
} from './LeaderboardItem.styles';

function LeaderboardItem({ rank, entry }) {
  const { user, score } = entry;

  return (
    <Item>
      <Rank>{rank}</Rank>
      <Avatar name={user.name} src={user.avatar} />
      <Info>
        <Name>{user.name}</Name>
        <Email>{user.email}</Email>
      </Info>
      <Score>
        {score}
        {' '}
        poin
      </Score>
    </Item>
  );
}

export default LeaderboardItem;
