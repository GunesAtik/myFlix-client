import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <Card>
          <Card.Img className='movie-poster' variant="top" src={movie.ImagePath} />
          <Card.Title className='label-title'>{movie.Title}</Card.Title>
          <Card.Body>
            <Card.Text className='label-body'>{movie.Description}</Card.Text>
            <Card.Text className='label-body'>Director: {movie.Director.Name}</Card.Text>
            <Card.Text className='label-body'>Genre: {movie.Genre.Name}</Card.Text>
          </Card.Body>
          <Button className='return-button' variant='dark' onClick={() => window.open("/", "_self")}>Return to Movie List</Button>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Year: PropTypes.number,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Biography: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birthdate: PropTypes.string
    }),
    Featured: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

//<Link to={`/directors/${movie.Director.Name}`}>
  //<Button variant="link">Director</Button>
//</Link>

//<Link to={`/genres/${movie.Genre.Name}`}>
//  <Button variant="link">Genre</Button>
//</Link>