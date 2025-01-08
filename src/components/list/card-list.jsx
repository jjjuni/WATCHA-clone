import styled, { keyframes } from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Card from "./card";
import { useEffect, useRef, useState } from "react";
import { useDebounceFn } from "../../hooks/useDebounce";
import { ClipLoader } from 'react-spinners';
import { useInView } from "react-intersection-observer";

const CardList = ({ data, isPending, children}) => {
  const [listX, setListX] = useState(-10);
  const [isDisabled, setIsDisabled] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [containerWidth, setcontainerWidth] = useState(0);
  const [timer, setTimer] = useState(null);

  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  const update = () => {
    if (wrapperRef.current && containerRef.current){
      const wrapperSize = wrapperRef.current.getBoundingClientRect().width - 20;
      const containerSize = containerRef.current.getBoundingClientRect().width
      setWrapperWidth(wrapperSize)
      setcontainerWidth(containerSize)
    }
  }

  const debouncedUpdate = useRef(useDebounceFn(update, 50)).current;

  useEffect(() => {
    debouncedUpdate();
    window.addEventListener("resize", debouncedUpdate) 
  })

  const { ref: leftRef, inView: leftInView } = useInView({
    threshold: 0.1,
  })

  const { ref: rightRef, inView: rightInView } = useInView({
    threshold: 0.1,
  })

  useEffect(() => {         // 창 크기 조절로 인한 ListWrapper 위치 이탈 조정
    if (timer){
      clearTimeout(timer);
    }
      
    const newTimer = setTimeout(() => {
      if (leftInView){
        setListX(0);
      }
      if (rightInView){
        setListX(() => {
          return containerWidth - wrapperWidth - 10;
        })
      }
    }, 50);

    setTimer(newTimer);

    return () => {
      if (newTimer) {
        clearTimeout(newTimer);
      }
    }
  
  }, [leftInView, rightInView, containerWidth, wrapperWidth])

  const leftButtonHandler = () => {
    if (wrapperWidth !== 0 && containerWidth !== 0){
      setListX((prev) => {
        setIsDisabled(true)
        const tmp = (prev > -containerWidth) ? -10 : (prev + (((import.meta.env.VITE_CARD_WIDTH * 5) / 3) * parseInt(containerWidth/((import.meta.env.VITE_CARD_WIDTH * 5) / 3))))

        let newListX
        
        if (prev == -10)
          newListX = containerWidth - wrapperWidth - 10
          
        else 
          newListX = tmp

        setTimeout(() => setIsDisabled(false), 300)
        return newListX;
      });
    }
  };

  const rightButtonHandler = () => {
    if (wrapperWidth !== 0 && containerWidth !== 0){
      setListX((prev) => {
        setIsDisabled(true)
        const tmp = (prev <= containerWidth - wrapperWidth) ? -10 : (prev - (((import.meta.env.VITE_CARD_WIDTH * 5) / 3) * (containerWidth ? parseInt(containerWidth / ((import.meta.env.VITE_CARD_WIDTH * 5) / 3)) : 0)))

        let newListX
        
        if (-tmp <= wrapperWidth - containerWidth)
          newListX = tmp
          
        else if (-tmp > wrapperWidth - containerWidth)
          newListX = containerWidth - wrapperWidth - 10

        setTimeout(() => setIsDisabled(false), 300)
        return newListX;
      });
    }
  };

  return (
    <>
    
      <MovieListContainer ref={containerRef}>
      <ListTitle>{children}</ListTitle>
        <ListButton $direction={'left'} $position={"left: 0"} onClick={leftButtonHandler} disabled={isDisabled}>
          <IoIosArrowBack size={"20px"} />
        </ListButton>
        {isPending ? (
          <ClipLoaderWrapper>
            <ClipLoader color={"white"} size={"20px"}/>
          </ClipLoaderWrapper>
        ) : (
          <>
            <ListWrapper ref={wrapperRef} $X={listX}>
              <RefDiv ref={leftRef}></RefDiv>
              {data?.data?.results?.map((data) => (
                <Card key={data.id} data={data}></Card>
              ))}
              <RefDiv ref={rightRef}></RefDiv>
            </ListWrapper>
            
          </>
        )}
        
        <ListButton $direction={'right'} $position={"right: 0"} onClick={rightButtonHandler} disabled={isDisabled}>
          <IoIosArrowForward size={"20px"} />
        </ListButton>
      </MovieListContainer>
    </>
  );
};

export default CardList;

const ListTitle = styled.h1`
  position: absolute;
  top: 0;
  left: 15px;
  font-family: var(--font-default);
  font-size: 20px;
  color: white;

  margin: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  width: 100%;

  height: 300px;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0));

  overflow: hidden;
`;

const ClipLoaderWrapper = styled.div`
  width: 100%;
  text-align: center;
`

const ListWrapper = styled.div`
  display: flex;

  height: 75%;
  padding: 15px 0;

  position: relative;
  z-index: 5;

  left: ${(prop) => prop.$X}px;

  transition: all 0.5s ease;
  box-sizing: border-box;
`;

const ListButton = styled.button`
  position: absolute;
  ${(prop) => prop.$position};
  width: 40px;
  height: 70%;

  border: 0;
  opacity: 0;
  
  color: rgba(0, 0, 0, 0);

  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;

  z-index: 10;
  background: linear-gradient(to ${prop => prop.$direction}, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  
  &:hover{
    color: white;
    opacity: 1;
  }

  transition: all 0.3s ease;
`;

const RefDiv = styled.div`
  min-widtH: 10px;
`
