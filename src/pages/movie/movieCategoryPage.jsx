import * as S from "../_style/page-style";
import { Link } from "react-router-dom";
import { useEffect } from 'react';

import styled from "styled-components";
import useTitle from '../../hooks/useTitle';

function MovieCategoryPage() {

  useTitle('왓챠');

  return (
    <> 
      <S.ContentContainer>
        <S.ContentBox>
          <S.Title>카테고리</S.Title>
          <MovieCategoryBox>
            <MovieCategory to={'./now_playing'}>
              <Image
                src={"/src/images/마녀배달부 키키.jpg"}
              ></Image>
              <ImageText>현재 상영중인</ImageText>
            </MovieCategory>
            <MovieCategory to={'./popular'}>
              <Image
                src={"/src/images/센과 치히로.jpg"}
              ></Image>
              <ImageText>인기있는</ImageText>
            </MovieCategory>
            <MovieCategory to={'./top_rated'}>
              <Image
                src={"/src/images/포뇨.jpg"}
              ></Image>
              <ImageText>높은 평가를 받은</ImageText>
            </MovieCategory>
            <MovieCategory to={'./upcoming'}>
              <Image
                src={"/src/images/토토로.jpg"}
              ></Image>
              <ImageText>개봉 예정중인</ImageText>
            </MovieCategory>
          </MovieCategoryBox>
        </S.ContentBox>
      </S.ContentContainer>
    </>
  );
}

export default MovieCategoryPage;

const MovieCategoryBox = styled.div`
  display: flex;
  gap: 10px;
  flex-flow: wrap;
`;

const MovieCategory = styled(Link)`
  flex: 1 1 calc(25% - 5px);
  max-width: calc(25% - 10px);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  transition: all 0.4s ease;

  @media (max-width: 1400px){
    flex: 1 1 calc(33.33% - 10px);
    max-width: calc(33.33% - 10px);
  }

  @media (max-width: 1100px){
    flex: 1 1 calc(50% - 10px);
    max-width: calc(50% - 10px);
  }

  @media (max-width: 600px){
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 5px;

  transition: all 0.3s ease;

  &:hover{
    filter: brightness(50%);
    cursor: pointer;
  }
  aspect-ratio: 2/1.069;
`;

const ImageText = styled.div`
  position: absolute;
  font-size: 13px;
  bottom: 5%;
  left: 2%;
  color: white;
  font-family: Pretendard-Regular;

  padding: 1%;
  border-radius: 5px;
  background-color: #00000099;
`