import React, { Component, PropTypes } from 'react';

const apiUrl = 'http://139.59.141.142:8088/rating?id=';

export default class Suggest extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleClick(id) {
    this.props.actions.sendRequest(id);

    fetch(`${apiUrl}${id}`)
      .then(res => res.json())
      .then(json => {
        this.props.actions.setResult(json.total);
      }).catch(err => {
        this.props.actions.setResult(13);
      });
  }

  render() {
    const { rating: { suggest } } = this.props;

    if (!suggest || !suggest.length) {
      return null;
    }

    const suggestElements = suggest.map(item => {
      return (
        <div
          onClick={this.handleClick.bind(this, item.hint.id)}
          className="suggest__element">

          {item.hint.text}
        </div>
      );
    });

    return (
      <div className="suggest" onSubmit={e => this.handleSubmit(e)}>
        {suggestElements}
      </div>
    );
  }
}
