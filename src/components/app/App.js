import React, {Component} from "react";
import Cards from "../card/Card.js"
import './App.css'
import {Spin, Input, Tabs, Alert} from  'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons'; 
const apiUrl = `https://api.themoviedb.org/3/movie/11?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 196,
      top:200
    }}
    spin 
  />
);


class App extends Component{
  state = {
    movies: [],
    isLoading: true,
    error: false,
  }
  onError = ()=>{
    this.setState({
      error: true,
      isLoading: false,
      
    });
  }
  
  componentDidMount(){
    fetch(apiUrl)
    .then((response)=>{
      if(!response.ok){
        throw new Error('Ошибка при получении данных')
      }
      return response.json()
    })
    .then((data)=>{
      this.setState({movies: data, isLoading: false})
      
    })
    .catch(this.onError)
  }
  render(){
    const {movies, isLoading, error} = this.state;
    const spin = isLoading ? <Spin indicator={antIcon} /> : null;
    const cardsList = !isLoading&&!error? 
    <>
      <Cards moviesProps={movies} />
      <Cards moviesProps={movies} />
      <Cards moviesProps={movies} />
      <Cards moviesProps={movies} />
      <Cards moviesProps={movies} />
      <Cards moviesProps={movies} />
    </>:null
    const showAlert =error ?
    <>
    <Alert
    message="EWH-EWH!"
    description="it's comething wrong, ya"
    type="error"
    showIcon
  />
  </>:null
 
return(
      
      <div className="container">
      <Input placeholder="Type to search..." />
      {showAlert}
      {spin}
      {cardsList}
      </div>

    )
}}
export default App;