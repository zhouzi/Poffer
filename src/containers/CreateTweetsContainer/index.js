import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class SelectPocketItemsContainer extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render () {
    return (
      <ul>
        {this.props.items.map((item) => (
          <li key={item.item_id}>
            {item.resolved_title}
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps ({ selectedItems }) {
  return {
    items: selectedItems
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPocketItemsContainer);
