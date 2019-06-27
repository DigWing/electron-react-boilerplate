import React, { useEffect, memo, useState } from 'react';
import { webRTC } from 'helpers';
import { MainWindow, CallWindow } from 'components';
import _ from 'lodash';

import styles from './style.module.scss';

let pc = {};

const OperatorScreen = () => {
  const config = { audio: true, video: true };
  const [clientId, setClientId] = useState('');
  // const [callFrom, setCallFrom] = useState('');
  const [localSrc, setLocalSrc] = useState('');
  const [peerSrc, setPeerSrc] = useState('');
  const [callWindow, setCallWindow] = useState('');
  const [siteMode, setSiteMode] = useState('');

  const startCall = (isCaller, friendID) => {
    pc = new webRTC.PeerConnection(friendID)
      .on('localStream', (src) => {
        setCallWindow('active');
        setLocalSrc(src);
      })
      .on('peerStream', (src) => {
        setPeerSrc(src);
      })
      .start(isCaller, config);
  };

  const endCall = (isStarter) => {
    if (_.isFunction(pc.stop)) {
      pc.stop(isStarter);
    }
    pc = {};
    setCallWindow('');
    setLocalSrc('');
    setPeerSrc('');
  };

  useEffect(() => {
    webRTC
      .socket
      .on('init', data => setClientId(data.id))
      .on('request', (data) => {
        startCall(false, data.from);
      })
      .on('call', (data) => {
        if (data.sdp) {
          pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === 'offer') {
            pc.createAnswer();
          }
        } else {
          pc.addIceCandidate(data.candidate);
        }
      })
      .on('end', endCall(false))
      .emit('init');
  }, []);

  return (
    <div className={styles.operatorScreen}>
      <MainWindow
        startCall={startCall}
        clientId={clientId}
      />
      <CallWindow
        status={callWindow}
        peerSrc={peerSrc}
        localSrc={localSrc}
        type={siteMode}
      />
      <div className={styles.operatorScreen__buttons}>
        <button
          type="button"
          onClick={() => setSiteMode('fiftyFifty')}
          className={styles.operatorScreen__buttons__button}
        >
          50/50
        </button>
        <button
          type="button"
          onClick={() => setSiteMode('thirtySeventy')}
          className={styles.operatorScreen__buttons__button}
        >
          30/70
        </button>
        <button
          type="button"
          onClick={() => setSiteMode('hundredZero')}
          className={styles.operatorScreen__buttons__button}
        >
          100/0
        </button>
        <button
          type="button"
          onClick={() => setSiteMode('')}
          className={styles.operatorScreen__buttons__button}
        >
          0/100
        </button>
      </div>
    </div>
  );
};

export default memo(OperatorScreen);
