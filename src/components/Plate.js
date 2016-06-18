import React, { Component, PropTypes } from 'react';
import Finder from '../components/Finder';
import Card from '../components/Card';

export default class Plate extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { actions, rating } = this.props;
    const card = rating.data ? <Card rating={rating} /> : null;

    return (
      <div className="plate">
        <Finder actions={actions} rating={rating} />
        {card}
      </div>
    );
  }
}

Plate.propTypes = {};
