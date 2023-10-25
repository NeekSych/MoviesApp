import React, { Component } from "react";
import Cards from "../card/Card.js";
import "./App.css";
import { Spin, Input, Pagination, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";

const apiUrl = `https://api.themoviedb.org/3/search/movie?query=Jar&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 196,
      top: 200,
    }}
    spin
  />
);

class App extends Component {
  state = {
    movies: [],
    isLoading: false,
    error: false,
    searchText: "",
    totalResults: 0,
    currentPage: 1,
  };

  searchUrl = (text) =>
    `https://api.themoviedb.org/3/search/movie?query=${text}&api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`;
  // componentDidMount(){
  //   fetch(apiUrl)
  //   .then((response)=>{
  //     if(!response.ok){
  //       throw new Error('Ошибка при получении данных')
  //     }
  //     return response.json()
  //   })
  //   .then((data)=>{
  //     // fetch(https://api.themoviedb.org/3/movie/343611?&append_to_response=videos&api_key=6528ce5549843254c5037761d14d9e6e)
  //     this.setState({movies: data, isLoading: false})

  //   })
  //   .catch(this.onError)
  // }
  onError(error) {
    this.setState({
      error: true,
      errorMessage: error.message,
      isLoading: false,
    });
  }

  handleSearch = (event) => {
    const searchText = event.target.value;
    this.setState({ searchText });

    if (searchText) {
      this.debouncedSearch(searchText, 1);
    }
  };

  debouncedSearch = _.debounce((text, page) => {
    this.setState({ isLoading: true, error: false });

    fetch(this.searchUrl(text))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          isLoading: false,
          totalResults: data.total_results,
          currentPage: page,
        });
      })
      .catch(() => {
        this.setState({ error: true, isLoading: false });
      });
  }, 300);

  handlePageChange = (page) => {
    this.setState({ isLoading: true });
    this.debouncedSearch(this.state.searchText, page);
  };

  render() {
    const { movies, isLoading, error, searchText, totalResults, currentPage } =
      this.state;
    console.log(movies.results);
    const loader = isLoading && <Spin indicator={antIcon} />;
    const errorMessage = error && (
      <Alert
        message="EWH-EWH!"
        description="it's comething wrong, ya"
        type="error"
        showIcon
      />
    );
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
    );

    return (
      <div className="container">
        <Input
          placeholder="Type to search..."
          value={searchText}
          onChange={this.handleSearch}
        />
        {loader}
        {errorMessage}
        {!isLoading && !error ? searchResults : null}
      </div>
    );
  }
}
export default App;
