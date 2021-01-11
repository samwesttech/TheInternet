import React from "react";
import "./Articles.css";
import { Link } from "@reach/router";
import { getArticleById, getArticles } from "../../api";
import ErrorMessage from "../ErrorMessage";
import DeleteArticle from "../DeleteArticle/DeleteArticle";
import styled from "styled-components";
import footballIcon from "../../assets/football.png";
import cookingIcon from "../../assets/cooking.jpg";
import codingIcon from "../../assets/coding.png";

const Article = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

class Articles extends React.Component {
  state = {
    isLoading: true,
    articles: [],
    selectedIndex: 0,
    articleBody: "",
    sort_by: "",
    order_by: "",
    hasError: false,
    errorMessage: "",
  };

  componentDidMount() {
    getArticles(this.props.topic_slug, this.state.sort_by)
      .then((articles) => {
        this.setState({ articles });
      })
      .then(() => {
        return getArticleById(
          this.state.articles[this.state.selectedIndex].article_id
        );
      })
      .then((article) => {
        this.setState({
          articleBody: article.body,
          isLoading: false,
        });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Articles not found ... ${status}! ${statusText}`,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by } = this.state;
    const selectedSortBy = prevState.sort_by !== sort_by;
    if (selectedSortBy) {
      getArticles(this.props.topic_slug, sort_by).then((articles) => {
        this.setState({
          articles,
        });
      });
    }
    const { selectedIndex } = this.state;
    if (selectedIndex !== prevState.selectedIndex) {
      getArticleById(
        this.state.articles[this.state.selectedIndex].article_id
      ).then((article) => {
        this.setState({
          articleBody: article.body,
          isLoading: false,
        });
      });
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ [event.target.id]: value });
  };

  changeArticle = (direction) => {
    const { selectedIndex, articles } = this.state;
    if (selectedIndex === 0) {
      if (direction === "→") {
        this.setState((currentState) => {
          return { selectedIndex: currentState.selectedIndex + 1 };
        });
      }
    } else if (selectedIndex > 0 && selectedIndex < articles.length - 1) {
      if (direction === "→") {
        this.setState((currentState) => {
          return { selectedIndex: currentState.selectedIndex + 1 };
        });
      } else if (direction === "←") {
        this.setState((currentState) => {
          return { selectedIndex: currentState.selectedIndex - 1 };
        });
      }
    } else if (selectedIndex <= articles.length) {
      if (direction === "←") {
        this.setState((currentState) => {
          return { selectedIndex: currentState.selectedIndex - 1 };
        });
      }
    }
  };

  updateArticlesOnDelete = (article_id) => {
    this.setState({
      articles: this.state.articles.filter(
        (article) => article.article_id !== article_id
      ),
    });
  };

  choseImage(topic) {
    if (topic === "football") {
      return footballIcon;
    } else if (topic === "cooking") {
      return cookingIcon;
    } else if (topic === "coding") {
      return codingIcon;
    }
  }

  deletePossible(selectedArticle) {
    if (selectedArticle.author === this.props.loggedInUser) {
      return (
        <DeleteArticle
          article_id={selectedArticle.article_id}
          updateArticlesOnDelete={this.updateArticlesOnDelete}
        />
      );
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <p className="loader" />;
    }
    const { articles, hasError, errorMessage, articleBody } = this.state;
    const selectedArticle = articles[this.state.selectedIndex];
    if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else if (selectedArticle.title) {
      return (
        <div>
          <div className="sort_by">
            <label>
              Sort by:
              <select onChange={this.handleChange} name="sort_by" id="sort_by">
                <option value="created_at">created at</option>
                <option value="comment_count">comment count</option>
                <option value="votes">votes</option>
              </select>
            </label>
          </div>
          <Link to={`/articles/add_article`}>
            <button className="add_button">Add New Article</button>
          </Link>
          <Article>
            <button
              className="arrow_button"
              onClick={() => this.changeArticle("←")}
            >
              ←
            </button>
            <div className="card_article">
              <Link
                to={`/articles/${selectedArticle.article_id}`}
                style={{ textDecoration: "none" }}
                loggedInUser={this.props.loggedInUser}
              >
                <img
                  src={this.choseImage(selectedArticle.topic)}
                  alt="topic icon"
                />
                <h2>{selectedArticle.title}</h2>
                <p>{`${articleBody.slice(0, 200)} ...`}</p>
                <span>Votes: {selectedArticle.votes}</span>
                <span>Comments: {selectedArticle.comment_count}</span>
                <br></br>
                <p id="author">written by: {selectedArticle.author}</p>
              </Link>
            </div>
            <button
              className="arrow_button"
              onClick={() => this.changeArticle("→")}
            >
              →
            </button>
          </Article>
          {this.deletePossible(selectedArticle)}
        </div>
      );
    }
  }
}

export default Articles;
