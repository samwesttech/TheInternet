import React, { Component } from "react";
import ErrorMessage from "./ErrorMessage";
import { voteComment } from "../api";

class VoteComments extends Component {
  state = {
    hasVoted: false,
    vote_change: 0,
    hasError: false,
    errorMessage: "",
  };

  handleClick = (vote) => {
    const { comment_id } = this.props;
    voteComment(comment_id, vote).catch((err) => {
      const {
        response: { status, statusText },
      } = err;
      this.setState((currentState) => {
        const updatedState = {
          hasError: true,
          errorMessage: `Article not found ... ${status}! ${statusText}`,
          hasVoted: false,
          vote_change: 0,
        };
        return updatedState;
      });
    });
    this.setState({ vote_change: vote, hasVoted: true });
  };

  render() {
    const { votes } = this.props;
    const { vote_change, hasError, errorMessage, hasVoted } = this.state;
    if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div>
          <button onClick={() => this.handleClick(1)} disabled={hasVoted}>
            ↑
          </button>
          <button onClick={() => this.handleClick(-1)} disabled={hasVoted}>
            ↓
          </button>
          <p>🗳️: {votes + vote_change}</p>
        </div>
      );
    }
  }
}

export default VoteComments;
