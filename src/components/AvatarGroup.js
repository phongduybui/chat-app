import React from 'react';
import clsx from 'clsx';

const AvatarGroup = ({ children, max = 2, className }) => {
  const childrenArray = React.Children.toArray(children);
  const count = children.length;

  const extraAvatars = count > max ? count - max + 1 : 0;

  return (
    <div className={clsx('AvatarGroup', className)}>
      {childrenArray.slice(0, count - extraAvatars + 1).map((child, i) => {
        return React.cloneElement(child, {
          className: clsx('Avatar-child'),
        });
      })}
      {extraAvatars && (
        <div className='extra-avatar'>
          <span>+{extraAvatars - 1}</span>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
