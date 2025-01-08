import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = ({data}) => {
  
  const navigate = useNavigate();

  return(
    <CardContainer onClick={() => navigate(`/moviePage/${data.id}`)}>
      <CardImg src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}/>
      <MovieInfoBox>
        <MovieInfoWrapper>
          <MovieTitle>
            {data.title}
          </MovieTitle>
          <Info>
            평점 | {parseFloat(data.vote_average.toFixed(1))}
          </Info>
          <Info>
            {data.overview}
          </Info>
        </MovieInfoWrapper>
      </MovieInfoBox>
    </CardContainer>
  )
}

export default Card;

const CardContainer = styled.div`

  position: relative;
  display: flex;
  
  background-color: rgba(0, 0, 0, 0);

  height: 100%;
  
  aspect-ratio: 5/3;

  box-sizing: border-box;

  cursor: pointer;
  z-index: 1;
  &:hover{
    scale: 1.2;
    z-index: 10;
    transition-duration: 1.3s;
  }

  transition: all 0.4s ease;
`

const CardImg = styled.img`
  display: flex;
  width: 100%;
  padding: 3px;

  box-sizing: border-box;  

  border-radius: 8px;
  
`

const MovieInfoBox = styled.div`
  position: absolute;
  width: calc(100% - 6px);
  height: calc(100% - 6px);

  margin: 3px;
  
  border-radius: 5px;

  background-color: rgba(0, 0, 0, 0.5);
  
  opacity: 0;

  &:hover{
    opacity: 1;
  }

  box-sizing: border-box;

  transition: all 0.3s ease;
`

const MovieInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
`

const MovieTitle = styled.p`
  font-family: var(--font-default);
  color: white;
  text-align: center;

  width: 75%;

  padding: 0 0 10px;

  border-bottom: 1px solid #a3a3a3;

  font-size: 15px;
  margin: 30px 0 0;

  filter: none;
`

const Info = styled.p`
  font-family: var(--font-default);
  font-size: 11px;
  color: white;
  text-align: center;

  width: 75%;
  max-height: 27%;

  overflow: hidden;

  display: -webkit-box;
  -webkit-line-clamp: 4; /* 보여줄 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`