import dispatcher from "../dispatcher";

export function createComment(text, author, comment) {
  dispatcher.dispatch({
    type: "CREATE_COMMENT",
    text,
    author,
    comment
  });
}

export function likeComment(comment) {
  dispatcher.dispatch({
    type: "LIKE_COMMENT",
    comment,
  });
}
