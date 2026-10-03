import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessage, clearMessage } from '../../states/message/messageSlice';
import { Banner, CloseButton } from './MessageBanner.styles';

function MessageBanner() {
  const { text, type } = useSelector(selectMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!text) return undefined;

    const timeoutId = setTimeout(() => {
      dispatch(clearMessage());
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [text, dispatch]);

  if (!text) return null;

  return (
    <Banner $type={type} role="alert">
      <span>{text}</span>
      <CloseButton
        type="button"
        onClick={() => dispatch(clearMessage())}
        aria-label="Tutup pesan"
      >
        &times;
      </CloseButton>
    </Banner>
  );
}

export default MessageBanner;
