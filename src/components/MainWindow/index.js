import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

const MainWindow = memo(({
  startCall,
  clientId,
}) => {
  const [friendID, setFriendID] = useState('');

  return (
    <div className={styles.mainWindow}>
      <h2 className={styles.mainWindow__header}>
        {`Привет, ${clientId}!`}
      </h2>
      <div className={styles.mainWindow__row}>
        <span className={styles.mainWindow__row__label}>
          Введите айди пользователя, которому хотите позвонить:
        </span>
        <input
          type="text"
          className={styles.mainWindow__row__input}
          spellCheck={false}
          placeholder="Your friend ID"
          onChange={event => setFriendID(event.target.value)}
        />
      </div>
      <button
        type="button"
        className={styles.mainWindow__button}
        onClick={() => startCall(true, friendID)}
      >
        Позвонить по видеосвязи
      </button>
    </div>
  );
});

MainWindow.propTypes = {
  startCall: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
};

export default MainWindow;
