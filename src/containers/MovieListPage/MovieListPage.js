import React from 'react';
import axios from 'axios';

import { MovieList, MovieListItem } from '../../components/MovieList';

class MovieListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  async componentDidMount() {
    const movieListId = this.props.match.params.id;
    try {
      const response = await axios.get(`/api/movie-lists/${movieListId}`);
      this.setState({
        movies: response.data.movies
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const movies = this.state.movies.map(movie => (
      <MovieListItem key={movie.id} movie={movie} />
    ));

    return (
      <MovieList>
        {movies}
      </MovieList>
    );
  }

}

export default MovieListPage;
