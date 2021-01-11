import React from "react";
import "./Article.css";
import { Link } from "@reach/router";
import { getArticleById, getComments } from "../../api";
import ErrorMessage from "../ErrorMessage";
import VoteArticles from "../VoteArticles";
import VoteComments from "../VoteComments";
import AddComment from "../AddComment";
import DeleteComment from "../DeleteComment";
import footballIcon from "../../assets/football.png";
import cookingIcon from "../../assets/cooking.jpg";
import codingIcon from "../../assets/coding.png";
import profile from "../../assets/profile.png";

class Article extends React.Component {
  state = {
    isLoading: true,
    article: [],
    comments: [],
    hasError: false,
    errorMessage: "",
  };

  componentDidMount() {
    const { article_id } = this.props;
    getArticleById(article_id)
      .then((article) => {
        this.setState({ article });
      })
      .then(() => {
        return getComments(this.state.article.article_id);
      })
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Article not found ... ${status}! ${statusText}`,
        });
      });
  }

  updateComments = (comment) => {
    this.setState({ comments: [...this.state.comments, comment] });
  };

  updateCommentsOnDelete = (comment_id) => {
    this.setState({
      comments: this.state.comments.filter(
        (comment) => comment.comment_id !== comment_id
      ),
    });
  };

  deleteCommentPossible(comment) {
    if (comment.author === this.props.loggedInUser) {
      return (
        <DeleteComment
          comment_id={comment.comment_id}
          updateCommentsOnDelete={this.updateCommentsOnDelete}
        />
      );
    }
  }

  choseImage(topic) {
    if (topic === "football") {
      return footballIcon;
    } else if (topic === "cooking") {
      return cookingIcon;
    } else if (topic === "coding") {
      return codingIcon;
    }
  }

  render() {
    const { isLoading, article, comments, hasError, errorMessage } = this.state;
    if (isLoading) {
      return <p className="loader" />;
    }
    if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div className="article">
          <Link to={`/articles/topics/${article.topic}`}>
            <img src={this.choseImage(article.topic)} alt="icon of topic" />
          </Link>
          <h2>{article.title}</h2>
          <p className="body">{article.body}</p>
          <br></br>
          <VoteArticles article_id={article.article_id} votes={article.votes} />
          <br></br>
          <h4>Comments</h4>
          <div className="add_comment">
            <h5>Add Comment</h5>
            <AddComment
              article_id={article.article_id}
              updateComments={this.updateComments}
              loggedInUser={this.props.loggedInUser}
            />
          </div>
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.created_at} className="comment">
                  <img
                    src={profile}
                    alt="user profile pic"
                    className="profile_pic"
                  />
                  <p className="author">{comment.author}</p>
                  <p className="body">{comment.body}</p>
                  <p className="created">
                    {`${comment.created_at.slice(
                      0,
                      10
                    )} ${comment.created_at.slice(11, 19)}`}
                  </p>
                  <div className="vote">
                    <VoteComments
                      comment_id={comment.comment_id}
                      votes={comment.votes}
                    />
                  </div>
                  <div className="delete">
                    {this.deleteCommentPossible(comment)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default Article;
