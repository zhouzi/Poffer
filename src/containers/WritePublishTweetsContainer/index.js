import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import WriteTweets from 'components/WriteTweets';
import Queue from 'components/Queue';

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
    const { items, tweetTimes } = this.props;

    return (
      <div>
        <WriteTweets
          items={items}
          tweetTimes={tweetTimes}
          onChange={this.onTweetsChange}
        />

        <Queue
          tweets={this.state.tweets}
        />
      </div>
    );
  }
}

function mapStateToProps ({ items, tweetTimes }) {
  return {
    items,
    tweetTimes,
  };
}

export default connect(mapStateToProps, null)(WritePublishTweets);
