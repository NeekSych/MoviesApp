import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App'
import RatedMovies from './components/rated/rated'
import GenreContext from './components/genrecontext'
import './index.css'
import { Tabs } from 'antd'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
    }
  }
  onChange = (key) => {
    console.log('ewh')
  }
  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`,
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ genres: data.genres })
      })
      .catch((error) => {
        console.error('Error fetching genres:', error)
      })
  }
  items = [
    {
      key: '1',
      label: 'All',
      children: <App />,
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedMovies />,
    },
  ]
  render() {
    const { genres } = this.state
    return (
      <GenreContext.Provider value={genres}>
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            items={this.items}
            onChange={this.onChange}
          />
        </div>
      </GenreContext.Provider>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Main />)
