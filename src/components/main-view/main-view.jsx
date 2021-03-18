import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'

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
      user: null,
      register: null
    };
  }

  componentDidMount() {
    axios
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onRegister(register) {
    this.setState({
      register
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

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />

    if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />

    if (!movies) return <div className='main-view'></div>;

    return (
      <React.Fragment>
        <div className='main-view'>
          <header>
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
          </header>
          <div className='main-body text-center'>
            {selectedMovie ? (
              <MovieView
                movie={selectedMovie}
                onClick={() => this.onButtonClick()}
              />
            ) : (
                <Container>
                  <Row>
                    {movies.map((movie) => (
                      <Col xs={12} sm={6} md={4} key={movie._id}>
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          onClick={(movie) => this.onMovieClick(movie)}
                        />
                      </Col>
                    ))}
                  </Row>
                </Container>
              )}
          </div>
          <div className='test'></div>
        </div>
      </React.Fragment>
    );
  }
}