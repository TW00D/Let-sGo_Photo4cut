import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  position: relative;
  background-color: white;
`;
export const CamWrapper = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  .webcam {
    border-radius: 15px;
    width: 960px;
    height: 720px;
  }
  .canvas {
    position: absolute;
    width: 960px;
    height: 720px;
    border-radius: 15px;
  }
`;
export const ButtonWrapper = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;
export const Header = styled.header`
  display: Flex;
  align-items: center;
`;
export const HeaderImg = styled.img`
  width: 5vw;
`;
export const TextImg = styled.img`
  width: 100px;
`;
export const TextImg2 = styled.img`
  width: 70px;
`;
export const Title = styled.h1`
  color: white;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100px;
  height: 100px;
  outline: none;
  border: 0px;
  background-color: #f2f2f2;
  margin: 10px;
`;
export const TakeButton = styled.image``;
