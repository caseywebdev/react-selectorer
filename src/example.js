import React from 'react';
import ReactDOM from 'react-dom';
import {Selector, SingleSelector} from '.';

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
  state = {
    options: NAMES,
    query: ''
  };

  handleSelect(index) {
    this.handleQuery(this.state.options[index]);
  }

  handleQuery(query) {
    if (!query) query = '';
    const needle = query.toLowerCase().trim();
    const filter = option => option.toLowerCase().indexOf(needle) > -1;
    this.setState({query, options: NAMES.filter(filter)});
  }

  renderOption({props, index, isActive}) {
    return (
      <div
        {...props}
        className={['rs-option'].concat(
          isActive ? 'rs-option-active' : []
        ).join(' ')}
      >
        {this.state.options[index]}
      </div>
    );
  }

  render() {
    return (
      <Selector
        length={this.state.options.length}
        onQuery={::this.handleQuery}
        onSelect={::this.handleSelect}
        optionRenderer={::this.renderOption}
        placeholder='Search by first name...'
        query={this.state.query}
      />
    );
  }
}

class SingleSelectorExample extends React.Component {
  state = {
    options: NAMES
  };

  handleChange(value) {
    this.setState({value});
  }

  handleQuery(query) {
    if (!query) query = '';
    const needle = query.toLowerCase().trim();
    const filter = option => option.toLowerCase().indexOf(needle) > -1;
    this.setState({query, options: NAMES.filter(filter)});
  }

  render() {
    return (
      <SingleSelector
        onQuery={::this.handleQuery}
        onChange={::this.handleChange}
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
