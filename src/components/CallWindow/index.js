/* eslint-disable */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);
let peerVideoRef = React.createRef();

const CallWindow = memo(({
  status,
  type,
  children,
  peerSrc,
}) => {
  const setMediaStream = () => {
    if (peerSrc && peerVideoRef) {
      peerVideoRef.srcObject = peerSrc;
    }
  };

  useEffect(() => {
    setMediaStream();
  });

  const callWindowClassName = cx({
    callWindow: true,
    [`callWindow_${status}`]: status,
  });
  const childrenClassName = cx({
    callWindow__childrenWrapper: true,
    [`callWindow__childrenWrapper_${type}`]: type,
  });
  const videoWrapperClassName = cx({
    callWindow__videoWrapper: true,
    [`callWindow__videoWrapper_${type}`]: type,
  });


  return (
    <div
      className={callWindowClassName}
    >
      <div
        className={childrenClassName}
      >
        {children}
      </div>
      <div className={videoWrapperClassName}>
        <video
          className={styles.callWindow__videoWrapper__peerVideo}
          ref={(el) => { peerVideoRef = el; }}
          autoPlay
        />
      </div>
    </div>
  );
});

CallWindow.propTypes = {
  status: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  peerSrc: PropTypes.object.isRequired,
};

CallWindow.defaultProps = {
  type: '',
  children: null,
};

export default CallWindow;
