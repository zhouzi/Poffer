import React, { Component } from 'react';
import styles from './styles.css';
import Breadcrumb from 'components/Breadcrumb';
import ConnectAccountsContainer from 'containers/ConnectAccountsContainer';
import SelectPocketItemsContainer from 'containers/SelectPocketItemsContainer';
import CreateTweetsContainer from 'containers/CreateTweetsContainer';

const steps = [
  'Connect accounts',
  'Select Pocket items',
  'Create tweets',
  'Review Queue',
  'Add to Buffer'
];

export default class AppContainer extends Component {
  state = {
    activeStep: 0
  };

  render () {
    const components = [
      () => <ConnectAccountsContainer onNext={() => this.setState({ activeStep: this.state.activeStep + 1 })} />,
      () => <SelectPocketItemsContainer onNext={() => this.setState({ activeStep: this.state.activeStep + 1 })} />,
      () => <CreateTweetsContainer onNext={() => this.setState({ activeStep: this.state.activeStep + 1 })} />,
    ];

    const activeComponent = components[this.state.activeStep]();

    return (
      <div className={styles.container}>
        <h1>Poffer</h1>
        <Breadcrumb items={steps} activeItem={this.state.activeStep} />
        {activeComponent}
      </div>
    );
  }
};
