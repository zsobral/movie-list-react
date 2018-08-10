import React from 'react';
import axios from 'axios';
import { Plus } from 'react-feather';

import './MyListsPage.css';

import Button from '../../components/Button';
import { MyLists, MyListsItem } from '../../components/MyLists';

class MyListsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  async componentDidMount() {
    const response = await axios.get('/api/movie-lists/me');
    this.setState({
      lists: [...response.data]
    });
  }

  render() {

    const lists = this.state.lists.map(list => (
      <MyListsItem
        onClick={() => { this.props.history.push(`/lists/${list.id}`); }}
        key={list.id}
        list={list}
      />
    ));

    return (
      <div className="my-lists-page">
        <div className="header">
          <h1>Lists</h1>
          <Button to="/lists/new"><Plus /></Button>
        </div>
        <MyLists>
          {lists}
        </MyLists>
      </div>
    );
  }
}

export default MyListsPage;
