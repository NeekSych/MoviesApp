import React from 'react';
import { Button, Card, Flex, Typography} from 'antd';
import { format, parseISO } from 'date-fns';
import './Card.css'
const {Text, Link} = Typography
function Cards(props){
    const srcImg = `https://image.tmdb.org/t/p/w185${props.moviesProps.poster_path}`;
    const parsedDate = parseISO(props.moviesProps.release_date);
    const formattedDate = format(parsedDate, "MMMM d,  yyyy");
    const cardDescription = function(text){
        if (text.length<=160){
            return text
        }
        const lastSpace = text.lastIndexOf(' ', 160);

        if (lastSpace === -1) {
            return `${text.slice(0, 160)} ...`; 
        }

        return `${text.slice(0, lastSpace)}   ...`;
    }
    return(
  <Card
    hoverable
    className = 'card' 
>
    <Flex
    className = 'card__flex'>
      <img
        alt="avatar"
        src= {srcImg}
        className="card__image"
      />
      <Flex
        vertical align="flex-start"
        className="card__info"
      >
        <Typography.Title 
        level={4}
        className='card__title'>
          {props.moviesProps.title}
        </Typography.Title>
        <Text
        className='card__date'>{formattedDate}</Text>
        <div className='card__genres'>
        {props.moviesProps.genres.map((elem)=>{
            return (
            <Text code id={elem.id}>{elem.name}res</Text>
                )
        }
        )}
        </div>
        <Text className='card__description'>{cardDescription(props.moviesProps.overview)}</Text>
      </Flex>
    </Flex>
  </Card>
)};
export default Cards;