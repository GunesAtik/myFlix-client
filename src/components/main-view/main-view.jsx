import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'
import { BrowserRouter as Router, Route } from "react-router-dom";
//import './main-view.scss'

import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';


export class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: "",
    };
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onButtonClick() {
    this.setState({
      selectedMovie: null
    });
  }

  getMovies(token) {
    axios.get('https://myflixxx.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    return (
      <Router>
        <div className='main-view'>
          <Navbar bg='dark' variant='dark'>
            <Nav className='justify-content-center'>
              <Nav.Item>
                <Nav.Link target='_blank' href='#Home'>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link target='_blank' href='#Directors'>Directors</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link target='_blank' href='#Genres'>Genres</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='logout-button' target='_blank' href='#Home'>Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies && movies.map(m => <MovieCard key={m._id} movie={m} />)
          }
          } />
          <Route path="/register" render={() => <RegisterView />} />
          <Route path="/movies/:movieId" render={({ match }) => movies && <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />
        </div>
      </Router>
    );
  }
}
