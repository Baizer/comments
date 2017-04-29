import React, { Component } from 'react';

export default class CommentsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: "",
      comment: props.comment || undefined
    };
  }

  handleChange(event) {

    const target = event.target,
      value = target.value,
      name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleForm(event) {
    event.preventDefault();

    const { text, author } = this.state;

    if (!text || !author) {
      return;
    };

    this.setState({
      text: "",
      author: ""
    });

    if (this.props.toggleForm) {
      this.props.toggleForm(event);
    };

    this.props.createComment(text, author, this.props.comment);
  }


  render() {
    return (
      <form className="commentsForm">
        <div className="text">
          <textarea placeholder="Comment" name="text"  value={this.state.text}onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="name">
          <input placeholder="Name" value={this.state.author} name="author" onChange={this.handleChange.bind(this)}/>
        </div>
        <div className="submit">
          <button onClick={this.handleForm.bind(this)}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}
