import React, { Component, PropTypes } from 'react';

const apiUrl = 'http://139.59.141.142:8088/rating?id=1';

export default class Finder extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.actions.sendRequest('building_id');

    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        this.props.actions.setResult(json.total);
      }).catch(err => {
        this.props.actions.setResult(13);
      });
    }

  render() {
    return (
      <form className="finder" onSubmit={e => this.handleSubmit(e)}>
        <div className="finder__input-wrapper">
          <input className="finder__input" type="text" name="id" placeholder="Адрес дома" />
        </div>
        <div className="rating">{this.props.rating}</div>
      </form>
    );
  }
}

Finder.propTypes = {};
