import React, { Component } from 'react'
import _ from 'lodash'
import './App.css'
import { Spin, Input, Pagination, Alert, Tabs } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Cards from '../card/Card.js'

const apiUrl = `https://api.themoviedb.org/3/search/movie?query=Jar&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 196,
      top: 200,
    }}
    spin
  />
)

class App extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: false,
    searchText: '',
    totalResults: 0,
    currentPage: 1,
  }

  searchUrl = (text) =>
    `https://api.themoviedb.org/3/search/movie?query=${text}&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`

  onError(error) {
    this.setState({
      error: true,
      errorMessage: error.message,
      isLoading: false,
    })
  }
  componentDidMount() {
    const favorites = localStorage.getItem('favorites')
    if (!favorites) {
      localStorage.setItem('favorites', JSON.stringify([]))
    }
  }
  handleSearch = (event) => {
    const searchText = event.target.value
    this.setState({ searchText })

    if (searchText) {
      this.debouncedSearch(searchText, 1)
    }
  }

  debouncedSearch = _.debounce((text, page) => {
    this.setState({ isLoading: true, error: false })

    fetch(this.searchUrl(text))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          isLoading: false,
          totalResults: data.total_results,
          currentPage: page,
        })
      })
      .catch(() => {
        this.setState({ error: true, isLoading: false })
      })
  }, 300)

  handlePageChange = (page) => {
    this.setState({ isLoading: true })
    this.debouncedSearch(this.state.searchText, page)
  }

  render() {
    const { movies, isLoading, error, searchText, totalResults, currentPage } =
      this.state
    const loader = isLoading && <Spin indicator={antIcon} />
    const errorMessage = error && (
      <Alert
        message="EWH-EWH!"
        description="it's comething wrong, ya"
        type="error"
        showIcon
      />
    )
    const searchResults = (
      <>
        {movies.map((movie) => (
          <Cards key={movie.id} movieProps={movie} />
        ))}
        <Pagination
          current={currentPage}
          total={totalResults}
          onChange={this.handlePageChange}
          pageSize={6} // Зависит от API, сколько результатов на странице
        />
      </>
    )

    return (
      <div className="container">
        <Input
          placeholder="Type to search..."
          value={searchText}
          onChange={this.handleSearch}
        />
        <Tabs />
        {loader}
        {errorMessage}
        {!isLoading && !error ? searchResults : null}
      </div>
    )
  }
}
export default App
