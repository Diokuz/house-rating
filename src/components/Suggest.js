import React, { Component, PropTypes } from 'react';
import superagent from 'superagent';
<<<<<<< c3f5b68737d85632412c37c8f8f6cfa1617b8fa8
=======
import Autosuggest from 'react-autosuggest';
>>>>>>> leaflet and superagend and some makeup

const apiUrl = 'http://139.59.141.142:8088/rating?id=';

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

export default class Suggest extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: '',
      suggestions: getSuggestions('')
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  handleClick(id) {
    this.props.actions.sendRequest(id);

    superagent.get(`${apiUrl}${id}`)
      .end((err, res) => {
        this.props.actions.setResult(res.body);
      });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} />
    );
  }
}
