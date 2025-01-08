import { useContext, useEffect } from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom";
import * as S from '../_style/components-style.js';
import { BiMoviePlay, BiSearch } from "react-icons/bi"
import { LogContext } from '../../context/logContext.jsx';
import { axiosUserInstance } from '../../apis/axios-instance.js';
import { useQuery } from '@tanstack/react-query';

function Navbar() {

  const {
    isLogged,
    setIsLogged,
    userInfo,
    setUserInfo,
  } = useContext(LogContext);

  const getUser = async () => {
    if (isLogged) {
      try {
        const response = await axiosUserInstance.get(import.meta.env.VITE_USER_INFO_URL)
        return response;
      }
      catch (error){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLogged(false);
      }
    }
    else {
      return null;
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUser", isLogged],
    queryFn: getUser,
  })

  useEffect(() => {
    setUserInfo(data?.data)
  }, [data])

  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLogged(false);
    window.location.reload();   // 없어도 되긴 하는데 없으면 뭔가... 로그아웃이 심심한...?
  }

  return (
    <StyledNavbar>
      <NavbarLeft>
        <S.WATCHA to={'/'}>
          <S.Logo src={'/src/logo/WATCHA.svg'}/>
        </S.WATCHA>
        <IconNav to={'/search'}>
          <BiSearch size="17" color="white"/> 검색
        </IconNav>
        <IconNav to={'/movie-category'}>
          <BiMoviePlay size="17" color="white"/> 영화
        </IconNav>
      </NavbarLeft>
      <SignNav>
        {isLogged? 
        <>
          <S.StyledButton $fontSize={'13px'} $padding={'0px 12px'} $margin={'14px 5px'} $fontWeight={'600'} >{userInfo?.username} 님 반갑습니다</S.StyledButton>
          <S.StyledButton onClick={logOut} $fontSize={'13px'} $padding={'0px 12px'} $margin={'14px 5px'} $hovercolor={'#2C2D2F'}>로그아웃</S.StyledButton>
        </>
        :
        <>
          <S.StyledLink to={'/login'} fontSize={'13px'} padding={'0px 12px'} margin={'14px 5px'} hovercolor={'#2C2D2F'}>로그인</S.StyledLink>
          <S.StyledLink to={'/sign-up'} fontSize={'13px'} padding={'0px 12px'} margin={'14px 5px'} backcolor={'#F82F62'} hovercolor={'#FF0558'}>회원가입</S.StyledLink>
        </>
        }
      </SignNav>
    </StyledNavbar>
  )
}

export default Navbar;

const StyledNavbar = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 60px;
  justify-content: end;
  background-color: var(--main-gray);
  padding: 0px 40px 0px 0px;
  box-sizing: border-box;
  z-index: 1000;
`

const NavbarLeft = styled.div`
  display: flex;
  position: absolute;
  left: 0px;
  width: 50%;
  min-width: 290px;
  background-color: var(--main-gray);

  transition: all 0.3s ease;

  @media (max-width: 490px){
    transform: translateX(-300px);
  }
    
  @media (min-width: 850px){
    transform: translateX(-300px);
  }
`

const IconNav = styled(Link)`
  display: flex;
  gap: 4px;
  align-items: center;
  min-width: 45px;
  margin: 13px 10px;
  color: white;
  font-family: Pretendard-Regular;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
`

const SignNav = styled.div`
  display: flex;
  justify-content: space-between;
`