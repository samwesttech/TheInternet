import React, { Component } from "react";
import "./AddArticle.css";
import { postArticle } from "../../api";
import { navigate } from "@reach/router";

class AddArticle extends Component {
  state = {
    body: "",
    username: this.props.loggedInUser,
    title: "",
    topic: "",
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ [event.target.id]: value });
  };

  handleSubmit = (event) => {
    const { body, title, topic } = this.state;
    event.preventDefault();
    postArticle({ body, username: this.props.loggedInUser, title, topic }).then(
      (article) => {
        this.setState({ username: "", body: "", title: "", topic: "" });
        navigate(`/articles`);
      }
    );
  };

  render() {
    let user = this.props.loggedInUser;
    if (user === "") {
      user = "no user selected";
    }
    return (
      <div className="add_article">
        <form onSubmit={this.handleSubmit}>
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
          <label htmlFor="title">title:</label>
          <br></br>
          <textarea
            name="title"
            id="title"
            onChange={this.handleChange}
          ></textarea>
          <br></br>
          <label htmlFor="topic">topic:</label>
          <br></br>
          <select name="topic" id="topic" onChange={this.handleChange}>
            <option value="">Choose Topic</option>
            <option value="coding">coding</option>
            <option value="football">football</option>
            <option value="cooking">cooking</option>
          </select>
          <br></br>
          <button type="submit">Add Article</button>
        </form>
      </div>
    );
  }
}

export default AddArticle;
