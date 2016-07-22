import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchItems, selectItems } from 'actions/pocket';
import map from 'lodash/map';
import pickBy from 'lodash/pickBy';

export default class SelectPocketItemsContainer extends Component {
  static propTypes = {
    request_token: PropTypes.string.isRequired,
    redirect_uri: PropTypes.string.isRequired,
    succeed: PropTypes.bool.isRequired,
    onTagSelected: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    items: PropTypes.object,
  };

  state = {
    tag: null,
    selected: {},
  };

  chooseTag = () => {
    const { input } = this.refs;

    if (input && input.value) {
      this.setState({
        tag: input.value
      }, () => this.props.onTagSelected(this.state.tag));
    }
  };

  select = (item) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [item.item_id]: true
      }
    });
  };

  unSelect = (item) => {
    this.setState({
      selected: {
        ...this.state.selected,
        [item.item_id]: false
      }
    });
  };

  onNext = () => {
    const selectedItemsId = Object.keys(pickBy(this.state.selected, (isChecked) => isChecked));
    const selectedItems = selectedItemsId.map((id) => this.props.items[id]);
    this.props.onSelectItems(selectedItems);
    this.props.onNext();
  };

  render () {
    if (this.state.tag == null) {
      return (
        <div>
          <input type="text" ref="input" />
          <button type="button" onClick={() => this.chooseTag()}>
            Ok!
          </button>
        </div>
      );
    }

    if (this.props.items == null) {
      return (
        <div>Loading #{this.state.tag}...</div>
      );
    }

    return (
      <ul>
        {map(this.props.items, (item, id) => (
          <li key={id}>
            <input type="checkbox" onChange={(event) => event.target.checked ? this.select(item) : this.unSelect(item)} />
            {item.resolved_title}
          </li>
        ))}
        <li>
          <button type="text" onClick={() => this.onNext()}>
            Next
          </button>
        </li>
      </ul>
    );
  }
}

function mapStateToProps ({ accounts, items }) {
  return {
    ...accounts.pocket,
    items
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onTagSelected: fetchItems,
    onSelectItems: selectItems,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectPocketItemsContainer);
