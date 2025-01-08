import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Poster from "../../components/poster/poster.jsx";

import { ClipLoader } from "react-spinners";

import * as S from "../_style/page-style.js";
import useTitle from '../../hooks/useTitle.js';
import CardSkeletonList from "../../components/poster/card-skeleton-list.jsx";
import styled from "styled-components";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function MoviesPage() {
  const [title, setTitle] = useState("");
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  useTitle('왓챠');

  useEffect(() => {
    switch (category) {
      case "now_playing":
        setTitle("상영 중인 영화");
        break;
      case "popular":
        setTitle("인기있는 영화");
        break;
      case "top_rated":
        setTitle("높은 평가를 받은 영화");
        break;
      case "upcoming":
        setTitle("개봉 예정 중인 영화");
        break;
    };
  }, [category]);

  const { 
    data: movies, 
    isPending, 
    isError, 
    error, 
    isFetching,
  } = useQuery ({
    queryKey: ['getMovies', category, currentPage],
    queryFn: async () => await axiosTMDBInstance.get(`/movie/${category}?language=ko-KR&page=${currentPage}`),
    placeholderData: keepPreviousData,    // 다음 페이지 이동 시 깜빡임 방지 (이전 데이터 유지 -> 새로운 데이터 불러오면 바꿔치기)
  })

  const changePage = (option) => {
    if (!isFetching) {
      if (option === '+') {
        if (currentPage < 100) {
          setCurrentPage(currentPage + 1)
        }
      }
      if (option === '-') {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
        }
      }
    }
  }
  
  return (
    
    <S.ContentContainer>
      <S.ContentBox>
        <S.Title>{title}</S.Title>
        {isPending ? (
          <S.PosterBox>
            <CardSkeletonList num={20}/>
            <PageWrapper>
              <PageButton onClick={() => changePage('-')} disabled={currentPage < 2 || isFetching}>&lt;</PageButton>
                <Page>{currentPage}</Page>
              <PageButton onClick={() => changePage('+')} disabled={currentPage > movies?.data?.total_pages || isFetching}>&gt;</PageButton>
            </PageWrapper>
          </S.PosterBox>
        ) : isError? (
          <S.Loading>에러!</S.Loading>
        ) : (
          <S.PosterBox>
            {movies?.data?.results?.map((movie) => { 
                return <Poster key={movie.id} movie={movie}/>
              })
            }
            <PageWrapper>
              <PageButton onClick={() => changePage('-')} disabled={currentPage < 2 || isFetching}>&lt;</PageButton>
                <Page>{currentPage}</Page>
              <PageButton onClick={() => changePage('+')} disabled={currentPage > movies?.data?.total_pages || isFetching}>&gt;</PageButton>
            </PageWrapper>
          </S.PosterBox>
        )}
        
      </S.ContentBox>
    </S.ContentContainer>
  );
}

export default MoviesPage;

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin: 30px;
`

const PageButton = styled.button`
  font-family: Pretendard-Regular;
  width: 20px;

  border: 0;
  border-radius: 3px;
  margin: 0 10px;

  color: white;
  background-color: #F82F62;
  text-align: center;
  cursor: pointer;

  &:disabled{
    background-color: #f82f627a;
    color: #ffffff7a;
  }  
`

const Page = styled.p`
  color: white;
  font-family: Pretendard-Regular;
  margin: 0;
`