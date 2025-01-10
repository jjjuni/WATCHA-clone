import styled from "styled-components";
import '../../font.css'

export const ContentContainer = styled.div`
  padding: 60px 0px 0px 240px;
  transition: all 0.3s ease, min-height 0s ease;

  background-color: black;

  min-height: calc(100vh - 300px);

  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  @media (max-width: 850px){
    padding-left: 0px;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.$padding || '0px 40px 60px 40px'};
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  overflow: auto;
`

export const Title = styled.h1`
  font-family: ${props => props.$font || 'Pretendard-Regular'};
  width: 100%;
  margin: 0 0 20px 0;
  padding: 50px 10px 15px;
  border-bottom: 1px solid #141517;
  color: #fff;
  box-sizing: border-box;
  font-size: 28px;
  font-weight: bold;
`

export const SignTitle = styled.h1`
  font-family: ${props => props.$font || 'Pretendard-Regular'};
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin: 0 0 20px 0;
  padding: 50px 0 10px;
  color: #fff;
  box-sizing: border-box;
  font-size: 28px;

  @media (max-width: 1024px) {
    font-size: 25px;
  }
    
  @media (max-width: 500px) {
    font-size: 23px;
  }
`

export const Loading = styled.div`
  height: calc(100% - 107px);
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 50px 0;
  box-sizing: border-box;
`

export const InputDiv = styled.div`
  position: relative;

  background-color: black;

  padding: 2px;
  border: 0px;
  border-bottom: ${props => props.$borderBottom || '0px' };
  border-radius: ${props => props.$borderRadius || '5px'};
  border-color: black;

  width: 50%;
  max-width: 330px;
  height: 48px;
  outline: 0;
  overflow: hidden;

  box-sizing: content-box;

  @media (max-width: 1024px) {
    width: 75%;
  }

  @media (max-width: 500px) {
    height: 40px;
  }

  @media (max-width: 400px) {
    width: 80%;
  }
  
  @media (max-width: 350px) {
    width: 85%;
    height: 36px;
  }
`

export const InputText = styled.input`
  font-family: Pretendard-Regular;
  font-size: 15px;
  color: black;
  background-color: white;

  outline: 0;
  padding: 0 0 0 10px;
  margin: 0;
  border: ${props => props.$border || '1px solid #48484b'};
  border-radius: 5px;
  
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  @media (max-width: 500px) {
    font-size: 14px;
    padding: 0 0 0 7px;
  }

  @media (max-width: 350px) {
    font-size: 13px;
  }
`

export const ValidationIcon = styled.img`
  position: absolute;
  margin-top: -10px;
  top: 50%;
  right: 14px;
`

export const SubmitButton = styled.button`
  font-family: Pretendard-Regular;
  width: 50%;
  max-width: 330px;
  height: 45px;
  padding: 0 5px;
  margin: 20px;

  background-color: #F82F62;
  color: white;
  outline: 0;

  opacity: ${props => props.$opacity || 1};

  border: 0;
  border-radius: 5px;
  box-sizing: border-box;

  cursor: pointer;

  &:hover{
    background-color: #FF0558;
  }

  @media (max-width: 1024px) {
    width: 75%;
  }

  @media (max-width: 500px) {
    height: 40px;
  }

  @media (max-width: 400px) {
    width: 80%;
  }
  
  @media (max-width: 350px) {
    width: 85%;
    height: 36px;
  }
`

export const ErrorMessage = styled.p`
  font-family: Pretendard-Regular;
  font-size: 12px;
  color: #f82f62;
  margin: 20px 0 0 0;
`

export const PosterBox = styled.div`
  display: flex;
  flex-wrap: wrap;

  container-name: poster-box;
  container-type: inline-size;
`;