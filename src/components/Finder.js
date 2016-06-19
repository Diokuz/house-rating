import React, { Component, PropTypes } from 'react';
import Suggest from '../components/Suggest';

const apiUrl = 'http://139.59.141.142:8088/rating?id=1';
const suggestApi = 'https://catalog.api.2gis.ru/2.0/suggest/list?key=ruczoy1743&region_id=32&lang=ru&q='

export default class Finder extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.props.actions.sendRequest('building_id');

    // fetch(apiUrl)
    //   .then(res => res.json())
    //   .then(json => {
    //     this.props.actions.setResult(json.total);
    //   }).catch(err => {
    //     this.props.actions.setResult(13);
    //   });
  }

  handleTyping(e) {
    const text = e.target.value;
    const url = `${suggestApi}${text}`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.meta.code != 200) {
          throw new Error('500');
        }

        return json.result && json.result.items || [];
      })
      .then(items => {
        this.props.actions.setSuggest(items);
      }).catch(err => console.log('err', err));
  }

  render() {
    return (
      <form className="finder" onSubmit={e => this.handleSubmit(e)}>
        <div className="finder__input-wrapper">
          <input
            autoComplete="off"
            ref="text"
            onKeyUp={e => this.handleTyping(e)}
            className="finder__input"
            type="text"
            name="address"
            placeholder="Адрес дома" />
        </div>
      </form>
    );
  }
}

Finder.propTypes = {};

Finder.defaultProps = {
  rating: {}
};
