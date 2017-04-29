import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class Comment {
  constructor(text, author, coef) {
    this.author = author;
    this.text = text;
    this.children = [];
    this.data_id = coef ? Date.now() + coef : Date.now();
    this.date = Date.now();
    this.likes = coef ? 0 + coef : 0;
  }

  addLike() {
    this.likes += 1;
  }

  addChild(comment) {
    this.children.push(comment);
  }
}

class CommentsStore extends EventEmitter {
  constructor() {
    super();
    this.comments = [1, 2, 3, 4, 5].map((num) => {
      return new Comment( "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo hic id aut nulla beatae eum sunt voluptatem voluptatibus, quam, dolorem numquam, rem veritatis, dicta quidem cupiditate doloribus nobis illum similique!", "author 1" + num, num);
    });
  }

  likeComment(comment) {
    comment.addLike();
    this.emit("change");
  }

  createComment(text, author, comment) {

    if (comment) {
      comment.addChild(new Comment(text, author));
    } else {
      this.comments.push(new Comment(text, author));
    }

    this.emit("change");
  }

  getAllComments() {
    return this.comments;
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_COMMENT":
        {
          this.createComment(action.text, action.author, action.comment);
          break;
        }
      case "LIKE_COMMENT":
        {
          this.likeComment(action.comment);
          break;
        }
        /* no default */
    }
  }

}

const commentsStore = new CommentsStore();
dispatcher.register(commentsStore.handleActions.bind(commentsStore));

export default commentsStore;
