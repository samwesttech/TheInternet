import React from "react";
import "./Home.css";
import logo from "../../assets/logo.png";
import { Link } from "@reach/router";

const Home = () => {
  return (
    <Link to="/articles">
      <div className="card_home">
        <h1>Ask Me Anythings</h1>
        <img src={logo} alt="moose" />
        <br></br>
      </div>
    </Link>
  );
};

export default Home;
