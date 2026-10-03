import { useState } from 'react';
import { AvatarWrapper, AvatarImage } from './Avatar.styles';

function getInitials(name = '') {
  return name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

function Avatar({ name = '', src = '', size = 'md' }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(src) && !imageFailed;

  return (
    <AvatarWrapper $size={size} aria-hidden={!name}>
      {showImage ? (
        <AvatarImage
          src={src}
          alt={name}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span>{getInitials(name) || '?'}</span>
      )}
    </AvatarWrapper>
  );
}

export default Avatar;
