import React from 'react';

const Avatar = ({ src, size }) => {
  return (
    <img
      src={src}
      alt=''
      className='Avatar'
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  );
};

export default Avatar;
