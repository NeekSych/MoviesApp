import React, { Component } from 'react'
import { Card, Flex, Typography } from 'antd'
import { format, parseISO } from 'date-fns'
import './Card.css'

const { Text, Title } = Typography
const apiMovieURL = `https://api.themoviedb.org/3/movie/343611?&append_to_response=videos&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`
class Cards extends Component {
  render() {
    const { poster_path, release_date, title, overview, genre_ids } =
      this.props.movieProps
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
    return (
      <Card hoverable className="card">
        <Flex className="card__flex">
          <img alt="avatar" src={srcImg} className="card__image" />
          <Flex vertical align="flex-start" className="card__info">
            <Title level={4} className="card__title">
              {title}
            </Title>
            <Text className="card__date">{formattedDate}</Text>
            <div className="card__genres">
              {genre_ids.map((genre) => {
                return (
                  <Text code id={genre.id}>
                    {genre.name}
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
