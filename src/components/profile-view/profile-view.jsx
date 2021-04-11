import React, { useState } from "react";
import PropTypes from "prop-types";
import "./profile-view.scss";

import {
  Form,
  Button,
  Container,
  Card,
  Tab,
  Tabs
} from 'react-bootstrap'

import { Link } from "react-router-dom";

import axios from "axios";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }


  getUser(token) {
    let url =
      "https://myflixxx.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://myflixxx.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      });
  }

  handleDelete() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(
        `https://myflixxx/users/${user}`, { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(user + " has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    // this.getUser(localStorage.getItem("token"));
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    if (!movies) alert("Sign in");
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Form>
                <h1>Details</h1>
                <Form.Group>
                  <h3>Username: </h3>
                  <Form.Label>{this.state.username}</Form.Label>
                </Form.Group>
                <Form.Group>
                  <h3>Email:</h3>
                  <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>
                <Form.Group>
                  <h3>Date of Birth:</h3>
                  <Form.Label>{this.state.dob}</Form.Label>
                </Form.Group>
                <Link to={`/update/${this.state.username}`}>
                  <Button>
                    Edit Profile
                    </Button>
                </Link>
                <Link to={`/`}>
                  <Button>
                    Back to Main
                  </Button>
                </Link>
                <Button
                  onClick={() => this.handleDelete()}
                >
                  Delete Account
                </Button>

              </Form>
            </Col>
            <Col>
              <div>
                <h1>Favorite Movies</h1>
                {favoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card>
                        <Card.Img src={movie.ImagePath} />
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button onClick={() => this.removeFavorite(movie)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};