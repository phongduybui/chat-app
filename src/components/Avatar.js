import React from 'react';
import clsx from 'clsx';

const Avatar = ({ src, size, hasBorder, hasState }) => {
  return (
    <div
      className={clsx(
        'Avatar__wrapper',
        hasBorder && 'Avatar__has-border',
        hasState && 'Avatar__has-state'
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={src}
        alt=''
        className='Avatar'
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

export default Avatar;
