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

  mouseOver(e){
    this.props.highlight(this.props.comment.toWhom);
  }

  mouseOut(e){
    this.props.highlight(this.props.comment.toWhom);
  }

  render() {
    const {
      children,
      comment,
      parent,
      createComment,
      toWhom,
      highlight
    } = this.props;

    const comment_date = new Date(comment.date);
    const time = (comment_date.getHours()<10?'0':'') + comment_date.getHours()+':'
        + (comment_date.getMinutes()<10?'0':'') + comment_date.getMinutes() + ':'
        + (comment_date.getSeconds()<10?'0':'') + comment_date.getSeconds();

    const day = comment_date.getFullYear() 
              + "-" + ((comment_date.getMonth() + 1)<10?'0':'') + (comment_date.getMonth() + 1) 
              + "-" + (comment_date.getDate()<10?'0':'') + comment_date.getDate();

    const { isFormActive } = this.state;

    return (
      <div className="comment">
        <div className={"commentHeader "+ (comment.highlight?"highlight":"")}>
          <span className="author">{comment.author}</span>
          <span className="date">{day + " " + time}</span>
          {
            comment.toWhom?<span onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} className="toWhom">to {comment.toWhom.author}</span>:null
          }
          <button onClick={this.toggleForm.bind(this)}>
            reply
          </button>
          <button onClick={this.likeComment.bind(this)}>
            like {comment.likes}
          </button>
        </div>
        <div className="commentText">
          {comment.text}
        </div>
        {isFormActive ? <CommentsForm toggleForm={this.toggleForm.bind(this)} comment={parent?parent:comment} toWhom={comment} createComment={createComment}/> : null}
        {children}
      </div>
    )
  }
}
