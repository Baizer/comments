import dispatcher from "../dispatcher";

export function createComment(text, author, comment, toWhom) {
  dispatcher.dispatch({
    type: "CREATE_COMMENT",
    text,
    author,
    comment,
    toWhom
  });
}

export function likeComment(comment) {
  dispatcher.dispatch({
    type: "LIKE_COMMENT",
    comment,
  });
}

export function highlight(comment) {
  dispatcher.dispatch({
    type: "HIGHLIGHT_COMMENT",
    comment,
  });
}
