import React, { Component } from 'react';
import styles from './styles.css';
import Hero from 'components/Hero';
import ConnectAccountsContainer from 'containers/ConnectAccountsContainer';
import PocketTagContainer from 'containers/PocketTagContainer';
import WriteTweetsContainer from 'containers/WriteTweetsContainer';

export default function AppContainer () {
  return (
    <div>
      <Hero />
      <ConnectAccountsContainer />
      <PocketTagContainer />
      <WriteTweetsContainer />
    </div>
  );
};
