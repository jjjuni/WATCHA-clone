import * as S from "./_style/page-style";
import styled from "styled-components";
import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
import CardList from "../components/list/card-list";
import { axiosTMDBInstance } from "../apis/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaRedoAlt } from "react-icons/fa";

function HomePage() {

  useTitle("왓챠");
  const navigate = useNavigate();

  const { data: nowPlayingMovieData, isPending: isPending_1 } = useQuery({
    queryKey: ["getMovies", "now_playing"],
    queryFn: () => getMovies("now_playing"),
  });

  const { data: popularMovieData, isPending: isPending_2 } = useQuery({
    queryKey: ["getMovies", "popular"],
    queryFn: () => getMovies("popular"),
  });

  const [mainMovie, setMainMovie] = useState(popularMovieData?.data?.results[Math.floor(Math.random() * 20)]);

  useEffect(() => {
    setMainMovie(popularMovieData?.data?.results[Math.floor(Math.random() * 20)])
  }, [popularMovieData])

  const [isInThrottle, setIsInThrottle] = useState(false);

  const getMovies = async (category) => {
    return await axiosTMDBInstance.get(
      `/movie/${category}?language=ko-KR&page=1`
    );
  };

  const changeMovie = () => {
    
    if (isInThrottle){
      return
    }
    setIsInThrottle(true);
    
    setMainMovie(popularMovieData?.data?.results[Math.floor(Math.random() * 20)])

    setTimeout(() => {
      setIsInThrottle(false);
    }, 500)
  }

  return (
    <>
      <S.ContentContainer>
        {isPending_2 ? (
          <MainLoading>
            <ClipLoader
              color="#FFFFFF"
              cssOverride={{}}
              loading
              size={35}
              speedMultiplier={0.7}
            />
          </MainLoading>
        ) : (
          <>
            <MovieDetail>
              <MoviePoster $url={`${import.meta.env.VITE_TMDB_POSTER_URL}${mainMovie?.poster_path}`} onClick={() => navigate(`/moviePage/${mainMovie.id}`)}/>
              <MovieTitle>
                <RefreshButton><FaRedoAlt onClick={() => changeMovie()} size={'35px'}/></RefreshButton>
                {mainMovie?.title} 
              </MovieTitle>
              <DetailBox>
                <Detail>
                  <Info $color={"white"}>
                    평균 {mainMovie?.vote_average?.toFixed(1)}
                  </Info>
                  <Info>·</Info>
                  <Info $color={'white'}>{mainMovie?.release_date}</Info>

                  {mainMovie?.genres?.map((genre) => (
                    <Detail key={genre.id}>
                      <Info>·</Info>
                      <Info>{genre.name}</Info>
                    </Detail>
                  ))}
                </Detail>
              </DetailBox>
              <Summary $color={'white'}>
                {mainMovie?.overview}
                
              </Summary>
              <Backdrop $url={`${import.meta.env.VITE_TMDB_POSTER_URL}${mainMovie?.backdrop_path}`}/>
              <BackdropGradation></BackdropGradation>
            </MovieDetail>
          </>
        )}

        <CardList data={nowPlayingMovieData} isPending={isPending_1}>
          최신 영화
        </CardList>

        <CardList data={popularMovieData} isPending={isPending_2}>
          오늘의 TOP 20
        </CardList>
      </S.ContentContainer>
    </>
  );
}

export default HomePage;

const MainLoading = styled.div`
  min-height: 400px;
  aspect-ratio: 2/0.7;
  align-content: center;
  text-align: center;
`

const MovieDetail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 400px;
  box-sizing: border-box;

  aspect-ratio: 2/0.7;
`;

const MoviePoster = styled.div`
  position: absolute;

  top: calc(50% - 35%);
  right: 60px;

  height: 80%;
  opacity: 1;

  aspect-ratio: 1/1.5;

  background: url(${prop => prop.$url});
  background-size: cover;

  z-index: 100;

  border-radius: 5px;
  box-shadow: 0px 5px 20px 5px black;

  cursor: pointer;

  &:hover{
    filter: brightness(0.6);
  }

  @media (max-width: 1200px) {
    opacity: 0;
    
    visibility: hidden;
  }

  transition: all 0.3s ease;
`

const Backdrop = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  object-fit: cover;

  filter: brightness(0.6);

  background: url(${prop => prop.$url});
  background-size: cover;

  aspect-ratio: 2/1;

  transition: all 0.3s ease;
`;

const BackdropGradation = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;

  aspect-ratio: 2/1;

  background: linear-gradient(to right, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1)),
    linear-gradient(to left, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1)),
    linear-gradient(to bottom, rgba(0, 0, 0, 0) 85%, rgba(0, 0, 0, 1));
`;

const MovieTitle = styled.h1`
  display: flex;
  color: white;
  font-family: Pretendard-Regular;
  font-size: 50px;

  width: 75%;

  margin: 100px 0 10px;
  padding: 0 100px 0 40px;

  z-index: 10;

  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  box-sizing: border-box;

  user-select: none;

  @media (max-width: 1200px) {
    width: 100%;
  }

  transition: all 0.3s ease;
`;

const RefreshButton = styled.p`
  align-content: center;
  margin: 0 25px 0 0;

  cursor: pointer;

  &:hover{
    transform: rotate(270deg);
  }

  transition: all 0.6s ease;
`

const DetailBox = styled.div`
  display: flex;
  justify-content: start;

  margin: 0px 40px;

  user-select: none;

  z-index: 10;
`;

const Detail = styled.div`
  display: flex;
  gap: 8px;
`;

const Summary = styled.p`
  color: ${(props) => props.$color || "#84869D"};
  font-family: Pretendard-Regular;
  font-size: 15px;

  width: 75%;
  padding: 0 100px 0 40px;
  margin: 20px 0 75px;

  z-index: 10;

  box-sizing: border-box;

  @media (max-width: 1200px) {
    width: 100%;
  }

  user-select: none;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: all 0.3s ease;
`;

const Info = styled.p`
  color: ${(props) => props.$color || "#BABAC1"};
  font-family: Pretendard-Regular;
  font-size: 15px;
`;
