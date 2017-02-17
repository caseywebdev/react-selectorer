import React from 'react';
import ReactDOM from 'react-dom';
import ReactSelectorer from '.';

const {SingleSelector} = ReactSelectorer;

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

class Example extends React.Component {
  state = {
    options: NAMES
  };

  handleChange(value) {
    this.setState({value});
  }

  handleQuery(query) {
    query = (query || '').toLowerCase().trim();
    const filter = option => option.toLowerCase().indexOf(query) > -1;
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

ReactDOM.render(<Example />, document.getElementById('a'));
ReactDOM.render(<Example />, document.getElementById('b'));
ReactDOM.render(<Example />, document.getElementById('c'));
