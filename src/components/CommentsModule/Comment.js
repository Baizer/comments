import React, { Component } from 'react';

import CommentsForm from './CommentsForm';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormActive: false,
    }
  }

  toggleForm(e) {
    e.preventDefault();
    this.setState({
      isFormActive: !this.state.isFormActive
    });
  }

  likeComment(e) {
    e.preventDefault();
    this.props.likeComment(this.props.comment);
  }

  render() {
    const {
      children,
      comment
    } = this.props;

    const comment_date = new Date(comment.date);
    const time = comment_date.getHours()+':'
                + comment_date.getMinutes() + ':'
                + comment_date.getSeconds();

    const day = comment_date.getFullYear() 
              + "-" + (comment_date.getMonth() + 1) 
              + "-" + comment_date.getDate();

    const { isFormActive } = this.state;

    return (
      <div className="comment">
        <div className="commentHeader">
          <span className="author">{comment.author}</span>
          <span className="date">{day + " " + time}</span>
          <button onClick={this.toggleForm.bind(this)}>
            reply
          </button>
          <button onClick={this.likeComment.bind(this)}>
            like
          </button>
          <span className="like">{comment.likes}</span>
        </div>
        <div className="commentText">
          {comment.text}
        </div>
        {isFormActive ? <CommentsForm toggleForm={this.toggleForm.bind(this)} comment={this.props.parent?this.props.parent:comment} createComment={this.props.createComment}/> : null}
        {children}
      </div>
    )
  }
}
