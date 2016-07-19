import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './styles.css';

function AppContainer ({ children }) {
  return (
    <div>
      <h1>Poffer</h1>
      {children}
    </div>
  );
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(AppContainer);
