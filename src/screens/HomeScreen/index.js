import React from 'react';
import {
  Route,
  Switch,
} from 'react-router';
import OperatorScreen from '../OperatorScreen';

import styles from './style.module.scss';

const HomeScreen = () => (
  <div className={styles.homeScreen}>
    <Switch>
      <Route path="/" component={OperatorScreen} />
    </Switch>
  </div>
);

export default HomeScreen;
