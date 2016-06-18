import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleShare() {
    // @todo sharing
  }

  render() {
    const { rating } = this.props;
    const data = rating && rating.data || {}
    const address = data.address;
    const total = data.auto && data.auto.details.driveToCenterTime;

    return (
      <article className="card">
        <section className="card__body">
          <header className="card__header">
            {address}
          </header>

          <div className="card__body-inner">
            <div className="card__value">
              {total}
            </div>
            <div className="card__hint">
              {'Входит в 18% '}
              <span className="card__mark _best">
                лучших
              </span>
              {' домов Москвы'}
            </div>

            <div className="card__shared" onClick={this.handleShare}>
              Поделиться с друзьями
            </div>
          </div>
        </section>

        <section className="card__rating">
          <div className="card__line">
            <div className="card__line-cut">
              <div className="card__line-rating">9.6</div>
              <div className="card__line-desc">Отличная экология</div>
            </div>
          </div>
          <div className="card__line">
            <div className="card__line-cut">
              <div className="card__line-rating">8.9</div>
              <div className="card__line-desc">Удалённость</div>
            </div>
          </div>
          <div className="card__line">
            <div className="card__line-cut">
              <div className="card__line-rating">7.6</div>
              <div className="card__line-desc">Образование</div>
            </div>
          </div>
          <div className="card__line">
            <div className="card__line-cut">
              <div className="card__line-rating">7.2</div>
              <div className="card__line-desc">Развитая</div>
            </div>
          </div>
        </section>
      </article>
    );
  }
}

Card.propTypes = {};
