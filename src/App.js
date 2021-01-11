import './App.css';
import React from 'react';
import Nav from './components/Nav/Nav.jsx';
import Home from './components/Home/Home.jsx';
import Articles from './components/Articles/Articles.jsx';
import Article from './components/Article/Article';
import Topics from './components/Topics/Topics.jsx';
import ErrorMessage from './components/ErrorMessage';
import AddArticle from './components/AddArticle/AddArticle.jsx';
import {Router} from "@reach/router";


class App extends React.Component {
  state = {
    loggedInUser: ''
  }

  choseUser = (user) => {
    this.setState({loggedInUser: user});
  }
  
  render(){
    return (
      <div className="App">
        <Nav choseUser={this.choseUser}/>
        <Router>
          <Home path="/"/>
          <Articles path="/articles" loggedInUser={this.state.loggedInUser}/>
          <Articles path="/articles/topics/:topic_slug" loggedInUser={this.state.loggedInUser}/>
          <Article path="/articles/:article_id" loggedInUser={this.state.loggedInUser}/>
          <AddArticle path="/articles/add_article" loggedInUser={this.state.loggedInUser}/>
          <Topics path="/topics" loggedInUser={this.state.loggedInUser}/>
          <ErrorMessage default errorMessage="Page not found!"/>
        </Router>
        
      </div>
    );
  }
}

export default App;
