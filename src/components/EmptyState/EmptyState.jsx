import { Wrapper } from './EmptyState.styles';

function EmptyState({ title, description }) {
  return (
    <Wrapper>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </Wrapper>
  );
}

export default EmptyState;
