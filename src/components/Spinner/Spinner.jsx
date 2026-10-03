import { SpinnerWrapper, Circle } from './Spinner.styles';

function Spinner({ label = 'Memuat data...' }) {
  return (
    <SpinnerWrapper role="status" aria-live="polite">
      <Circle />
      <span>{label}</span>
    </SpinnerWrapper>
  );
}

export default Spinner;
