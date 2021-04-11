import React from 'react';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className='genre-description'>
        <p>Genre Description</p>
        <p>{movie.genre.name}</p>
        <p>{movie.genre.description}</p>
      </div>
    );
  }
}