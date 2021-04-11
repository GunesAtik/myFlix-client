import React from 'react';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className='director-description'>
        <p>Director Description</p>
        <p>{movie.director.name}</p>
        <p>{movie.director.bio}</p>
        <p>Birth: {movie.director.birth}</p>
        <p>{movie.director.death ? `Death: ${movie.director.death}` : ''}</p>
      </div>
    );
  }
}