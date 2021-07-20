import React from 'react';
import clsx from 'clsx';

const Avatar = ({ src, size, hasBorder, userState, title }) => {
  return (
    <div
      className={clsx(
        'Avatar__wrapper',
        hasBorder && 'Avatar__has-border',
        userState && `Avatar__has-state Avatar__has-state--${userState}`
      )}
      style={{
        width: size,
        height: size,
      }}
      title={title}
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
