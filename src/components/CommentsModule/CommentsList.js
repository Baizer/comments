import React, { Component } from 'react';

import Comment from './Comment';

export default class CommentsList extends Component {

  render() {

    const {
      comments,
      createComment,
      likeComment,
      isChildren,
      highlight
    } = this.props;

    comments.sort((a, b) => {
      if (a.likes > b.likes) {
        return -1;
      } else if (a.likes < b.likes) {
        return 1;
      } else if (a.likes === b.likes) {
        if (a.date < b.date) {
          return -1;
        } else {
          return 1;
        }
      }
    });

    const commentsList = comments.map((comment) => {
      return (<Comment 
                likeComment={likeComment}
                createComment={createComment}
                parent={isChildren}
                highlight={highlight}
                comment={comment}
                key={comment.data_id} 
              >
                {createComment ? <CommentsList 
                                  isChildren={comment} 
                                  highlight={highlight}
                                  likeComment={likeComment}
                                  createComment={createComment}
                                  comments={comment.children}/> 
                                : null}
            </Comment>)
    })/*error Expected a return value.*/
    return (
      <div className="commentsList">
        {commentsList}
      </div>
    )
  }
}
