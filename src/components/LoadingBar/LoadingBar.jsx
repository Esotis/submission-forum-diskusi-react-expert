import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../states/loading/loadingSlice';
import { VisuallyHidden } from '../../styles/shared';
import { BarTrack, BarFill } from './LoadingBar.styles';

function LoadingBar() {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <BarTrack role="status" aria-live="polite">
      <BarFill />
      <VisuallyHidden>Memuat data...</VisuallyHidden>
    </BarTrack>
  );
}

export default LoadingBar;
