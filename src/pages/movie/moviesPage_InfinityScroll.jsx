import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Poster from "../../components/poster/poster.jsx";

import { ClipLoader } from "react-spinners";

import * as S from "../_style/page-style.js";
import { axiosTMDBInstance } from "../../apis/axios-instance.js";
import useTitle from '../../hooks/useTitle.js';
import CardSkeletonList from "../../components/poster/card-skeleton-list.jsx";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";

function MoviesPage() {
  const [title, setTitle] = useState("");
  const { category } = useParams();
  
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
    hasNextPage, 
    fetchNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ['getInfinityMovies', category],
    queryFn: async ({pageParam}) => await axiosTMDBInstance.get(`/movie/${category}?language=ko-KR&page=${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.page;
      const totalPages = lastPage?.data?.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  })

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && !isFetching && hasNextPage){
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage])
  
  return (
    
    <S.ContentContainer>
      <S.ContentBox>
        <S.Title>{title}</S.Title>
        {isPending ? (
          <S.PosterBox>
            <CardSkeletonList num={20}/>
          </S.PosterBox>
        ) : isError? (
          <S.Loading>에러!</S.Loading>
        ) : (
          <S.PosterBox>
            {movies?.pages?.map((page) => {
              return page?.data?.results?.map((movie => {
                return <Poster key={movie.id} movie={movie}/>
              }))
            })}
            {isFetching && <CardSkeletonList num={20}/>}
            <RefDiv ref={ref}/>
            {isFetching && 
              <Loading>
                <ClipLoader 
                  color="#FFFFFF"
                  cssOverride={{}}
                  loading
                  size={35}
                  speedMultiplier={0.7}
                />
              </Loading>
            }
          </S.PosterBox>
        )}
        
      </S.ContentBox>
    </S.ContentContainer>
  );
}

export default MoviesPage;

const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin: 50px 0;
`

const RefDiv = styled.div`

`
