import React, { Component } from 'react'
import GenreContext from '../genrecontext'
import { Card, Flex, Typography, Progress, Space, Rate } from 'antd'
import { format, parseISO } from 'date-fns'
import './Card.css'

const { Text, Title } = Typography
//  const apiMovieURL = `https://api.themoviedb.org/3/movie/343611?&append_to_response=videos&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
class Cards extends Component {
  constructor(props) {
    super(props)
    const { rating } = props
    this.state = {
      rating: rating || 0,
    }
  }
  static contextType = GenreContext

  handleRating = (value) => {
    const { movieProps } = this.props
    this.setState({ rating: value })

    let ratedMovies = JSON.parse(localStorage.getItem('ratedMovies')) || []
    const found = ratedMovies.find((movie) => movie.id === movieProps.id)
    if (found) {
      ratedMovies = ratedMovies.map((movie) =>
        movie.id === movieProps.id ? { ...movie, rating: value } : movie,
      )
    } else {
      ratedMovies.push({ ...movieProps, rating: value })
    }
    localStorage.setItem('ratedMovies', JSON.stringify(ratedMovies))
  }
  voteColor = (rating) => {
    if (rating <= 3) return '#E90000'
    if (rating <= 5) return '#E97E00'
    if (rating <= 7) return '#E9D100'
    return '#66E900'
  }

  render() {
    const genres = this.context
    const {
      poster_path,
      release_date,
      title,
      overview,
      genre_ids,
      vote_average,
    } = this.props.movieProps
    const srcImg = `https://image.tmdb.org/t/p/w185${poster_path}`
    let formattedDate = ''
    if (release_date) {
      const parsedDate = parseISO(release_date)
      formattedDate = format(parsedDate, 'MMMM d, yyyy')
    }

    const cardDescription = (text) => {
      const shortened = text.length <= 160 ? text : `${text.slice(0, 160)} ...`
      return shortened
    }

    const genreNames = genre_ids.map((genreId) => {
      const genreObj = genres.find((genre) => genre.id === genreId)
      return genreObj ? genreObj.name : 'Unknown'
    })
    return (
      <Card hoverable className="card">
        <Flex className="card__flex">
          <img alt="avatar" src={srcImg} className="card__image" />
          <Flex vertical align="flex-start" className="card__info">
            <div className="card__main">
              <Title level={4} className="card__title">
                {title}
              </Title>
              <Progress
                className="card__progress"
                type="circle"
                percent={Math.floor(vote_average * 10)}
                strokeColor={this.voteColor(vote_average)}
                strokeWidth={3}
                size={30}
                format={(percent) => `${percent / 10}`}
              />
            </div>
            <Text className="card__date">{formattedDate}</Text>
            <Rate onChange={this.handleRating} value={this.state.rating} />
            <div className="card__genres">
              {genreNames.map((genreName) => {
                return (
                  <Text code id={genreName.id}>
                    {genreName}
                  </Text>
                )
              })}
            </div>
            <Text className="card__description">
              {cardDescription(overview)}
            </Text>
          </Flex>
        </Flex>
      </Card>
    )
  }
}
export default Cards
