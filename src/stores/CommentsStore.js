import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class Comment {
  constructor(text, author, coef, toWhom) {
    this.author = author;
    this.text = text;
    this.toWhom = toWhom;
    this.children = [];
    this.highlight = false;
    this.data_id = coef ? Date.now() + coef : Date.now();
    this.date = coef ? Date.now() + coef : Date.now();
    this.likes = coef ? 0 + coef : 0;
  }

  addLike() {
    this.likes += 1;
  }

  sethighlight(val) {
    this.highlight = val;
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

  highlight(comment) {
    comment.sethighlight(!comment.highlight);
    this.emit("change");
  }

  createComment(text, author, comment, toWhom) {
    if (comment) {
      comment.addChild(new Comment(text, author, null, toWhom));
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
          this.createComment(action.text, action.author, action.comment, action.toWhom);
          break;
        }
      case "LIKE_COMMENT":
        {
          this.likeComment(action.comment);
          break;
        }
      case "HIGHLIGHT_COMMENT":
        {
          this.highlight(action.comment);
          break;
        }
        /* no default */
    }
  }

}

const commentsStore = new CommentsStore();
dispatcher.register(commentsStore.handleActions.bind(commentsStore));

export default commentsStore;
