import React from "react";
import "./DeleteArticle.css";
import { deleteArticle } from "../../api";

class DeleteArticle extends React.Component {
  state = {
    hasError: false,
    errorMessage: "",
    hasDeleted: false,
  };

  DeleteArticle = () => {
    const { article_id } = this.props;
    deleteArticle(article_id).catch((err) => {
      const {
        response: { status, statusText },
      } = err;
      this.setState((currentState) => {
        const updatedState = {
          hasError: true,
          errorMessage: `article not deleted ... ${status}! ${statusText}`,
        };
        return updatedState;
      });
    });
    this.setState({ hasDeleted: true });
    this.props.updateArticlesOnDelete(article_id);
  };

  render() {
    return (
      <button className="delete_button" onClick={this.DeleteArticle}>
        Delete 🗑️
      </button>
    );
  }
}

export default DeleteArticle;
