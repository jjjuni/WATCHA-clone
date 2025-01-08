import { useParams } from "react-router-dom";
import { useState } from "react"
import * as S from "../_style/page-style.js";
import styled from "styled-components";
import Credit from "../../components/movie/credit.jsx"

import { ClipLoader } from 'react-spinners';

import { axiosTMDBInstance } from "../../apis/axios-instance.js";
import useTitle from "../../hooks/useTitle.js";
import { useQuery } from "@tanstack/react-query";

function MoviePage() {
  const { movieId } = useParams();

  const getMovieData = async () => {
    return await axiosTMDBInstance.get(`/movie/${movieId}?language=ko-KR`);
  }
  const getCredit = async () => {
    return await axiosTMDBInstance.get(`/movie/${movieId}/credits?language=ko-KR`);
  }

  const { data: movieData, isLoading, isError } = useQuery({
    queryKey: ["getMovie", movieId],
    queryFn: getMovieData,
  })

  const { data: creditData } = useQuery({
    queryKey: ["getCredit", movieId],
    queryFn: getCredit,
  })

  const movie = movieData?.data;
  const credit = creditData?.data;

  const [creditHeight, setCreditHeight] = useState('400px');
  const [moreButtonDisplay, setMoreButtonDisplay] = useState('flex')

  const showMore = () => {
    setCreditHeight('none');
    setMoreButtonDisplay('none');
  }
  useTitle(movie?.title + ' | 왓챠', !isLoading)

  return (
    <S.ContentContainer>
      <S.ContentBox $padding={'0 0 60px 0'}>
        {isLoading? (
          <S.Loading>
            <ClipLoader 
              color="#FFFFFF"
              cssOverride={{}}
              loading
              size={35}
              speedMultiplier={0.7}
            />
          </S.Loading>
        ) : isError? (
          <S.Loading>에러!</S.Loading>
        ) : (
          <>
            <MovieDetail>
              <Title>{movie?.title}</Title>
              <DetailBox>
                <Detail>
                  <Info $color={"white"}>평균 {movie?.vote_average.toFixed(1)}</Info>
                  <Info>·</Info>
                  <Info>{movie?.release_date}</Info>
                  <Info>·</Info>
                  <Info>{Math.floor(movie?.runtime/60)}시간 {(movie?.runtime%60)}분</Info>
                  
                  {movie?.genres.map((genre) => (
                    <Detail key={genre.id}>
                      <Info>·</Info>
                      <Info>{genre.name}</Info>
                    </Detail>
                  ))}
                </Detail>
              </DetailBox>
              <Summary>{movie?.overview}</Summary>
              <Backdrop src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}/>
              <BackdropGradation></BackdropGradation>
            </MovieDetail>
            <CreditContainer $maxHeight={creditHeight}>
              <CreditTitle>감독/출연</CreditTitle>
              <CreditBox>
                {credit?.cast?.map((info) => (
                  <Credit key={info.id} info={info}/>
                ))}
              </CreditBox>
              <MoreCreditBackground $display={moreButtonDisplay}>
                <MoreCreditButton onClick={showMore}>더보기</MoreCreditButton>
              </MoreCreditBackground>
            </CreditContainer>
          </>
        )}
      </S.ContentBox>
    </S.ContentContainer>
  );
}

export default MoviePage;

const MovieDetail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 375px;
  box-sizing: border-box;

  border-bottom: 1px solid #1b1c1d;
`

const Backdrop = styled.img`
  position: absolute;
  right: 0;
  width: 70%;
  height: 100%;
  object-fit: cover;
`;

const BackdropGradation = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
              linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  pointer-events: none;
`

const Title = styled.h1`
  color: white;
  font-family: Pretendard-Regular;
  font-size: 40px;

  margin: 100px 40px 10px;

  z-index: 10;
`

const DetailBox = styled.div`
  display: flex;
  justify-content: start;

  margin: 0px 40px;

  z-index: 10;
`

const Detail = styled.div`
  display: flex;
  gap: 8px;
`

const Summary = styled.p`
  color: ${props => props.$color || '#84869D'};
  font-family: Pretendard-Regular;
  font-size: 15px;
  overflow: auto;


  width: 45%;
  padding: 20px 40px 75px;
  margin: 0;

  z-index: 10;

  box-sizing: border-box;

  @media(max-width: 850px){
    width: 100%;
  }
`

const Info = styled.p`
  color: ${props => props.$color || '#BABAC1'};
  font-family: Pretendard-Regular;
  font-size: 15px; 
`

const CreditContainer = styled.div`
  position: relative;
  max-height: ${props => props.$maxHeight || '400px'};
  overflow: hidden;
`

const MoreCreditBackground = styled.div`
  display: ${props => props.$display || 'flex'};
  justify-content: center;
  align-items: flex-end;
  border: 0px;
  
  background: linear-gradient(to top, black 0%, black 40%, rgba(0, 0, 0, 0));

  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
`
const MoreCreditButton = styled.button`
  background: none;
  border: 0px;

  color: #84869D;
  font-family: Pretendard-Regular;
  font-size: 15px;

  width: 100px;
  height: 50px;
  cursor: pointer;
`

const CreditBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 30px;
`

const CreditTitle = styled.h1`
  color: ${props => props.$color || 'white'};
  font-family: Pretendard-Regular;
  font-size: 25px;
  margin: 30px;
`