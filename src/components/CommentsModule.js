import React, { Component } from 'react';

import CommentsStore from "../stores/CommentsStore";
import * as CommentsActions from "../actions/CommentsActions";

import CommentsForm from './CommentsModule/CommentsForm';
import CommentsList from './CommentsModule/CommentsList';

export default class CommentsModule extends Component {

  constructor(props) {
    super(props);
    this.getComments = this.getComments.bind(this);
    this.state = {
      comments: CommentsStore.getAllComments() || []
    }
  }

  componentWillMount() {
    CommentsStore.on("change", this.getComments);
  }

  componentWillUnmount() {
    CommentsStore.removeListener("change", this.getComments);
  }

  getComments() {
    this.setState({
      comments: CommentsStore.getAllComments(),
    });
  }

  createComment(text, author, comment, toWhom) {
    CommentsActions.createComment(text, author, comment, toWhom);
  }

  likeComment(comment) {
    CommentsActions.likeComment(comment);
  }

  highlight(comment) {
    CommentsActions.highlight(comment);
  }

  render() {
    const { comments } = this.state;

    return (
      <div className="commentsModule">
        <CommentsForm createComment={this.createComment}/>
        <CommentsList likeComment={this.likeComment} 
                      highlight={this.highlight}
                      createComment={this.createComment} 
                      comments={comments}/>
      </div>
    );
  }
}
