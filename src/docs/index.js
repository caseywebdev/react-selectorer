import React from 'react';
import ReactDOM from 'react-dom';

import rs from '../index.js';

const NAMES = [
  'Shanelle',
  'Stacy',
  'Euna',
  'Lucy',
  'Latia',
  'Merry',
  'Celestina',
  'Sherie',
  'Jonathon',
  'Mao',
  'Viva',
  'Tomasa',
  'Lesha',
  'Mohammed',
  'Mavis',
  'Ara',
  'Lidia',
  'Novella',
  'Tinisha',
  'Virgen',
  'Myles',
  'Lucrecia',
  'Claudie',
  'Tamra',
  'America',
  'Dionna',
  'Elicia',
  'Louann',
  'Rufina',
  'Charissa',
  'Tish',
  'Willis',
  'Mohammad',
  'Adelia',
  'Terresa',
  'Jody',
  'Wm',
  'Myrle',
  'Honey',
  'Hyon',
  'Harmony',
  'Lamont',
  'Ivette',
  'Kasi',
  'Danyell',
  'Santo',
  'Mui',
  'Owen',
  'Emmanuel',
  'Colby'
];

class SelectorExample extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      options: NAMES,
      query: ''
    };
  }

  handleSelect(index) {
    this.handleQueryChange(this.state.options[index]);
  }

  handleQueryChange(query) {
    if (!query) query = '';
    const needle = query.toLowerCase().trim();
    const filter = option => option.toLowerCase().indexOf(needle) > -1;
    this.setState({ query, options: NAMES.filter(filter) });
  }

  renderOption({ props, index, isActive }) {
    return (
      <div {...props}>
        {this.state.options[index]}{isActive && ' [isActive]'}
      </div>
    );
  }

  render() {
    return (
      <rs.Selector
        length={this.state.options.length}
        onQueryChange={this.handleQueryChange.bind(this)}
        onSelect={this.handleSelect.bind(this)}
        optionRenderer={this.renderOption.bind(this)}
        placeholder='Search by first name...'
        query={this.state.query}
      />
    );
  }
}

class SingleSelectorExample extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { options: NAMES };
  }

  handleChange(value) {
    this.setState({ value });
  }

  handleQueryChange(query) {
    if (!query) query = '';
    const needle = query.toLowerCase().trim();
    const filter = option => option.toLowerCase().indexOf(needle) > -1;
    this.setState({ query, options: NAMES.filter(filter) });
  }

  render() {
    return (
      <rs.SingleSelector
        onQueryChange={this.handleQueryChange.bind(this)}
        onChange={this.handleChange.bind(this)}
        options={this.state.options}
        placeholder='Search by first name...'
        query={this.state.query}
        value={this.state.value}
      />
    );
  }
}

ReactDOM.render(<SelectorExample />, document.getElementById('a'));
ReactDOM.render(<SingleSelectorExample />, document.getElementById('b'));
ReactDOM.render(<SingleSelectorExample />, document.getElementById('c'));
