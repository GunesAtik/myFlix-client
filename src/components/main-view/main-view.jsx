import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      user: null
    };
  }

  getMovies() {
    /* ... */
  }


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    ...
  }

  render() {
    const { movies, user } = this.state;


    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />
          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />
        </div>
      </Router>
    );
  }
}