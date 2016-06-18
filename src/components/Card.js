import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <article className="card">
        {this.props.rating.data}
      </article>
    );
  }
}

Card.propTypes = {};
