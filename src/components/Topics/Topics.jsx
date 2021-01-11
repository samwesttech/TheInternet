import React from "react";
import "./Topics.css";
import { getTopics } from "../../api";
import { Link } from "@reach/router";
import ErrorMessage from "../ErrorMessage";
import logo from "../../assets/logo.png";
import footballIcon from "../../assets/football.png";
import cookingIcon from "../../assets/cooking.jpg";
import codingIcon from "../../assets/coding.png";

class Topics extends React.Component {
  state = {
    isLoading: true,
    topics: [],
    hasError: false,
    errorMessage: "",
  };

  componentDidMount() {
    getTopics()
      .then((topics) => {
        this.setState({ topics, isLoading: false });
      })
      .catch((err) => {
        const {
          response: { status, statusText },
        } = err;
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: `Topic not found ... ${status}! ${statusText}`,
        });
      });
  }

  choseImage(topic) {
    if (topic.slug === "football") {
      return footballIcon;
    } else if (topic.slug === "cooking") {
      return cookingIcon;
    } else if (topic.slug === "coding") {
      return codingIcon;
    }
  }

  render() {
    const { isLoading, hasError, errorMessage } = this.state;
    if (isLoading) {
      return <p className="loader" />;
    }
    const { topics } = this.state;
    if (hasError) {
      return <ErrorMessage errorMessage={errorMessage} />;
    } else {
      return (
        <div>
          <ul>
            <li key="all" className="card_topics">
              <Link style={{ textDecoration: "none" }} to={"/articles"}>
                <img src={logo} alt="moose icon" />
                <h2>All Topics</h2>
              </Link>
            </li>
            {topics.map((topic) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/articles/topics/${topic.slug}`}
                >
                  <li key={topic.slug} className="card_topics">
                    <img src={this.choseImage(topic)} alt="topic icon" />
                    <br></br>
                    <p>{topic.description}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default Topics;
