import styled from "styled-components";
import { Link } from "react-router-dom";
import * as S from '../_style/components-style.js';
import { BiMoviePlay, BiSearch } from "react-icons/bi"

function Sidebar() {
  return (
    <StyledSidebar>
      <S.WATCHA to={'/'}>
        <S.Logo src='/src/logo/WATCHA.svg'/>
      </S.WATCHA>
      <SidebarContents>
        <S.StyledLink to={'/search'} fontSize={'14px'} padding={'8px 12px'}>
          <S.IconBox>
            <BiSearch size="18" color="white"/>
          </S.IconBox>
          찾기
        </S.StyledLink>
        <S.StyledLink to={'/movie-category'} fontSize={'14px'} padding={'8px 12px'}>
          <S.IconBox>
            <BiMoviePlay size="18" color="white"/>
          </S.IconBox>
          영화
        </S.StyledLink>
      </SidebarContents>
    </StyledSidebar>
  );
}

export default Sidebar;

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  width: 240px;
  background-color: #141517;
  transition: transform 0.3s ease;
  box-sizing: border-box;
  z-index: 2000;
  
  border-right: 1px solid #1B1C1D;

  @media (max-width: 850px){
    transform: translateX(-100%);
  }
`

const SidebarContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0px 16px 0px 16px;
`