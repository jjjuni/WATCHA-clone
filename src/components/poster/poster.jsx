import styled from "styled-components";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Poster({movie}) {

  const navigate = useNavigate();

  return (
    <MoviePoster onClick={() => navigate(`/moviePage/${movie.id}`)}>
      <PosterImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieDate>{movie.release_date}</MovieDate>
    </MoviePoster>
  );
}

export default Poster;

const MoviePoster = styled.div`
  flex: 1 1 100%;
  max-width: 100%;
  
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  margin: 0 2px 5px 2px;
  gap:2px;

  transition: all 0.4s ease;

  @container poster-box (min-width: calc(150px * 2)){
    flex: 1 1 calc(100%/2 - 4px);
    max-width: calc(100%/2 - 4px);
  }
  @container poster-box (min-width: calc(150px * 3)){
    flex: 1 1 calc(100%/3 - 4px);
    max-width: calc(100%/3 - 4px);
  }
  @container poster-box (min-width: calc(150px * 4)){
    flex: 1 1 calc(100%/4 - 4px);
    max-width: calc(100%/4 - 4px);
  }
  @container poster-box (min-width: calc(150px * 5)){
    flex: 1 1 calc(100%/5 - 4px);
    max-width: calc(100%/5 - 4px);
  }
  @container poster-box (min-width: calc(150px * 6)){
    flex: 1 1 calc(100%/6 - 4px);
    max-width: calc(100%/6 - 4px);
  }
  @container poster-box (min-width: calc(150px * 7)){
    flex: 1 1 calc(100%/7 - 4px);
    max-width: calc(100%/7 - 4px);
  }
  @container poster-box (min-width: calc(150px * 8)){
    flex: 1 1 calc(100%/8 - 4px);
    max-width: calc(100%/8 - 4px);
  }
  @container poster-box (min-width: calc(150px * 9)){
    flex: 1 1 calc(100%/9 - 4px);
    max-width: calc(100%/9 - 4px);
  }
  @container poster-box (min-width: calc(150px * 10)){
    flex: 1 1 calc(100%/10 - 4px);
    max-width: calc(100%/10 - 4px);
  }

  container-name: movie-poster;
  container-type: inline-size;
`

const MovieTitle = styled.h2`

  font-family: ${props => props.font || 'Pretendard-Regular'};

  padding: 0 8px 0 8px;
  margin: 0 0 2px 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;
  min-height: 15px;
  color: #fff;
  box-sizing: border-box;
  font-size: 13px;
`

const MovieDate = styled.p`

  font-family: ${props => props.font || 'Pretendard-Regular'};

  padding: 0 8px 5px 8px;
  margin: 0;

  border-radius: 5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;
  min-height: 15px;
  color: #fff;
  box-sizing: border-box;
  font-size: 10px;
`

const PosterImage = styled.img`       // object-fit, aspect ratio 비율 맞추기

  flex: 1 1 calc(100% - 10px);
  max-width: calc(100% - 10px);

  margin: 5px;
  border-radius: 10px;
  box-sizing: border-box;

  min-width: 100px;

  transition: all 0.3s ease;

  aspect-ratio: 1/1.5;

  &:hover{
    filter: brightness(50%);
    cursor: pointer;
  }

  // @container movie-poster (min-width: 100px){
  //   height: 140cqw;
  // }
`;

Poster.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,

  }).isRequired
}