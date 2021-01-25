import React from "react";
import { deleteComment } from "../api";

class DeleteComment extends React.Component {
  state = {
    hasError: false,
    errorMessage: "",
    hasDeleted: false,
  };

  DeleteComment = () => {
    const { comment_id } = this.props;
    deleteComment(comment_id).catch((err) => {
      const {
        response: { status, statusText },
      } = err;
      this.setState((currentState) => {
        const updatedState = {
          hasError: true,
          errorMessage: `comment not deleted ... ${status}! ${statusText}`,
        };
        return updatedState;
      });
    });
    this.props.updateCommentsOnDelete(comment_id);
  };

  render() {
    return (
      <div>
        <button onClick={this.DeleteComment}>Delete 🗑️</button>
      </div>
    );
  }
}

export default DeleteComment;
