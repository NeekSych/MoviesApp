import React, { Component } from 'react'
import _ from 'lodash'
import './rated.css'
import Cards from '../card/Card'
class RatedMovies extends React.Component {
  state = {
    ratedMovies: [],
  }

  componentDidMount() {
    const ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || []
    this.setState({ ratedMovies })
  }
  render() {
    const { ratedMovies } = this.state
    return (
      <div className="container">
        {ratedMovies.map((movie) => (
          <Cards key={movie.id} rating={movie.rating} movieProps={movie} />
        ))}
      </div>
    )
  }
}
export default RatedMovies
