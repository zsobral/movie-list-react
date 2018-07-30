import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './ListBuilderPage.css';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  ListBuilder,
  ListBuilderItem
} from '../../components/ListBuilder';
import {
  removeMovie,
  setTitle,
  reset as resetList,
  saveListRequest
} from '../../store/listBuilder';

class ListBuilderPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleCancelClick() {
    this.props.resetList();
    this.props.history.push('/lists');
  }

  handleSaveClick() {
    this.props.saveList();
  }

  handleTitleInput(event) {
    this.props.setTitle(event.target.value)
  }

  render() {

    if (this.props.done) {
      return <Redirect to="/lists" />
    }

    const listBuilderItems = this.props.movies.map((movie, index) =>
      <ListBuilderItem key={movie.id} movie={movie} onRemoveClick={() => { this.props.removeMovie(index) }} />
    );

    return (
      <div className="list-builder-page">
        <Input
          value={this.props.title}
          onChange={this.handleTitleInput}
          placeholder="List title"
        />
        <ListBuilder>
          {listBuilderItems}
        </ListBuilder>
        <div className="list-builder-page-actions">
          <Button secondary onClick={this.handleCancelClick}>CANCEL</Button>
          <Button to="/movies/search">ADD</Button>
          <Button loading={this.props.loading} onClick={this.handleSaveClick}>SAVE</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.listBuilder.movies,
  title: state.listBuilder.title,
  loading: state.listBuilder.fetching,
  done: state.listBuilder.done
});

const mapDispatchToProps = dispatch => ({
  removeMovie: index => dispatch(removeMovie(index)),
  setTitle: title => dispatch(setTitle(title)),
  resetList: () => dispatch(resetList()),
  saveList: () => dispatch(saveListRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ListBuilderPage);
