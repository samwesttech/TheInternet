import React, { Component } from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

class Share extends Component {
  render() {
    return (
      <div>
        share
        <br></br>
        <EmailShareButton>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
        <FacebookShareButton>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <RedditShareButton>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <TwitterShareButton>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </div>
    );
  }
}

export default Share;
