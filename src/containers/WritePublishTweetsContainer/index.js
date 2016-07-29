import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WriteTweets from 'components/WriteTweets';
import Queue from 'components/Queue';
import { fetchAddToQueue } from 'actions/buffer';
import { fetchDeleteItem as fetchDeletePocketItem } from 'actions/pocket';
import { update as updateTweetTimes } from 'actions/tweetTimes';

class WritePublishTweets extends Component {
  state = {
    tweets: {}
  };

  onTweetsChange = (value) => {
    this.setState({
      tweets: {
        ...this.state.tweets,
        ...value
      }
    });
  };

  render () {
    const {
      items,
      tweetTimes,
      bufferClientId,
      bufferRedirectUri,
      onPublish,
      isAddingToBuffer
      } = this.props;

    return (
      <div>
        <WriteTweets
          items={items}
          tweetTimes={tweetTimes}
          onChange={this.onTweetsChange}
          onDelete={this.props.onDeletePocketItem}
          onTweetTimesChange={this.props.onTweetTimesChange}
        />

        <Queue
          tweets={this.state.tweets}
          bufferClientId={bufferClientId}
          bufferRedirectUri={bufferRedirectUri}
          onPublish={onPublish}
          isAddingToBuffer={isAddingToBuffer}
        />
      </div>
    );
  }
}

function mapStateToProps ({ items, tweetTimes, accounts, status }) {
  return {
    items,
    tweetTimes,
    bufferClientId: accounts.buffer.client_id,
    bufferRedirectUri: accounts.buffer.redirect_uri,
    isAddingToBuffer: status.addToBufferQueue === 'loading',
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onPublish: fetchAddToQueue,
    onDeletePocketItem: fetchDeletePocketItem,
    onTweetTimesChange: updateTweetTimes,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WritePublishTweets);
