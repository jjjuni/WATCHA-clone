import { Link } from "react-router-dom";
import styled from "styled-components";

export const WATCHA = styled(Link)`
  margin: 0px 0px 0px 20px;

  height: 60px;
  box-sizing: border-box;

  align-content: center;

  text-decoration: none;
  padding: 0px 30px 0px 12px;
`;

export const Logo = styled.img`
  height: 30px;
  margin: 5px 0 0 0;
`

export const StyledLink = styled(Link)`
  font-size: ${props => props.fontSize || '15px'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  color: white;
  font-family: Pretendard-Regular;
  display: flex;
  text-decoration: none;

  background-color: ${props => props.backcolor || '#141517'};
  align-items: center;
  border-radius: 4px;
  &:hover{
    background-color: ${props => props.hovercolor || '#141517'};
  };

`;

export const StyledButton = styled.button`
  font-size: ${props => props.$fontSize || '15px'};
  padding: ${props => props.$padding || '0'};
  margin: ${props => props.$margin || '0'};
  color: white;
  font-family: Pretendard-Regular;
  display: flex;
  text-decoration: none;

  font-weight: ${props => props.$fontWeight || ';'};
  border: 0;
  cursor: pointer;
  
  background-color: ${props => props.$backcolor || '#141517'};
  align-items: center;
  border-radius: 4px;
  &:hover{
    background-color: ${props => props.$hovercolor || '#141517'};
  };
`

export const IconBox = styled.div`
  margin: 0px 10px 0px 0px;
`