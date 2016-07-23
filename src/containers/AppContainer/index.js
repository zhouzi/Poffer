import React  from 'react';
import './styles.css';
import Hero from 'components/Hero';
import ConnectAccountsContainer from 'containers/ConnectAccountsContainer';
import PocketTagContainer from 'containers/PocketTagContainer';
import WritePublishTweetsContainer from 'containers/WritePublishTweetsContainer';

export default function AppContainer () {
  return (
    <div>
      <Hero />
      <ConnectAccountsContainer />
      <PocketTagContainer />
      <WritePublishTweetsContainer />
    </div>
  );
};
