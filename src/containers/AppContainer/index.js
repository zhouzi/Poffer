import React from 'react';
import styles from './styles.css';
import Breadcrumb from 'components/Breadcrumb';
import ConnectAccountsContainer from 'containers/ConnectAccountsContainer';

export default function AppContainer () {
  const steps = [
    'Connect accounts',
    'Select Pocket items',
    'Create tweets',
    'Review Queue',
    'Add to Buffer'
  ];

  const activeItem = 0;

  return (
    <div className={styles.container}>
      <h1>Poffer</h1>
      <Breadcrumb items={steps} activeItem={activeItem} />
      <ConnectAccountsContainer />
    </div>
  );
};
