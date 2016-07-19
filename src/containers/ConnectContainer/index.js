import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './styles.css';
import PocketConnectButton from 'components/PocketConnectButton';
import BufferConnectButton from 'components/BufferConnectButton';

function ConnectContainer () {
  return (
    <div>
      ConnectContainer
      <br />
      <PocketConnectButton />
      <br />
      <BufferConnectButton />
    </div>
  );
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(ConnectContainer);
