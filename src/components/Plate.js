import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import Finder from '../components/Finder';
import Suggest from '../components/Suggest';
import Card from '../components/Card';

export default class Plate extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { actions, rating } = this.props;

    return (
      <div className="plate">
        <Header />
        <Finder actions={actions} rating={rating} />
        <Suggest actions={actions} rating={rating} />
        <Card rating={rating} />
      </div>
    );
  }
}

Plate.propTypes = {};
