import React, { Component } from "react";
import { postComment } from "../api";

class AddComment extends Component {
  state = {
    body: "",
    username: "",
    canComment: true,
    hasCommented: false,
  };

  handleChange = (event) => {
    const { value } = event.target;
    let username = this.props.loggedInUser;
    this.setState({ [event.target.id]: value });
    if (this.state.body !== "" && username !== "") {
      this.setState({ canComment: false });
    }
  };

  handleSubmit = (event) => {
    const { article_id, updateComments } = this.props;
    const { body } = this.state;
    event.preventDefault();
    postComment(article_id, { body, username: this.props.loggedInUser })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState((currentState) => {
          const updatedState = {
            hasError: true,
            errorMessage: `Comment not added ... ${status}! ${statusText}`,
            hasCommented: false,
          };
          return updatedState;
        });
      })
      .then(({ data }) => {
        this.setState({ username: "", body: "", hasCommented: true });
        updateComments(data.comment);
      });
  };

  render() {
    const { hasCommented, canComment } = this.state;
    let user = this.props.loggedInUser;
    if (user === "") {
      user = "no user selected";
    }
    return (
      <div>
        <form
          className="addComment"
          onSubmit={this.handleSubmit}
          disabled={hasCommented}
        >
          <label htmlFor="username">username:</label>
          <br></br>
          {user}
          <br></br>
          <label htmlFor="body">body:</label>
          <br></br>
          <textarea
            name="body"
            id="body"
            onChange={this.handleChange}
          ></textarea>
          <br></br>
          <button disabled={(hasCommented, canComment)} type="submit">
            Add Comment
          </button>
        </form>
      </div>
    );
  }
}

export default AddComment;
