import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './styles.css';

function CreateContainer () {
  return (
    <div>
      CreateContainer
    </div>
  );
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(CreateContainer);
