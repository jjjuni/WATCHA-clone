import styled from "styled-components";
import PropTypes from "prop-types";

const Credit = ({info}) => {

  return (
    <Infos>
      {info.profile_path === null ?(
        <Image src="https://an2-mars.amz.wtchn.net/assets/aio_person_thumbnail-294cb5e0a2ea9b9893eb622092baae586e2371571ab2d5912b0ded11a1aa0655.png"/>
      ) : (
        <Image src={`https://image.tmdb.org/t/p/w500${info.profile_path}`} />
      )}
      
      <NameBox>
        <Name $fontSize={'15px'}>{info?.name}</Name>
        {info.character?(
          <Name $color={'#84868d;'}>{info?.character}</Name>
        ) : (
          <></>
        )}
      </NameBox>
    </Infos>
  )
};

export default Credit;

const Infos = styled.div`
  min-width: 200px;
  display: flex;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 600px){
    width: calc(100%/2);
  }
  @media (min-width: 1300px){
    width: calc(100%/3);
  }
  @media (min-width: 1700px){
    width: calc(100%/4);
  }
  @media (min-width: 2300px){
    width: calc(100%/5);
  }
  @media (min-width: 2800px){
    width: calc(100%/6);
  }
  @media (min-width: 3600px){
    width: calc(100%/7);
  }
`

const Image = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  background-color: black;
  border-radius: 100px;
  cursor: pointer;
`

const NameBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto auto auto 10px;
  cursor: pointer;
`

const Name = styled.p`
  color: ${props => props.$color || 'white'};
  font-size: ${props => props.$fontSize || '13px'};
  font-family: Pretendard-Regular;
  margin: 3px;
`

Credit.propTypes ={

}

Credit.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    profile_path: PropTypes.string,
  }).isRequired
}