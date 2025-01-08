import Poster from "./poster.jsx";
import { axiosTMDBInstance } from "../../apis/axios-instance.js";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce.js";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";
import CardSkeletonList from "./card-skeleton-list.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const SearchMovieList = ({ searchText }) => {
  const [url, setUrl] = useState(`/movie/popular?language=ko-KR&page=`);
  const debouncedSearchText = useDebounce(searchText, 200);

  const {
    data: movies,
    isPending,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchMovies", url],
    queryFn: async ({ pageParam }) =>
      await axiosTMDBInstance.get(`${url}${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.page;
      const totalPages = lastPage?.data?.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (debouncedSearchText === "") {
      setUrl(`/movie/popular?language=ko-KR&page=`);
    } else {
      setUrl(`/search/movie?query=${debouncedSearchText}&language=ko-KR&page=`);
    }
  }, [debouncedSearchText]);

  return (
    <>
      {isPending ? (
        <>
          <SearchTitle> 검색 </SearchTitle>
          <PosterBox>
            <CardSkeletonList num={20} />
          </PosterBox>
        </>
      ) : movies?.pages[0]?.data?.results?.length > 1 ? (
        <>
          {console.log(movies)}
          {debouncedSearchText !== "" ? (
            <SearchTitle> 검색 </SearchTitle>
          ) : (
            <SearchTitle> 이런 영화는 어떠신가요? </SearchTitle>
          )}
          <PosterBox>
            {movies?.pages?.map((page) => {
              return page?.data?.results?.map((movie) => {
                return <Poster key={movie.id} movie={movie} />;
              });
            })}
            {isFetching && <CardSkeletonList num={20} />}
            <RefDiv ref={ref} />
            {isFetching && (
              <Loading>
                <ClipLoader
                  color="#FFFFFF"
                  cssOverride={{}}
                  loading
                  size={35}
                  speedMultiplier={0.7}
                />
              </Loading>
            )}
          </PosterBox>
        </>
      ) : (
        <SearchTitle $fontSize={"20px"}>
          입력하신 검색어 `{debouncedSearchText}`(와)과 일치하는 결과가 없습니다{" "}
        </SearchTitle>
      )}
    </>
  );
};

export default SearchMovieList;

const SearchTitle = styled.h1`
  font-family: ${(props) => props.$font || "Pretendard-Regular"};
  width: 100%;
  margin: 0 0 10px;
  padding: 10px 10px 10px;
  border-bottom: 1px solid #141517;
  color: #fff;
  box-sizing: border-box;
  font-size: 20px;
`;

const PosterBox = styled.div`
  display: flex;
  flex-wrap: wrap;

  container-name: poster-box;
  container-type: inline-size;
`;

const Loading = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  margin: 50px 0;
`;

const RefDiv = styled.div``;

SearchMovieList.propTypes = {
  searchText: PropTypes.string.isRequired,
};
