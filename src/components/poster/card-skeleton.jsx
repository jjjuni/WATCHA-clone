import styled, { keyframes } from "styled-components";

const skeleton = keyframes`
  0% {
    opacity: 0.8;
  }
  30% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.3;
  } 
  70% {
    opacity: 0.5;
  } 
  100% {
    opacity: 0.8;
  }
`

const CardSkeleton = () => {
  return (
    <SkeletonPoster>
      <Skeleton/>
      <SkeletonTitle $backcolor={'white'} />
      <SkeletonDate $backcolor={'white'} />
    </SkeletonPoster>
  )
}

export default CardSkeleton;

export const SkeletonPoster = styled.div`
  flex: 1 1 100%;
  max-width: 100%;
  
  display: flex;
  flex-direction: column;

  flex-grow: 1;

  margin: 0 2px 9px 2px;
  gap:2px;

  transition: all 0.4s ease;

  @container poster-box (min-width: calc(150px * 2)){
    flex: 1 1 calc(100%/2 - 4px);
    max-width: calc(100%/2 - 4px);
  }
  @container poster-box (min-width: calc(150px * 3)){
    flex: 1 1 calc(100%/3 - 4px);
    max-width: calc(100%/3 - 4px);
  }
  @container poster-box (min-width: calc(150px * 4)){
    flex: 1 1 calc(100%/4 - 4px);
    max-width: calc(100%/4 - 4px);
  }
  @container poster-box (min-width: calc(150px * 5)){
    flex: 1 1 calc(100%/5 - 4px);
    max-width: calc(100%/5 - 4px);
  }
  @container poster-box (min-width: calc(150px * 6)){
    flex: 1 1 calc(100%/6 - 4px);
    max-width: calc(100%/6 - 4px);
  }
  @container poster-box (min-width: calc(150px * 7)){
    flex: 1 1 calc(100%/7 - 4px);
    max-width: calc(100%/7 - 4px);
  }
  @container poster-box (min-width: calc(150px * 8)){
    flex: 1 1 calc(100%/8 - 4px);
    max-width: calc(100%/8 - 4px);
  }
  @container poster-box (min-width: calc(150px * 9)){
    flex: 1 1 calc(100%/9 - 4px);
    max-width: calc(100%/9 - 4px);
  }
  @container poster-box (min-width: calc(150px * 10)){
    flex: 1 1 calc(100%/10 - 4px);
    max-width: calc(100%/10 - 4px);
  }
    
  animation: ${skeleton} 4s 0s infinite linear alternate;
`

export const SkeletonTitle = styled.h2`

  font-family: ${props => props.font || 'Pretendard-Regular'};
  background-color: rgb(130, 130, 130);

  padding: 0 8px 0 8px;
  margin: 0 4px 2px 4px;

  border-radius: 5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: calc(100% - 8px);
  min-height: 15px;
  color: #fff;
  box-sizing: border-box;
  font-size: 13px;
`

export const SkeletonDate = styled.p`

  font-family: ${props => props.font || 'Pretendard-Regular'};
  background-color: rgb(130, 130, 130);

  padding: 0 8px 5px 8px;
  margin: 0 4px;

  border-radius: 5px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: calc(100% - 8px);
  min-height: 12px;
  color: #fff;
  box-sizing: border-box;
  font-size: 10px;
`

export const Skeleton = styled.div`
  flex: 1 1 calc(100% - 10px);
  max-width: calc(100% - 10px);
  background-color: rgb(130, 130, 130);

  margin: 5px;
  border-radius: 10px;
  box-sizing: border-box;

  min-width: 100px;

  transition: all 0.3s ease;

  aspect-ratio: 1/1.5;
`