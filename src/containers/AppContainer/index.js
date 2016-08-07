import React  from 'react';
import './styles.css';
import Hero from 'components/Hero';
import PocketTagContainer from 'containers/PocketTagContainer';
import WritePublishTweetsContainer from 'containers/WritePublishTweetsContainer';
import Footer from 'components/Footer';

export default function AppContainer () {
  return (
    <div>
      <Hero />
      <PocketTagContainer />
      <WritePublishTweetsContainer />
      <Footer />
    </div>
  );
};
