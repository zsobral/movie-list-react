import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Input from '../../components/Input';
import { MovieGrid, MovieGridItem } from '../../components/MovieGrid';
import { addMovie } from '../../store/listBuilder';

class MovieSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      movies: [],
      query: ''
    };
    this.handleQueryInput = this.handleQueryInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddMovie = this.handleAddMovie.bind(this);
  }

  handleQueryInput(e) {
    this.setState({
      query: e.target.value
    });
  }

  async handleSearch(e) {
    if (e.key !== 'Enter') {
      return;
    }

    if (!this.state.query || this.state.loading) {
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await axios
        .get('/api/tmdb/movies', {
          params: {
            query: this.state.query
          }
        });
      this.setState({
        loading: false,
        movies: response.data
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  handleAddMovie(movie) {
    this.props.addMovie(movie);
    this.props.history.push('/lists/new');
  }

  render() {
    const movieGridItems = this.state.movies.map(movie => (
      <MovieGridItem style={{ cursor: 'pointer' }} key={movie.id} movie={movie} onClick={() => { this.handleAddMovie(movie) }} />
    ));
    return (
      <div className="movie-search">
        <Input
          loading={this.state.loading}
          autoFocus
          placeholder="enter a movie title"
          onChange={this.handleQueryInput}
          onKeyPress={this.handleSearch}
        />
        <MovieGrid>
          {movieGridItems}
        </MovieGrid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addMovie: (movie) => dispatch(addMovie(movie))
});

export default connect(null, mapDispatchToProps)(MovieSearchPage);
