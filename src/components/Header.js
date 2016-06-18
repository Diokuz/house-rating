import React, { Component, PropTypes } from 'react';
import Finder from '../components/Finder';

export default class Header extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <header className="header">
        <h1 className="header__title">Рейтинг домов</h1>
        <div className="header__about">О проекте</div>
      </header>
    );
  }
}

Header.propTypes = {};
